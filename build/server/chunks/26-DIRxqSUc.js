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
	const [rows] = await db.execute(`SELECT b.id, b.profile_id, b.game_id as gameId, b.market_id as marketId, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt, b.type, b.selections,
            g.home_team as homeTeam, g.away_team as awayTeam, g.status as gameStatus, g.home_score as homeScore, g.away_score as awayScore,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     LEFT JOIN admin_games g ON b.game_id = g.id
     LEFT JOIN admin_game_markets m ON b.market_id = m.id
     WHERE b.profile_id = ?
     ORDER BY b.created_at DESC`, [locals.user.id]);
	const serializedBets = [];
	for (const b of rows) {
		const betType = b.type || "SINGLE";
		let selectionsList = [];
		if (betType === "COMBO" && b.selections) {
			const parsed = safeParseSelections(b.selections);
			const marketIds = parsed.map((p) => p.marketId);
			if (marketIds.length > 0) {
				const placeholders = marketIds.map(() => "?").join(",");
				const [details] = await db.execute(`SELECT m.id as marketId, m.selection,
                  g.home_team as homeTeam, g.away_team as awayTeam, g.status as gameStatus, g.home_score as homeScore, g.away_score as awayScore
           FROM admin_game_markets m
           INNER JOIN admin_games g ON m.game_id = g.id
           WHERE m.id IN (${placeholders})`, marketIds);
				selectionsList = parsed.map((p) => {
					const matchDetail = details.find((d) => d.marketId === p.marketId);
					return {
						marketId: p.marketId,
						odds: p.odds,
						selection: matchDetail ? matchDetail.selection : "Unknown Selection",
						homeTeam: matchDetail ? matchDetail.homeTeam : "Unknown Team",
						awayTeam: matchDetail ? matchDetail.awayTeam : "Unknown Team",
						gameStatus: matchDetail ? matchDetail.gameStatus : "UPCOMING",
						homeScore: matchDetail ? matchDetail.homeScore : 0,
						awayScore: matchDetail ? matchDetail.awayScore : 0
					};
				});
			}
		}
		serializedBets.push({
			id: b.id,
			stake: Number(b.stake),
			odds: Number(b.odds),
			potentialWin: Number(b.potentialWin),
			status: b.status,
			type: betType,
			createdAt: new Date(b.createdAt),
			game: b.gameId ? {
				homeTeam: b.homeTeam,
				awayTeam: b.awayTeam,
				gameStatus: b.gameStatus,
				homeScore: b.homeScore,
				awayScore: b.awayScore
			} : null,
			market: b.marketId ? {
				selection: b.marketSelection,
				marketName: b.marketName
			} : null,
			selections: selectionsList
		});
	}
	return { bets: serializedBets };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CuYGYXFN.js')).default;
const server_id = "src/routes/profile/bets/+page.server.ts";
const imports = ["_app/immutable/nodes/26.B1MhMvVZ.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/BnoTFsPM.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-DIRxqSUc.js.map
