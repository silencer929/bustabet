import { d as db } from './db-BcGa8hoB.js';
import { O as OddsApiService } from './oddsApi.service-DJaFwB71.js';
import { j as json } from './index-BQZSrJq2.js';
import '@prisma/client';
import './private-CPklkgrX.js';
import './index-DBqjc0Yf.js';

//#region src/lib/server/services/oddsSync.service.ts
var OddsSyncService = class {
	static async syncSportOdds(sportKey) {
		const rawOdds = await OddsApiService.getOdds(sportKey);
		for (const match of rawOdds) {
			const commenceTime = new Date(match.commence_time);
			const isLive = /* @__PURE__ */ new Date() >= commenceTime;
			await db.$transaction(async (tx) => {
				const game = await tx.adminGame.upsert({
					where: { id: match.id },
					update: {
						status: isLive ? "LIVE" : "UPCOMING",
						startTime: commenceTime
					},
					create: {
						id: match.id,
						sport: match.sport_key,
						league: match.sport_title,
						homeTeam: match.home_team,
						awayTeam: match.away_team,
						startTime: commenceTime,
						status: "UPCOMING"
					}
				});
				if (!match.bookmakers || match.bookmakers.length === 0) return;
				const primaryBookmaker = match.bookmakers[0];
				await tx.adminGameMarket.updateMany({
					where: { gameId: game.id },
					data: { active: false }
				});
				for (const market of primaryBookmaker.markets) for (const outcome of market.outcomes) {
					const existingSelection = await tx.adminGameMarket.findFirst({ where: {
						gameId: game.id,
						marketName: market.key,
						selection: outcome.name
					} });
					if (existingSelection) await tx.adminGameMarket.update({
						where: { id: existingSelection.id },
						data: {
							odds: outcome.price,
							active: true
						}
					});
					else await tx.adminGameMarket.create({ data: {
						gameId: game.id,
						marketName: market.key,
						selection: outcome.name,
						odds: outcome.price,
						active: true
					} });
				}
			});
		}
	}
};
//#endregion
//#region src/routes/api/sync-odds/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== "cronsecret123") return json({
		success: false,
		message: "Unauthorized access"
	}, { status: 401 });
	try {
		await OddsSyncService.syncSportOdds("upcoming");
		return json({
			success: true,
			message: "Dynamic upcoming odds synced successfully across all active sports"
		});
	} catch (error) {
		console.error("[API Sync Odds Error]:", error);
		return json({
			success: false,
			message: error.message || "An unexpected error occurred during sync"
		}, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-De9G6JoO.js.map
