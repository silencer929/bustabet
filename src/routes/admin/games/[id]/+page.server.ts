import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ params, locals }) => {
  // Double-verify admin roles before loading detailed fixture managers
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Load single match metadata using SQL
  const [games] = await db.execute<RowDataPacket[]>(
    `SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status 
     FROM admin_games 
     WHERE id = ? LIMIT 1`,
    [params.id]
  );

  if (games.length === 0) {
    throw error(404, 'Fixture match not found');
  }

  const game = games[0];

  // Retrieve all configured market selection lines associated with this match ID
  const [markets] = await db.execute<RowDataPacket[]>(
    `SELECT id, game_id as gameId, market_name as marketName, selection, odds, active 
     FROM admin_game_markets 
     WHERE game_id = ?`,
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
      odds: Number(m.odds), // Safely serialize decimal pricing values
      active: Boolean(m.active)
    }))
  };

  return { game: gameWithMarkets };
};

export const actions: Actions = {
  // Manually adds a completely new market selection line (e.g., Draw No Bet or Over/Under goals)
  addMarketOption: async ({ request, params }) => {
    const formData = await request.formData();
    const marketName = formData.get('marketName') as string;
    const selection = formData.get('selection') as string;
    const oddsStr = formData.get('odds') as string;

    const odds = parseFloat(oddsStr);
    if (!marketName || !selection || isNaN(odds) || odds <= 1.0) {
      return fail(400, { error: 'All fields must be valid. Odds must exceed 1.00.' });
    }

    try {
      const marketId = crypto.randomUUID();
      await db.execute(
        `INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) 
         VALUES (?, ?, ?, ?, ?, 1)`,
        [marketId, params.id, marketName, selection, odds]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to create custom market selection line' });
    }
  },

  // Overrides the decimal price of an existing selection line
  updateOdds: async ({ request }) => {
    const formData = await request.formData();
    const marketId = formData.get('marketId') as string;
    const oddsStr = formData.get('odds') as string;

    const odds = parseFloat(oddsStr);
    if (isNaN(odds) || odds <= 1.0) {
      return fail(400, { error: 'Odds must exceed 1.00' });
    }

    try {
      await db.execute(
        'UPDATE admin_game_markets SET odds = ? WHERE id = ?',
        [odds, marketId]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to update odds value' });
    }
  },

  // Suspends or activates market availability
  toggleMarket: async ({ request }) => {
    const formData = await request.formData();
    const marketId = formData.get('marketId') as string;
    const activeStr = formData.get('active') as string;

    try {
      await db.execute(
        'UPDATE admin_game_markets SET active = ? WHERE id = ?',
        [activeStr === 'true' ? 1 : 0, marketId]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to toggle market status' });
    }
  },

  // Removes a custom market selection row
  deleteMarketOption: async ({ request }) => {
    const formData = await request.formData();
    const marketId = formData.get('marketId') as string;

    try {
      await db.execute(
        'DELETE FROM admin_game_markets WHERE id = ?',
        [marketId]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to delete market option' });
    }
  }
};