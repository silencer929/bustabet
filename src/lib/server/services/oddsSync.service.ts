import { db } from '../db';
import { OddsApiService } from './oddsApi.service';
import { OddsEngineService } from './oddsEngine.service';
import type { RowDataPacket } from 'mysql2';

export class OddsSyncService {
  // Array of the absolute most popular, high-wagering leagues globally
    private static readonly FAMOUS_LEAGUES = [
    'soccer_english_premier_league',
    'basketball_nba',
    'tennis_atp_singles',
    'americanfootball_nfl',
    'soccer_brazil_serie_b',
    'soccer_china_superleague',
    'soccer_conmebol_copa_libertadores',
    'soccer_conmebol_copa_sudamericanas',
    'soccer_fifa_world_cup',
    'soccer_fifa_world_cup_winners',
    'soccer_finland_veikkausliiga',
    'soccer_germany_dfb_pokal',
    'soccer_italy_serie_a',
    'soccer_league_of_ireland',
    'soccer_norway_eliteserien',
    'soccer_spain_segunda_division',
    'soccer_sweden_allsvenskan',
    'soccer_sweden_superettan',
    'americanfootball_cfl',
    'americanfootball_ncaaf',
    'americanfootball_ncaaf_championship_winner',
    'americanfootball_nfl',
    'americanfootball_nfl_preseason'
  ];
  // In-memory cache registry to store timestamps of the last successful syncs
  private static cacheLock = new Map<string, number>();

  // Checks if the cached data is still fresh based on a maximum age parameter (in milliseconds)
  private static isCacheFresh(key: string, maxAgeMs: number): boolean {
    const lastSync = this.cacheLock.get(key);
    if (!lastSync) return false;
    return (Date.now() - lastSync) < maxAgeMs;
  }

  // Updates the cache lock registry with the current timestamp
  private static setCacheTimestamp(key: string) {
    this.cacheLock.set(key, Date.now());
  }

  // Converts any incoming American or Decimal price to positive Decimal format
  private static parseOddsToDecimal(price: number): number {
    if (price === 0) return 1.01;
    if (price >= 100) {
      return Number(((price / 100) + 1).toFixed(2));
    } else if (price <= -100) {
      return Number(((100 / Math.abs(price)) + 1).toFixed(2));
    }
    return Number(price.toFixed(2));
  }

  // Mode A: Standard baseline sync. Updates standard lines with a 1-hour cache lock.
  static async syncSportOddsStandard(sportKey: string): Promise<void> {
    const ONE_HOUR = 3600000;

    // Guard: Intercept request and skip API call if standard odds were synced less than 1 hour ago
    if (this.isCacheFresh(sportKey, ONE_HOUR)) {
      console.log(`[Cache Guard Active] Standard odds for ${sportKey} are fresh. Skipping API fetch.`);
      return;
    }

    const rawOdds = await OddsApiService.getOdds(sportKey, 'us,eu', 'h2h,spreads,totals');
    const conn = await db.getConnection();

    try {
      for (const match of rawOdds) {
        // Guard: Ignore manually created game keys, isolating those matches entirely to local configurations
        if (match.id.startsWith('MAN-')) continue;

        const commenceTime = new Date(match.commence_time);
        const isLive = new Date() >= commenceTime;
        const gameStatus = isLive ? 'LIVE' : 'UPCOMING';

        await conn.beginTransaction();

        // Upsert match fixture details
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

        const bookmaker = match.bookmakers.find(b => b.key === 'pinnacle') || match.bookmakers[0];

        // Deactivate old active records for these specific standard markets only
        await conn.execute(
          "UPDATE admin_game_markets SET active = 0 WHERE game_id = ? AND market_name IN ('h2h', 'spreads', 'totals')",
          [match.id]
        );

        let h2hHome = 2.0, h2hDraw = 3.4, h2hAway = 3.0, over25 = 1.9;

        for (const market of bookmaker.markets) {
          for (const outcome of market.outcomes) {
            const normalizedOdds = this.parseOddsToDecimal(outcome.price);

            if (market.key === 'h2h') {
              if (outcome.name === match.home_team) h2hHome = normalizedOdds;
              else if (outcome.name === 'Draw') h2hDraw = normalizedOdds;
              else h2hAway = normalizedOdds;
            } else if (market.key === 'totals' && outcome.name === 'Over' && outcome.point === 2.5) {
              over25 = normalizedOdds;
            }

            const [existingMarkets] = await conn.execute<RowDataPacket[]>(
              'SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1',
              [match.id, market.key, outcome.name]
            );

            if (existingMarkets.length > 0) {
              await conn.execute(
                'UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?',
                [normalizedOdds, existingMarkets[0].id]
              );
            } else {
              await conn.execute(
                'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
                [crypto.randomUUID(), match.id, market.key, outcome.name, normalizedOdds]
              );
            }
          }
        }

        // --- DYNAMIC ODDS SYNTHESIZATION (0 EXTRA CREDITS USED) ---
        const dc = OddsEngineService.synthesizeDoubleChance(h2hHome, h2hDraw, h2hAway, match.home_team, match.away_team);
        for (const item of dc) {
          await this.upsertSynthesizedLine(conn, match.id, 'double_chance', item.selection, item.odds);
        }

        const dnb = OddsEngineService.synthesizeDrawNoBet(h2hHome, h2hDraw, h2hAway, match.home_team, match.away_team);
        for (const item of dnb) {
          await this.upsertSynthesizedLine(conn, match.id, 'draw_no_bet', item.selection, item.odds);
        }

        const btts = OddsEngineService.synthesizeBothTeamsToScore(over25);
        for (const item of btts) {
          await this.upsertSynthesizedLine(conn, match.id, 'btts', item.selection, item.odds);
        }

        const scores = OddsEngineService.synthesizeCorrectScores(h2hHome, h2hDraw, h2hAway, over25);
        for (const item of scores) {
          await this.upsertSynthesizedLine(conn, match.id, 'correct_score', item.selection, item.odds);
        }

        await conn.commit();
      }

      this.setCacheTimestamp(sportKey);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // Mode B: Deep Event Harvest. Updates advanced prop lines with a 30-minute cache lock.
  static async syncEventOddsDeep(sportKey: string, eventId: string): Promise<void> {
    const THIRTY_MINUTES = 1800000;

    // Guard: Ignore manually created game keys, isolating those matches entirely to local configurations
    if (eventId.startsWith('MAN-')) return;

    if (this.isCacheFresh(eventId, THIRTY_MINUTES)) {
      console.log(`[Cache Guard Active] Advanced markets for match ${eventId} are fresh. Skipping API harvest.`);
      return;
    }

    const harvestedData = await OddsApiService.harvestEvent(sportKey, eventId);
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      await conn.execute(
        'UPDATE admin_game_markets SET active = 0 WHERE game_id = ?',
        [eventId]
      );

      const processedSelections = new Set<string>();

      for (const bookmaker of harvestedData.bookmakers) {
        for (const market of bookmaker.markets) {
          for (const outcome of market.outcomes) {
            const selectionKey = `${market.key}-${outcome.name}`;
            
            if (processedSelections.has(selectionKey)) continue;

            const normalizedOdds = this.parseOddsToDecimal(outcome.price);

            const [existingMarkets] = await conn.execute<RowDataPacket[]>(
              'SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1',
              [eventId, market.key, outcome.name]
            );

            if (existingMarkets.length > 0) {
              await conn.execute(
                'UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?',
                [normalizedOdds, existingMarkets[0].id]
              );
            } else {
              await conn.execute(
                'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
                [crypto.randomUUID(), eventId, market.key, outcome.name, normalizedOdds]
              );
            }

            processedSelections.add(selectionKey);
          }
        }
      }

      await conn.commit();
      this.setCacheTimestamp(eventId);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // Inner helper to upsert locally synthesized odds lines
  private static async upsertSynthesizedLine(conn: any, gameId: string, marketName: string, selection: string, odds: number): Promise<void> {
    const [existing] = await conn.execute(
      'SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1',
      [gameId, marketName, selection]
    );

    if (existing.length > 0) {
      await conn.execute(
        'UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?',
        [odds, existing[0].id]
      );
    } else {
      await conn.execute(
        'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
        [crypto.randomUUID(), gameId, marketName, selection, odds]
      );
    }
  }

  // Quota-Locked Sync: Runs background standard syncs strictly for the 4 famous leagues
  static async syncFamousLeaguesStandard(): Promise<string[]> {
    const syncedLeagues: string[] = [];

    for (const league of this.FAMOUS_LEAGUES) {
      try {
        await this.syncSportOddsStandard(league);
        syncedLeagues.push(league);
      } catch (error) {
        console.error(`[Standard Sync Error] Failed to process league: ${league}`, error);
      }
    }

    return syncedLeagues;
  }
}