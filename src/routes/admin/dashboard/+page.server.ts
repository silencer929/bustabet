import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
  // Query core player registrations count
  const totalUsers = await db.user.count();

  // Query pending wagers count
  const pendingBetsCount = await db.bet.count({
    where: { status: 'PENDING' }
  });

  // Aggregate pending wagers total turnover volume
  const pendingBetsTurnover = await db.bet.aggregate({
    where: { status: 'PENDING' },
    _sum: { stake: true }
  });

  // Aggregate pending withdrawals financial liabilities
  const pendingWithdrawalsAmount = await db.transaction.aggregate({
    where: { type: 'WITHDRAWAL', status: 'PENDING' },
    _sum: { amount: true }
  });

  // Query unresolved player support conversations count
  const openTicketsCount = await db.supportConversation.count({
    where: { status: 'OPEN' }
  });

  return {
    stats: {
      totalUsers,
      pendingBetsCount,
      pendingBetsTurnover: Number(pendingBetsTurnover._sum.stake || 0),
      pendingWithdrawalsAmount: Number(pendingWithdrawalsAmount._sum.amount || 0),
      openTicketsCount
    }
  };
};