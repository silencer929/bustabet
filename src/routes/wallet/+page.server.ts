import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  const balance = await WalletService.getBalance(locals.user.id);

  const transactionsRaw = await db.transaction.findMany({
    where: { profileId: locals.user.id },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  // Serialize custom Prisma Decimal objects to standard numbers before load dispatch
  const serializedTransactions = transactionsRaw.map((tx) => ({
    ...tx,
    amount: Number(tx.amount)
  }));

  return {
    balance,
    transactions: serializedTransactions
  };
};