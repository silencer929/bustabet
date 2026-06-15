import { d as db } from './db-CF_k3vJ4.js';
import { W as WalletService } from './wallet.service-C_hJrwoI.js';
import { f as fail, r as redirect, e as error } from './index-BQZSrJq2.js';
import bcrypt from 'bcryptjs';
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
import './index-DBqjc0Yf.js';

//#region src/routes/admin/users/[id]/+page.server.ts
var load = async ({ params, locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [profiles] = await db.execute(`SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.vip_tier_id as vipTierId, p.created_at as createdAt,
            u.role,
            v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
     FROM profiles p
     INNER JOIN users u ON p.id = u.id
     LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
     WHERE p.id = ? LIMIT 1`, [params.id]);
	if (profiles.length === 0) throw error(404, "User profile not found");
	const p = profiles[0];
	const balance = await WalletService.getBalance(params.id);
	const [transactions] = await db.execute(`SELECT id, profile_id as profileId, type, amount, currency, status, reference, created_at as createdAt 
     FROM transactions 
     WHERE profile_id = ? 
     ORDER BY created_at DESC`, [params.id]);
	const [bets] = await db.execute(`SELECT b.id, b.profile_id as profileId, b.game_id as gameId, b.market_id as marketId, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt,
            g.home_team as gameHomeTeam, g.away_team as gameAwayTeam,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     INNER JOIN admin_games g ON b.game_id = g.id
     INNER JOIN admin_game_markets m ON b.market_id = m.id
     WHERE b.profile_id = ?
     ORDER BY b.created_at DESC`, [params.id]);
	const [tiers] = await db.execute("SELECT id, name, min_points as minPoints, cashback_percent as cashbackPercent, bonus_percent as bonusPercent FROM vip_tiers ORDER BY min_points ASC");
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
		},
		balance,
		vipTiers: tiers.map((t) => ({
			id: t.id,
			name: t.name,
			minPoints: t.minPoints,
			cashbackPercent: Number(t.cashbackPercent),
			bonusPercent: Number(t.bonusPercent)
		})),
		transactions: transactions.map((tx) => ({
			id: tx.id,
			profileId: tx.profileId,
			type: tx.type,
			amount: Number(tx.amount),
			currency: tx.currency,
			status: tx.status,
			reference: tx.reference,
			createdAt: new Date(tx.createdAt)
		})),
		bets: bets.map((b) => ({
			id: b.id,
			profileId: b.profileId,
			gameId: b.gameId,
			marketId: b.marketId,
			stake: Number(b.stake),
			odds: Number(b.odds),
			potentialWin: Number(b.potentialWin),
			status: b.status,
			createdAt: new Date(b.createdAt),
			game: {
				homeTeam: b.gameHomeTeam,
				awayTeam: b.gameAwayTeam
			},
			market: {
				selection: b.marketSelection,
				marketName: b.marketName
			}
		}))
	};
};
var actions = {
	updateProfile: async ({ request, params }) => {
		const formData = await request.formData();
		const role = formData.get("role");
		const vipTierId = formData.get("vipTierId");
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			await conn.execute("UPDATE users SET role = ? WHERE id = ?", [role, params.id]);
			await conn.execute("UPDATE profiles SET vip_tier_id = ? WHERE id = ?", [vipTierId, params.id]);
			await conn.commit();
			return {
				success: true,
				message: "Account status updated successfully"
			};
		} catch {
			await conn.rollback();
			return fail(500, { error: "Failed to update user status" });
		} finally {
			conn.release();
		}
	},
	resetPassword: async ({ request, params }) => {
		const newPassword = (await request.formData()).get("newPassword");
		if (!newPassword || newPassword.length < 6) return fail(400, { error: "Password must be at least 6 characters long" });
		try {
			const passwordHash = await bcrypt.hash(newPassword, 10);
			await db.execute("UPDATE users SET password_hash = ? WHERE id = ?", [passwordHash, params.id]);
			return {
				success: true,
				message: "Password reset successfully!"
			};
		} catch {
			return fail(500, { error: "Failed to reset password" });
		}
	},
	manualAdjustment: async ({ request, params }) => {
		const formData = await request.formData();
		const type = formData.get("type");
		const amountStr = formData.get("amount");
		const amount = parseFloat(amountStr);
		if (isNaN(amount) || amount <= 0) return fail(400, { error: "Please enter a valid amount" });
		try {
			const id = crypto.randomUUID();
			const reference = `ADJ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
			await db.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, ?, ?, 'USD', 'COMPLETED', ?)`, [
				id,
				params.id,
				type,
				amount,
				reference
			]);
			return {
				success: true,
				message: "Balance adjustment processed successfully!"
			};
		} catch {
			return fail(500, { error: "Failed to adjust ledger balance" });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CZCcCDUy.js')).default;
const server_id = "src/routes/admin/users/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/14.DOe2sx1m.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/C6NMhqYr.js","_app/immutable/chunks/D3Q1pEpz.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/CpIsJK52.js","_app/immutable/chunks/TX1voUVi.js","_app/immutable/chunks/C-HfmsJM.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-B2ruyfYQ.js.map
