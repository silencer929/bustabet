import { d as db } from './db-CF_k3vJ4.js';
import { f as fail, r as redirect, e as error } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/games/[id]/settle/+page.server.ts
var load = async ({ params, locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [games] = await db.execute(`SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status 
     FROM admin_games 
     WHERE id = ? LIMIT 1`, [params.id]);
	if (games.length === 0) throw error(404, "Match fixture not found");
	const game = games[0];
	const [markets] = await db.execute(`SELECT id, game_id as gameId, market_name as marketName, selection, odds, active 
     FROM admin_game_markets 
     WHERE game_id = ?`, [params.id]);
	return { game: {
		id: game.id,
		sport: game.sport,
		league: game.league,
		homeTeam: game.homeTeam,
		awayTeam: game.awayTeam,
		startTime: new Date(game.startTime),
		status: game.status,
		markets: markets.map((m) => ({
			id: m.id,
			gameId: m.gameId,
			marketName: m.marketName,
			selection: m.selection,
			odds: Number(m.odds),
			active: Boolean(m.active)
		}))
	} };
};
var actions = {
	settleWithScores: async ({ request, params, locals }) => {
		if (!locals.user) return fail(401);
		const formData = await request.formData();
		const homeScoreStr = formData.get("homeScore");
		const awayScoreStr = formData.get("awayScore");
		const homeScore = parseInt(homeScoreStr, 10);
		const awayScore = parseInt(awayScoreStr, 10);
		if (isNaN(homeScore) || isNaN(awayScore) || homeScore < 0 || awayScore < 0) return fail(400, { error: "Please enter valid, non-negative scores for both teams" });
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [games] = await conn.execute("SELECT home_team, away_team FROM admin_games WHERE id = ? LIMIT 1", [params.id]);
			if (games.length === 0) throw new Error("Fixture not found");
			const game = games[0];
			const [pendingBets] = await conn.execute(`SELECT b.id, b.profile_id, b.stake, b.odds, b.potential_win,
                m.selection, m.market_name
         FROM bets b
         INNER JOIN admin_game_markets m ON b.market_id = m.id
         WHERE b.game_id = ? AND b.status = 'PENDING'`, [params.id]);
			let h2hWinner = "Draw";
			if (homeScore > awayScore) h2hWinner = game.home_team;
			else if (awayScore > homeScore) h2hWinner = game.away_team;
			const isBttsYes = homeScore > 0 && awayScore > 0;
			const correctScoreLine = `${homeScore} - ${awayScore}`;
			const homeWinToNil = homeScore > awayScore && awayScore === 0;
			const awayWinToNil = awayScore > homeScore && homeScore === 0;
			for (const bet of pendingBets) {
				let isWon = false;
				let isVoid = false;
				const sel = bet.selection.toUpperCase();
				if (bet.market_name === "h2h") isWon = bet.selection === h2hWinner;
				else if (bet.market_name === "double_chance") if (homeScore > awayScore) isWon = sel.includes("HOME OR AWAY") || sel.includes("HOME OR DRAW");
				else if (awayScore > homeScore) isWon = sel.includes("HOME OR AWAY") || sel.includes("DRAW OR AWAY");
				else isWon = sel.includes("HOME OR DRAW") || sel.includes("DRAW OR AWAY");
				else if (bet.market_name === "draw_no_bet") if (homeScore === awayScore) isVoid = true;
				else isWon = homeScore > awayScore && sel.includes("HOME") || awayScore > homeScore && sel.includes("AWAY");
				else if (bet.market_name === "btts") isWon = isBttsYes && sel.includes("YES") || !isBttsYes && sel.includes("NO");
				else if (bet.market_name === "correct_score") isWon = bet.selection === correctScoreLine;
				else if (bet.market_name === "win_to_nil") if (sel.includes(game.home_team.toUpperCase())) isWon = homeWinToNil && sel.includes("YES") || !homeWinToNil && sel.includes("NO");
				else isWon = awayWinToNil && sel.includes("YES") || !awayWinToNil && sel.includes("NO");
				else if (bet.market_name === "totals" || bet.market_name === "over_under") {
					const totalGoals = homeScore + awayScore;
					const point = parseFloat(bet.selection.split(" ").pop() || "0");
					if (sel.includes("OVER")) isWon = totalGoals > point;
					else isWon = totalGoals < point;
				}
				if (isVoid) {
					await conn.execute("UPDATE bets SET status = \"VOIDED\" WHERE id = ?", [bet.id]);
					await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'DEPOSIT', ?, 'USD', 'COMPLETED', ?)`, [
						crypto.randomUUID(),
						bet.profile_id,
						bet.stake,
						`VOID-REF-${bet.id}`
					]);
				} else if (isWon) {
					await conn.execute("UPDATE bets SET status = \"WON\" WHERE id = ?", [bet.id]);
					await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`, [
						crypto.randomUUID(),
						bet.profile_id,
						bet.potential_win,
						`PAY-${bet.id}`
					]);
				} else await conn.execute("UPDATE bets SET status = \"LOST\" WHERE id = ?", [bet.id]);
				const alertTitle = isVoid ? "Bet Voided & Refunded" : isWon ? "Wager Won!" : "Wager Settled";
				const alertMsg = isVoid ? `Your bet on ${game.home_team} vs ${game.away_team} was voided (Draw). Stake refunded.` : isWon ? `Congratulations! Your bet on ${game.home_team} vs ${game.away_team} was won.` : `Your bet on ${game.home_team} vs ${game.away_team} was settled as lost.`;
				await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) VALUES (?, ?, ?, ?, 0)`, [
					crypto.randomUUID(),
					bet.profile_id,
					alertTitle,
					alertMsg
				]);
			}
			await conn.execute(`UPDATE admin_games 
         SET status = 'COMPLETED', home_score = ?, away_score = ? 
         WHERE id = ?`, [
				homeScore,
				awayScore,
				params.id
			]);
			await conn.execute("UPDATE admin_game_markets SET active = 0 WHERE game_id = ?", [params.id]);
			await conn.commit();
			return {
				success: true,
				message: "Game score registered and all wagers settled successfully!"
			};
		} catch (error) {
			await conn.rollback();
			return fail(500, { error: error.message || "Failed to settle game wagers" });
		} finally {
			conn.release();
		}
	},
	settleMarketManually: async ({ request, params, locals }) => {
		if (!locals.user) return fail(401);
		const formData = await request.formData();
		const marketName = formData.get("marketName");
		const winningSelection = formData.get("winningSelection");
		if (!marketName || !winningSelection) return fail(400, { error: "Please select both the market and the winning outcome" });
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [pendingBets] = await conn.execute(`SELECT b.id, b.profile_id, b.potential_win, b.stake, m.selection, m.id as market_id,
                g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_game_markets m ON b.market_id = m.id
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.game_id = ? AND m.market_name = ? AND b.status = 'PENDING'`, [params.id, marketName]);
			for (const bet of pendingBets) if (bet.selection === winningSelection) {
				await conn.execute("UPDATE bets SET status = \"WON\" WHERE id = ?", [bet.id]);
				await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`, [
					crypto.randomUUID(),
					bet.profile_id,
					bet.potential_win,
					`MAN-PAY-${bet.id}`
				]);
				await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
             VALUES (?, ?, ?, ?, 0)`, [
					crypto.randomUUID(),
					bet.profile_id,
					"Wager Settled: Won!",
					`Your wager on ${bet.home_team} vs ${bet.away_team} (${bet.selection}) was resolved as won. Payout processed.`
				]);
			} else {
				await conn.execute("UPDATE bets SET status = \"LOST\" WHERE id = ?", [bet.id]);
				await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
             VALUES (?, ?, ?, ?, 0)`, [
					crypto.randomUUID(),
					bet.profile_id,
					"Wager Settled",
					`Your wager on ${bet.home_team} vs ${bet.away_team} (${bet.selection}) was resolved as lost.`
				]);
			}
			await conn.execute("UPDATE admin_games SET status = \"COMPLETED\" WHERE id = ?", [params.id]);
			await conn.execute("UPDATE admin_game_markets SET active = 0 WHERE game_id = ?", [params.id]);
			await conn.commit();
			return {
				success: true,
				message: "Market settled and payouts processed successfully!"
			};
		} catch (error) {
			await conn.rollback();
			return fail(500, { error: error.message || "Failed to settle market" });
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

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C1x-AEKM.js')).default;
const server_id = "src/routes/admin/games/[id]/settle/+page.server.ts";
const imports = ["_app/immutable/nodes/8.6TzvE3QX.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BVGcDGVq.js","_app/immutable/chunks/p1RKQm4f.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/EfA6GbtJ.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/BQthCCqQ.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-DQzfF8jH.js.map
