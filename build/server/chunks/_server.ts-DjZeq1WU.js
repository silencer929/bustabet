import { d as db } from './db-BcGa8hoB.js';
import { O as OddsApiService } from './oddsApi.service-DJaFwB71.js';
import { j as json } from './index-BQZSrJq2.js';
import '@prisma/client';
import './private-CPklkgrX.js';
import './index-DBqjc0Yf.js';

//#region src/lib/server/services/settlement.service.ts
var SettlementService = class {
	static async settleSportBets(sportKey) {
		const scores = await OddsApiService.getScores(sportKey, 3);
		for (const match of scores) {
			if (!match.completed || !match.scores) continue;
			const pendingBets = await db.bet.findMany({
				where: {
					gameId: match.id,
					status: "PENDING"
				},
				include: {
					market: true,
					game: true
				}
			});
			if (pendingBets.length === 0) {
				await db.adminGame.update({
					where: { id: match.id },
					data: { status: "COMPLETED" }
				});
				continue;
			}
			const homeScoreObj = match.scores.find((s) => s.name === match.home_team);
			const awayScoreObj = match.scores.find((s) => s.name === match.away_team);
			if (!homeScoreObj || !awayScoreObj) continue;
			const homeScore = parseInt(homeScoreObj.score, 10);
			const awayScore = parseInt(awayScoreObj.score, 10);
			let h2hWinningSelection = "Draw";
			if (homeScore > awayScore) h2hWinningSelection = match.home_team;
			else if (awayScore > homeScore) h2hWinningSelection = match.away_team;
			for (const bet of pendingBets) await db.$transaction(async (tx) => {
				let isWon = false;
				if (bet.market.marketName === "h2h") isWon = bet.market.selection === h2hWinningSelection;
				if (isWon) {
					await tx.bet.update({
						where: { id: bet.id },
						data: { status: "WON" }
					});
					await tx.transaction.create({ data: {
						profileId: bet.profileId,
						type: "PAYOUT",
						amount: bet.potentialWin,
						currency: "USD",
						status: "COMPLETED",
						reference: `PAY-${bet.id}`
					} });
					await tx.notification.create({ data: {
						profileId: bet.profileId,
						title: "Bet Won!",
						message: `Congratulations! Your bet on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was won. Payout added.`,
						read: false
					} });
				} else {
					await tx.bet.update({
						where: { id: bet.id },
						data: { status: "LOST" }
					});
					await tx.notification.create({ data: {
						profileId: bet.profileId,
						title: "Bet Settled",
						message: `Your bet on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was settled as lost.`,
						read: false
					} });
				}
			});
			await db.adminGame.update({
				where: { id: match.id },
				data: { status: "COMPLETED" }
			});
		}
	}
};
//#endregion
//#region src/routes/api/settle-bets/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== "cronsecret123") return json({
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
//# sourceMappingURL=_server.ts-DjZeq1WU.js.map
