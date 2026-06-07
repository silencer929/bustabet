import { db } from '../db';
import { WalletService } from './wallet.service';
import { calculatePotentialWin } from '$lib/utils/odds';

export class BettingService {
  private static MINIMUM_STAKE = 10.00; // Minimum allowed wager value

  // Atomically validates and places a new bet slip wager
  static async placeBet(profileId: string, marketId: string, stake: number): Promise<{ success: boolean; message: string; betId?: string }> {
    if (stake < this.MINIMUM_STAKE) {
      return { success: false, message: `Minimum stake required is ${this.MINIMUM_STAKE}` };
    }

    const balance = await WalletService.getBalance(profileId);
    if (balance < stake) {
      return { success: false, message: 'Insufficient wallet balance' };
    }

    return await db.$transaction(async (tx) => {
      // Retrieve the market odds and the parent game status
      const market = await tx.adminGameMarket.findUnique({
        where: { id: marketId },
        include: { game: true }
      });

      if (!market || !market.active) {
        return { success: false, message: 'This selection is no longer active or available' };
      }

      // Block bet placement if the match is already live or completed
      if (market.game.status !== 'UPCOMING' || new Date() >= new Date(market.game.startTime)) {
        return { success: false, message: 'This game has already started' };
      }

      const potentialWin = calculatePotentialWin(stake, Number(market.odds));

      const bet = await tx.bet.create({
        data: {
          profileId,
          gameId: market.gameId,
          marketId: market.id,
          stake,
          odds: market.odds,
          potentialWin,
          status: 'PENDING'
        }
      });

      // Notify the player confirming successful bet receipt
      await tx.notification.create({
        data: {
          profileId,
          title: 'Wager Placed Successfully',
          message: `Your wager of ${stake} on ${market.game.homeTeam} vs ${market.game.awayTeam} (${market.selection}) has been recorded.`,
          read: false
        }
      });

      return {
        success: true,
        message: 'Bet placed successfully',
        betId: bet.id
      };
    });
  }
}