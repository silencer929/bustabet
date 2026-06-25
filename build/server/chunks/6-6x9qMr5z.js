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

//#region src/routes/admin/games/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [games] = await db.execute(`SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status 
     FROM admin_games 
     ORDER BY start_time DESC`);
	return { games };
};
var actions = { createGame: async ({ request }) => {
	const formData = await request.formData();
	const sport = formData.get("sport");
	const league = formData.get("league");
	const homeTeam = formData.get("homeTeam");
	const awayTeam = formData.get("awayTeam");
	const startTimeStr = formData.get("startTime");
	if (!sport || !league || !homeTeam || !awayTeam || !startTimeStr) return fail(400, { error: "All fields are required to register a game" });
	const gameId = "MAN-" + Math.random().toString(36).substring(2, 12).toUpperCase();
	try {
		await db.execute(`INSERT INTO admin_games (id, sport, league, home_team, away_team, start_time, status) 
         VALUES (?, ?, ?, ?, ?, ?, 'UPCOMING')`, [
			gameId,
			sport,
			league,
			homeTeam,
			awayTeam,
			new Date(startTimeStr)
		]);
		return {
			success: true,
			message: "Fixture created successfully!",
			gameId
		};
	} catch (error) {
		return fail(500, { error: error.message || "Failed to create game record" });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7RPyKO6S.js')).default;
const server_id = "src/routes/admin/games/+page.server.ts";
const imports = ["_app/immutable/nodes/6.CDsWdSCV.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/DbaNhHbf.js","_app/immutable/chunks/Crdp9ooN.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cv68DSkJ.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/OQ4u24rf.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/BQthCCqQ.js","_app/immutable/chunks/DoSFkTfC.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-6x9qMr5z.js.map
