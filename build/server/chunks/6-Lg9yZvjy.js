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

//#region src/routes/admin/games/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	return { games: await db.adminGame.findMany({ orderBy: { startTime: "desc" } }) };
};
var actions = { createGame: async ({ request }) => {
	const formData = await request.formData();
	const sport = formData.get("sport");
	const league = formData.get("league");
	const homeTeam = formData.get("homeTeam");
	const awayTeam = formData.get("awayTeam");
	const startTimeStr = formData.get("startTime");
	if (!sport || !league || !homeTeam || !awayTeam || !startTimeStr) return fail(400, { error: "All fields are required to register a game" });
	try {
		return {
			success: true,
			message: "Fixture created successfully!",
			gameId: (await db.adminGame.create({ data: {
				id: "MAN-" + Math.random().toString(36).substring(2, 12).toUpperCase(),
				sport,
				league,
				homeTeam,
				awayTeam,
				startTime: new Date(startTimeStr),
				status: "UPCOMING"
			} })).id
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
const component = async () => component_cache ??= (await import('./_page.svelte-CKcbthI1.js')).default;
const server_id = "src/routes/admin/games/+page.server.ts";
const imports = ["_app/immutable/nodes/6.B5Tvahuj.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CZvqM0u8.js","_app/immutable/chunks/D1bb2Z5h.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cv68DSkJ.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/OQ4u24rf.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/DoSFkTfC.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-Lg9yZvjy.js.map
