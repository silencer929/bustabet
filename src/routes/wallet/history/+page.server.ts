import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  // Retrieve complete transaction history list using native SQL
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT id, profile_id as profileId, type, amount, currency, status, reference, created_at as createdAt 
     FROM transactions 
     WHERE profile_id = ? 
     ORDER BY created_at DESC`,
    [locals.user.id]
  );

  // Map database keys and serialize Decimal transaction amounts to standard JS numbers
  const serializedTransactions = rows.map((tx) => ({
    id: tx.id,
    profileId: tx.profileId,
    type: tx.type,
    amount: Number(tx.amount), // Converts decimal numbers safely to prevent SvelteKit serialization errors
    currency: tx.currency,
    status: tx.status,
    reference: tx.reference,
    createdAt: new Date(tx.createdAt)
  }));

  return {
    transactions: serializedTransactions
  };
};