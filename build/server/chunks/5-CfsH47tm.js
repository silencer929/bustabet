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

//#region src/routes/admin/dashboard/+page.server.ts
var load = async () => {
	const [usersRaw] = await db.execute("SELECT COUNT(*) AS totalUsers FROM users");
	const totalUsers = usersRaw[0].totalUsers;
	const [pendingBetsRaw] = await db.execute("SELECT COUNT(*) AS pendingBetsCount FROM bets WHERE status = ?", ["PENDING"]);
	const pendingBetsCount = pendingBetsRaw[0].pendingBetsCount;
	const [pendingBetsTurnoverRaw] = await db.execute("SELECT SUM(stake) AS pendingBetsTurnover FROM bets WHERE status = ?", ["PENDING"]);
	const pendingBetsTurnover = pendingBetsTurnoverRaw[0].pendingBetsTurnover || 0;
	const [pendingWithdrawalsRaw] = await db.execute("SELECT SUM(amount) AS pendingWithdrawalsAmount FROM transactions WHERE type = ? AND status = ?", ["WITHDRAWAL", "PENDING"]);
	const pendingWithdrawalsAmount = pendingWithdrawalsRaw[0].pendingWithdrawalsAmount || 0;
	const [openTicketsRaw] = await db.execute("SELECT COUNT(*) AS openTicketsCount FROM support_conversations WHERE status = ?", ["OPEN"]);
	const openTicketsCount = openTicketsRaw[0].openTicketsCount;
	const [pendingKycRaw] = await db.execute("SELECT COUNT(*) AS pendingKycCount FROM verification_documents WHERE status = ?", ["PENDING"]);
	const pendingKycCount = pendingKycRaw[0].pendingKycCount;
	const [settledStakesRaw] = await db.execute("SELECT SUM(stake) AS totalTurnover FROM bets WHERE status IN (?, ?)", ["WON", "LOST"]);
	const settledStakes = { _sum: { stake: settledStakesRaw[0].totalTurnover || 0 } };
	const [settledPayoutsRaw] = await db.execute("SELECT SUM(potential_win) AS totalPayouts FROM bets WHERE status = ?", ["WON"]);
	const settledPayouts = { _sum: { potentialWin: settledPayoutsRaw[0].totalPayouts || 0 } };
	const totalTurnover = Number(settledStakes._sum.stake || 0);
	const grossGamingRevenue = totalTurnover - Number(settledPayouts._sum.potentialWin || 0);
	return { stats: {
		totalUsers,
		pendingBetsCount,
		pendingBetsTurnover: Number(pendingBetsTurnover || 0),
		pendingWithdrawalsAmount: Number(pendingWithdrawalsAmount || 0),
		openTicketsCount,
		pendingKycCount,
		totalTurnover,
		grossGamingRevenue
	} };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CEYCWGLz.js')).default;
const server_id = "src/routes/admin/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/5.BpmfcJcU.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C1RSBQRt.js","_app/immutable/chunks/rM84n8Ji.js","_app/immutable/chunks/CpIsJK52.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/-IPS9uVo.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-CfsH47tm.js.map
