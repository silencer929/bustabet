import type { AdminGame, AdminGameMarket } from '@prisma/client';

// Game entity containing populated betting lines
export interface GameWithMarkets extends AdminGame {
  markets: AdminGameMarket[];
}