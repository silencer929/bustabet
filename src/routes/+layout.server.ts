import type { LayoutServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';
import { db } from '$lib/server/db';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (locals.user) {
    const balance = await WalletService.getBalance(locals.user.id);

    // Fetch unread notifications belonging to the logged-in player
    const notifications = await db.notification.findMany({
      where: { profileId: locals.user.id, read: false },
      orderBy: { createdAt: 'desc' }
    });
    
    return {
      user: locals.user,
      balance,
      notifications
    };
  }

  return {
    user: null,
    balance: 0,
    notifications: []
  };
};