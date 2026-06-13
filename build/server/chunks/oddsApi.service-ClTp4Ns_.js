import { b as private_env } from './shared-server-9-2j12mp.js';

//#region src/lib/server/services/oddsApi.service.ts
var OddsApiService = class {
	static baseUrl = "https://api.the-odds-api.com/v4";
	static async executeFetch(endpoint) {
		const separator = endpoint.includes("?") ? "&" : "?";
		const response = await fetch(`${this.baseUrl}${endpoint}${separator}apiKey=${private_env.ODDS_API_KEY}`);
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`The Odds API Request Failed [${response.status}]: ${errorText}`);
		}
		const remainingQuota = response.headers.get("x-requests-remaining");
		const lastRequestCost = response.headers.get("x-requests-last");
		if (remainingQuota !== null && lastRequestCost !== null) console.log(`[Odds API Quota Log] Remaining Credits: ${remainingQuota} | Last Call Cost: ${lastRequestCost}`);
		return await response.json();
	}
	static async getSports(allSeason = false) {
		const endpoint = `/sports${allSeason ? "?all=true" : ""}`;
		return await this.executeFetch(endpoint);
	}
	static async getOdds(sportKey, regions = "eu,us", markets = "h2h", oddsFormat = "decimal") {
		const endpoint = `/sports/${sportKey}/odds/?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`;
		return await this.executeFetch(endpoint);
	}
	static async getScores(sportKey, daysFrom) {
		const endpoint = `/sports/${sportKey}/scores/${daysFrom ? `?daysFrom=${daysFrom}` : ""}`;
		return await this.executeFetch(endpoint);
	}
	static async getEventOdds(sportKey, eventId, regions = "eu,us", markets = "h2h", oddsFormat = "decimal") {
		const endpoint = `/sports/${sportKey}/events/${eventId}/odds/?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`;
		return await this.executeFetch(endpoint);
	}
};

export { OddsApiService as O };
//# sourceMappingURL=oddsApi.service-ClTp4Ns_.js.map
