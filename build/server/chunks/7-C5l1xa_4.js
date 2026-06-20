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
	const [games] = await db.execute(`SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status 
     FROM admin_games 
     WHERE id = ? LIMIT 1`, [params.id]);
	if (games.length === 0) throw error(404, "Fixture match not found");
	const game = games[0];
	const [markets] = await db.execute(`SELECT id, game_id as gameId, market_name as marketName, selection, odds, active 
     FROM admin_game_markets 
     WHERE game_id = ?`, [params.id]);
	return { game: {
		id: game.id,
		sport: game.sport,
		league: game.league,
		homeTeam: game.homeTeam,
		awayTeam: game.awayTeam,
		startTime: new Date(game.startTime),
		status: game.status,
		markets: markets.map((m) => ({
			id: m.id,
			gameId: m.gameId,
			marketName: m.marketName,
			selection: m.selection,
			odds: Number(m.odds),
			active: Boolean(m.active)
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
			const marketId = crypto.randomUUID();
			await db.execute(`INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) 
         VALUES (?, ?, ?, ?, ?, 1)`, [
				marketId,
				params.id,
				marketName,
				selection,
				odds
			]);
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to create custom market selection line" });
		}
	},
	updateOdds: async ({ request }) => {
		const formData = await request.formData();
		const marketId = formData.get("marketId");
		const oddsStr = formData.get("odds");
		const odds = parseFloat(oddsStr);
		if (isNaN(odds) || odds <= 1) return fail(400, { error: "Odds must exceed 1.00" });
		try {
			await db.execute("UPDATE admin_game_markets SET odds = ? WHERE id = ?", [odds, marketId]);
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
			await db.execute("UPDATE admin_game_markets SET active = ? WHERE id = ?", [activeStr === "true" ? 1 : 0, marketId]);
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to toggle market status" });
		}
	},
	deleteMarketOption: async ({ request }) => {
		const marketId = (await request.formData()).get("marketId");
		try {
			await db.execute("DELETE FROM admin_game_markets WHERE id = ?", [marketId]);
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
const component = async () => component_cache ??= (await import('./_page.svelte-Cjt_lJsy.js')).default;
const server_id = "src/routes/admin/games/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/7.D_kJHDms.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/DsPLBFyO.js","_app/immutable/chunks/D34e5ntf.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/EfA6GbtJ.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/Bp_PgSiZ.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-C5l1xa_4.js.map
