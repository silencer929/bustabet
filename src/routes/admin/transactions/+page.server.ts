import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading financial tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const [transactionsRaw] = await db.execute<RowDataPacket[]>(
    'SELECT t.*, p.username FROM transactions t JOIN profiles p ON t.profileId = p.id ORDER BY t.createdAt DESC'
  );

  // Convert decimal values to numbers for SvelteKit serialization
  const serializedTransactions = transactionsRaw.map((tx) => ({
    ...tx,
    amount: Number(tx.amount)
  }));

  return {
    transactions: serializedTransactions
  };
};

export const actions: Actions = {
  // Approves a pending withdrawal and updates status to COMPLETED
  approve: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      const [transaction] = await db.execute<RowDataPacket[]>(
        'UPDATE transactions SET status = ? WHERE id = ? AND type = ? AND status = ?',
        ['COMPLETED', id, 'WITHDRAWAL', 'PENDING']
      );

      // Send a system notification alert to the player
      await  db.execute (
        'INSERT INTO notifications (profileId, title, message, read) VALUES (?, ?, ?, ?)',
        [(transaction as RowDataPacket).profileId, 'Withdrawal Approved', `Your withdrawal of ${Number((transaction as RowDataPacket).amount)} has been approved and processed.`, false]
      );

      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to approve withdrawal' });
    }
  },

  // Rejects a pending withdrawal and refunds the amount
  reject: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      const [transaction] = await db.execute<RowDataPacket[]>(
        'UPDATE transactions SET status = ? WHERE id = ? AND type = ? AND status = ?',
        ['FAILED', id, 'WITHDRAWAL', 'PENDING']
      );

      // Notify player of rejection (funds auto-restore as pending status resolves)
      await  db.execute (
        'INSERT INTO notifications (profileId, title, message, read) VALUES (?, ?, ?, ?)',
        [(transaction as RowDataPacket).profileId, 'Withdrawal Rejected', `Your withdrawal of ${Number((transaction as RowDataPacket).amount)} was rejected. locked funds returned.`, false]
      );

      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to reject withdrawal' });
    }
  }
};