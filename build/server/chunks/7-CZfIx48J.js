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
	if (games.length === 0) throw error(404, "Fixture not found");
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
	addMarketTemplate: async ({ request, params }) => {
		const formData = await request.formData();
		const templateType = formData.get("templateType");
		const [games] = await db.execute("SELECT home_team, away_team FROM admin_games WHERE id = ? LIMIT 1", [params.id]);
		if (games.length === 0) return fail(400, { error: "Game not found" });
		const game = games[0];
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			if (templateType === "h2h") {
				const homeOdds = parseFloat(formData.get("homeOdds"));
				const drawOdds = parseFloat(formData.get("drawOdds"));
				const awayOdds = parseFloat(formData.get("awayOdds"));
				if (isNaN(homeOdds) || isNaN(drawOdds) || isNaN(awayOdds)) throw new Error("All H2H odds are required");
				const lines = [
					{
						selection: game.home_team,
						odds: homeOdds
					},
					{
						selection: "Draw",
						odds: drawOdds
					},
					{
						selection: game.away_team,
						odds: awayOdds
					}
				];
				for (const line of lines) await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, \"h2h\", ?, ?, 1)", [
					crypto.randomUUID(),
					params.id,
					line.selection,
					line.odds
				]);
			} else if (templateType === "double_chance") {
				const hdOdds = parseFloat(formData.get("hdOdds"));
				const daOdds = parseFloat(formData.get("daOdds"));
				const haOdds = parseFloat(formData.get("haOdds"));
				if (isNaN(hdOdds) || isNaN(daOdds) || isNaN(haOdds)) throw new Error("All Double Chance odds are required");
				const lines = [
					{
						selection: `${game.home_team} or Draw`,
						odds: hdOdds
					},
					{
						selection: `Draw or ${game.away_team}`,
						odds: daOdds
					},
					{
						selection: `${game.home_team} or ${game.away_team}`,
						odds: haOdds
					}
				];
				for (const line of lines) await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, \"double_chance\", ?, ?, 1)", [
					crypto.randomUUID(),
					params.id,
					line.selection,
					line.odds
				]);
			} else if (templateType === "over_under" || templateType === "totals") {
				const point = formData.get("point");
				const overOdds = parseFloat(formData.get("overOdds"));
				const underOdds = parseFloat(formData.get("underOdds"));
				if (!point || isNaN(overOdds) || isNaN(underOdds)) throw new Error("Point value and all odds are required");
				await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)", [
					crypto.randomUUID(),
					params.id,
					templateType,
					`Over ${point}`,
					overOdds
				]);
				await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)", [
					crypto.randomUUID(),
					params.id,
					templateType,
					`Under ${point}`,
					underOdds
				]);
			} else if (templateType === "correct_score") {
				const scoreLine = formData.get("scoreLine");
				const odds = parseFloat(formData.get("odds"));
				if (!scoreLine || isNaN(odds)) throw new Error("Scoreline and odds are required");
				await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, \"correct_score\", ?, ?, 1)", [
					crypto.randomUUID(),
					params.id,
					scoreLine,
					odds
				]);
			} else if (templateType === "btts") {
				const yesOdds = parseFloat(formData.get("yesOdds"));
				const noOdds = parseFloat(formData.get("noOdds"));
				if (isNaN(yesOdds) || isNaN(noOdds)) throw new Error("Both Yes and No odds are required");
				await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, \"btts\", \"Yes (BTTS)\", ?, 1)", [
					crypto.randomUUID(),
					params.id,
					yesOdds
				]);
				await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, \"btts\", \"No (BTTS)\", ?, 1)", [
					crypto.randomUUID(),
					params.id,
					noOdds
				]);
			} else if (templateType === "win_to_nil") {
				const team = formData.get("team");
				const yesOdds = parseFloat(formData.get("yesOdds"));
				const noOdds = parseFloat(formData.get("noOdds"));
				if (!team || isNaN(yesOdds) || isNaN(noOdds)) throw new Error("Team selection and both odds are required");
				const teamName = team === "HOME" ? game.home_team : game.away_team;
				await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, \"win_to_nil\", ?, ?, 1)", [
					crypto.randomUUID(),
					params.id,
					`${teamName} to Win to Nil - Yes`,
					yesOdds
				]);
				await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, \"win_to_nil\", ?, ?, 1)", [
					crypto.randomUUID(),
					params.id,
					`${teamName} to Win to Nil - No`,
					noOdds
				]);
			}
			await conn.commit();
			return { success: true };
		} catch (error) {
			await conn.rollback();
			return fail(400, { error: error.message || "Failed to apply market template" });
		} finally {
			conn.release();
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
			return fail(500, { error: "Failed to toggle status" });
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
const component = async () => component_cache ??= (await import('./_page.svelte-B6Ed8iNH.js')).default;
const server_id = "src/routes/admin/games/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/7.B_akXFc0.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/4-mxJeaI.js","_app/immutable/chunks/fhcoFGn2.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/EfA6GbtJ.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/Bp_PgSiZ.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-CZfIx48J.js.map
