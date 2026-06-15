import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async () => {
  const [usersRaw] = await db.execute<RowDataPacket[]>(
    'SELECT COUNT(*) AS totalUsers FROM users'
  );
  const totalUsers = usersRaw[0].totalUsers as number; 

  // const pendingBetsCount = await db.bet.count({
  //   where: { status: 'PENDING' }
  // });
  const [pendingBetsRaw] = await db.execute<RowDataPacket[]>(
    'SELECT COUNT(*) AS pendingBetsCount FROM bets WHERE status = ?',
    ['PENDING']
  );
  const pendingBetsCount = pendingBetsRaw[0].pendingBetsCount as number;  

  const [pendingBetsTurnoverRaw] = await db.execute<RowDataPacket[]>(
    'SELECT SUM(stake) AS pendingBetsTurnover FROM bets WHERE status = ?',
    ['PENDING']
  );
  const pendingBetsTurnover = pendingBetsTurnoverRaw[0].pendingBetsTurnover as number || 0;

  const [pendingWithdrawalsRaw] = await db.execute<RowDataPacket[]>(
    'SELECT SUM(amount) AS pendingWithdrawalsAmount FROM transactions WHERE type = ? AND status = ?',
    ['WITHDRAWAL', 'PENDING']
  );
  const pendingWithdrawalsAmount = pendingWithdrawalsRaw[0].pendingWithdrawalsAmount as number || 0;
  
  // Query the total count of open support tickets
  const [openTicketsRaw] = await db.execute<RowDataPacket[]>(
    'SELECT COUNT(*) AS openTicketsCount FROM support_conversations WHERE status = ?',
    ['OPEN']
  );
  const openTicketsCount = openTicketsRaw[0].openTicketsCount as number;

  // Query the total count of pending KYC identity documents awaiting audit
  const [pendingKycRaw] = await db.execute<RowDataPacket[]>(
    'SELECT COUNT(*) AS pendingKycCount FROM verification_documents WHERE status = ?',
    ['PENDING']
  );
  const pendingKycCount = pendingKycRaw[0].pendingKycCount as number;

  const [settledStakesRaw] = await db.execute<RowDataPacket[]>(
    'SELECT SUM(stake) AS totalTurnover FROM bets WHERE status IN (?, ?)',
    ['WON', 'LOST']
  );
  const settledStakes = { _sum: { stake: settledStakesRaw[0].totalTurnover as number || 0 } };

  const [settledPayoutsRaw] = await db.execute<RowDataPacket[]>(
    'SELECT SUM(potential_win) AS totalPayouts FROM bets WHERE status = ?',
    ['WON']
  );
  const settledPayouts = { _sum: { potentialWin: settledPayoutsRaw[0].totalPayouts as number || 0 } };

  const totalTurnover = Number(settledStakes._sum.stake || 0);
  const totalPayouts = Number(settledPayouts._sum.potentialWin || 0);
  const grossGamingRevenue = totalTurnover - totalPayouts;

  return {
    stats: {
      totalUsers,
      pendingBetsCount,
      pendingBetsTurnover: Number(pendingBetsTurnover || 0),
      pendingWithdrawalsAmount: Number(pendingWithdrawalsAmount || 0),
      openTicketsCount,
      pendingKycCount,
      totalTurnover,
      grossGamingRevenue
    }
  };
};