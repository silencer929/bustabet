import { db } from '../db';
import { WalletService } from './wallet.service';
import { calculatePotentialWin } from '$lib/utils/odds';
import type { RowDataPacket } from 'mysql2';

export class BettingService {
  private static MINIMUM_STAKE = 10.00; // Minimum allowed wager value

  // Atomically validates and places a new bet slip wager using SQL transactions
  static async placeBet(profileId: string, marketId: string, stake: number): Promise<{ success: boolean; message: string; betId?: string }> {
    if (stake < this.MINIMUM_STAKE) {
      return { success: false, message: `Minimum stake required is ${this.MINIMUM_STAKE}` };
    }

    const balance = await WalletService.getBalance(profileId);
    if (balance < stake) {
      return { success: false, message: 'Insufficient wallet balance' };
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // Retrieve the market odds and join parent game metadata using an inner join
      const [markets] = await conn.execute<RowDataPacket[]>(
        `SELECT m.id, m.game_id, m.market_name, m.selection, m.odds, m.active,
                g.home_team, g.away_team, g.status, g.start_time
         FROM admin_game_markets m
         INNER JOIN admin_games g ON m.game_id = g.id
         WHERE m.id = ? LIMIT 1`,
        [marketId]
      );

      if (markets.length === 0) {
        await conn.rollback();
        return { success: false, message: 'This selection is no longer available' };
      }

      const market = markets[0];

      // Block bet placement if the market is suspended
      if (market.active !== 1) {
        await conn.rollback();
        return { success: false, message: 'This selection is temporarily suspended' };
      }

      const kickoffTime = new Date(market.start_time);

      // Block bet placement if the match is already live or completed
      if (market.status !== 'UPCOMING' || new Date() >= kickoffTime) {
        await conn.rollback();
        return { success: false, message: 'This game has already started' };
      }

      const potentialWin = calculatePotentialWin(stake, Number(market.odds));
      const betId = crypto.randomUUID();

      // Log wager in the bets table
      await conn.execute(
        `INSERT INTO bets (id, profile_id, game_id, market_id, stake, odds, potential_win, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
        [betId, profileId, market.game_id, market.id, stake, market.odds, potentialWin]
      );

      // Send a confirmation system notification alert to the player
      await conn.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`)
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          profileId,
          'Wager Placed Successfully',
          `Your wager of ${stake} on ${market.home_team} vs ${market.away_team} (${market.selection}) has been recorded.`
        ]
      );

      await conn.commit();

      return {
        success: true,
        message: 'Bet placed successfully',
        betId
      };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}