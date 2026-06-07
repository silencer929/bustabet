import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';

const SPORT_KEY_MAP: Record<string, { key: string; title: string }> = {
  'football': { key: 'soccer_english_premier_league', title: 'Premier League Football' },
  'nba': { key: 'basketball_nba', title: 'NBA Basketball' },
  'euroleague': { key: 'basketball_euroleague', title: 'Euroleague Basketball' },
  'nhl': { key: 'icehockey_nhl', title: 'NHL Hockey' },
  'nfl': { key: 'americanfootball_nfl', title: 'NFL Football' },
  'mlb': { key: 'baseball_mlb', title: 'MLB Baseball' },
  'mma': { key: 'mma', title: 'MMA' },
  'tennis-atp': { key: 'tennis_atp_singles', title: 'Tennis ATP' },
  'tennis-wta': { key: 'tennis_wta_singles', title: 'Tennis WTA' },
  'rugby-nrl': { key: 'rugby_nrl', title: 'Rugby NRL' },
  'afl': { key: 'afl', title: 'AFL Australian Rules' }
};

export const load: PageServerLoad = async ({ params }) => {
  const sportSlug = params.sport.toLowerCase();
  const config = SPORT_KEY_MAP[sportSlug];

  if (!config) {
    throw error(404, 'Sport category not found');
  }

  const gamesRaw = await db.adminGame.findMany({
    where: {
      sport: config.key,
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
    games: serializedGames as unknown as GameWithMarkets[],
    sportTitle: config.title
  };
};