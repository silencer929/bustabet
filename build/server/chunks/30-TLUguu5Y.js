import { d as db } from './db-BcGa8hoB.js';
import { e as error } from './index-BQZSrJq2.js';
import '@prisma/client';
import './index-DBqjc0Yf.js';

//#region src/routes/sportsbook/match/[id]/+page.server.ts
var load = async ({ params }) => {
	const gameRaw = await db.adminGame.findUnique({
		where: { id: params.id },
		include: { markets: { where: { active: true } } }
	});
	if (!gameRaw) throw error(404, "Match fixture not found");
	return { game: {
		...gameRaw,
		markets: gameRaw.markets.map((market) => ({
			...market,
			odds: Number(market.odds)
		}))
	} };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 30;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BA4ftcH3.js')).default;
const server_id = "src/routes/sportsbook/match/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/30.B_Vzj5Gj.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/CHJfCA3r.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/CR81KSpz.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=30-TLUguu5Y.js.map
