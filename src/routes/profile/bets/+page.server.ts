import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  // Load all wagers registered to this player profile using standard SQL joins
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT b.id, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt,
            g.home_team as homeTeam, g.away_team as awayTeam,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     INNER JOIN admin_games g ON b.game_id = g.id
     INNER JOIN admin_game_markets m ON b.market_id = m.id
     WHERE b.profile_id = ?
     ORDER BY b.created_at DESC`,
    [locals.user.id]
  );

  const serializedBets = rows.map((b) => ({
    id: b.id,
    stake: Number(b.stake),
    odds: Number(b.odds),
    potentialWin: Number(b.potentialWin),
    status: b.status,
    createdAt: new Date(b.createdAt),
    game: { homeTeam: b.homeTeam, awayTeam: b.awayTeam },
    market: { selection: b.marketSelection, marketName: b.marketName }
  }));

  return {
    bets: serializedBets
  };
};