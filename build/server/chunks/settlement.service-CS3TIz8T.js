import { d as db } from './db-CF_k3vJ4.js';
import { O as OddsApiService } from './oddsApi.service-bKwp7aEE.js';

//#region src/lib/server/services/settlement.service.ts
var SettlementService = class {
	static async settleSportBets(sportKey) {
		const scores = await OddsApiService.getScores(sportKey, 3);
		const conn = await db.getConnection();
		try {
			for (const match of scores) {
				if (match.id.startsWith("MAN-") || !match.completed || !match.scores) continue;
				const [pendingBets] = await conn.execute(`SELECT b.id, b.profile_id, b.stake, b.odds, b.potential_win,
                  m.selection, m.market_name,
                  g.home_team, g.away_team
           FROM bets b
           INNER JOIN admin_game_markets m ON b.market_id = m.id
           INNER JOIN admin_games g ON b.game_id = g.id
           WHERE b.game_id = ? AND b.status = 'PENDING' AND b.type = 'SINGLE'`, [match.id]);
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
	static async settleComboBets() {
		const conn = await db.getConnection();
		try {
			const [pendingCombos] = await conn.execute("SELECT id, profile_id, stake, odds, potential_win, selections FROM bets WHERE status = 'PENDING' AND type = 'COMBO'");
			for (const bet of pendingCombos) {
				const selections = typeof bet.selections === "string" ? JSON.parse(bet.selections) : bet.selections;
				let hasLost = false;
				let allCompleted = true;
				let adjustedOdds = Number(bet.odds);
				for (const leg of selections) {
					const [details] = await conn.execute(`SELECT m.selection, m.market_name, m.odds as selectionOdds,
                    g.status as gameStatus, g.home_score as homeScore, g.away_score as awayScore, g.home_team as homeTeam, g.away_team as awayTeam
             FROM admin_game_markets m
             INNER JOIN admin_games g ON m.game_id = g.id
             WHERE m.id = ? LIMIT 1`, [leg.marketId]);
					if (details.length === 0) {
						allCompleted = false;
						continue;
					}
					const match = details[0];
					if (match.gameStatus !== "COMPLETED") {
						allCompleted = false;
						continue;
					}
					const homeScore = Number(match.homeScore);
					const awayScore = Number(match.awayScore);
					const sel = match.selection.toUpperCase();
					let legWon = false;
					let legVoid = false;
					if (match.market_name === "h2h") {
						let h2hWinner = "Draw";
						if (homeScore > awayScore) h2hWinner = match.homeTeam;
						else if (awayScore > homeScore) h2hWinner = match.awayTeam;
						legWon = match.selection === h2hWinner;
					} else if (match.market_name === "double_chance") if (homeScore > awayScore) legWon = sel.includes("HOME OR AWAY") || sel.includes("HOME OR DRAW");
					else if (awayScore > homeScore) legWon = sel.includes("HOME OR AWAY") || sel.includes("DRAW OR AWAY");
					else legWon = sel.includes("HOME OR DRAW") || sel.includes("DRAW OR AWAY");
					else if (match.market_name === "draw_no_bet") if (homeScore === awayScore) legVoid = true;
					else legWon = homeScore > awayScore && sel.includes(match.homeTeam.toUpperCase()) || awayScore > homeScore && sel.includes(match.awayTeam.toUpperCase());
					else if (match.market_name === "btts") {
						const isBttsYes = homeScore > 0 && awayScore > 0;
						legWon = isBttsYes && sel.includes("YES") || !isBttsYes && sel.includes("NO");
					} else if (match.market_name === "correct_score") legWon = match.selection === `${homeScore} - ${awayScore}`;
					else if (match.market_name === "win_to_nil") {
						const homeWinToNil = homeScore > awayScore && awayScore === 0;
						const awayWinToNil = awayScore > homeScore && homeScore === 0;
						if (sel.includes(match.homeTeam.toUpperCase())) legWon = homeWinToNil && sel.includes("YES") || !homeWinToNil && sel.includes("NO");
						else legWon = awayWinToNil && sel.includes("YES") || !awayWinToNil && sel.includes("NO");
					} else if (match.market_name === "totals" || match.market_name === "over_under") {
						const totalGoals = homeScore + awayScore;
						const point = parseFloat(match.selection.split(" ").pop() || "0");
						if (sel.includes("OVER")) legWon = totalGoals > point;
						else legWon = totalGoals < point;
					}
					if (legVoid) adjustedOdds = Math.max(1, Number((adjustedOdds / Number(match.selectionOdds)).toFixed(2)));
					else if (!legWon) {
						hasLost = true;
						break;
					}
				}
				await conn.beginTransaction();
				if (hasLost) {
					await conn.execute("UPDATE bets SET status = \"LOST\" WHERE id = ?", [bet.id]);
					await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) VALUES (?, ?, "Multibet Lost", ?, 0)`, [
						crypto.randomUUID(),
						bet.profile_id,
						"Your combo multibet wager was settled as lost. Better luck next time!"
					]);
				} else if (allCompleted) {
					const finalPotentialWin = Number((Number(bet.stake) * adjustedOdds).toFixed(2));
					await conn.execute("UPDATE bets SET status = \"WON\", odds = ?, potential_win = ? WHERE id = ?", [
						adjustedOdds,
						finalPotentialWin,
						bet.id
					]);
					await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`, [
						crypto.randomUUID(),
						bet.profile_id,
						finalPotentialWin,
						`PAY-${bet.id}`
					]);
					await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) VALUES (?, ?, "Multibet Won!", ?, 0)`, [
						crypto.randomUUID(),
						bet.profile_id,
						`Congratulations! Your combo multibet wager was won. Payout of ${finalPotentialWin} processed.`
					]);
				}
				await conn.commit();
			}
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
};

export { SettlementService as S };
//# sourceMappingURL=settlement.service-CS3TIz8T.js.map
