import { ODDS_API_KEY } from '$env/static/private';
import type { Sport, OddsResponse, ScoreResponse } from '$lib/types/oddsApi';

export class OddsApiService {
  private static baseUrl = 'https://api.the-odds-api.com/v4';

  // Helper method to execute and parse requests while tracking the remaining API credit quota
  private static async executeFetch<T>(endpoint: string): Promise<T> {
    const separator = endpoint.includes('?') ? '&' : '?';
    const response = await fetch(`${this.baseUrl}${endpoint}${separator}apiKey=${ODDS_API_KEY}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`The Odds API Request Failed [${response.status}]: ${errorText}`);
    }

    // Capture and log the rate limit quota metrics returned by the server headers
    const remainingQuota = response.headers.get('x-requests-remaining');
    const lastRequestCost = response.headers.get('x-requests-last');
    
    if (remainingQuota !== null && lastRequestCost !== null) {
      console.log(`[Odds API Quota Log] Remaining Credits: ${remainingQuota} | Last Call Cost: ${lastRequestCost}`);
    }

    return await response.json() as T;
  }

  // Returns list of currently in-season sports
  static async getSports(allSeason = false): Promise<Sport[]> {
    const endpoint = `/sports${allSeason ? '?all=true' : ''}`;
    return await this.executeFetch<Sport[]>(endpoint);
  }

  // Returns live and upcoming games with odds for a given sport, region, and market selection
  static async getOdds(
    sportKey: string,
    regions = 'eu,us',
    markets = 'h2h',
    oddsFormat = 'decimal'
  ): Promise<OddsResponse[]> {
    const endpoint = `/sports/${sportKey}/odds/?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`;
    return await this.executeFetch<OddsResponse[]>(endpoint);
  }

  // Returns active scores for recently completed or live games
  static async getScores(sportKey: string, daysFrom?: number): Promise<ScoreResponse[]> {
    const daysParam = daysFrom ? `?daysFrom=${daysFrom}` : '';
    const endpoint = `/sports/${sportKey}/scores/${daysParam}`;
    return await this.executeFetch<ScoreResponse[]>(endpoint);
  }

  // Returns complete odds for a single event (suited for advanced markets and props)
  static async getEventOdds(
    sportKey: string,
    eventId: string,
    regions = 'eu,us',
    markets = 'h2h',
    oddsFormat = 'decimal'
  ): Promise<OddsResponse> {
    const endpoint = `/sports/${sportKey}/events/${eventId}/odds/?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`;
    return await this.executeFetch<OddsResponse>(endpoint);
  }
}