import { db } from '../db';
import { OddsApiService } from './oddsApi.service';
import type { RowDataPacket } from 'mysql2';

export class SettlementService {
  // Method A: Standard Single Bets Settlement (Ignoring manual games starting with "MAN-")
  static async settleSportBets(sportKey: string): Promise<void> {
    const scores = await OddsApiService.getScores(sportKey, 3);
    const conn = await db.getConnection();

    try {
      for (const match of scores) {
        // Skip manual games or empty scorelines
        if (match.id.startsWith('MAN-') || !match.completed || !match.scores) continue;

        // Retrieve all pending single wagers associated with this completed fixture
        const [pendingBets] = await conn.execute<RowDataPacket[]>(
          `SELECT b.id, b.profile_id, b.stake, b.odds, b.potential_win,
                  m.selection, m.market_name,
                  g.home_team, g.away_team
           FROM bets b
           INNER JOIN admin_game_markets m ON b.market_id = m.id
           INNER JOIN admin_games g ON b.game_id = g.id
           WHERE b.game_id = ? AND b.status = 'PENDING' AND b.type = 'SINGLE'`,
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
            await conn.execute('UPDATE bets SET status = "WON" WHERE id = ?', [bet.id]);
            await conn.execute(
              `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
               VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`,
              [crypto.randomUUID(), bet.profile_id, bet.potential_win, `PAY-${bet.id}`]
            );
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
            await conn.execute('UPDATE bets SET status = "LOST" WHERE id = ?', [bet.id]);
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

  // Method B: Combo/Multibets Settlement. Evaluates parlay wagers, voids draws, and executes payouts
  static async settleComboBets(): Promise<void> {
    const conn = await db.getConnection();

    try {
      // Fetch all pending combo/multibet wagers registered in the system
      const [pendingCombos] = await conn.execute<RowDataPacket[]>(
        "SELECT id, profile_id, stake, odds, potential_win, selections FROM bets WHERE status = 'PENDING' AND type = 'COMBO'"
      );

      for (const bet of pendingCombos) {
        const selections = typeof bet.selections === 'string' ? JSON.parse(bet.selections) : bet.selections;
        
        let hasLost = false;
        let allCompleted = true;
        let adjustedOdds = Number(bet.odds);

        for (const leg of selections) {
          // Query the real-time match details and scores associated with each leg's market ID
          const [details] = await conn.execute<RowDataPacket[]>(
            `SELECT m.selection, m.market_name, m.odds as selectionOdds,
                    g.status as gameStatus, g.home_score as homeScore, g.away_score as awayScore, g.home_team as homeTeam, g.away_team as awayTeam
             FROM admin_game_markets m
             INNER JOIN admin_games g ON m.game_id = g.id
             WHERE m.id = ? LIMIT 1`,
            [leg.marketId]
          );

          if (details.length === 0) {
            allCompleted = false;
            continue;
          }

          const match = details[0];

          if (match.gameStatus !== 'COMPLETED') {
            allCompleted = false;
            continue;
          }

          // Evaluate this specific leg's outcome dynamically based on completed scores
          const homeScore = Number(match.homeScore);
          const awayScore = Number(match.awayScore);
          const sel = match.selection.toUpperCase();

          let legWon = false;
          let legVoid = false;

          // Resolve H2H
          if (match.market_name === 'h2h') {
            let h2hWinner = 'Draw';
            if (homeScore > awayScore) h2hWinner = match.homeTeam;
            else if (awayScore > homeScore) h2hWinner = match.awayTeam;
            legWon = match.selection === h2hWinner;
          } 
          // Resolve Double Chance
          else if (match.market_name === 'double_chance') {
            if (homeScore > awayScore) {
              legWon = sel.includes('HOME OR AWAY') || sel.includes('HOME OR DRAW');
            } else if (awayScore > homeScore) {
              legWon = sel.includes('HOME OR AWAY') || sel.includes('DRAW OR AWAY');
            } else {
              legWon = sel.includes('HOME OR DRAW') || sel.includes('DRAW OR AWAY');
            }
          } 
          // Resolve Draw No Bet (DNB)
          else if (match.market_name === 'draw_no_bet') {
            if (homeScore === awayScore) {
              legVoid = true; // Refund/void this leg, dividing the parlay odds by this leg's price
            } else {
              legWon = (homeScore > awayScore && sel.includes(match.homeTeam.toUpperCase())) || (awayScore > homeScore && sel.includes(match.awayTeam.toUpperCase()));
            }
          } 
          // Resolve BTTS
          else if (match.market_name === 'btts') {
            const isBttsYes = homeScore > 0 && awayScore > 0;
            legWon = (isBttsYes && sel.includes('YES')) || (!isBttsYes && sel.includes('NO'));
          } 
          // Resolve Correct Score
          else if (match.market_name === 'correct_score') {
            legWon = match.selection === `${homeScore} - ${awayScore}`;
          } 
          // Resolve Win to Nil
          else if (match.market_name === 'win_to_nil') {
            const homeWinToNil = homeScore > awayScore && awayScore === 0;
            const awayWinToNil = awayScore > homeScore && homeScore === 0;
            if (sel.includes(match.homeTeam.toUpperCase())) {
              legWon = (homeWinToNil && sel.includes('YES')) || (!homeWinToNil && sel.includes('NO'));
            } else {
              legWon = (awayWinToNil && sel.includes('YES')) || (!awayWinToNil && sel.includes('NO'));
            }
          } 
          // Resolve Totals
          else if (match.market_name === 'totals' || match.market_name === 'over_under') {
            const totalGoals = homeScore + awayScore;
            const point = parseFloat(match.selection.split(' ').pop() || '0');
            if (sel.includes('OVER')) {
              legWon = totalGoals > point;
            } else {
              legWon = totalGoals < point;
            }
          }

          if (legVoid) {
            // Adjust accumulative parlay odds downwards by dividing out the voided leg's odds
            adjustedOdds = Math.max(1.00, Number((adjustedOdds / Number(match.selectionOdds)).toFixed(2)));
          } else if (!legWon) {
            // IF EVEN A SINGLE LEG LOSES, THE ENTIRE COMBO IS SETTLED AS LOST IMMEDIATELY
            hasLost = true;
            break;
          }
        }

        // Commit transaction updates
        await conn.beginTransaction();

        if (hasLost) {
          await conn.execute('UPDATE bets SET status = "LOST" WHERE id = ?', [bet.id]);
          await conn.execute(
            `INSERT INTO notifications (id, profile_id, title, message, \`read\`) VALUES (?, ?, "Multibet Lost", ?, 0)`,
            [crypto.randomUUID(), bet.profile_id, 'Your combo multibet wager was settled as lost. Better luck next time!']
          );
        } else if (allCompleted) {
          const finalPotentialWin = Number((Number(bet.stake) * adjustedOdds).toFixed(2));
          
          await conn.execute(
            'UPDATE bets SET status = "WON", odds = ?, potential_win = ? WHERE id = ?',
            [adjustedOdds, finalPotentialWin, bet.id]
          );

          // Log payout transaction ledger entry
          await conn.execute(
            `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`,
            [crypto.randomUUID(), bet.profile_id, finalPotentialWin, `PAY-${bet.id}`]
          );

          // Alert player
          await conn.execute(
            `INSERT INTO notifications (id, profile_id, title, message, \`read\`) VALUES (?, ?, "Multibet Won!", ?, 0)`,
            [crypto.randomUUID(), bet.profile_id, `Congratulations! Your combo multibet wager was won. Payout of ${finalPotentialWin} processed.`]
          );
        }

        await conn.commit();
      }
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}