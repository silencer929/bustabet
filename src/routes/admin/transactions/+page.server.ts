import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading financial tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const transactionsRaw = await db.transaction.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      profile: {
        select: { username: true }
      }
    }
  });

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
      const transaction = await db.transaction.update({
        where: { id },
        data: { status: 'COMPLETED' }
      });

      // Send a system notification alert to the player
      await db.notification.create({
        data: {
          profileId: transaction.profileId,
          title: 'Withdrawal Approved',
          message: `Your withdrawal of ${transaction.currency} ${Number(transaction.amount)} has been approved and processed.`,
          read: false
        }
      });

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
      const transaction = await db.transaction.update({
        where: { id },
        data: { status: 'FAILED' }
      });

      // Notify player of rejection (funds auto-restore as pending status resolves)
      await db.notification.create({
        data: {
          profileId: transaction.profileId,
          title: 'Withdrawal Rejected',
          message: `Your withdrawal of ${transaction.currency} ${Number(transaction.amount)} was rejected. locked funds returned.`,
          read: false
        }
      });

      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to reject withdrawal' });
    }
  }
};