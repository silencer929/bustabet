import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { FullProfileDetails } from '$lib/types/profile';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading user directories
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const profiles = await db.profile.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true
        }
      },
      vipTier: true
    }
  });

  return {
    profiles: profiles as unknown as FullProfileDetails[]
  };
};