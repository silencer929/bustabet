import { d as db } from './db-CT_Sl39P.js';
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
	const totalUsers = await db.user.count();
	const pendingBetsCount = await db.bet.count({ where: { status: "PENDING" } });
	const pendingBetsTurnover = await db.bet.aggregate({
		where: { status: "PENDING" },
		_sum: { stake: true }
	});
	const pendingWithdrawalsAmount = await db.transaction.aggregate({
		where: {
			type: "WITHDRAWAL",
			status: "PENDING"
		},
		_sum: { amount: true }
	});
	const openTicketsCount = await db.supportConversation.count({ where: { status: "OPEN" } });
	const pendingKycCount = await db.verificationDoc.count({ where: { status: "PENDING" } });
	const settledStakes = await db.bet.aggregate({
		where: { status: { in: ["WON", "LOST"] } },
		_sum: { stake: true }
	});
	const settledPayouts = await db.bet.aggregate({
		where: { status: "WON" },
		_sum: { potentialWin: true }
	});
	const totalTurnover = Number(settledStakes._sum.stake || 0);
	const grossGamingRevenue = totalTurnover - Number(settledPayouts._sum.potentialWin || 0);
	return { stats: {
		totalUsers,
		pendingBetsCount,
		pendingBetsTurnover: Number(pendingBetsTurnover._sum.stake || 0),
		pendingWithdrawalsAmount: Number(pendingWithdrawalsAmount._sum.amount || 0),
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
//# sourceMappingURL=5-B4NQV2bY.js.map
