import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';

export const load: PageServerLoad = async ({ params }) => {
  const gameRaw = await db.adminGame.findUnique({
    where: { id: params.id },
    include: {
      markets: {
        where: { active: true }
      }
    }
  });

  if (!gameRaw) {
    throw error(404, 'Match fixture not found');
  }

  // Serialize the decimal odds values into JavaScript numbers
  const serializedGame: GameWithMarkets = {
    ...gameRaw,
    markets: gameRaw.markets.map((market) => ({
      ...market,
      odds: Number(market.odds) as any
    }))
  };

  return {
    game: serializedGame
  };
};