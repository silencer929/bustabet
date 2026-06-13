import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import type { GameWithMarkets } from '$lib/types/game';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const [gamesRaw] = await db.execute<RowDataPacket[]>(
    'SELECT g.*, m.id AS marketId, m.marketName, m.selection, m.odds, m.active FROM games g LEFT JOIN adminGameMarkets m ON g.id = m.gameId WHERE g.id = ?',
    [params.id]
  );

  if (!gamesRaw.length) {
    throw error(404, 'Fixture not found');
  }

  const serializedGame: GameWithMarkets = {
    ...gamesRaw[0],
    markets: gamesRaw
      .filter((row) => row.marketId)
      .map((row) => ({
        id: row.marketId,
        marketName: row.marketName,
        selection: row.selection,
        odds: Number(row.odds),
        active: Boolean(row.active)
      }))
  };

  return { game: serializedGame };
};

export const actions: Actions = {
  // Adds a completely new market selection line (e.g., Draw No Bet options or Over/Under goals)
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
      await db.execute(
        'INSERT INTO adminGameMarkets (id, gameId, marketName, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
        [crypto.randomUUID(), params.id, marketName, selection, odds]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to create market option' });
    }
  },

  // Updates current odds value
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
        'UPDATE adminGameMarkets SET odds = ? WHERE id = ?',
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
        'UPDATE adminGameMarkets SET active = ? WHERE id = ?',
        [activeStr === 'true', marketId]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to toggle status' });
    }
  },

  // Removes a custom market selection row
  deleteMarketOption: async ({ request }) => {
    const formData = await request.formData();
    const marketId = formData.get('marketId') as string;

    try {
      await db.execute(
        'DELETE FROM adminGameMarkets WHERE id = ?',
        [marketId]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to delete market option' });
    }
  }
};