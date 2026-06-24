import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { OddsSyncService } from '$lib/server/services/oddsSync.service';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ params, locals }) => {
  // Guard the route; redirect unauthenticated users to login
  // if (!locals.user) {
  //   throw redirect(303, '/auth/login');
  // }

  // 1. Retrieve the base match metadata to identify the sport key using SQL
  const [games] = await db.execute<RowDataPacket[]>(
    'SELECT id, sport FROM admin_games WHERE id = ? LIMIT 1',
    [params.id]
  );

  if (games.length === 0) {
    throw error(404, 'Fixture match not found');
  }

  const baseGame = games[0];

  try {
    // 2. Perform a Deep Harvest sync for this specific game (Protected by a 30-min cache lock)
    // await OddsSyncService.syncEventOddsDeep(baseGame.sport, params.id);
  } catch (syncError) {
    // Catch individual sync failures to allow players to read existing cached odds offline
    console.error('[On-Demand Deep Sync Error]:', syncError);
  }

  // 3. Query the updated match metadata from MySQL
  const [gameRaw] = await db.execute<RowDataPacket[]>(
    `SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status, home_score as homeScore, away_score as awayScore
     FROM admin_games 
     WHERE id = ? LIMIT 1`,
    [params.id]
  );

  // 4. Query all active selection lines registered to this match ID
  const [markets] = await db.execute<RowDataPacket[]>(
    `SELECT id, game_id as gameId, market_name as marketName, selection, odds, active 
     FROM admin_game_markets 
     WHERE game_id = ? AND active = 1`,
    [params.id]
  );

  const gameWithMarkets: GameWithMarkets = {
    id: gameRaw[0].id,
    sport: gameRaw[0].sport,
    league: gameRaw[0].league,
    homeTeam: gameRaw[0].homeTeam,
    awayTeam: gameRaw[0].awayTeam,
    startTime: new Date(gameRaw[0].startTime),
    status: gameRaw[0].status,
    homeScore: gameRaw[0].homeScore !== null ? Number(gameRaw[0].homeScore) : null,
    awayScore: gameRaw[0].awayScore !== null ? Number(gameRaw[0].awayScore) : null,
    markets: markets.map((m) => ({
      id: m.id,
      gameId: m.gameId,
      marketName: m.marketName,
      selection: m.selection,
      odds: Number(m.odds), // Safely serialize decimal pricing values
      active: Boolean(m.active)
    }))
  };

  return { game: gameWithMarkets };
};