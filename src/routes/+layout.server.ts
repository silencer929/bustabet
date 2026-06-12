import type { LayoutServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (locals.user) {
    const balance = await WalletService.getBalance(locals.user.id);

    // Query unread player notifications using standard SQL queries
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
      }))
    };
  }

  return {
    user: null,
    balance: 0,
    notifications: []
  };
};