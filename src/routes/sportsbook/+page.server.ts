import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';

export const load: PageServerLoad = async () => {
  const gamesRaw = await db.adminGame.findMany({
    where: {
      status: { in: ['UPCOMING', 'LIVE'] }
    },
    orderBy: { startTime: 'asc' },
    include: {
      markets: {
        where: { active: true }
      }
    }
  });

  // Serialize the nested Decimal objects into standard JS numbers
  const serializedGames = gamesRaw.map((game) => ({
    ...game,
    markets: game.markets.map((market) => ({
      ...market,
      odds: Number(market.odds) // Converts Prisma.Decimal to a serializable JavaScript Number
    }))
  }));

  return {
    games: serializedGames as unknown as GameWithMarkets[]
  };
};