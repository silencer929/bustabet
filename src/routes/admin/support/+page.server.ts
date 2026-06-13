import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading ticketing tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const [tickets] = await db.execute<RowDataPacket[]>(
    'SELECT * FROM support_conversations ORDER BY created_at DESC'
  );

  return { tickets };
};