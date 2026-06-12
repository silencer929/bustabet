import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get('search');

  let query = `
    SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status
    FROM admin_games
    WHERE status IN ('UPCOMING', 'LIVE')
  `;
  const params: any[] = [];

  // Implement database-level SQL search parameter constraints if queried
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

  // Retrieve and group active selection odds for the loaded fixtures
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
        odds: Number(m.odds), // Ensure odds serialize safely as standard numbers
        active: Boolean(m.active)
      }))
  }));

  return {
    games: gamesWithMarkets as unknown as GameWithMarkets[],
    searchQuery
  };
};