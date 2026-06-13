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
var SPORT_KEY_MAP = {
	"football": {
		key: "soccer_english_premier_league",
		title: "Premier League Football"
	},
	"nba": {
		key: "basketball_nba",
		title: "NBA Basketball"
	},
	"euroleague": {
		key: "basketball_euroleague",
		title: "Euroleague Basketball"
	},
	"nhl": {
		key: "icehockey_nhl",
		title: "NHL Hockey"
	},
	"nfl": {
		key: "americanfootball_nfl",
		title: "NFL Football"
	},
	"mlb": {
		key: "baseball_mlb",
		title: "MLB Baseball"
	},
	"mma": {
		key: "mma",
		title: "MMA"
	},
	"tennis-atp": {
		key: "tennis_atp_singles",
		title: "Tennis ATP"
	},
	"tennis-wta": {
		key: "tennis_wta_singles",
		title: "Tennis WTA"
	},
	"rugby-nrl": {
		key: "rugby_nrl",
		title: "Rugby NRL"
	},
	"afl": {
		key: "afl",
		title: "AFL Australian Rules"
	}
};
var load = async ({ params }) => {
	const config = SPORT_KEY_MAP[params.sport.toLowerCase()];
	if (!config) throw error(404, "Sport category not found");
	const [games] = await db.execute(`SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status
     FROM admin_games
     WHERE sport = ? AND status IN ('UPCOMING', 'LIVE')
     ORDER BY start_time ASC`, [config.key]);
	if (games.length === 0) return {
		games: [],
		sportTitle: config.title
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

const index = 31;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CZ828IWU.js')).default;
const server_id = "src/routes/sportsbook/[sport]/+page.server.ts";
const imports = ["_app/immutable/nodes/31.CPEk3o93.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/Cukjjx7d.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CHJfCA3r.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/CR81KSpz.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/BQthCCqQ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=31-CpKqx5l1.js.map
