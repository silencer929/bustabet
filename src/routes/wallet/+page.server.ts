import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  // Retrieve player balance using the refactored SQL-driven wallet service
  const balance = await WalletService.getBalance(locals.user.id);

  // Retrieve the 5 most recent transaction history logs
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT id, profile_id as profileId, type, amount, currency, status, reference, created_at as createdAt 
     FROM transactions 
     WHERE profile_id = ? 
     ORDER BY created_at DESC 
     LIMIT 5`,
    [locals.user.id]
  );

  // Map database keys and serialize Decimal amounts safely to standard JS numbers
  const serializedTransactions = rows.map((tx) => ({
    id: tx.id,
    profileId: tx.profileId,
    type: tx.type,
    amount: Number(tx.amount), // Prevent non-POJO serialization exceptions
    currency: tx.currency,
    status: tx.status,
    reference: tx.reference,
    createdAt: new Date(tx.createdAt)
  }));

  return {
    balance,
    transactions: serializedTransactions
  };
};