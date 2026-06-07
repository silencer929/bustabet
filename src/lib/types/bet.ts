import type { Bet as PrismaBet, AdminGame, AdminGameMarket } from '@prisma/client';

// Local temporary bet slip selection state
export interface BetSlipSelection {
  gameId: string;
  marketId: string;
  homeTeam: string;
  awayTeam: string;
  marketName: string;
  selection: string;
  odds: number;
}

// Completed wager details populated for transactional logs
export interface BetWithDetails extends PrismaBet {
  game: AdminGame;
  market: AdminGameMarket;
}