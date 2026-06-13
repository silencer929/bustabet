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
	const [rows] = await db.execute(`SELECT b.id, b.profile_id as profileId, b.game_id as gameId, b.market_id as marketId, b.stake, b.odds, b.potential_win as potentialWin, b.status, b.created_at as createdAt,
            p.username as profileUsername,
            g.home_team as gameHomeTeam, g.away_team as gameAwayTeam,
            m.selection as marketSelection, m.market_name as marketName
     FROM bets b
     INNER JOIN profiles p ON b.profile_id = p.id
     INNER JOIN admin_games g ON b.game_id = g.id
     INNER JOIN admin_game_markets m ON b.market_id = m.id
     ORDER BY b.created_at DESC`);
	return { bets: rows.map((bet) => ({
		id: bet.id,
		profileId: bet.profileId,
		gameId: bet.gameId,
		marketId: bet.marketId,
		stake: Number(bet.stake),
		odds: Number(bet.odds),
		potentialWin: Number(bet.potentialWin),
		status: bet.status,
		createdAt: new Date(bet.createdAt),
		profile: { username: bet.profileUsername },
		game: {
			id: bet.gameId,
			homeTeam: bet.gameHomeTeam,
			awayTeam: bet.gameAwayTeam
		},
		market: {
			id: bet.marketId,
			selection: bet.marketSelection,
			marketName: bet.marketName
		}
	})) };
};
var actions = {
	settleWon: async ({ request }) => {
		const id = (await request.formData()).get("id");
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [bets] = await conn.execute(`SELECT b.profile_id, b.potential_win, b.status, g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.id = ? LIMIT 1`, [id]);
			if (bets.length === 0 || bets[0].status !== "PENDING") {
				await conn.rollback();
				return fail(400, { error: "Wager is not pending or does not exist" });
			}
			const bet = bets[0];
			await conn.execute("UPDATE bets SET status = \"WON\" WHERE id = ?", [id]);
			await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`, [
				crypto.randomUUID(),
				bet.profile_id,
				bet.potential_win,
				`MAN-PAY-${id}`
			]);
			await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`, [
				crypto.randomUUID(),
				bet.profile_id,
				"Bet Manually Settle: Won",
				`Your wager on ${bet.home_team} vs ${bet.away_team} was resolved as won. Payout processed.`
			]);
			await conn.commit();
			return { success: true };
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	},
	settleLost: async ({ request }) => {
		const id = (await request.formData()).get("id");
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [bets] = await conn.execute(`SELECT b.profile_id, b.status, g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.id = ? LIMIT 1`, [id]);
			if (bets.length === 0 || bets[0].status !== "PENDING") {
				await conn.rollback();
				return fail(400, { error: "Wager is not pending or does not exist" });
			}
			const bet = bets[0];
			await conn.execute("UPDATE bets SET status = \"LOST\" WHERE id = ?", [id]);
			await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`, [
				crypto.randomUUID(),
				bet.profile_id,
				"Bet Manually Settle: Lost",
				`Your wager on ${bet.home_team} vs ${bet.away_team} was resolved as lost.`
			]);
			await conn.commit();
			return { success: true };
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	},
	voidBet: async ({ request }) => {
		const id = (await request.formData()).get("id");
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [bets] = await conn.execute(`SELECT b.profile_id, b.stake, b.status, g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.id = ? LIMIT 1`, [id]);
			if (bets.length === 0 || bets[0].status !== "PENDING") {
				await conn.rollback();
				return fail(400, { error: "Wager is not pending or does not exist" });
			}
			const bet = bets[0];
			await conn.execute("UPDATE bets SET status = \"VOIDED\" WHERE id = ?", [id]);
			await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, 'DEPOSIT', ?, 'USD', 'COMPLETED', ?)`, [
				crypto.randomUUID(),
				bet.profile_id,
				bet.stake,
				`VOID-REF-${id}`
			]);
			await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`, [
				crypto.randomUUID(),
				bet.profile_id,
				"Bet Voided & Refunded",
				`Your wager on ${bet.home_team} vs ${bet.away_team} was voided. Your stake of ${Number(bet.stake)} has been refunded.`
			]);
			await conn.commit();
			return { success: true };
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
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
const component = async () => component_cache ??= (await import('./_page.svelte-CwpUwiHY.js')).default;
const server_id = "src/routes/admin/bets/+page.server.ts";
const imports = ["_app/immutable/nodes/4.1Vebyn-C.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CqXztqXl.js","_app/immutable/chunks/BseN1Bqw.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/OQ4u24rf.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BPlbdUQ5.js.map
