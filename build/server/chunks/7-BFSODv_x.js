import { d as db } from './db-CT_Sl39P.js';
import { f as fail, r as redirect, e as error } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/games/[id]/+page.server.ts
var load = async ({ params, locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const gameRaw = await db.adminGame.findUnique({
		where: { id: params.id },
		include: { markets: true }
	});
	if (!gameRaw) throw error(404, "Fixture not found");
	return { game: {
		...gameRaw,
		markets: gameRaw.markets.map((market) => ({
			...market,
			odds: Number(market.odds)
		}))
	} };
};
var actions = {
	addMarketOption: async ({ request, params }) => {
		const formData = await request.formData();
		const marketName = formData.get("marketName");
		const selection = formData.get("selection");
		const oddsStr = formData.get("odds");
		const odds = parseFloat(oddsStr);
		if (!marketName || !selection || isNaN(odds) || odds <= 1) return fail(400, { error: "All fields must be valid. Odds must exceed 1.00." });
		try {
			await db.adminGameMarket.create({ data: {
				gameId: params.id,
				marketName,
				selection,
				odds,
				active: true
			} });
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to create market option" });
		}
	},
	updateOdds: async ({ request }) => {
		const formData = await request.formData();
		const marketId = formData.get("marketId");
		const oddsStr = formData.get("odds");
		const odds = parseFloat(oddsStr);
		if (isNaN(odds) || odds <= 1) return fail(400, { error: "Odds must exceed 1.00" });
		try {
			await db.adminGameMarket.update({
				where: { id: marketId },
				data: { odds }
			});
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to update odds value" });
		}
	},
	toggleMarket: async ({ request }) => {
		const formData = await request.formData();
		const marketId = formData.get("marketId");
		const activeStr = formData.get("active");
		try {
			await db.adminGameMarket.update({
				where: { id: marketId },
				data: { active: activeStr === "true" }
			});
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to toggle status" });
		}
	},
	deleteMarketOption: async ({ request }) => {
		const marketId = (await request.formData()).get("marketId");
		try {
			await db.adminGameMarket.delete({ where: { id: marketId } });
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to delete market option" });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B6H3HLRn.js')).default;
const server_id = "src/routes/admin/games/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/7.CsvFhSY5.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CZvqM0u8.js","_app/immutable/chunks/D1bb2Z5h.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/EfA6GbtJ.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/Bp_PgSiZ.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-BFSODv_x.js.map
