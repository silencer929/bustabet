import type { LayoutServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';
import { db } from '$lib/server/db';
import { MINIMUM_STAKE_AMOUNT } from '$env/static/private'; // Import your new environment variable
import type { RowDataPacket } from 'mysql2';

export const load: LayoutServerLoad = async ({ locals }) => {
  const minDeposit = WalletService.MINIMUM_DEPOSIT;
  
  // Parse the minimum stake limit, defaulting to 10.00 if undefined
  const minStake = Number(MINIMUM_STAKE_AMOUNT || 10.00);

  if (locals.user) {
    const balance = await WalletService.getBalance(locals.user.id);

    const [notifications] = await db.execute<RowDataPacket[]>(
      `SELECT id, profile_id as profileId, title, message, \`read\`, created_at as createdAt
       FROM notifications 
       WHERE profile_id = ? AND \`read\` = 0 
       ORDER BY created_at DESC`,
      [locals.user.id]
    );

    return {
      user: locals.user,
      balance,
      notifications: notifications.map((n) => ({
        id: n.id,
        profileId: n.profileId,
        title: n.title,
        message: n.message,
        read: Boolean(n.read),
        createdAt: new Date(n.createdAt)
      })),
      minDeposit,
      minStake // Return globally to all pages
    };
  }

  return {
    user: null,
    balance: 0,
    notifications: [],
    minDeposit,
    minStake // Return globally to all pages
  };
};