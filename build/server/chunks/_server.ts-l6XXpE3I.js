import { b as private_env } from './shared-server-9-2j12mp.js';
import { d as db } from './db-CF_k3vJ4.js';
import { W as WalletService } from './wallet.service-Dv75Scmq.js';
import { j as json } from './index-BQZSrJq2.js';
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

//#region src/lib/server/services/betting.service.ts
var BettingService = class {
	static MINIMUM_STAKE = Number(private_env.MINIMUM_STAKE_AMOUNT || 10);
	static async placeWager(profileId, input) {
		if (input.stake < this.MINIMUM_STAKE) throw new Error(`Minimum stake required is ${this.MINIMUM_STAKE}`);
		const totalRequiredStake = input.type === "SINGLE" ? input.stake * input.selections.length : input.stake;
		if (await WalletService.getBalance(profileId) < totalRequiredStake) throw new Error("Insufficient wallet balance");
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			if (input.type === "SINGLE") {
				for (const selection of input.selections) {
					const [markets] = await conn.execute(`SELECT m.id, m.game_id, m.selection, m.odds, m.active, g.home_team, g.away_team, g.status, g.start_time
             FROM admin_game_markets m
             INNER JOIN admin_games g ON m.game_id = g.id
             WHERE m.id = ? LIMIT 1`, [selection.marketId]);
					if (markets.length === 0 || markets[0].active !== 1 || markets[0].status !== "UPCOMING" || /* @__PURE__ */ new Date() >= new Date(markets[0].start_time)) throw new Error("One or more selections are no longer active or have already started");
					const market = markets[0];
					const potentialWin = Number((input.stake * Number(market.odds)).toFixed(2));
					await conn.execute(`INSERT INTO bets (id, profile_id, game_id, market_id, stake, odds, potential_win, status, type)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', 'SINGLE')`, [
						crypto.randomUUID(),
						profileId,
						market.game_id,
						market.id,
						input.stake,
						market.odds,
						potentialWin
					]);
				}
				await conn.execute("INSERT INTO notifications (id, profile_id, title, message, `read`) VALUES (?, ?, \"Singles Placed\", ?, 0)", [
					crypto.randomUUID(),
					profileId,
					`Successfully placed ${input.selections.length} single wagers for a total of ${totalRequiredStake}.`
				]);
			} else if (input.type === "COMBO") {
				let summedOdds = 0;
				for (const selection of input.selections) {
					const [markets] = await conn.execute(`SELECT m.odds, m.active, g.status, g.start_time
             FROM admin_game_markets m
             INNER JOIN admin_games g ON m.game_id = g.id
             WHERE m.id = ? LIMIT 1`, [selection.marketId]);
					if (markets.length === 0 || markets[0].active !== 1 || markets[0].status !== "UPCOMING" || /* @__PURE__ */ new Date() >= new Date(markets[0].start_time)) throw new Error("One or more selections are no longer active or have already started");
					summedOdds += Number(markets[0].odds);
				}
				const potentialWin = Number((input.stake * summedOdds).toFixed(2));
				const betId = crypto.randomUUID();
				await conn.execute(`INSERT INTO bets (id, profile_id, game_id, market_id, stake, odds, potential_win, status, type, selections)
           VALUES (?, ?, NULL, NULL, ?, ?, ?, 'PENDING', 'COMBO', ?)`, [
					betId,
					profileId,
					input.stake,
					summedOdds,
					potentialWin,
					JSON.stringify(input.selections)
				]);
				await conn.execute("INSERT INTO notifications (id, profile_id, title, message, `read`) VALUES (?, ?, \"Multibet Placed\", ?, 0)", [
					crypto.randomUUID(),
					profileId,
					`Successfully placed multibet of ${input.stake} with total odds of ${summedOdds.toFixed(2)}.`
				]);
			}
			await conn.commit();
			return {
				success: true,
				message: "Wagers successfully logged!"
			};
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
};
//#endregion
//#region src/routes/api/place-bet/+server.ts
var POST = async ({ request, locals }) => {
	if (!locals.user) return json({
		success: false,
		message: "Please log in to place wagers"
	}, { status: 401 });
	try {
		const payload = await request.json();
		if (!payload.type || !payload.selections || !Array.isArray(payload.selections) || !payload.stake) return json({
			success: false,
			message: "Invalid betting payload structure"
		}, { status: 400 });
		return json({
			success: true,
			message: (await BettingService.placeWager(locals.user.id, {
				type: payload.type,
				selections: payload.selections,
				stake: Number(payload.stake)
			})).message
		});
	} catch (error) {
		console.error("[API Place Wager Error]:", error);
		return json({
			success: false,
			message: error.message || "An unexpected error occurred during placement"
		}, { status: 500 });
	}
};

export { POST };
//# sourceMappingURL=_server.ts-l6XXpE3I.js.map
