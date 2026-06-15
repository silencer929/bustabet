import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading financial tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Load all system transactions, eager-joining profiles using standard SQL
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT t.id, t.profile_id as profileId, t.type, t.amount, t.currency, t.status, t.reference, t.created_at as createdAt,
            p.username
     FROM transactions t
     INNER JOIN profiles p ON t.profile_id = p.id
     ORDER BY t.created_at DESC`
  );

  // Convert decimal values to standard numbers for SvelteKit serialization
  const serializedTransactions = rows.map((tx) => ({
    id: tx.id,
    profileId: tx.profileId,
    type: tx.type,
    amount: Number(tx.amount), // Prevent non-POJO serialization exceptions
    currency: tx.currency,
    status: tx.status,
    reference: tx.reference,
    createdAt: new Date(tx.createdAt),
    profile: {
      username: tx.username
    }
  }));

  return {
    transactions: serializedTransactions
  };
};

export const actions: Actions = {
  // Approves a pending withdrawal and updates status to COMPLETED inside a secure SQL transaction
  approve: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [transactions] = await conn.execute<RowDataPacket[]>(
        'SELECT profile_id, currency, amount FROM transactions WHERE id = ? AND status = "PENDING" LIMIT 1',
        [id]
      );

      if (transactions.length === 0) {
        await conn.rollback();
        return fail(400, { error: 'Transaction is not pending or does not exist' });
      }

      const tx = transactions[0];

      await conn.execute(
        'UPDATE transactions SET status = "COMPLETED" WHERE id = ?',
        [id]
      );

      // Log a confirmation system notification alert to the player
      await conn.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          tx.profile_id,
          'Withdrawal Approved',
          `Your withdrawal of ${tx.currency} ${Number(tx.amount)} has been approved and processed.`
        ]
      );

      await conn.commit();
      return { success: true };
    } catch {
      await conn.rollback();
      return fail(500, { error: 'Failed to approve withdrawal' });
    } finally {
      conn.release();
    }
  },

  // Rejects a pending withdrawal and updates status to FAILED, releasing the locked balance
  reject: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [transactions] = await conn.execute<RowDataPacket[]>(
        'SELECT profile_id, currency, amount FROM transactions WHERE id = ? AND status = "PENDING" LIMIT 1',
        [id]
      );

      if (transactions.length === 0) {
        await conn.rollback();
        return fail(400, { error: 'Transaction is not pending or does not exist' });
      }

      const tx = transactions[0];

      await conn.execute(
        'UPDATE transactions SET status = "FAILED" WHERE id = ?',
        [id]
      );

      // Log a rejection notification alert to the player
      await conn.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          tx.profile_id,
          'Withdrawal Rejected',
          `Your withdrawal of ${tx.currency} ${Number(tx.amount)} was rejected. Locked funds have been returned to your wallet balance.`
        ]
      );

      await conn.commit();
      return { success: true };
    } catch {
      await conn.rollback();
      return fail(500, { error: 'Failed to reject withdrawal' });
    } finally {
      conn.release();
    }
  }
};