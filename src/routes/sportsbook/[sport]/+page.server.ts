import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

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

  const [games] = await db.execute<RowDataPacket[]>(
    `SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status
     FROM admin_games
     WHERE sport = ? AND status IN ('UPCOMING', 'LIVE')
     ORDER BY start_time ASC`,
    [config.key]
  );

  if (games.length === 0) {
    return { games: [], sportTitle: config.title };
  }

  const gameIds = games.map((g) => g.id);
  const placeholders = gameIds.map(() => '?').join(',');

  // Retrieve and group active selection odds for the loaded fixtures
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
    sportTitle: config.title
  };
};