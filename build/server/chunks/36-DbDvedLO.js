import { d as db } from './db-CT_Sl39P.js';
import { W as WalletService } from './wallet.service-C5RxSAXO.js';
import { r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/wallet/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	return {
		balance: await WalletService.getBalance(locals.user.id),
		transactions: (await db.transaction.findMany({
			where: { profileId: locals.user.id },
			orderBy: { createdAt: "desc" },
			take: 5
		})).map((tx) => ({
			...tx,
			amount: Number(tx.amount)
		}))
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D5qJ8gm0.js')).default;
const server_id = "src/routes/wallet/+page.server.ts";
const imports = ["_app/immutable/nodes/36.CATRaVIA.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/C8yw6N2S.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C1RSBQRt.js","_app/immutable/chunks/TX1voUVi.js","_app/immutable/chunks/Bcj3QQwp.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-DbDvedLO.js.map
