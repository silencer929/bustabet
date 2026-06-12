import { d as db } from './db-BcGa8hoB.js';
import { e as error } from './index-BQZSrJq2.js';
import '@prisma/client';
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
	return {
		games: (await db.adminGame.findMany({
			where: {
				sport: config.key,
				status: { in: ["UPCOMING", "LIVE"] }
			},
			orderBy: { startTime: "asc" },
			include: { markets: { where: { active: true } } }
		})).map((game) => ({
			...game,
			markets: game.markets.map((market) => ({
				...market,
				odds: Number(market.odds)
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
//# sourceMappingURL=31-NtRYW0jw.js.map
