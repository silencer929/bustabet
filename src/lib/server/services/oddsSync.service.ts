import { db } from '../db';
import { OddsApiService } from './oddsApi.service';
import type { RowDataPacket } from 'mysql2';

export class OddsSyncService {
  // Mode A: Standard baseline sync (Cost: 1 Credit). Syncs H2H, Spreads, and Totals globally.
  static async syncSportOddsStandard(sportKey: string): Promise<void> {
    const rawOdds = await OddsApiService.getOdds(sportKey, 'us,eu', 'h2h,spreads,totals');
    const conn = await db.getConnection();

    try {
      for (const match of rawOdds) {
        const commenceTime = new Date(match.commence_time);
        const isLive = new Date() >= commenceTime;
        const gameStatus = isLive ? 'LIVE' : 'UPCOMING';

        await conn.beginTransaction();

        // Upsert match fixture details into the admin_games table
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

        if (!match.bookmakers || match.bookmakers.length === 0) {
          await conn.commit();
          continue;
        }

        // Use Pinnacle as the sharp bookmaker reference, fallback to first available
        const bookmaker = match.bookmakers.find(b => b.key === 'pinnacle') || match.bookmakers[0];

        // Deactivate old active records for these specific standard markets only
        await conn.execute(
          "UPDATE admin_game_markets SET active = 0 WHERE game_id = ? AND market_name IN ('h2h', 'spreads', 'totals')",
          [match.id]
        );

        for (const market of bookmaker.markets) {
          for (const outcome of market.outcomes) {
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
              await conn.execute(
                'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
                [crypto.randomUUID(), match.id, market.key, outcome.name, outcome.price]
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

  // Mode B: Deep Event Harvest. Discovers and syncs ALL available advanced lines (props, periods)
  static async syncEventOddsDeep(sportKey: string, eventId: string): Promise<void> {
    const harvestedData = await OddsApiService.harvestEvent(sportKey, eventId);
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // Deactivate all old cached market selections for this deep-sync event
      await conn.execute(
        'UPDATE admin_game_markets SET active = 0 WHERE game_id = ?',
        [eventId]
      );

      // Map to ensure we do not write duplicate selections from multiple bookmakers
      const processedSelections = new Set<string>();

      for (const bookmaker of harvestedData.bookmakers) {
        for (const market of bookmaker.markets) {
          for (const outcome of market.outcomes) {
            const selectionKey = `${market.key}-${outcome.name}`;
            
            // Skip if this selection has already been imported from a sharper bookmaker
            if (processedSelections.has(selectionKey)) continue;

            const [existingMarkets] = await conn.execute<RowDataPacket[]>(
              'SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1',
              [eventId, market.key, outcome.name]
            );

            if (existingMarkets.length > 0) {
              await conn.execute(
                'UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?',
                [outcome.price, existingMarkets[0].id]
              );
            } else {
              await conn.execute(
                'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
                [crypto.randomUUID(), eventId, market.key, outcome.name, outcome.price]
              );
            }

            processedSelections.add(selectionKey);
          }
        }
      }

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}