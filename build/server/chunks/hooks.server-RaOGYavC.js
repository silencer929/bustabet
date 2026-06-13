import { d as db } from './db-CF_k3vJ4.js';
import { A as AuthService } from './auth.service-DFvj_QWk.js';
import './shared-server-9-2j12mp.js';
import 'node:buffer';
import 'events';
import 'process';
import 'net';
import 'tls';
import 'timers';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'crypto';
import 'zlib';
import 'util';
import 'url';
import 'bcryptjs';
import 'jose';

//#region src/hooks.server.ts
var handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get("session");
	event.locals.user = null;
	if (sessionToken) {
		const sessionClaims = await AuthService.verifySessionToken(sessionToken);
		if (sessionClaims) try {
			const [profiles] = await db.execute(`SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.referral_code as referralCode, p.referred_by as referredBy, p.vip_tier_id as vipTierId, p.created_at as createdAt,
                  u.role,
                  v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
           FROM profiles p
           INNER JOIN users u ON p.id = u.id
           LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
           WHERE p.id = ? LIMIT 1`, [sessionClaims.userId]);
			if (profiles.length > 0) {
				const p = profiles[0];
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
				};
			} else event.cookies.delete("session", { path: "/" });
		} catch (error) {
			console.error("[Hooks SQL Connection Error]:", error);
		}
	}
	return await resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-RaOGYavC.js.map
