import { db } from '../db';
import { OddsApiService } from './oddsApi.service';

export class SettlementService {
  // Pulls recent completed scores and resolves all pending wagers for a specific sport key
  static async settleSportBets(sportKey: string): Promise<void> {
    const scores = await OddsApiService.getScores(sportKey, 3);

    for (const match of scores) {
      if (!match.completed || !match.scores) continue;

      // Find all pending local bets associated with this finalized fixture
      const pendingBets = await db.bet.findMany({
        where: { gameId: match.id, status: 'PENDING' },
        include: { market: true, game: true }
      });

      if (pendingBets.length === 0) {
        // Mark game as completed in database even if no bets exist
        await db.adminGame.update({
          where: { id: match.id },
          data: { status: 'COMPLETED' }
        });
        continue;
      }

      // Determine score metrics for home and away teams
      const homeScoreObj = match.scores.find((s) => s.name === match.home_team);
      const awayScoreObj = match.scores.find((s) => s.name === match.away_team);

      if (!homeScoreObj || !awayScoreObj) continue;

      const homeScore = parseInt(homeScoreObj.score, 10);
      const awayScore = parseInt(awayScoreObj.score, 10);

      // Determine the winner string for Head-to-Head (h2h) markets
      let h2hWinningSelection = 'Draw';
      if (homeScore > awayScore) {
        h2hWinningSelection = match.home_team;
      } else if (awayScore > homeScore) {
        h2hWinningSelection = match.away_team;
      }

      for (const bet of pendingBets) {
        await db.$transaction(async (tx) => {
          let isWon = false;

          // Resolve market outcomes based on specific market parameters
          if (bet.market.marketName === 'h2h') {
            isWon = bet.market.selection === h2hWinningSelection;
          }

          if (isWon) {
            await tx.bet.update({
              where: { id: bet.id },
              data: { status: 'WON' }
            });

            // Log a completed payout ledger to increment user balance
            await tx.transaction.create({
              data: {
                profileId: bet.profileId,
                type: 'PAYOUT',
                amount: bet.potentialWin,
                currency: 'USD',
                status: 'COMPLETED',
                reference: `PAY-${bet.id}`
              }
            });

            await tx.notification.create({
              data: {
                profileId: bet.profileId,
                title: 'Bet Won!',
                message: `Congratulations! Your bet on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was won. Payout added.`,
                read: false
              }
            });
          } else {
            await tx.bet.update({
              where: { id: bet.id },
              data: { status: 'LOST' }
            });

            await tx.notification.create({
              data: {
                profileId: bet.profileId,
                title: 'Bet Settled',
                message: `Your bet on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was settled as lost.`,
                read: false
              }
            });
          }
        });
      }

      // Mark the local fixture as completed
      await db.adminGame.update({
        where: { id: match.id },
        data: { status: 'COMPLETED' }
      });
    }
  }
}