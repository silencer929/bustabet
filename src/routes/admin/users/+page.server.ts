import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import type { FullProfileDetails } from '$lib/types/profile';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading user directories
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Load all profiles, joining roles and VIP levels using standard SQL
  const [profiles] = await db.execute<RowDataPacket[]>(
    `SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.vip_tier_id as vipTierId, p.created_at as createdAt,
            u.role,
            v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
     FROM profiles p
     INNER JOIN users u ON p.id = u.id
     LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
     ORDER BY p.created_at DESC`
  );

  const mappedProfiles = profiles.map((p) => ({
    id: p.id,
    email: p.email,
    username: p.username,
    fullName: p.fullName,
    phone: p.phone,
    country: p.country,
    currency: p.currency,
    vipTierId: p.vipTierId,
    createdAt: new Date(p.createdAt),
    user: {
      id: p.id,
      email: p.email,
      role: p.role
    },
    vipTier: p.vipTierId ? {
      id: p.vipTierId,
      name: p.vipTierName,
      minPoints: p.vipTierMinPoints,
      cashbackPercent: Number(p.vipTierCashback),
      bonusPercent: Number(p.vipTierBonus)
    } : null
  }));

  return {
    profiles: mappedProfiles as unknown as FullProfileDetails[]
  };
};