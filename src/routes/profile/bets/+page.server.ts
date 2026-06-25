import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

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

  // Corrected: Selecting home_score, away_score, and status for single bets
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT b.id, b.profile_id, b.game_id as gameId, b.market_id as marketId, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt, b.type, b.selections,
            g.home_team as homeTeam, g.away_team as awayTeam, g.status as gameStatus, g.home_score as homeScore, g.away_score as awayScore,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     LEFT JOIN admin_games g ON b.game_id = g.id
     LEFT JOIN admin_game_markets m ON b.market_id = m.id
     WHERE b.profile_id = ?
     ORDER BY b.created_at DESC`,
    [locals.user.id]
  );

  const serializedBets = [];

  for (const b of rows) {
    const betType = b.type || 'SINGLE';
    let selectionsList: any[] = [];

    if (betType === 'COMBO' && b.selections) {
      const parsed = safeParseSelections(b.selections);
      const marketIds = parsed.map((p) => p.marketId);

      if (marketIds.length > 0) {
        const placeholders = marketIds.map(() => '?').join(',');

        // Corrected: Selecting home_score, away_score, and status during the dynamic lookup
        const [details] = await db.execute<RowDataPacket[]>(
          `SELECT m.id as marketId, m.selection,
                  g.home_team as homeTeam, g.away_team as awayTeam, g.status as gameStatus, g.home_score as homeScore, g.away_score as awayScore
           FROM admin_game_markets m
           INNER JOIN admin_games g ON m.game_id = g.id
           WHERE m.id IN (${placeholders})`,
          marketIds
        );

        selectionsList = parsed.map((p) => {
          const matchDetail = details.find((d) => d.marketId === p.marketId);
          return {
            marketId: p.marketId,
            odds: p.odds,
            selection: matchDetail ? matchDetail.selection : 'Unknown Selection',
            homeTeam: matchDetail ? matchDetail.homeTeam : 'Unknown Team',
            awayTeam: matchDetail ? matchDetail.awayTeam : 'Unknown Team',
            gameStatus: matchDetail ? matchDetail.gameStatus : 'UPCOMING',
            homeScore: matchDetail ? matchDetail.homeScore : 0,
            awayScore: matchDetail ? matchDetail.awayScore : 0
          };
        });
      }
    }

    serializedBets.push({
      id: b.id,
      stake: Number(b.stake),
      odds: Number(b.odds),
      potentialWin: Number(b.potentialWin),
      status: b.status,
      type: betType,
      createdAt: new Date(b.createdAt),
      game: b.gameId ? { 
        homeTeam: b.homeTeam, 
        awayTeam: b.awayTeam,
        gameStatus: b.gameStatus,
        homeScore: b.homeScore,
        awayScore: b.awayScore
      } : null,
      market: b.marketId ? { selection: b.marketSelection, marketName: b.marketName } : null,
      selections: selectionsList
    });
  }

  return {
    bets: serializedBets
  };
};