import { d as db } from './db-CF_k3vJ4.js';
import { f as fail, r as redirect, e as error } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/games/[id]/+page.server.ts
var load = async ({ params, locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [gamesRaw] = await db.execute("SELECT g.*, m.id AS marketId, m.marketName, m.selection, m.odds, m.active FROM games g LEFT JOIN adminGameMarkets m ON g.id = m.gameId WHERE g.id = ?", [params.id]);
	if (!gamesRaw.length) throw error(404, "Fixture not found");
	return { game: {
		...gamesRaw[0],
		markets: gamesRaw.filter((row) => row.marketId).map((row) => ({
			id: row.marketId,
			marketName: row.marketName,
			selection: row.selection,
			odds: Number(row.odds),
			active: Boolean(row.active)
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
			await db.execute("INSERT INTO adminGameMarkets (id, gameId, marketName, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)", [
				crypto.randomUUID(),
				params.id,
				marketName,
				selection,
				odds
			]);
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
			await db.execute("UPDATE adminGameMarkets SET odds = ? WHERE id = ?", [odds, marketId]);
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
			await db.execute("UPDATE adminGameMarkets SET active = ? WHERE id = ?", [activeStr === "true", marketId]);
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to toggle status" });
		}
	},
	deleteMarketOption: async ({ request }) => {
		const marketId = (await request.formData()).get("marketId");
		try {
			await db.execute("DELETE FROM adminGameMarkets WHERE id = ?", [marketId]);
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
const component = async () => component_cache ??= (await import('./_page.svelte-Cm0nY1Wn.js')).default;
const server_id = "src/routes/admin/games/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/7.CXWijODA.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CqXztqXl.js","_app/immutable/chunks/BseN1Bqw.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/EfA6GbtJ.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/Bp_PgSiZ.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-DMMDi2M0.js.map
