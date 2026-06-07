import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  const profile = await db.profile.findUnique({
    where: { id: locals.user.id }
  });

  if (!profile) throw redirect(303, '/auth/login');

  // Count the total number of players registered using this user's referral code
  const refereesCount = await db.profile.count({
    where: { referredBy: locals.user.id }
  });

  const referralsRaw = await db.referral.findMany({
    where: { referrerId: locals.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      referee: {
        select: {
          username: true,
          createdAt: true
        }
      }
    }
  });

  // Serialize custom Prisma Decimal objects to standard numbers before load dispatch
  const serializedReferrals = referralsRaw.map((ref) => ({
    ...ref,
    commission: Number(ref.commission)
  }));

  return {
    referralCode: profile.referralCode,
    refereesCount,
    referrals: serializedReferrals
  };
};