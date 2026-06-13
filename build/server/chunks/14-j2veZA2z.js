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
	const [profiles] = await db.execute("SELECT p.*, u.email, u.role, vt.name AS vipTierName FROM profiles p JOIN users u ON p.userId = u.id LEFT JOIN vipTiers vt ON p.vipTierId = vt.id WHERE p.id = ?", [params.id]);
	const profile = profiles[0];
	if (!profile) throw error(404, "User profile not found");
	const balance = await WalletService.getBalance(params.id);
	const [transactionsRaw] = await db.execute("SELECT * FROM transactions WHERE profileId = ? ORDER BY createdAt DESC", [params.id]);
	const [betsRaw] = await db.execute("SELECT * FROM bets WHERE profileId = ? ORDER BY createdAt DESC", [params.id]);
	const [vipTiers] = await db.execute("SELECT id, name, minPoints FROM vipTiers ORDER BY minPoints ASC");
	return {
		targetProfile: profile,
		balance,
		vipTiers,
		transactions: transactionsRaw.map((tx) => ({
			...tx,
			amount: Number(tx.amount)
		})),
		bets: betsRaw.map((b) => ({
			...b,
			stake: Number(b.stake),
			odds: Number(b.odds),
			potentialWin: Number(b.potentialWin)
		}))
	};
};
var actions = {
	updateProfile: async ({ request, params }) => {
		const formData = await request.formData();
		const role = formData.get("role");
		const vipTierId = formData.get("vipTierId");
		try {
			await db.execute("UPDATE users u JOIN profiles p ON u.id = p.userId SET u.role = ?, p.vipTierId = ? WHERE p.id = ?", [
				role,
				vipTierId || null,
				params.id
			]);
			return {
				success: true,
				message: "Account status updated successfully"
			};
		} catch {
			return fail(500, { error: "Failed to update user status" });
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
			await db.execute("INSERT INTO transactions (profileId, type, amount, currency, status, reference) VALUES (?, ?, ?, ?, ?, ?)", [
				params.id,
				type,
				amount,
				"USD",
				"COMPLETED",
				`ADJ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
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
const component = async () => component_cache ??= (await import('./_page.svelte-_vt357il.js')).default;
const server_id = "src/routes/admin/users/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/14.CM30ossz.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BJme-EP-.js","_app/immutable/chunks/BIzhRwQX.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/CpIsJK52.js","_app/immutable/chunks/TX1voUVi.js","_app/immutable/chunks/C-HfmsJM.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-j2veZA2z.js.map
