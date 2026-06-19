import { d as db } from './db-CF_k3vJ4.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/transactions/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [rows] = await db.execute(`SELECT t.id, t.profile_id as profileId, t.type, t.amount, t.currency, t.status, t.reference, t.created_at as createdAt,
            p.username
     FROM transactions t
     INNER JOIN profiles p ON t.profile_id = p.id
     ORDER BY t.created_at DESC`);
	return { transactions: rows.map((tx) => ({
		id: tx.id,
		profileId: tx.profileId,
		type: tx.type,
		amount: Number(tx.amount),
		currency: tx.currency,
		status: tx.status,
		reference: tx.reference,
		createdAt: new Date(tx.createdAt),
		profile: { username: tx.username }
	})) };
};
var actions = {
	approve: async ({ request }) => {
		const id = (await request.formData()).get("id");
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [transactions] = await conn.execute("SELECT profile_id, currency, amount FROM transactions WHERE id = ? AND status = \"PENDING\" LIMIT 1", [id]);
			if (transactions.length === 0) {
				await conn.rollback();
				return fail(400, { error: "Transaction is not pending or does not exist" });
			}
			const tx = transactions[0];
			await conn.execute("UPDATE transactions SET status = \"COMPLETED\" WHERE id = ?", [id]);
			await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`, [
				crypto.randomUUID(),
				tx.profile_id,
				"Withdrawal Approved",
				`Your withdrawal of ${tx.currency} ${Number(tx.amount)} has been approved and processed.`
			]);
			await conn.commit();
			return { success: true };
		} catch {
			await conn.rollback();
			return fail(500, { error: "Failed to approve withdrawal" });
		} finally {
			conn.release();
		}
	},
	reject: async ({ request }) => {
		const id = (await request.formData()).get("id");
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [transactions] = await conn.execute("SELECT profile_id, currency, amount FROM transactions WHERE id = ? AND status = \"PENDING\" LIMIT 1", [id]);
			if (transactions.length === 0) {
				await conn.rollback();
				return fail(400, { error: "Transaction is not pending or does not exist" });
			}
			const tx = transactions[0];
			await conn.execute("UPDATE transactions SET status = \"FAILED\" WHERE id = ?", [id]);
			await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`, [
				crypto.randomUUID(),
				tx.profile_id,
				"Withdrawal Rejected",
				`Your withdrawal of ${tx.currency} ${Number(tx.amount)} was rejected. Locked funds have been returned to your wallet balance.`
			]);
			await conn.commit();
			return { success: true };
		} catch {
			await conn.rollback();
			return fail(500, { error: "Failed to reject withdrawal" });
		} finally {
			conn.release();
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-gSrD0XSk.js')).default;
const server_id = "src/routes/admin/transactions/+page.server.ts";
const imports = ["_app/immutable/nodes/12.Ba2JsLuR.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/D4Zea20P.js","_app/immutable/chunks/KNaG8HuZ.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/C8yw6N2S.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/l58uqKd0.js","_app/immutable/chunks/C1RSBQRt.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-CuDN3m2k.js.map
