import type { Handle } from '@sveltejs/kit';
import { AuthService } from '$lib/server/services/auth.service';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import type { FullProfileDetails } from '$lib/types/profile';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get('session');

  // Initialize locals container
  event.locals.user = null;

  if (sessionToken) {
    const sessionClaims = await AuthService.verifySessionToken(sessionToken);

    if (sessionClaims) {
      try {
        // Query profile attributes, active roles, and VIP benefits using an inner SQL join
        const [profiles] = await db.execute<RowDataPacket[]>(
          `SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.referral_code as referralCode, p.referred_by as referredBy, p.vip_tier_id as vipTierId, p.created_at as createdAt,
                  u.role,
                  v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
           FROM profiles p
           INNER JOIN users u ON p.id = u.id
           LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
           WHERE p.id = ? LIMIT 1`,
          [sessionClaims.userId]
        );

        if (profiles.length > 0) {
          const p = profiles[0];
          
          // Map snake_case columns safely into Svelte 5 client-friendly camelCase types
          event.locals.user = {
            id: p.id,
            email: p.email,
            username: p.username,
            fullName: p.fullName,
            phone: p.phone,
            country: p.country,
            currency: p.currency,
            referralCode: p.referralCode,
            referredBy: p.referredBy,
            vipTierId: p.vipTierId,
            createdAt: new Date(p.createdAt),
            user: {
              id: p.id,
              email: p.email,
              role: p.role
            },
            vipTier: p.vipTierId ? {
              id: p.vipTierId,
              name: p.vipTierName,
              minPoints: p.vipTierMinPoints,
              cashbackPercent: Number(p.vipTierCashback),
              bonusPercent: Number(p.vipTierBonus)
            } : null
          } as unknown as FullProfileDetails;
        } else {
          // Evict cookie if session claims fail matching DB records
          event.cookies.delete('session', { path: '/' });
        }
      } catch (error) {
        console.error('[Hooks SQL Connection Error]:', error);
      }
    }
  }

  const response = await resolve(event);
  return response;
};