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

//#region src/routes/sportsbook/[sport]/+page.server.ts
var CATEGORY_MAP = {
	"football": {
		pattern: "soccer_%",
		title: "Football / Soccer"
	},
	"basketball": {
		pattern: "basketball_%",
		title: "Basketball"
	},
	"nba": {
		pattern: "basketball_nba",
		title: "NBA Basketball"
	},
	"euroleague": {
		pattern: "basketball_euroleague",
		title: "Euroleague Basketball"
	},
	"nhl": {
		pattern: "icehockey_nhl",
		title: "NHL Hockey"
	},
	"nfl": {
		pattern: "americanfootball_nfl",
		title: "NFL Football"
	},
	"mlb": {
		pattern: "baseball_mlb",
		title: "MLB Baseball"
	},
	"mma": {
		pattern: "mma%",
		title: "MMA"
	},
	"tennis-atp": {
		pattern: "tennis_atp_singles",
		title: "Tennis ATP"
	},
	"tennis-wta": {
		pattern: "tennis_wta_singles",
		title: "Tennis WTA"
	},
	"tennis": {
		pattern: "tennis_%",
		title: "Tennis"
	},
	"rugby-nrl": {
		pattern: "rugby_nrl",
		title: "Rugby NRL"
	},
	"afl": {
		pattern: "afl",
		title: "AFL Australian Rules"
	}
};
var load = async ({ params }) => {
	const config = CATEGORY_MAP[params.sport ? params.sport.toLowerCase() : ""];
	if (!config) throw error(404, "Sport category not found");
	const now = /* @__PURE__ */ new Date();
	await db.execute(`UPDATE admin_games 
     SET status = 'LIVE' 
     WHERE start_time <= ? AND status = 'UPCOMING'`, [now]);
	await db.execute(`UPDATE admin_game_markets m
     INNER JOIN admin_games g ON m.game_id = g.id
     SET m.active = 0
     WHERE g.start_time <= ? AND m.active = 1`, [now]);
	const [games] = await db.execute(`SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status, home_score as homeScore, away_score as awayScore
     FROM admin_games
     WHERE sport LIKE ? AND status IN ('UPCOMING', 'LIVE')
       AND start_time >= DATE_SUB(NOW(), INTERVAL 4 HOUR)
     ORDER BY start_time ASC`, [config.pattern]);
	if (games.length === 0) return {
		games: [],
		sportTitle: config.title
	};
	const gameIds = games.map((g) => g.id);
	const placeholders = gameIds.map(() => "?").join(",");
	const [markets] = await db.execute(`SELECT id, game_id as gameId, market_name as marketName, selection, odds, active
     FROM admin_game_markets
     WHERE active = 1 AND game_id IN (${placeholders})`, [...gameIds]);
	return {
		games: games.map((game) => ({
			id: game.id,
			sport: game.sport,
			league: game.league,
			homeTeam: game.homeTeam,
			awayTeam: game.awayTeam,
			startTime: new Date(game.startTime),
			status: game.status,
			markets: markets.filter((m) => m.gameId === game.id).map((m) => ({
				id: m.id,
				gameId: m.gameId,
				marketName: m.marketName,
				selection: m.selection,
				odds: Number(m.odds),
				active: Boolean(m.active)
			}))
		})),
		sportTitle: config.title
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CiEHB-6G.js')).default;
const server_id = "src/routes/sportsbook/[sport]/+page.server.ts";
const imports = ["_app/immutable/nodes/32.Cyv1tpvr.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/D2RgmT7Q.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C8P7fG2g.js","_app/immutable/chunks/BN_80GZh.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BQthCCqQ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-DY_ykDbx.js.map
