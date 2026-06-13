import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  // Retrieve user's custom referral code
  const [profiles] = await db.execute<RowDataPacket[]>(
    'SELECT referral_code as referralCode FROM profiles WHERE id = ? LIMIT 1',
    [locals.user.id]
  );

  if (profiles.length === 0) throw redirect(303, '/auth/login');
  const profile = profiles[0];

  // Count the total number of players registered using this user's referral code
  const [counts] = await db.execute<RowDataPacket[]>(
    'SELECT COUNT(id) as refereesCount FROM profiles WHERE referred_by = ?',
    [locals.user.id]
  );

  const refereesCount = Number(counts[0].refereesCount || 0);

  // Retrieve complete referral commission logs using an inner join
  const [referrals] = await db.execute<RowDataPacket[]>(
    `SELECT r.id, r.referrer_id as referrerId, r.referee_id as refereeId, r.commission, r.status, r.created_at as createdAt,
            p.username as refereeUsername, p.created_at as refereeCreatedAt
     FROM referrals r
     INNER JOIN profiles p ON r.referee_id = p.id
     WHERE r.referrer_id = ?
     ORDER BY r.created_at DESC`,
    [locals.user.id]
  );

  // Map database keys and serialize Decimal commission amounts to standard numbers
  const serializedReferrals = referrals.map((ref) => ({
    id: ref.id,
    referrerId: ref.referrerId,
    refereeId: ref.refereeId,
    commission: Number(ref.commission), // Prevent SvelteKit serialization crashes
    status: ref.status,
    createdAt: new Date(ref.createdAt),
    referee: {
      username: ref.refereeUsername,
      createdAt: new Date(ref.refereeCreatedAt)
    }
  }));

  return {
    referralCode: profile.referralCode,
    refereesCount,
    referrals: serializedReferrals
  };
};