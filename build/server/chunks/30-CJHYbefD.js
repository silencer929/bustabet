import { d as db } from './db-CF_k3vJ4.js';
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

//#region src/routes/sportsbook/+page.server.ts
var load = async ({ url }) => {
	const searchQuery = url.searchParams.get("search");
	const now = /* @__PURE__ */ new Date();
	await db.execute(`UPDATE admin_games 
     SET status = 'LIVE' 
     WHERE start_time <= ? AND status = 'UPCOMING'`, [now]);
	await db.execute(`UPDATE admin_game_markets m
     INNER JOIN admin_games g ON m.game_id = g.id
     SET m.active = 0
     WHERE g.start_time <= ? AND m.active = 1`, [now]);
	let query = `
    SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status, home_score as homeScore, away_score as awayScore
    FROM admin_games
    WHERE status IN ('UPCOMING', 'LIVE')
      AND start_time >= DATE_SUB(NOW(), INTERVAL 4 HOUR)
  `;
	const params = [];
	if (searchQuery) {
		query += ` AND (home_team LIKE ? OR away_team LIKE ? OR league LIKE ?)`;
		const searchWildcard = `%${searchQuery}%`;
		params.push(searchWildcard, searchWildcard, searchWildcard);
	}
	query += ` ORDER BY start_time ASC`;
	const [games] = await db.execute(query, params);
	if (games.length === 0) return {
		games: [],
		searchQuery
	};
	const gameIds = games.map((g) => g.id);
	const placeholders = gameIds.map(() => "?").join(",");
	const [markets] = await db.execute(`SELECT id, game_id as gameId, market_name as marketName, selection, odds, active
     FROM admin_game_markets
     WHERE active = 1 AND game_id IN (${placeholders})`, gameIds);
	return {
		games: games.map((game) => ({
			id: game.id,
			sport: game.sport,
			league: game.league,
			homeTeam: game.homeTeam,
			awayTeam: game.awayTeam,
			startTime: new Date(game.startTime),
			status: game.status,
			homeScore: game.homeScore !== null ? Number(game.homeScore) : null,
			awayScore: game.awayScore !== null ? Number(game.awayScore) : null,
			markets: markets.filter((m) => m.gameId === game.id).map((m) => ({
				id: m.id,
				gameId: m.gameId,
				marketName: m.marketName,
				selection: m.selection,
				odds: Number(m.odds),
				active: Boolean(m.active)
			}))
		})),
		searchQuery
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 30;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-l_3BzZUe.js')).default;
const server_id = "src/routes/sportsbook/+page.server.ts";
const imports = ["_app/immutable/nodes/30.Ba5gdtQO.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BWxGQP_j.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/DV6EEMSF.js","_app/immutable/chunks/BpaQzzqo.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BQthCCqQ.js","_app/immutable/chunks/GsLKTv2l.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=30-CJHYbefD.js.map
