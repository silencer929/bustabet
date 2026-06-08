import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
  const totalUsers = await db.user.count();

  const pendingBetsCount = await db.bet.count({
    where: { status: 'PENDING' }
  });

  const pendingBetsTurnover = await db.bet.aggregate({
    where: { status: 'PENDING' },
    _sum: { stake: true }
  });

  const pendingWithdrawalsAmount = await db.transaction.aggregate({
    where: { type: 'WITHDRAWAL', status: 'PENDING' },
    _sum: { amount: true }
  });

  const openTicketsCount = await db.supportConversation.count({
    where: { status: 'OPEN' }
  });

  // Query the total count of pending KYC identity documents awaiting audit
  const pendingKycCount = await db.verificationDoc.count({
    where: { status: 'PENDING' }
  });

  // Aggregate settled bets metrics to calculate GGR (Turnover - Payouts)
  const settledStakes = await db.bet.aggregate({
    where: { status: { in: ['WON', 'LOST'] } },
    _sum: { stake: true }
  });

  const settledPayouts = await db.bet.aggregate({
    where: { status: 'WON' },
    _sum: { potentialWin: true }
  });

  const totalTurnover = Number(settledStakes._sum.stake || 0);
  const totalPayouts = Number(settledPayouts._sum.potentialWin || 0);
  const grossGamingRevenue = totalTurnover - totalPayouts;

  return {
    stats: {
      totalUsers,
      pendingBetsCount,
      pendingBetsTurnover: Number(pendingBetsTurnover._sum.stake || 0),
      pendingWithdrawalsAmount: Number(pendingWithdrawalsAmount._sum.amount || 0),
      openTicketsCount,
      pendingKycCount,
      totalTurnover,
      grossGamingRevenue
    }
  };
};