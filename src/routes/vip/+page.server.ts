import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  // Retrieve player profile and active VIP benefits using a left SQL join
  const [profiles] = await db.execute<RowDataPacket[]>(
    `SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.referral_code as referralCode, p.referred_by as referredBy, p.vip_tier_id as vipTierId, p.created_at as createdAt,
            v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
     FROM profiles p
     LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
     WHERE p.id = ? LIMIT 1`,
    [locals.user.id]
  );

  if (profiles.length === 0) throw redirect(303, '/auth/login');
  const profile = profiles[0];

  // Aggregate total betting turnover from completed settled bets
  const [betAggregates] = await db.execute<RowDataPacket[]>(
    "SELECT SUM(stake) as totalTurnover FROM bets WHERE profile_id = ? AND status IN ('WON', 'LOST')",
    [locals.user.id]
  );

  const pointsAccumulated = Math.floor(Number(betAggregates[0].totalTurnover || 0));

  // Retrieve all configured loyalty level tiers in ascending order
  const [tiers] = await db.execute<RowDataPacket[]>(
    'SELECT id, name, min_points as minPoints, cashback_percent as cashbackPercent, bonus_percent as bonusPercent FROM vip_tiers ORDER BY min_points ASC'
  );

  const serializedTiers = tiers.map((tier) => ({
    id: tier.id,
    name: tier.name,
    minPoints: tier.minPoints,
    cashbackPercent: Number(tier.cashbackPercent), // Serialize decimal percentages
    bonusPercent: Number(tier.bonusPercent)
  }));

  // Identify the next locked VIP milestone tier in the ladder
  const nextTier = serializedTiers.find((tier) => tier.minPoints > pointsAccumulated) || null;

  return {
    profile: {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      fullName: profile.fullName,
      phone: profile.phone,
      country: profile.country,
      currency: profile.currency,
      referralCode: profile.referralCode,
      referredBy: profile.referredBy,
      vipTierId: profile.vipTierId,
      createdAt: new Date(profile.createdAt),
      vipTier: profile.vipTierId ? {
        id: profile.vipTierId,
        name: profile.vipTierName,
        minPoints: profile.vipTierMinPoints,
        cashbackPercent: Number(profile.vipTierCashback),
        bonusPercent: Number(profile.vipTierBonus)
      } : null
    },
    pointsAccumulated,
    vipTiers: serializedTiers,
    nextTier
  };
};