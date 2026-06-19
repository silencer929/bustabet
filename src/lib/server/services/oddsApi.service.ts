import { env } from '$env/dynamic/private';
import type { Sport, Event, OddsResponse, ScoreResponse, EventMarketsResponse } from '$lib/types/oddsApi';
export class OddsApiService {
  private static readonly baseUrl = 'https://api.the-odds-api.com/v4';

  // Helper method to execute and parse requests while tracking remaining API credit quota
  private static async executeFetch<T>(endpoint: string): Promise<T> {
    const separator = endpoint.includes('?') ? '&' : '?';
    const response = await fetch(`${this.baseUrl}${endpoint}${separator}apiKey=${env.ODDS_API_KEY}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`The Odds API Request Failed [${response.status}]: ${errorText}`);
    }

    // Capture and log the rate limit quota metrics returned by the server headers
    const remainingQuota = response.headers.get('x-requests-remaining');
    const requestCost = response.headers.get('x-requests-last');

    if (remainingQuota) {
      console.log(`[ODDS API] Remaining Credits: ${remainingQuota} | Cost: ${requestCost}`);
    }

    return response.json();
  }

  // Divides a flat array into nested dimensional arrays for segmented API calls
  private static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // Returns list of currently in-season sports
  static async getSports(all = false): Promise<Sport[]> {
    return this.executeFetch<Sport[]>(`/sports${all ? '?all=true' : ''}`);
  }

  // Returns list of pre-match and live events for a specified sport
  static async getEvents(
    sportKey: string,
    commenceTimeFrom?: string,
    commenceTimeTo?: string
  ): Promise<Event[]> {
    const params = new URLSearchParams();

    if (commenceTimeFrom) {
      params.set('commenceTimeFrom', commenceTimeFrom);
    }

    if (commenceTimeTo) {
      params.set('commenceTimeTo', commenceTimeTo);
    }

    const query = params.toString();
    return this.executeFetch<Event[]>(`/sports/${sportKey}/events${query ? `?${query}` : ''}`);
  }

  // Returns active scores for recently completed or live games
  static async getScores(sportKey: string, daysFrom = 3): Promise<ScoreResponse[]> {
    return this.executeFetch<ScoreResponse[]>(`/sports/${sportKey}/scores?daysFrom=${daysFrom}`);
  }

  // Returns live and upcoming games with odds for standard basic markets
  static async getOdds(
    sportKey: string,
    regions = 'us,eu',
    markets = 'h2h,spreads,totals',
    oddsFormat = 'decimal'
  ): Promise<OddsResponse[]> {
    return this.executeFetch<OddsResponse[]>(
      `/sports/${sportKey}/odds?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`
    );
  }

  // Discovers which markets are currently open at active bookmakers for a single event ID
  static async getEventMarkets(
    sportKey: string,
    eventId: string,
    regions = 'us,eu'
  ): Promise<EventMarketsResponse> {
    return this.executeFetch<EventMarketsResponse>(
      `/sports/${sportKey}/events/${eventId}/markets?regions=${regions}`
    );
  }

  // Returns a flat list of all active market keys currently open for an event
  static async discoverMarkets(
    sportKey: string,
    eventId: string,
    regions = 'us,eu'
  ): Promise<string[]> {
    const response = await this.getEventMarkets(sportKey, eventId, regions);
    const markets = new Set<string>();

    for (const bookmaker of response.bookmakers) {
      for (const market of bookmaker.markets) {
        markets.add(market.key);
      }
    }

    return [...markets];
  }

  // Returns odds for a single event ID for specified markets
  static async getEventOdds(
    sportKey: string,
    eventId: string,
    regions = 'us,eu',
    markets = 'h2h',
    oddsFormat = 'decimal'
  ): Promise<OddsResponse> {
    return this.executeFetch<OddsResponse>(
      `/sports/${sportKey}/events/${eventId}/odds?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`
    );
  }

  // Automatically discovers, chunks, and pulls ALL open markets for an event ID in parallel
  static async getAllEventOdds(
    sportKey: string,
    eventId: string,
    regions = 'us,eu',
    oddsFormat = 'decimal'
  ): Promise<OddsResponse[]> {
    const markets = await this.discoverMarkets(sportKey, eventId, regions);

    if (!markets.length) return [];

    // Chunk market keys to prevent query URL length overflows
    const marketChunks = this.chunk(markets, 25);

    const responses = await Promise.all(
      marketChunks.map((chunk) =>
        this.executeFetch<OddsResponse>(
          `/sports/${sportKey}/events/${eventId}/odds?regions=${regions}&markets=${chunk.join(',')}&oddsFormat=${oddsFormat}`
        )
      )
    );

    return responses;
  }

  // Retrieves odds specifically from sharp/major bookmakers
  static async getSharpOdds(
    sportKey: string,
    eventId: string,
    markets: string
  ): Promise<OddsResponse> {
    return this.executeFetch<OddsResponse>(
      `/sports/${sportKey}/events/${eventId}/odds?bookmakers=pinnacle,draftkings,fanduel,betmgm,caesars&markets=${markets}`
    );
  }

  // Harvests every single open market and consolidates them into a unified list
  static async harvestEvent(sportKey: string, eventId: string) {
    const odds = await this.getAllEventOdds(sportKey, eventId, 'us,eu');
    const bookmakers = new Map();

    for (const response of odds) {
      for (const bookmaker of response.bookmakers) {
        const existing = bookmakers.get(bookmaker.key);

        if (!existing) {
          bookmakers.set(bookmaker.key, bookmaker);
          continue;
        }

        existing.markets.push(...bookmaker.markets);
      }
    }

    return {
      eventId,
      bookmakers: [...bookmakers.values()]
    };
  }

  // Performs a complete data harvest across all events in a sport
  static async harvestSport(sportKey: string) {
    const events = await this.getEvents(sportKey);
    const results = await Promise.all(
      events.map((event) => this.harvestEvent(sportKey, event.id))
    );

    return results;
  }
}