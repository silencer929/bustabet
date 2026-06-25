import { d as db } from './db-CF_k3vJ4.js';
import { r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/profile/bets/+page.server.ts
function safeParseSelections(selectionsField) {
	if (!selectionsField) return [];
	if (typeof selectionsField === "object" && selectionsField !== null) return selectionsField;
	try {
		return JSON.parse(selectionsField);
	} catch (error) {
		console.error("[JSON Parsing Error] Failed to parse selections:", error);
		return [];
	}
}
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const [rows] = await db.execute(`SELECT b.id, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt, b.type, b.selections,
            g.home_team as homeTeam, g.away_team as awayTeam,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     LEFT JOIN admin_games g ON b.game_id = g.id
     LEFT JOIN admin_game_markets m ON b.market_id = m.id
     WHERE b.profile_id = ?
     ORDER BY b.created_at DESC`, [locals.user.id]);
	return { bets: rows.map((b) => {
		const betType = b.type || "SINGLE";
		return {
			id: b.id,
			stake: Number(b.stake),
			odds: Number(b.odds),
			potentialWin: Number(b.potentialWin),
			status: b.status,
			type: betType,
			createdAt: new Date(b.createdAt),
			game: b.game_id ? {
				homeTeam: b.homeTeam,
				awayTeam: b.awayTeam
			} : null,
			market: b.market_id ? {
				selection: b.marketSelection,
				marketName: b.marketName
			} : null,
			selections: betType === "COMBO" ? safeParseSelections(b.selections) : []
		};
	}) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BFAzRcLP.js')).default;
const server_id = "src/routes/profile/bets/+page.server.ts";
const imports = ["_app/immutable/nodes/26.B3kfVhYe.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/BnoTFsPM.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-DB1XZKmX.js.map
