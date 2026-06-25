import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

// Safe JSON parser to handle both local (Parsed Object) and deployed (Raw String) environments
function safeParseSelections(selectionsField: any): any[] {
  if (!selectionsField) return [];
  if (typeof selectionsField === 'object' && selectionsField !== null) {
    return selectionsField;
  }
  try {
    return JSON.parse(selectionsField);
  } catch (error) {
    console.error('[JSON Parsing Error] Failed to parse selections:', error);
    return [];
  }
}

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  // Changed to LEFT JOIN so that both Single and COMBO bets (where game_id/market_id are NULL) are returned
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT b.id, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt, b.type, b.selections,
            g.home_team as homeTeam, g.away_team as awayTeam,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     LEFT JOIN admin_games g ON b.game_id = g.id
     LEFT JOIN admin_game_markets m ON b.market_id = m.id
     WHERE b.profile_id = ?
     ORDER BY b.created_at DESC`,
    [locals.user.id]
  );

  const serializedBets = rows.map((b) => {
    const betType = b.type || 'SINGLE';

    return {
      id: b.id,
      stake: Number(b.stake),
      odds: Number(b.odds),
      potentialWin: Number(b.potentialWin),
      status: b.status,
      type: betType,
      createdAt: new Date(b.createdAt),
      // If it is a single bet, map standard fields; otherwise return null
      game: b.game_id ? { homeTeam: b.homeTeam, awayTeam: b.awayTeam } : null,
      market: b.market_id ? { selection: b.marketSelection, marketName: b.marketName } : null,
      // Safely parse the selections JSON for Combo bets across dev and production environments
      selections: betType === 'COMBO' ? safeParseSelections(b.selections) : []
    };
  });

  return {
    bets: serializedBets
  };
};