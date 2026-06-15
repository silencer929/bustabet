import { d as db } from './db-CF_k3vJ4.js';
import { e as error } from './index-BQZSrJq2.js';
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

//#region src/routes/sportsbook/match/[id]/+page.server.ts
var load = async ({ params }) => {
	const [games] = await db.execute(`SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status
     FROM admin_games
     WHERE id = ? LIMIT 1`, [params.id]);
	if (games.length === 0) throw error(404, "Match fixture not found");
	const game = games[0];
	const [markets] = await db.execute(`SELECT id, game_id as gameId, market_name as marketName, selection, odds, active
     FROM admin_game_markets
     WHERE game_id = ? AND active = 1`, [params.id]);
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

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 31;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C1qGYOoL.js')).default;
const server_id = "src/routes/sportsbook/match/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/31.DfEALHF8.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/CHJfCA3r.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/CR81KSpz.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=31-RoTvl0G1.js.map
