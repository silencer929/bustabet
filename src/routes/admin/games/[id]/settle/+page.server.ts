import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ params, locals }) => {
  // Double-verify admin roles before loading settlement portals
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const [games] = await db.execute<RowDataPacket[]>(
    `SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status 
     FROM admin_games 
     WHERE id = ? LIMIT 1`,
    [params.id]
  );

  if (games.length === 0) {
    throw error(404, 'Match fixture not found');
  }

  const game = games[0];

  // Retrieve all configured market selection lines associated with this match ID
  const [markets] = await db.execute<RowDataPacket[]>(
    `SELECT id, game_id as gameId, market_name as marketName, selection, odds, active 
     FROM admin_game_markets 
     WHERE game_id = ?`,
    [params.id]
  );

  const gameWithMarkets: GameWithMarkets = {
    id: game.id,
    sport: game.sport,
    league: game.league,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    startTime: new Date(game.startTime),
    status: game.status,
    markets: markets.map((m) => ({
      id: m.id,
      gameId: m.gameId,
      marketName: m.marketName,
      selection: m.selection,
      odds: Number(m.odds),
      active: Boolean(m.active)
    }))
  };

  return { game: gameWithMarkets };
};

export const actions: Actions = {
  // Settle all wagers for a specific market category and processes payouts atomically
  settleMarketManually: async ({ request, params, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const marketName = formData.get('marketName') as string;
    const winningSelection = formData.get('winningSelection') as string;

    if (!marketName || !winningSelection) {
      return fail(400, { error: 'Please select both the market and the winning outcome' });
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [pendingBets] = await conn.execute<RowDataPacket[]>(
        `SELECT b.id, b.profile_id, b.potential_win, b.stake, m.selection, m.id as market_id,
                g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_game_markets m ON b.market_id = m.id
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.game_id = ? AND m.market_name = ? AND b.status = 'PENDING'`,
        [params.id, marketName]
      );

      for (const bet of pendingBets) {
        const isWon = bet.selection === winningSelection;

        if (isWon) {
          await conn.execute('UPDATE bets SET status = "WON" WHERE id = ?', [bet.id]);

          await conn.execute(
            `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`,
            [crypto.randomUUID(), bet.profile_id, bet.potential_win, `MAN-PAY-${bet.id}`]
          );

          await conn.execute(
            `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
             VALUES (?, ?, ?, ?, 0)`,
            [
              crypto.randomUUID(),
              bet.profile_id,
              'Wager Settled: Won!',
              `Your wager on ${bet.home_team} vs ${bet.away_team} (${bet.selection}) was resolved as won. Payout processed.`
            ]
          );
        } else {
          await conn.execute('UPDATE bets SET status = "LOST" WHERE id = ?', [bet.id]);

          await conn.execute(
            `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
             VALUES (?, ?, ?, ?, 0)`,
            [
              crypto.randomUUID(),
              bet.profile_id,
              'Wager Settled',
              `Your wager on ${bet.home_team} vs ${bet.away_team} (${bet.selection}) was resolved as lost.`
            ]
          );
        }
      }

      await conn.execute(
        'UPDATE admin_games SET status = "COMPLETED" WHERE id = ?',
        [params.id]
      );

      await conn.execute(
        'UPDATE admin_game_markets SET active = 0 WHERE game_id = ?',
        [params.id]
      );

      await conn.commit();
      return { success: true, message: 'Market settled and payouts processed successfully!' };
    } catch (error: any) {
      await conn.rollback();
      return fail(500, { error: error.message || 'Failed to settle market' });
    } finally {
      conn.release();
    }
  }
};