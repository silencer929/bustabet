import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';

export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get('search');

  let whereClause: any = {
    status: { in: ['UPCOMING', 'LIVE'] }
  };

  // If search query is present, filter matchups and leagues dynamically
  if (searchQuery) {
    whereClause = {
      ...whereClause,
      OR: [
        { homeTeam: { contains: searchQuery } },
        { awayTeam: { contains: searchQuery } },
        { league: { contains: searchQuery } }
      ]
    };
  }

  const gamesRaw = await db.adminGame.findMany({
    where: whereClause,
    orderBy: { startTime: 'asc' },
    include: {
      markets: {
        where: { active: true }
      }
    }
  });

  const serializedGames = gamesRaw.map((game) => ({
    ...game,
    markets: game.markets.map((market) => ({
      ...market,
      odds: Number(market.odds)
    }))
  }));

  return {
    games: serializedGames as unknown as GameWithMarkets[],
    searchQuery // Return back to page view to show results title
  };
};