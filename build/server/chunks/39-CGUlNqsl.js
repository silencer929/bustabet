import { W as WalletService } from './wallet.service-BdUTK0kZ.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
import './db-BcGa8hoB.js';
import '@prisma/client';
import './private-CPklkgrX.js';
import './index-DBqjc0Yf.js';

//#region src/routes/wallet/withdraw/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	return { balance: await WalletService.getBalance(locals.user.id) };
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const formData = await request.formData();
	const amountStr = formData.get("amount");
	const destination = formData.get("destination");
	const amount = parseFloat(amountStr);
	if (isNaN(amount) || amount <= 0) return fail(400, { error: "Please enter a valid withdrawal amount" });
	if (!destination || destination.length < 4) return fail(400, { error: "Please specify a valid payment destination (e.g. Phone Number)" });
	try {
		await WalletService.initiateWithdrawal(locals.user.id, amount, destination);
		return {
			success: true,
			message: "Your withdrawal request has been queued. Payouts are usually processed within 2 hours."
		};
	} catch (error) {
		return fail(400, { error: error.message || "Withdrawal request failed" });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 39;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BA8pkknp.js')).default;
const server_id = "src/routes/wallet/withdraw/+page.server.ts";
const imports = ["_app/immutable/nodes/39.G0f6qhcS.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/1v0-xqgc.js","_app/immutable/chunks/DvwXlVgx.js","_app/immutable/chunks/C1RSBQRt.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/DRbXN33w.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=39-CGUlNqsl.js.map
