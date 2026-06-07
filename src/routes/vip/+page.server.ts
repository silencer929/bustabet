import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  const profile = await db.profile.findUnique({
    where: { id: locals.user.id },
    include: { vipTier: true }
  });

  if (!profile) throw redirect(303, '/auth/login');

  // Aggregate player turnover volume to calculate accumulated points (1 KES/USD wagered = 1 point)
  const betAggregates = await db.bet.aggregate({
    where: {
      profileId: locals.user.id,
      status: { in: ['WON', 'LOST'] }
    },
    _sum: { stake: true }
  });

  const pointsAccumulated = Math.floor(Number(betAggregates._sum.stake || 0));

  const vipTiersRaw = await db.vipTier.findMany({
    orderBy: { minPoints: 'asc' }
  });

  // Serialize Decimal percentages inside the VIP tier objects
  const serializedTiers = vipTiersRaw.map((tier) => ({
    ...tier,
    cashbackPercent: Number(tier.cashbackPercent),
    bonusPercent: Number(tier.bonusPercent)
  }));

  // Identify the next locked VIP milestone tier in the ladder
  const nextTier = serializedTiers.find((tier) => tier.minPoints > pointsAccumulated) || null;

  return {
    profile: {
      ...profile,
      vipTier: profile.vipTier ? {
        ...profile.vipTier,
        cashbackPercent: Number(profile.vipTier.cashbackPercent),
        bonusPercent: Number(profile.vipTier.bonusPercent)
      } : null
    },
    pointsAccumulated,
    vipTiers: serializedTiers,
    nextTier
  };
};