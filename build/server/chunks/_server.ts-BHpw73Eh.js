import { b as private_env } from './shared-server-9-2j12mp.js';
import { d as db } from './db-CF_k3vJ4.js';
import { O as OddsApiService } from './oddsApi.service-bKwp7aEE.js';
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

//#region src/lib/server/services/settlement.service.ts
var SettlementService = class {
	static async settleSportBets(sportKey) {
		const scores = await OddsApiService.getScores(sportKey, 3);
		const conn = await db.getConnection();
		try {
			for (const match of scores) {
				if (!match.completed || !match.scores) continue;
				const [pendingBets] = await conn.execute(`SELECT b.id, b.profile_id, b.stake, b.odds, b.potential_win,
                  m.selection, m.market_name,
                  g.home_team, g.away_team
           FROM bets b
           INNER JOIN admin_game_markets m ON b.market_id = m.id
           INNER JOIN admin_games g ON b.game_id = g.id
           WHERE b.game_id = ? AND b.status = 'PENDING'`, [match.id]);
				if (pendingBets.length === 0) {
					await conn.execute("UPDATE admin_games SET status = \"COMPLETED\" WHERE id = ?", [match.id]);
					continue;
				}
				const homeScoreObj = match.scores.find((s) => s.name === match.home_team);
				const awayScoreObj = match.scores.find((s) => s.name === match.away_team);
				if (!homeScoreObj || !awayScoreObj) continue;
				const homeScore = parseInt(homeScoreObj.score, 10);
				const awayScore = parseInt(awayScoreObj.score, 10);
				let h2hWinner = "Draw";
				if (homeScore > awayScore) h2hWinner = match.home_team;
				else if (awayScore > homeScore) h2hWinner = match.away_team;
				for (const bet of pendingBets) {
					await conn.beginTransaction();
					let isWon = false;
					if (bet.market_name === "h2h") isWon = bet.selection === h2hWinner;
					if (isWon) {
						await conn.execute("UPDATE bets SET status = \"WON\" WHERE id = ?", [bet.id]);
						await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
               VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`, [
							crypto.randomUUID(),
							bet.profile_id,
							bet.potential_win,
							`PAY-${bet.id}`
						]);
						await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
               VALUES (?, ?, ?, ?, 0)`, [
							crypto.randomUUID(),
							bet.profile_id,
							"Bet Won!",
							`Congratulations! Your bet on ${bet.home_team} vs ${bet.away_team} was won. Payout processed.`
						]);
					} else {
						await conn.execute("UPDATE bets SET status = \"LOST\" WHERE id = ?", [bet.id]);
						await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
               VALUES (?, ?, ?, ?, 0)`, [
							crypto.randomUUID(),
							bet.profile_id,
							"Bet Settled",
							`Your bet on ${bet.home_team} vs ${bet.away_team} was settled as lost.`
						]);
					}
					await conn.commit();
				}
				await conn.execute("UPDATE admin_games SET status = \"COMPLETED\" WHERE id = ?", [match.id]);
			}
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
};
//#endregion
//#region src/routes/api/settle-bets/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== private_env.CRON_SECRET) return json({
		success: false,
		message: "Unauthorized access"
	}, { status: 401 });
	try {
		await SettlementService.settleSportBets("upcoming");
		return json({
			success: true,
			message: "Global bet settlements updated successfully"
		});
	} catch (error) {
		console.error("[API Settle Bets Error]:", error);
		return json({
			success: false,
			message: error.message || "An unexpected error occurred during settlement"
		}, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-BHpw73Eh.js.map
