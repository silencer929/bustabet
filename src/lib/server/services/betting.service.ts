import { db } from '../db';
import { WalletService } from './wallet.service';
import type { RowDataPacket } from 'mysql2';
import {env} from "$env/dynamic/private";

export interface PlaceBetInput {
  type: 'SINGLE' | 'COMBO';
  selections: Array<{ marketId: string; odds: number }>;
  stake: number;
}

export class BettingService {
  private static readonly MINIMUM_STAKE = Number(env.MINIMUM_STAKE_AMOUNT || 10.00);

  static async placeWager(profileId: string, input: PlaceBetInput): Promise<{ success: boolean; message: string }> {
    if (input.stake < this.MINIMUM_STAKE) {
      throw new Error(`Minimum stake required is ${this.MINIMUM_STAKE}`);
    }

    const totalRequiredStake = input.type === 'SINGLE' ? input.stake * input.selections.length : input.stake;
    const balance = await WalletService.getBalance(profileId);

    if (balance < totalRequiredStake) {
      throw new Error('Insufficient wallet balance');
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // --- PLACING SINGLE INDEPENDENT WAGERS ---
      if (input.type === 'SINGLE') {
        for (const selection of input.selections) {
          const [markets] = await conn.execute<RowDataPacket[]>(
            `SELECT m.id, m.game_id, m.selection, m.odds, m.active, g.home_team, g.away_team, g.status, g.start_time
             FROM admin_game_markets m
             INNER JOIN admin_games g ON m.game_id = g.id
             WHERE m.id = ? LIMIT 1`,
            [selection.marketId]
          );

          if (markets.length === 0 || markets[0].active !== 1 || markets[0].status !== 'UPCOMING' || new Date() >= new Date(markets[0].start_time)) {
            throw new Error('One or more selections are no longer active or have already started');
          }

          const market = markets[0];
          const potentialWin = Number((input.stake * Number(market.odds)).toFixed(2));

          await conn.execute(
            `INSERT INTO bets (id, profile_id, game_id, market_id, stake, odds, potential_win, status, type)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', 'SINGLE')`,
            [crypto.randomUUID(), profileId, market.game_id, market.id, input.stake, market.odds, potentialWin]
          );
        }

        // Send a confirmation system notification alert to the player
        await conn.execute(
          'INSERT INTO notifications (id, profile_id, title, message, `read`) VALUES (?, ?, "Singles Placed", ?, 0)',
          [crypto.randomUUID(), profileId, `Successfully placed ${input.selections.length} single wagers for a total of ${totalRequiredStake}.`]
        );
      } 
      
      // --- PLACING CONSOLIDATED MULTIBETS (COMBO) ---
      else if (input.type === 'COMBO') {
        let summedOdds = 0;

        for (const selection of input.selections) {
          const [markets] = await conn.execute<RowDataPacket[]>(
            `SELECT m.odds, m.active, g.status, g.start_time
             FROM admin_game_markets m
             INNER JOIN admin_games g ON m.game_id = g.id
             WHERE m.id = ? LIMIT 1`,
            [selection.marketId]
          );

          if (markets.length === 0 || markets[0].active !== 1 || markets[0].status !== 'UPCOMING' || new Date() >= new Date(markets[0].start_time)) {
            throw new Error('One or more selections are no longer active or have already started');
          }

          summedOdds += Number(markets[0].odds);
        }

        const potentialWin = Number((input.stake * summedOdds).toFixed(2));
        const betId = crypto.randomUUID();

        // Log a single combo multibet containing selections as serialized JSON
        await conn.execute(
          `INSERT INTO bets (id, profile_id, game_id, market_id, stake, odds, potential_win, status, type, selections)
           VALUES (?, ?, NULL, NULL, ?, ?, ?, 'PENDING', 'COMBO', ?)`,
          [betId, profileId, input.stake, summedOdds, potentialWin, JSON.stringify(input.selections)]
        );

        await conn.execute(
          'INSERT INTO notifications (id, profile_id, title, message, `read`) VALUES (?, ?, "Multibet Placed", ?, 0)',
          [crypto.randomUUID(), profileId, `Successfully placed multibet of ${input.stake} with total odds of ${summedOdds.toFixed(2)}.`]
        );
      }

      await conn.commit();
      return { success: true, message: 'Wagers successfully logged!' };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}