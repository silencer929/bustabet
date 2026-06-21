import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get('search');
  const now = new Date();

  // Safeguard 1: Automatically transition any passed upcoming games to 'LIVE' status
  await db.execute(
    `UPDATE admin_games 
     SET status = 'LIVE' 
     WHERE start_time <= ? AND status = 'UPCOMING'`,
    [now]
  );

  // Safeguard 2: Automatically deactivate/suspend betting markets for any game that has started
  await db.execute(
    `UPDATE admin_game_markets m
     INNER JOIN admin_games g ON m.game_id = g.id
     SET m.active = 0
     WHERE g.start_time <= ? AND m.active = 1`,
    [now]
  );

  // Query only games that are LIVE/UPCOMING and started less than 4 hours ago
  let query = `
    SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status, home_score as homeScore, away_score as awayScore
    FROM admin_games
    WHERE status IN ('UPCOMING', 'LIVE')
      AND start_time >= DATE_SUB(NOW(), INTERVAL 4 HOUR)
  `;
  const params: any[] = [];

  if (searchQuery) {
    query += ` AND (home_team LIKE ? OR away_team LIKE ? OR league LIKE ?)`;
    const searchWildcard = `%${searchQuery}%`;
    params.push(searchWildcard, searchWildcard, searchWildcard);
  }

  query += ` ORDER BY start_time ASC`;

  const [games] = await db.execute<RowDataPacket[]>(query, params);

  if (games.length === 0) {
    return { games: [], searchQuery };
  }

  const gameIds = games.map((g) => g.id);
  const placeholders = gameIds.map(() => '?').join(',');

  const [markets] = await db.execute<RowDataPacket[]>(
    `SELECT id, game_id as gameId, market_name as marketName, selection, odds, active
     FROM admin_game_markets
     WHERE active = 1 AND game_id IN (${placeholders})`,
    gameIds
  );

  const gamesWithMarkets = games.map((game) => ({
    id: game.id,
    sport: game.sport,
    league: game.league,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    startTime: new Date(game.startTime),
    status: game.status,
    markets: markets
      .filter((m) => m.gameId === game.id)
      .map((m) => ({
        id: m.id,
        gameId: m.gameId,
        marketName: m.marketName,
        selection: m.selection,
        odds: Number(m.odds),
        active: Boolean(m.active)
      }))
  }));

  return {
    games: gamesWithMarkets as unknown as GameWithMarkets[],
    searchQuery
  };
};