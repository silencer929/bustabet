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
		const requestCost = response.headers.get("x-requests-last");
		if (remainingQuota) console.log(`[ODDS API] Remaining Credits: ${remainingQuota} | Cost: ${requestCost}`);
		return response.json();
	}
	static chunk(array, size) {
		const chunks = [];
		for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size));
		return chunks;
	}
	static async getSports(all = false) {
		return this.executeFetch(`/sports${all ? "?all=true" : ""}`);
	}
	static async getEvents(sportKey, commenceTimeFrom, commenceTimeTo) {
		const params = new URLSearchParams();
		if (commenceTimeFrom) params.set("commenceTimeFrom", commenceTimeFrom);
		if (commenceTimeTo) params.set("commenceTimeTo", commenceTimeTo);
		const query = params.toString();
		return this.executeFetch(`/sports/${sportKey}/events${query ? `?${query}` : ""}`);
	}
	static async getScores(sportKey, daysFrom = 3) {
		return this.executeFetch(`/sports/${sportKey}/scores?daysFrom=${daysFrom}`);
	}
	static async getOdds(sportKey, regions = "us,eu", markets = "h2h,spreads,totals", oddsFormat = "decimal") {
		return this.executeFetch(`/sports/${sportKey}/odds?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`);
	}
	static async getEventMarkets(sportKey, eventId, regions = "us,eu") {
		return this.executeFetch(`/sports/${sportKey}/events/${eventId}/markets?regions=${regions}`);
	}
	static async discoverMarkets(sportKey, eventId, regions = "us,eu") {
		const response = await this.getEventMarkets(sportKey, eventId, regions);
		const markets = /* @__PURE__ */ new Set();
		for (const bookmaker of response.bookmakers) for (const market of bookmaker.markets) markets.add(market.key);
		return [...markets];
	}
	static async getEventOdds(sportKey, eventId, regions = "us,eu", markets = "h2h", oddsFormat = "decimal") {
		return this.executeFetch(`/sports/${sportKey}/events/${eventId}/odds?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`);
	}
	static async getAllEventOdds(sportKey, eventId, regions = "us,eu", oddsFormat = "decimal") {
		const markets = await this.discoverMarkets(sportKey, eventId, regions);
		if (!markets.length) return [];
		const marketChunks = this.chunk(markets, 25);
		return await Promise.all(marketChunks.map((chunk) => this.executeFetch(`/sports/${sportKey}/events/${eventId}/odds?regions=${regions}&markets=${chunk.join(",")}&oddsFormat=${oddsFormat}`)));
	}
	static async getSharpOdds(sportKey, eventId, markets) {
		return this.executeFetch(`/sports/${sportKey}/events/${eventId}/odds?bookmakers=pinnacle,draftkings,fanduel,betmgm,caesars&markets=${markets}`);
	}
	static async harvestEvent(sportKey, eventId) {
		const odds = await this.getAllEventOdds(sportKey, eventId, "us,eu");
		const bookmakers = /* @__PURE__ */ new Map();
		for (const response of odds) for (const bookmaker of response.bookmakers) {
			const existing = bookmakers.get(bookmaker.key);
			if (!existing) {
				bookmakers.set(bookmaker.key, bookmaker);
				continue;
			}
			existing.markets.push(...bookmaker.markets);
		}
		return {
			eventId,
			bookmakers: [...bookmakers.values()]
		};
	}
	static async harvestSport(sportKey) {
		const events = await this.getEvents(sportKey);
		return await Promise.all(events.map((event) => this.harvestEvent(sportKey, event.id)));
	}
};

export { OddsApiService as O };
//# sourceMappingURL=oddsApi.service-bKwp7aEE.js.map
