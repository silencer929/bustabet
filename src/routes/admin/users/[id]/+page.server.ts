import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { WalletService } from '$lib/server/services/wallet.service';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const profile = await db.profile.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { id: true, email: true, role: true } },
      vipTier: true
    }
  });

  if (!profile) throw error(404, 'User profile not found');

  const balance = await WalletService.getBalance(params.id);

  // Load user's transaction history
  const transactionsRaw = await db.transaction.findMany({
    where: { profileId: params.id },
    orderBy: { createdAt: 'desc' }
  });

  // Load user's wager history
  const betsRaw = await db.bet.findMany({
    where: { profileId: params.id },
    orderBy: { createdAt: 'desc' },
    include: { game: true, market: true }
  });

  const vipTiers = await db.vipTier.findMany({ orderBy: { minPoints: 'asc' } });

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
      await db.$transaction([
        db.user.update({
          where: { id: params.id },
          data: { role }
        }),
        db.profile.update({
          where: { id: params.id },
          data: { vipTierId }
        })
      ]);

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
      await db.user.update({
        where: { id: params.id },
        data: { passwordHash }
      });

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
      await db.transaction.create({
        data: {
          profileId: params.id,
          type,
          amount,
          currency: 'USD',
          status: 'COMPLETED',
          reference: `ADJ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        }
      });

      return { success: true, message: 'Balance adjustment processed successfully!' };
    } catch {
      return fail(500, { error: 'Failed to adjust ledger balance' });
    }
  }
};