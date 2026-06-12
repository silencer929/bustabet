import { db } from '../db';
import { OddsApiService } from './oddsApi.service';
import type { RowDataPacket } from 'mysql2';

export class OddsSyncService {
  // Syncs and caches active game fixtures and odds for a specific sport key using raw SQL
  static async syncSportOdds(sportKey: string): Promise<void> {
    const rawOdds = await OddsApiService.getOdds(sportKey);
    const conn = await db.getConnection();

    try {
      for (const match of rawOdds) {
        const commenceTime = new Date(match.commence_time);
        const isLive = new Date() >= commenceTime;
        const gameStatus = isLive ? 'LIVE' : 'UPCOMING';

        await conn.beginTransaction();

        // Check if the game fixture already exists in the admin_games table
        const [existingGames] = await conn.execute<RowDataPacket[]>(
          'SELECT id FROM admin_games WHERE id = ? LIMIT 1',
          [match.id]
        );

        if (existingGames.length > 0) {
          await conn.execute(
            'UPDATE admin_games SET status = ?, start_time = ? WHERE id = ?',
            [gameStatus, commenceTime, match.id]
          );
        } else {
          await conn.execute(
            'INSERT INTO admin_games (id, sport, league, home_team, away_team, start_time, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [match.id, match.sport_key, match.sport_title, match.home_team, match.away_team, commenceTime, 'UPCOMING']
          );
        }

        // Skip parsing markets if no bookmakers are returned
        if (!match.bookmakers || match.bookmakers.length === 0) {
          await conn.commit();
          continue;
        }

        const primaryBookmaker = match.bookmakers[0];

        // Deactivate all old cached markets for this game before writing updated ones
        await conn.execute(
          'UPDATE admin_game_markets SET active = 0 WHERE game_id = ?',
          [match.id]
        );

        for (const market of primaryBookmaker.markets) {
          for (const outcome of market.outcomes) {
            // Uniquely identify the option based on game, market type, and selection name
            const [existingMarkets] = await conn.execute<RowDataPacket[]>(
              'SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1',
              [match.id, market.key, outcome.name]
            );

            if (existingMarkets.length > 0) {
              await conn.execute(
                'UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?',
                [outcome.price, existingMarkets[0].id]
              );
            } else {
              const marketId = crypto.randomUUID();
              await conn.execute(
                'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
                [marketId, match.id, market.key, outcome.name, outcome.price]
              );
            }
          }
        }

        await conn.commit();
      }
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}