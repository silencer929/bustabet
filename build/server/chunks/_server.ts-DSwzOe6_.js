import { b as private_env } from './shared-server-9-2j12mp.js';
import { d as db } from './db-CF_k3vJ4.js';
import { O as OddsApiService } from './oddsApi.service-ClTp4Ns_.js';
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

//#region src/lib/server/services/oddsSync.service.ts
var OddsSyncService = class {
	static async syncSportOdds(sportKey) {
		const rawOdds = await OddsApiService.getOdds(sportKey);
		const conn = await db.getConnection();
		try {
			for (const match of rawOdds) {
				const commenceTime = new Date(match.commence_time);
				const gameStatus = /* @__PURE__ */ new Date() >= commenceTime ? "LIVE" : "UPCOMING";
				await conn.beginTransaction();
				const [existingGames] = await conn.execute("SELECT id FROM admin_games WHERE id = ? LIMIT 1", [match.id]);
				if (existingGames.length > 0) await conn.execute("UPDATE admin_games SET status = ?, start_time = ? WHERE id = ?", [
					gameStatus,
					commenceTime,
					match.id
				]);
				else await conn.execute("INSERT INTO admin_games (id, sport, league, home_team, away_team, start_time, status) VALUES (?, ?, ?, ?, ?, ?, ?)", [
					match.id,
					match.sport_key,
					match.sport_title,
					match.home_team,
					match.away_team,
					commenceTime,
					"UPCOMING"
				]);
				if (!match.bookmakers || match.bookmakers.length === 0) {
					await conn.commit();
					continue;
				}
				const primaryBookmaker = match.bookmakers[0];
				await conn.execute("UPDATE admin_game_markets SET active = 0 WHERE game_id = ?", [match.id]);
				for (const market of primaryBookmaker.markets) for (const outcome of market.outcomes) {
					const [existingMarkets] = await conn.execute("SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1", [
						match.id,
						market.key,
						outcome.name
					]);
					if (existingMarkets.length > 0) await conn.execute("UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?", [outcome.price, existingMarkets[0].id]);
					else {
						const marketId = crypto.randomUUID();
						await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)", [
							marketId,
							match.id,
							market.key,
							outcome.name,
							outcome.price
						]);
					}
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
//#endregion
//#region src/routes/api/sync-odds/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== private_env.CRON_SECRET) return json({
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
//# sourceMappingURL=_server.ts-DSwzOe6_.js.map
