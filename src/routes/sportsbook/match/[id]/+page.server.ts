import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ params }) => {
  const [games] = await db.execute<RowDataPacket[]>(
    `SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status
     FROM admin_games
     WHERE id = ? LIMIT 1`,
    [params.id]
  );

  if (games.length === 0) {
    throw error(404, 'Match fixture not found');
  }

  const game = games[0];

  // Retrieve all active market selections associated with this fixture ID
  const [markets] = await db.execute<RowDataPacket[]>(
    `SELECT id, game_id as gameId, market_name as marketName, selection, odds, active
     FROM admin_game_markets
     WHERE game_id = ? AND active = 1`,
    [params.id]
  );

  const gameWithMarkets: GameWithMarkets = {
    id: game.id,
    sport: game.sport,
    league: game.league,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    startTime: new Date(game.startTime),
    status: game.status,
    markets: markets.map((m) => ({
      id: m.id,
      gameId: m.gameId,
      marketName: m.marketName,
      selection: m.selection,
      odds: Number(m.odds), // Ensure odds serialize safely as standard numbers
      active: Boolean(m.active)
    }))
  };

  return {
    game: gameWithMarkets
  };
};