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
	const [transactionsRaw] = await db.execute("SELECT t.*, p.username FROM transactions t JOIN profiles p ON t.profileId = p.id ORDER BY t.createdAt DESC");
	return { transactions: transactionsRaw.map((tx) => ({
		...tx,
		amount: Number(tx.amount)
	})) };
};
var actions = {
	approve: async ({ request }) => {
		const id = (await request.formData()).get("id");
		try {
			const [transaction] = await db.execute("UPDATE transactions SET status = ? WHERE id = ? AND type = ? AND status = ?", [
				"COMPLETED",
				id,
				"WITHDRAWAL",
				"PENDING"
			]);
			await db.execute("INSERT INTO notifications (profileId, title, message, read) VALUES (?, ?, ?, ?)", [
				transaction.profileId,
				"Withdrawal Approved",
				`Your withdrawal of ${Number(transaction.amount)} has been approved and processed.`,
				false
			]);
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to approve withdrawal" });
		}
	},
	reject: async ({ request }) => {
		const id = (await request.formData()).get("id");
		try {
			const [transaction] = await db.execute("UPDATE transactions SET status = ? WHERE id = ? AND type = ? AND status = ?", [
				"FAILED",
				id,
				"WITHDRAWAL",
				"PENDING"
			]);
			await db.execute("INSERT INTO notifications (profileId, title, message, read) VALUES (?, ?, ?, ?)", [
				transaction.profileId,
				"Withdrawal Rejected",
				`Your withdrawal of ${Number(transaction.amount)} was rejected. locked funds returned.`,
				false
			]);
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to reject withdrawal" });
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
const component = async () => component_cache ??= (await import('./_page.svelte-C6lqO_62.js')).default;
const server_id = "src/routes/admin/transactions/+page.server.ts";
const imports = ["_app/immutable/nodes/12.DTMiUvhL.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CqXztqXl.js","_app/immutable/chunks/BseN1Bqw.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/C8yw6N2S.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/l58uqKd0.js","_app/immutable/chunks/C1RSBQRt.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-DmvaG3SW.js.map
