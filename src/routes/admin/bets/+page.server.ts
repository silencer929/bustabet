import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading wager tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Load all wagers, eager-joining profiles, games, and markets using SQL joins
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT b.id, b.profile_id as profileId, b.game_id as gameId, b.market_id as marketId, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt,
            p.username as profileUsername,
            g.home_team as gameHomeTeam, g.away_team as gameAwayTeam,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     INNER JOIN profiles p ON b.profile_id = p.id
     INNER JOIN admin_games g ON b.game_id = g.id
     INNER JOIN admin_game_markets m ON b.market_id = m.id
     ORDER BY b.created_at DESC`
  );

  // Map database keys and serialize Decimals to match frontend types perfectly
  const serializedBets = rows.map((bet) => ({
    id: bet.id,
    profileId: bet.profileId,
    gameId: bet.gameId,
    marketId: bet.marketId,
    stake: Number(bet.stake),
    odds: Number(bet.odds),
    potentialWin: Number(bet.potentialWin),
    status: bet.status,
    createdAt: new Date(bet.createdAt),
    profile: {
      username: bet.profileUsername
    },
    game: {
      id: bet.gameId,
      homeTeam: bet.gameHomeTeam,
      awayTeam: bet.gameAwayTeam
    },
    market: {
      id: bet.marketId,
      selection: bet.marketSelection,
      marketName: bet.marketName
    }
  }));

  return {
    bets: serializedBets
  };
};

export const actions: Actions = {
  // Manually settles a pending bet as WON and processes the payout via SQL transactions
  settleWon: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // Retrieve the target wager details
      const [bets] = await conn.execute<RowDataPacket[]>(
        `SELECT b.profile_id, b.potential_win, b.status, g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.id = ? LIMIT 1`,
        [id]
      );

      if (bets.length === 0 || bets[0].status !== 'PENDING') {
        await conn.rollback();
        return fail(400, { error: 'Wager is not pending or does not exist' });
      }

      const bet = bets[0];

      // Update bet status to WON
      await conn.execute(
        'UPDATE bets SET status = "WON" WHERE id = ?',
        [id]
      );

      // Log completed payout ledger entry
      await conn.execute(
        `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`,
        [crypto.randomUUID(), bet.profile_id, bet.potential_win, `MAN-PAY-${id}`]
      );

      // Alert the player
      await conn.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          bet.profile_id,
          'Bet Manually Settle: Won',
          `Your wager on ${bet.home_team} vs ${bet.away_team} was resolved as won. Payout processed.`
        ]
      );

      await conn.commit();
      return { success: true };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  // Manually settles a pending bet as LOST
  settleLost: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [bets] = await conn.execute<RowDataPacket[]>(
        `SELECT b.profile_id, b.status, g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.id = ? LIMIT 1`,
        [id]
      );

      if (bets.length === 0 || bets[0].status !== 'PENDING') {
        await conn.rollback();
        return fail(400, { error: 'Wager is not pending or does not exist' });
      }

      const bet = bets[0];

      // Update bet status to LOST
      await conn.execute(
        'UPDATE bets SET status = "LOST" WHERE id = ?',
        [id]
      );

      // Alert the player
      await conn.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          bet.profile_id,
          'Bet Manually Settle: Lost',
          `Your wager on ${bet.home_team} vs ${bet.away_team} was resolved as lost.`
        ]
      );

      await conn.commit();
      return { success: true };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  // Voids a bet and returns the initial stake back to the user's wallet
  voidBet: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [bets] = await conn.execute<RowDataPacket[]>(
        `SELECT b.profile_id, b.stake, b.status, g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.id = ? LIMIT 1`,
        [id]
      );

      if (bets.length === 0 || bets[0].status !== 'PENDING') {
        await conn.rollback();
        return fail(400, { error: 'Wager is not pending or does not exist' });
      }

      const bet = bets[0];

      // Update bet status to VOIDED
      await conn.execute(
        'UPDATE bets SET status = "VOIDED" WHERE id = ?',
        [id]
      );

      // Refund the initial stake by creating a deposit transaction ledger
      await conn.execute(
        `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, 'DEPOSIT', ?, 'USD', 'COMPLETED', ?)`,
        [crypto.randomUUID(), bet.profile_id, bet.stake, `VOID-REF-${id}`]
      );

      // Alert the player
      await conn.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          bet.profile_id,
          'Bet Voided & Refunded',
          `Your wager on ${bet.home_team} vs ${bet.away_team} was voided. Your stake of ${Number(bet.stake)} has been refunded.`
        ]
      );

      await conn.commit();
      return { success: true };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
};