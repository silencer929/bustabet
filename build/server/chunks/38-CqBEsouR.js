import { d as db } from './db-CF_k3vJ4.js';
import { r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/wallet/history/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const [rows] = await db.execute(`SELECT id, profile_id as profileId, type, amount, currency, status, reference, created_at as createdAt 
     FROM transactions 
     WHERE profile_id = ? 
     ORDER BY created_at DESC`, [locals.user.id]);
	return { transactions: rows.map((tx) => ({
		id: tx.id,
		profileId: tx.profileId,
		type: tx.type,
		amount: Number(tx.amount),
		currency: tx.currency,
		status: tx.status,
		reference: tx.reference,
		createdAt: new Date(tx.createdAt)
	})) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 38;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CkgTI2cE.js')).default;
const server_id = "src/routes/wallet/history/+page.server.ts";
const imports = ["_app/immutable/nodes/38.BrFanG0o.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/C8yw6N2S.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C1RSBQRt.js","_app/immutable/chunks/TX1voUVi.js","_app/immutable/chunks/Bcj3QQwp.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=38-CqBEsouR.js.map
