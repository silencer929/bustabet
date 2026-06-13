import { d as db } from './db-CT_Sl39P.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
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
	return { transactions: (await db.transaction.findMany({
		orderBy: { createdAt: "desc" },
		include: { profile: { select: { username: true } } }
	})).map((tx) => ({
		...tx,
		amount: Number(tx.amount)
	})) };
};
var actions = {
	approve: async ({ request }) => {
		const id = (await request.formData()).get("id");
		try {
			const transaction = await db.transaction.update({
				where: { id },
				data: { status: "COMPLETED" }
			});
			await db.notification.create({ data: {
				profileId: transaction.profileId,
				title: "Withdrawal Approved",
				message: `Your withdrawal of ${transaction.currency} ${Number(transaction.amount)} has been approved and processed.`,
				read: false
			} });
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to approve withdrawal" });
		}
	},
	reject: async ({ request }) => {
		const id = (await request.formData()).get("id");
		try {
			const transaction = await db.transaction.update({
				where: { id },
				data: { status: "FAILED" }
			});
			await db.notification.create({ data: {
				profileId: transaction.profileId,
				title: "Withdrawal Rejected",
				message: `Your withdrawal of ${transaction.currency} ${Number(transaction.amount)} was rejected. locked funds returned.`,
				read: false
			} });
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
const component = async () => component_cache ??= (await import('./_page.svelte-DQn2gygL.js')).default;
const server_id = "src/routes/admin/transactions/+page.server.ts";
const imports = ["_app/immutable/nodes/12.CUecvoyS.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CZvqM0u8.js","_app/immutable/chunks/D1bb2Z5h.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/C8yw6N2S.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/l58uqKd0.js","_app/immutable/chunks/C1RSBQRt.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-BeTR3IZZ.js.map
