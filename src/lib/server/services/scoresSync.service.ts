import { db } from '../db';
import { OddsApiService } from './oddsApi.service';
import { SettlementService } from './settlement.service'; // Import the settlement service
import type { RowDataPacket } from 'mysql2';

export class ScoresSyncService {
  // Syncs live scores, updates completed game statuses, and triggers instant bet payouts
  static async syncLiveScores(sportKey: string): Promise<void> {
    const scores = await OddsApiService.getScores(sportKey, 1); // Query active/recent scores
    const conn = await db.getConnection();

    try {
      for (const match of scores) {
        if (!match.scores || match.scores.length === 0) continue;

        const homeScoreObj = match.scores.find((s) => s.name === match.home_team);
        const awayScoreObj = match.scores.find((s) => s.name === match.away_team);

        if (!homeScoreObj || !awayScoreObj) continue;

        const homeScore = parseInt(homeScoreObj.score, 10);
        const awayScore = parseInt(awayScoreObj.score, 10);
        
        // 1. Evaluate completed status: transition to 'COMPLETED' if match has finished
        const gameStatus = match.completed ? 'COMPLETED' : 'LIVE';

        await conn.beginTransaction();

        const [existing] = await conn.execute<RowDataPacket[]>(
          'SELECT id FROM admin_games WHERE id = ? LIMIT 1',
          [match.id]
        );

        if (existing.length > 0) {
          // Update live/completed scorelines and status in MySQL
          await conn.execute(
            `UPDATE admin_games 
             SET home_score = ?, away_score = ?, status = ? 
             WHERE id = ?`,
            [homeScore, awayScore, gameStatus, match.id]
          );

          if (match.completed) {
            // 2. Automatically suspend all active selections for this completed game
            await conn.execute(
              'UPDATE admin_game_markets SET active = 0 WHERE game_id = ?',
              [match.id]
            );
          }
        }

        await conn.commit();

        // 3. INSTANT PAYOUTS: Trigger bet settlements immediately if the match has completed
        if (match.completed) {
          try {
            await SettlementService.settleSportBets(sportKey);
          } catch (settleError) {
            console.error(`[Instant Settlement Error] Failed to settle bets for: ${match.id}`, settleError);
          }
        }
      }
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}