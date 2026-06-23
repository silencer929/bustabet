import { d as db } from './db-CF_k3vJ4.js';
import { O as OddsApiService } from './oddsApi.service-bKwp7aEE.js';
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

//#region src/lib/server/services/oddsEngine.service.ts
var OddsEngineService = class {
	static VIG_MARGIN = 1.07;
	static factorial(n) {
		if (n === 0 || n === 1) return 1;
		let result = 1;
		for (let i = 2; i <= n; i++) result *= i;
		return result;
	}
	static poissonProbability(lambda, k) {
		return Math.exp(-lambda) * Math.pow(lambda, k) / this.factorial(k);
	}
	static synthesizeDoubleChance(homeOdds, drawOdds, awayOdds, homeTeam, awayTeam) {
		const pH = 1 / homeOdds;
		const pD = 1 / drawOdds;
		const pA = 1 / awayOdds;
		const sum = pH + pD + pA;
		const nH = pH / sum;
		const nD = pD / sum;
		const nA = pA / sum;
		return [
			{
				selection: `${homeTeam} or Draw`,
				odds: Number((1 / ((nH + nD) * this.VIG_MARGIN)).toFixed(2))
			},
			{
				selection: `Draw or ${awayTeam}`,
				odds: Number((1 / ((nD + nA) * this.VIG_MARGIN)).toFixed(2))
			},
			{
				selection: `${homeTeam} or ${awayTeam}`,
				odds: Number((1 / ((nH + nA) * this.VIG_MARGIN)).toFixed(2))
			}
		];
	}
	static synthesizeDrawNoBet(homeOdds, drawOdds, awayOdds, homeTeam, awayTeam) {
		const pH = 1 / homeOdds;
		const pD = 1 / drawOdds;
		const pA = 1 / awayOdds;
		const sum = pH + pD + pA;
		const nH = pH / sum;
		const nD = pD / sum;
		const nA = pA / sum;
		const pHomeNoDraw = nH / (1 - nD);
		const pAwayNoDraw = nA / (1 - nD);
		return [{
			selection: `${homeTeam} (Draw No Bet)`,
			odds: Number((1 / (pHomeNoDraw * this.VIG_MARGIN)).toFixed(2))
		}, {
			selection: `${awayTeam} (Draw No Bet)`,
			odds: Number((1 / (pAwayNoDraw * this.VIG_MARGIN)).toFixed(2))
		}];
	}
	static synthesizeBothTeamsToScore(over25Odds) {
		const pOver = 1 / over25Odds;
		const pYes = Math.max(.15, Math.min(.85, pOver * .82));
		const pNo = 1 - pYes;
		return [{
			selection: "Yes (BTTS)",
			odds: Number((1 / (pYes * this.VIG_MARGIN)).toFixed(2))
		}, {
			selection: "No (BTTS)",
			odds: Number((1 / (pNo * this.VIG_MARGIN)).toFixed(2))
		}];
	}
	static synthesizeCorrectScores(homeOdds, drawOdds, awayOdds, over25Odds) {
		const pH = 1 / homeOdds;
		const pD = 1 / drawOdds;
		const pA = 1 / awayOdds;
		const sum = pH + pD + pA;
		const nH = pH / sum;
		const nA = pA / sum;
		const expectedTotalGoals = Math.max(1.5, Math.min(4.5, 2.5 + (2 - over25Odds) * 1.1));
		const lambdaHome = expectedTotalGoals * (nH / (nH + nA));
		const muAway = expectedTotalGoals * (nA / (nH + nA));
		const scores = [];
		const scoreLines = [
			{
				h: 1,
				a: 0
			},
			{
				h: 2,
				a: 0
			},
			{
				h: 2,
				a: 1
			},
			{
				h: 3,
				a: 0
			},
			{
				h: 3,
				a: 1
			},
			{
				h: 3,
				a: 2
			},
			{
				h: 0,
				a: 1
			},
			{
				h: 0,
				a: 2
			},
			{
				h: 1,
				a: 2
			},
			{
				h: 0,
				a: 3
			},
			{
				h: 1,
				a: 3
			},
			{
				h: 2,
				a: 3
			},
			{
				h: 0,
				a: 0
			},
			{
				h: 1,
				a: 1
			},
			{
				h: 2,
				a: 2
			},
			{
				h: 3,
				a: 3
			}
		];
		const scoreVig = 1.15;
		for (const line of scoreLines) {
			const jointProb = this.poissonProbability(lambdaHome, line.h) * this.poissonProbability(muAway, line.a);
			const odds = Math.max(1.05, Math.min(100, 1 / (jointProb * scoreVig)));
			scores.push({
				selection: `${line.h} - ${line.a}`,
				odds: Number(odds.toFixed(2))
			});
		}
		return scores;
	}
};
//#endregion
//#region src/lib/server/services/oddsSync.service.ts
var OddsSyncService = class {
	static FAMOUS_LEAGUES = [
		"soccer_english_premier_league",
		"basketball_nba",
		"tennis_atp_singles",
		"americanfootball_nfl",
		"soccer_brazil_serie_b",
		"soccer_china_superleague",
		"soccer_conmebol_copa_libertadores",
		"soccer_conmebol_copa_sudamericanas",
		"soccer_fifa_world_cup",
		"soccer_fifa_world_cup_winners",
		"soccer_finland_veikkausliiga",
		"soccer_germany_dfb_pokal",
		"soccer_italy_serie_a",
		"soccer_league_of_ireland",
		"soccer_norway_eliteserien",
		"soccer_spain_segunda_division",
		"soccer_sweden_allsvenskan",
		"soccer_sweden_superettan",
		"americanfootball_cfl",
		"americanfootball_ncaaf",
		"americanfootball_ncaaf_championship_winner",
		"americanfootball_nfl",
		"americanfootball_nfl_preseason"
	];
	static cacheLock = /* @__PURE__ */ new Map();
	static isCacheFresh(key, maxAgeMs) {
		const lastSync = this.cacheLock.get(key);
		if (!lastSync) return false;
		return Date.now() - lastSync < maxAgeMs;
	}
	static setCacheTimestamp(key) {
		this.cacheLock.set(key, Date.now());
	}
	static parseOddsToDecimal(price) {
		if (price === 0) return 1.01;
		if (price >= 100) return Number((price / 100 + 1).toFixed(2));
		else if (price <= -100) return Number((100 / Math.abs(price) + 1).toFixed(2));
		return Number(price.toFixed(2));
	}
	static async syncSportOddsStandard(sportKey) {
		if (this.isCacheFresh(sportKey, 36e5)) {
			console.log(`[Cache Guard] Standard odds for ${sportKey} are fresh.`);
			return;
		}
		const rawOdds = await OddsApiService.getOdds(sportKey, "us,eu", "h2h,spreads,totals");
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
				const bookmaker = match.bookmakers.find((b) => b.key === "pinnacle") || match.bookmakers[0];
				await conn.execute("UPDATE admin_game_markets SET active = 0 WHERE game_id = ?", [match.id]);
				let h2hHome = 2, h2hDraw = 3.4, h2hAway = 3, over25 = 1.9;
				for (const market of bookmaker.markets) for (const outcome of market.outcomes) {
					const normalizedOdds = this.parseOddsToDecimal(outcome.price);
					if (market.key === "h2h") if (outcome.name === match.home_team) h2hHome = normalizedOdds;
					else if (outcome.name === "Draw") h2hDraw = normalizedOdds;
					else h2hAway = normalizedOdds;
					else if (market.key === "totals" && outcome.name === "Over" && outcome.point === 2.5) over25 = normalizedOdds;
					const [existingMarkets] = await conn.execute("SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1", [
						match.id,
						market.key,
						outcome.name
					]);
					if (existingMarkets.length > 0) await conn.execute("UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?", [normalizedOdds, existingMarkets[0].id]);
					else await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)", [
						crypto.randomUUID(),
						match.id,
						market.key,
						outcome.name,
						normalizedOdds
					]);
				}
				const dc = OddsEngineService.synthesizeDoubleChance(h2hHome, h2hDraw, h2hAway, match.home_team, match.away_team);
				for (const item of dc) await this.upsertSynthesizedLine(conn, match.id, "double_chance", item.selection, item.odds);
				const dnb = OddsEngineService.synthesizeDrawNoBet(h2hHome, h2hDraw, h2hAway, match.home_team, match.away_team);
				for (const item of dnb) await this.upsertSynthesizedLine(conn, match.id, "draw_no_bet", item.selection, item.odds);
				const btts = OddsEngineService.synthesizeBothTeamsToScore(over25);
				for (const item of btts) await this.upsertSynthesizedLine(conn, match.id, "over_under", item.selection, item.odds);
				const scores = OddsEngineService.synthesizeCorrectScores(h2hHome, h2hDraw, h2hAway, over25);
				for (const item of scores) await this.upsertSynthesizedLine(conn, match.id, "correct_score", item.selection, item.odds);
				await conn.commit();
			}
			this.setCacheTimestamp(sportKey);
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
	static async upsertSynthesizedLine(conn, gameId, marketName, selection, odds) {
		const [existing] = await conn.execute("SELECT id FROM admin_game_markets WHERE game_id = ? AND market_name = ? AND selection = ? LIMIT 1", [
			gameId,
			marketName,
			selection
		]);
		if (existing.length > 0) await conn.execute("UPDATE admin_game_markets SET odds = ?, active = 1 WHERE id = ?", [odds, existing[0].id]);
		else await conn.execute("INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)", [
			crypto.randomUUID(),
			gameId,
			marketName,
			selection,
			odds
		]);
	}
	static async syncFamousLeaguesStandard() {
		const syncedLeagues = [];
		for (const league of this.FAMOUS_LEAGUES) try {
			await this.syncSportOddsStandard(league);
			syncedLeagues.push(league);
		} catch (error) {
			console.error(`[Standard Sync Error] Failed to process league: ${league}`, error);
		}
		return syncedLeagues;
	}
};

//#region src/routes/api/sync-odds/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== "cronsecret123") return json({
		success: false,
		message: "Unauthorized access"
	}, { status: 401 });
	const eventId = url.searchParams.get("eventId");
	const sport = url.searchParams.get("sport");
	try {
		if (eventId && sport) return json({
			success: true,
			message: `Deep harvest sync requested for event: ${eventId}`
		});
		else return json({
			success: true,
			message: "Standard famous leagues sync execution complete",
			synced: await OddsSyncService.syncFamousLeaguesStandard()
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
//# sourceMappingURL=_server.ts-BEUIfikQ.js.map
