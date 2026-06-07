// Structure matching a sport object from the API's sports endpoint
export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

// Single market outcome details representing active selections
export interface Outcome {
  name: string;
  price: number;
  point?: number;
  description?: string;
}

// Active market details for a bookmaker
export interface Market {
  key: string; // h2h, spreads, totals, outrights
  last_update: string;
  outcomes: Outcome[];
}

// Bookmaker payload from the odds endpoint
export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

// Event odds response payload
export interface OddsResponse {
  id: string; // matches the admin_game.id PK
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

// Outcome representation of scores from the scores endpoint
export interface ScoreOutcome {
  name: string;
  score: string;
}

// Scores response payload for settling wagers
export interface ScoreResponse {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  completed: boolean;
  home_team: string;
  away_team: string;
  scores: ScoreOutcome[] | null;
  last_update: string | null;
}