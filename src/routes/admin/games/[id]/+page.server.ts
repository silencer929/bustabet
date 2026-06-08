import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const gameRaw = await db.adminGame.findUnique({
    where: { id: params.id },
    include: { markets: true }
  });

  if (!gameRaw) {
    throw error(404, 'Fixture not found');
  }

  const serializedGame: GameWithMarkets = {
    ...gameRaw,
    markets: gameRaw.markets.map((market) => ({
      ...market,
      odds: Number(market.odds) as any
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
      await db.adminGameMarket.create({
        data: {
          gameId: params.id,
          marketName,
          selection,
          odds,
          active: true
        }
      });
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
      await db.adminGameMarket.update({
        where: { id: marketId },
        data: { odds }
      });
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
      await db.adminGameMarket.update({
        where: { id: marketId },
        data: { active: activeStr === 'true' }
      });
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
      await db.adminGameMarket.delete({
        where: { id: marketId }
      });
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to delete market option' });
    }
  }
};