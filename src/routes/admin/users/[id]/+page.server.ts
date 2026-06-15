import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { WalletService } from '$lib/server/services/wallet.service';
import bcrypt from 'bcryptjs';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Retrieve player profile and credentials using an inner SQL join
  const [profiles] = await db.execute<RowDataPacket[]>(
    `SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.vip_tier_id as vipTierId, p.created_at as createdAt,
            u.role,
            v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
     FROM profiles p
     INNER JOIN users u ON p.id = u.id
     LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
     WHERE p.id = ? LIMIT 1`,
    [params.id]
  );

  if (profiles.length === 0) {
    throw error(404, 'User profile not found');
  }

  const p = profiles[0];
  const balance = await WalletService.getBalance(params.id);

  // Retrieve complete transaction history list belonging to this user
  const [transactions] = await db.execute<RowDataPacket[]>(
    `SELECT id, profile_id as profileId, type, amount, currency, status, reference, created_at as createdAt 
     FROM transactions 
     WHERE profile_id = ? 
     ORDER BY created_at DESC`,
    [params.id]
  );

  // Retrieve complete wagers history list belonging to this user
  const [bets] = await db.execute<RowDataPacket[]>(
    `SELECT b.id, b.profile_id as profileId, b.game_id as gameId, b.market_id as marketId, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt,
            g.home_team as gameHomeTeam, g.away_team as gameAwayTeam,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     INNER JOIN admin_games g ON b.game_id = g.id
     INNER JOIN admin_game_markets m ON b.market_id = m.id
     WHERE b.profile_id = ?
     ORDER BY b.created_at DESC`,
    [params.id]
  );

  // Retrieve all configured loyalty level tiers in ascending order
  const [tiers] = await db.execute<RowDataPacket[]>(
    'SELECT id, name, min_points as minPoints, cashback_percent as cashbackPercent, bonus_percent as bonusPercent FROM vip_tiers ORDER BY min_points ASC'
  );

  return {
    targetProfile: {
      id: p.id,
      email: p.email,
      username: p.username,
      fullName: p.fullName,
      phone: p.phone,
      country: p.country,
      currency: p.currency,
      vipTierId: p.vipTierId,
      createdAt: new Date(p.createdAt),
      user: { id: p.id, email: p.email, role: p.role },
      vipTier: p.vipTierId ? {
        id: p.vipTierId,
        name: p.vipTierName,
        minPoints: p.vipTierMinPoints,
        cashbackPercent: Number(p.vipTierCashback),
        bonusPercent: Number(p.vipTierBonus)
      } : null
    },
    balance,
    vipTiers: tiers.map(t => ({
      id: t.id,
      name: t.name,
      minPoints: t.minPoints,
      cashbackPercent: Number(t.cashbackPercent),
      bonusPercent: Number(t.bonusPercent)
    })),
    transactions: transactions.map(tx => ({
      id: tx.id,
      profileId: tx.profileId,
      type: tx.type,
      amount: Number(tx.amount),
      currency: tx.currency,
      status: tx.status,
      reference: tx.reference,
      createdAt: new Date(tx.createdAt)
    })),
    bets: bets.map(b => ({
      id: b.id,
      profileId: b.profileId,
      gameId: b.gameId,
      marketId: b.marketId,
      stake: Number(b.stake),
      odds: Number(b.odds),
      potentialWin: Number(b.potentialWin),
      status: b.status,
      createdAt: new Date(b.createdAt),
      game: { homeTeam: b.gameHomeTeam, awayTeam: b.gameAwayTeam },
      market: { selection: b.marketSelection, marketName: b.marketName }
    }))
  };
};

export const actions: Actions = {
  // Updates user roles (permissions) and loyalty VIP levels inside SQL transactions
  updateProfile: async ({ request, params }) => {
    const formData = await request.formData();
    const role = formData.get('role') as string;
    const vipTierId = formData.get('vipTierId') as string;
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      await conn.execute('UPDATE users SET role = ? WHERE id = ?', [role, params.id]);
      await conn.execute('UPDATE profiles SET vip_tier_id = ? WHERE id = ?', [vipTierId, params.id]);

      await conn.commit();
      return { success: true, message: 'Account status updated successfully' };
    } catch {
      await conn.rollback();
      return fail(500, { error: 'Failed to update user status' });
    } finally {
      conn.release();
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
      await db.execute('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, params.id]);
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
      const id = crypto.randomUUID();
      const reference = `ADJ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      await db.execute(
        `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, ?, ?, 'USD', 'COMPLETED', ?)`,
        [id, params.id, type, amount, reference]
      );

      return { success: true, message: 'Balance adjustment processed successfully!' };
    } catch {
      return fail(500, { error: 'Failed to adjust ledger balance' });
    }
  }
};