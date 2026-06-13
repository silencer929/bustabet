import { W as WalletService } from './wallet.service-C_hJrwoI.js';
import './validation-COmr84X5.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
import './shared-server-9-2j12mp.js';
import './db-CF_k3vJ4.js';
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
import 'zod';
import './index-DBqjc0Yf.js';

//#region src/routes/wallet/deposit/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const formData = await request.formData();
	const amountStr = formData.get("amount");
	const phone = formData.get("phone");
	const amount = parseFloat(amountStr);
	if (isNaN(amount) || amount <= 0) return fail(400, { error: "Please enter a valid deposit amount" });
	if (!phone || !phone.match(/^\+?[1-9]\d{1,14}$/)) return fail(400, { error: "Invalid phone format. Please enter in international format (+254...)" });
	try {
		const result = await WalletService.initiateMpesaDeposit(locals.user.id, amount, phone);
		if (result.success) return {
			success: true,
			message: result.message
		};
		else return fail(400, { error: result.message });
	} catch (error) {
		return fail(400, { error: error.message || "Payment initiation failed" });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 37;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DL4sCFf3.js')).default;
const server_id = "src/routes/wallet/deposit/+page.server.ts";
const imports = ["_app/immutable/nodes/37.DAn-8NUe.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BJme-EP-.js","_app/immutable/chunks/BIzhRwQX.js","_app/immutable/chunks/C8yw6N2S.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/DRbXN33w.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/DiHnv9dC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=37-CQ7jkL46.js.map
