import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import { WalletService } from '$lib/server/services/wallet.service';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const [profiles] = await db.execute<RowDataPacket[]>(
    'SELECT p.*, u.email, u.role, vt.name AS vipTierName FROM profiles p JOIN users u ON p.userId = u.id LEFT JOIN vipTiers vt ON p.vipTierId = vt.id WHERE p.id = ?',
    [params.id]
  );
  const profile = profiles[0] as (RowDataPacket & { email: string; role: string; vipTierName: string | null }) | undefined;
  if (!profile) throw error(404, 'User profile not found');

  const balance = await WalletService.getBalance(params.id);

  // Load user's transaction history
  const [transactionsRaw] = await db.execute<RowDataPacket[]>(
    'SELECT * FROM transactions WHERE profileId = ? ORDER BY createdAt DESC',
    [params.id]
  );

  // Load user's wager history
  const [betsRaw] = await db.execute<RowDataPacket[]>(
    'SELECT * FROM bets WHERE profileId = ? ORDER BY createdAt DESC',
    [params.id]
  );

  const [vipTiers] = await db.execute<RowDataPacket[]>(
    'SELECT id, name, minPoints FROM vipTiers ORDER BY minPoints ASC'
  );

  // Serialize custom database Decimal values
  return {
    targetProfile: profile,
    balance,
    vipTiers,
    transactions: transactionsRaw.map(tx => ({ ...tx, amount: Number(tx.amount) })),
    bets: betsRaw.map(b => ({ ...b, stake: Number(b.stake), odds: Number(b.odds), potentialWin: Number(b.potentialWin) }))
  };
};

export const actions: Actions = {
  // Updates user roles (permissions) and loyalty VIP levels
  updateProfile: async ({ request, params }) => {
    const formData = await request.formData();
    const role = formData.get('role') as string;
    const vipTierId = formData.get('vipTierId') as string;

    try {
      await db.execute(
        'UPDATE users u JOIN profiles p ON u.id = p.userId SET u.role = ?, p.vipTierId = ? WHERE p.id = ?',
        [role, vipTierId || null, params.id]
      );

      return { success: true, message: 'Account status updated successfully' };
    } catch {
      return fail(500, { error: 'Failed to update user status' });
    }
  },

  // Overwrites user password hash directly
  resetPassword: async ({ request, params }) => {
    const formData = await request.formData();
    const newPassword = formData.get('newPassword') as string;

    if (!newPassword || newPassword.length < 6) {
      return fail(400, { error: 'Password must be at least 6 characters long' });
    }

    try {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await db.execute(
        'UPDATE users SET password_hash = ? WHERE id = ?',
        [passwordHash, params.id]
      );

      return { success: true, message: 'Password reset successfully!' };
    } catch {
      return fail(500, { error: 'Failed to reset password' });
    }
  },

  // Performs direct credits or debits directly to the player's wallet ledger
  manualAdjustment: async ({ request, params }) => {
    const formData = await request.formData();
    const type = formData.get('type') as 'DEPOSIT' | 'WITHDRAWAL';
    const amountStr = formData.get('amount') as string;

    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      return fail(400, { error: 'Please enter a valid amount' });
    }

    try {
      await db.execute(
        'INSERT INTO transactions (profileId, type, amount, currency, status, reference) VALUES (?, ?, ?, ?, ?, ?)',
        [params.id, type, amount, 'USD', 'COMPLETED', `ADJ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`]
      );

      return { success: true, message: 'Balance adjustment processed successfully!' };
    } catch {
      return fail(500, { error: 'Failed to adjust ledger balance' });
    }
  }
};