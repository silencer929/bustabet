import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading ticketing tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const tickets = await db.supportConversation.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      profile: {
        select: { username: true }
      }
    }
  });

  return { tickets };
};