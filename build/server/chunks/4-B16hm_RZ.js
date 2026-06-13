import { d as db } from './db-CF_k3vJ4.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/bets/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [betsRaw] = await db.execute("SELECT b.*, g.homeTeam, g.awayTeam FROM bet b LEFT JOIN games g ON b.gameId = g.id ORDER BY b.createdAt DESC");
	return { bets: betsRaw.map((bet) => ({
		...bet,
		stake: Number(bet.stake),
		odds: Number(bet.odds),
		potentialWin: Number(bet.potentialWin)
	})) };
};
var actions = {
	settleWon: async ({ request }) => {
		const id = (await request.formData()).get("id");
		try {
			return await db.$transaction(async (tx) => {
				const bet = await tx.bet.findUnique({
					where: { id },
					include: { game: true }
				});
				if (!bet || bet.status !== "PENDING") return fail(400, { error: "Wager is not pending or does not exist" });
				await tx.bet.update({
					where: { id },
					data: { status: "WON" }
				});
				await tx.transaction.create({ data: {
					profileId: bet.profileId,
					type: "PAYOUT",
					amount: bet.potentialWin,
					currency: "USD",
					status: "COMPLETED",
					reference: `MAN-PAY-${bet.id}`
				} });
				await tx.notification.create({ data: {
					profileId: bet.profileId,
					title: "Bet Manually Settle: Won",
					message: `Your wager on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was resolved as won. Payout processed.`,
					read: false
				} });
				return { success: true };
			});
		} catch {
			return fail(500, { error: "Failed to settle wager as won" });
		}
	},
	settleLost: async ({ request }) => {
		const id = (await request.formData()).get("id");
		try {
			const bet = await db.bet.update({
				where: { id },
				data: { status: "LOST" },
				include: { game: true }
			});
			await db.notification.create({ data: {
				profileId: bet.profileId,
				title: "Bet Manually Settle: Lost",
				message: `Your wager on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was resolved as lost.`,
				read: false
			} });
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to settle wager as lost" });
		}
	},
	voidBet: async ({ request }) => {
		const id = (await request.formData()).get("id");
		try {
			return await db.$transaction(async (tx) => {
				const bet = await tx.bet.findUnique({
					where: { id },
					include: { game: true }
				});
				if (!bet || bet.status !== "PENDING") return fail(400, { error: "Wager is not pending or does not exist" });
				await tx.bet.update({
					where: { id },
					data: { status: "VOIDED" }
				});
				await tx.transaction.create({ data: {
					profileId: bet.profileId,
					type: "DEPOSIT",
					amount: bet.stake,
					currency: "USD",
					status: "COMPLETED",
					reference: `VOID-REF-${bet.id}`
				} });
				await tx.notification.create({ data: {
					profileId: bet.profileId,
					title: "Bet Voided & Refunded",
					message: `Your wager on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was voided. Your stake of ${Number(bet.stake)} has been refunded.`,
					read: false
				} });
				return { success: true };
			});
		} catch {
			return fail(500, { error: "Failed to void wager" });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BLGlk2B7.js')).default;
const server_id = "src/routes/admin/bets/+page.server.ts";
const imports = ["_app/immutable/nodes/4.yI5L7XHR.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BJme-EP-.js","_app/immutable/chunks/BIzhRwQX.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/OQ4u24rf.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-B16hm_RZ.js.map
