import { db } from '../db';
import { OddsApiService } from './oddsApi.service';
import type { RowDataPacket } from 'mysql2';

export class SettlementService {
  // Pulls completed scores and resolves all pending wagers dynamically
  static async settleSportBets(sportKey: string): Promise<void> {
    const scores = await OddsApiService.getScores(sportKey, 3);
    const conn = await db.getConnection();

    try {
      for (const match of scores) {
        if (!match.completed || !match.scores) continue;

        // Retrieve all pending wagers registered to this completed fixture
        const [pendingBets] = await conn.execute<RowDataPacket[]>(
          `SELECT b.id, b.profile_id, b.stake, b.odds, b.potential_win,
                  m.selection, m.market_name,
                  g.home_team, g.away_team
           FROM bets b
           INNER JOIN admin_game_markets m ON b.market_id = m.id
           INNER JOIN admin_games g ON b.game_id = g.id
           WHERE b.game_id = ? AND b.status = 'PENDING'`,
          [match.id]
        );

        if (pendingBets.length === 0) {
          await conn.execute(
            'UPDATE admin_games SET status = "COMPLETED" WHERE id = ?',
            [match.id]
          );
          continue;
        }

        const homeScoreObj = match.scores.find((s) => s.name === match.home_team);
        const awayScoreObj = match.scores.find((s) => s.name === match.away_team);

        if (!homeScoreObj || !awayScoreObj) continue;

        const homeScore = parseInt(homeScoreObj.score, 10);
        const awayScore = parseInt(awayScoreObj.score, 10);

        let h2hWinner = 'Draw';
        if (homeScore > awayScore) {
          h2hWinner = match.home_team;
        } else if (awayScore > homeScore) {
          h2hWinner = match.away_team;
        }

        for (const bet of pendingBets) {
          await conn.beginTransaction();

          let isWon = false;
          if (bet.market_name === 'h2h') {
            isWon = bet.selection === h2hWinner;
          }

          if (isWon) {
            // Update bet as WON
            await conn.execute(
              'UPDATE bets SET status = "WON" WHERE id = ?',
              [bet.id]
            );

            // Log payout transaction
            await conn.execute(
              `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
               VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`,
              [crypto.randomUUID(), bet.profile_id, bet.potential_win, `PAY-${bet.id}`]
            );

            // Alert player
            await conn.execute(
              `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
               VALUES (?, ?, ?, ?, 0)`,
              [
                crypto.randomUUID(),
                bet.profile_id,
                'Bet Won!',
                `Congratulations! Your bet on ${bet.home_team} vs ${bet.away_team} was won. Payout processed.`
              ]
            );
          } else {
            // Update bet as LOST
            await conn.execute(
              'UPDATE bets SET status = "LOST" WHERE id = ?',
              [bet.id]
            );

            // Alert player
            await conn.execute(
              `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
               VALUES (?, ?, ?, ?, 0)`,
              [
                crypto.randomUUID(),
                bet.profile_id,
                'Bet Settled',
                `Your bet on ${bet.home_team} vs ${bet.away_team} was settled as lost.`
              ]
            );
          }

          await conn.commit();
        }

        // Close out match fixture
        await conn.execute(
          'UPDATE admin_games SET status = "COMPLETED" WHERE id = ?',
          [match.id]
        );
      }
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}