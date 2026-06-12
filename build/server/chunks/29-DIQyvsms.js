import { d as db } from './db-BcGa8hoB.js';
import '@prisma/client';

//#region src/routes/sportsbook/+page.server.ts
var load = async ({ url }) => {
	const searchQuery = url.searchParams.get("search");
	let whereClause = { status: { in: ["UPCOMING", "LIVE"] } };
	if (searchQuery) whereClause = {
		...whereClause,
		OR: [
			{ homeTeam: { contains: searchQuery } },
			{ awayTeam: { contains: searchQuery } },
			{ league: { contains: searchQuery } }
		]
	};
	return {
		games: (await db.adminGame.findMany({
			where: whereClause,
			orderBy: { startTime: "asc" },
			include: { markets: { where: { active: true } } }
		})).map((game) => ({
			...game,
			markets: game.markets.map((market) => ({
				...market,
				odds: Number(market.odds)
			}))
		})),
		searchQuery
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 29;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CUr3HKj5.js')).default;
const server_id = "src/routes/sportsbook/+page.server.ts";
const imports = ["_app/immutable/nodes/29.DJYjA5Yw.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cukjjx7d.js","_app/immutable/chunks/CHJfCA3r.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/CR81KSpz.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/BQthCCqQ.js","_app/immutable/chunks/GsLKTv2l.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=29-DIQyvsms.js.map
