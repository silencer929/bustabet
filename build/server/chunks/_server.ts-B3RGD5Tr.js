import { d as db } from './db-CF_k3vJ4.js';
import { O as OddsApiService } from './oddsApi.service-bKwp7aEE.js';
import { S as SettlementService } from './settlement.service-CS3TIz8T.js';
import { j as json } from './index-BQZSrJq2.js';
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

//#region src/lib/server/services/scoresSync.service.ts
var ScoresSyncService = class {
	static async syncLiveScores(sportKey) {
		const scores = await OddsApiService.getScores(sportKey, 1);
		const conn = await db.getConnection();
		try {
			for (const match of scores) {
				if (match.id.startsWith("MAN-") || !match.scores || match.scores.length === 0) continue;
				const homeScoreObj = match.scores.find((s) => s.name === match.home_team);
				const awayScoreObj = match.scores.find((s) => s.name === match.away_team);
				if (!homeScoreObj || !awayScoreObj) continue;
				const homeScore = parseInt(homeScoreObj.score, 10);
				const awayScore = parseInt(awayScoreObj.score, 10);
				const gameStatus = match.completed ? "COMPLETED" : "LIVE";
				await conn.beginTransaction();
				const [existing] = await conn.execute("SELECT id FROM admin_games WHERE id = ? AND id NOT LIKE \"MAN-%\" LIMIT 1", [match.id]);
				if (existing.length > 0) {
					await conn.execute(`UPDATE admin_games 
             SET home_score = ?, away_score = ?, status = ? 
             WHERE id = ?`, [
						homeScore,
						awayScore,
						gameStatus,
						match.id
					]);
					if (match.completed) await conn.execute("UPDATE admin_game_markets SET active = 0 WHERE game_id = ?", [match.id]);
				}
				await conn.commit();
				if (match.completed) try {
					await SettlementService.settleSportBets(sportKey);
				} catch (settleError) {
					console.error(`[Instant Settlement Error] Failed to settle bets for: ${match.id}`, settleError);
				}
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
//#region src/routes/api/sync-live-scores/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== "cronsecret123") return json({
		success: false,
		message: "Unauthorized access"
	}, { status: 401 });
	try {
		const [liveSports] = await db.execute("SELECT DISTINCT sport FROM admin_games WHERE status = 'LIVE'");
		if (liveSports.length === 0) return json({
			success: true,
			message: "No live matches active in the database. Sync skipped (0 credits used)."
		});
		const syncedLeagues = [];
		for (const row of liveSports) {
			await ScoresSyncService.syncLiveScores(row.sport);
			syncedLeagues.push(row.sport);
		}
		return json({
			success: true,
			message: "Active live scores updated successfully",
			synced: syncedLeagues
		});
	} catch (error) {
		console.error("[API Sync Live Scores Error]:", error);
		return json({
			success: false,
			message: error.message || "An unexpected error occurred during score sync"
		}, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-B3RGD5Tr.js.map
