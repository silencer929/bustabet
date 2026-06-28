import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { SettlementService } from '$lib/server/services/settlement.service';
import type { GameWithMarkets } from '$lib/types/game';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const [games] = await db.execute<RowDataPacket[]>(
    `SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status 
     FROM admin_games 
     WHERE id = ? LIMIT 1`,
    [params.id]
  );

  if (games.length === 0) {
    throw error(404, 'Match fixture not found');
  }

  const game = games[0];

  const [markets] = await db.execute<RowDataPacket[]>(
    `SELECT id, game_id as gameId, market_name as marketName, selection, odds, active 
     FROM admin_game_markets 
     WHERE game_id = ?`,
    [params.id]
  );

  const gameWithMarkets: GameWithMarkets = {
    id: game.id,
    sport: game.sport,
    league: game.league,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    startTime: new Date(game.startTime),
    status: game.status,
    homeScore: game.home_score,
    awayScore: game.away_score,
    markets: markets.map((m) => ({
      id: m.id,
      gameId: m.gameId,
      marketName: m.marketName,
      selection: m.selection,
      odds: Number(m.odds),
      active: Boolean(m.active)
    }))
  };

  return { game: gameWithMarkets };
};

export const actions: Actions = {
  // Automatically calculates and settles wagers based on scores when completed is declared
  settleWithScores: async ({ request, params, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const homeScoreStr = formData.get('homeScore') as string;
    const awayScoreStr = formData.get('awayScore') as string;
    
    // Retrieve target match status (LIVE to keep pending, COMPLETED to settle wagers)
    const targetStatus = formData.get('targetStatus') as 'LIVE' | 'COMPLETED';

    const homeScore = parseInt(homeScoreStr, 10);
    const awayScore = parseInt(awayScoreStr, 10);

    if (isNaN(homeScore) || isNaN(awayScore) || homeScore < 0 || awayScore < 0) {
      return fail(400, { error: 'Please enter valid, non-negative scores for both teams' });
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // Update current scorelines in the admin_games table immediately
      await conn.execute(
        `UPDATE admin_games 
         SET status = ?, home_score = ?, away_score = ? 
         WHERE id = ?`,
        [targetStatus, homeScore, awayScore, params.id]
      );

      // --- BRANCH A: LIVE SCORE UPDATE ONLY (Skip settlements, keep wagers pending) ---
      if (targetStatus === 'LIVE') {
        await conn.commit();
        return { 
          success: true, 
          message: `Live score updated to ${homeScore} - ${awayScore} successfully. Wagers remain pending.` 
        };
      }

      // --- BRANCH B: MATCH COMPLETED (Process settlements and payouts) ---

      const [games] = await conn.execute<RowDataPacket[]>(
        'SELECT home_team, away_team FROM admin_games WHERE id = ? LIMIT 1',
        [params.id]
      );
      if (games.length === 0) throw new Error('Fixture not found');
      const game = games[0];

      const [pendingBets] = await conn.execute<RowDataPacket[]>(
        `SELECT b.id, b.profile_id, b.stake, b.odds, b.potential_win,
                m.selection, m.market_name
         FROM bets b
         INNER JOIN admin_game_markets m ON b.market_id = m.id
         WHERE b.game_id = ? AND b.status = 'PENDING'`,
        [params.id]
      );

      // Outcomes calculators
      let h2hWinner = 'Draw';
      if (homeScore > awayScore) h2hWinner = game.home_team;
      else if (awayScore > homeScore) h2hWinner = game.away_team;

      const isBttsYes = homeScore > 0 && awayScore > 0;
      const correctScoreLine = `${homeScore} - ${awayScore}`;
      const homeWinToNil = homeScore > awayScore && awayScore === 0;
      const awayWinToNil = awayScore > homeScore && homeScore === 0;

      for (const bet of pendingBets) {
        let isWon = false;
        let isVoid = false;

        const sel = bet.selection.toUpperCase();

        if (bet.market_name === 'h2h') {
          isWon = bet.selection === h2hWinner;
        } else if (bet.market_name === 'double_chance') {
          if (homeScore > awayScore) {
            isWon = sel.includes('HOME OR AWAY') || sel.includes('HOME OR DRAW');
          } else if (awayScore > homeScore) {
            isWon = sel.includes('HOME OR AWAY') || sel.includes('DRAW OR AWAY');
          } else {
            isWon = sel.includes('HOME OR DRAW') || sel.includes('DRAW OR AWAY');
          }
        } else if (bet.market_name === 'draw_no_bet') {
          if (homeScore === awayScore) {
            isVoid = true;
          } else {
            isWon = (homeScore > awayScore && sel.includes(game.home_team.toUpperCase())) || (awayScore > homeScore && sel.includes(game.away_team.toUpperCase()));
          }
        } else if (bet.market_name === 'btts') {
          isWon = (isBttsYes && sel.includes('YES')) || (!isBttsYes && sel.includes('NO'));
        } else if (bet.market_name === 'correct_score') {
          isWon = bet.selection === correctScoreLine;
        } else if (bet.market_name === 'win_to_nil') {
          if (sel.includes(game.home_team.toUpperCase())) {
            isWon = (homeWinToNil && sel.includes('YES')) || (!homeWinToNil && sel.includes('NO'));
          } else {
            isWon = (awayWinToNil && sel.includes('YES')) || (!awayWinToNil && sel.includes('NO'));
          }
        } else if (bet.market_name === 'totals' || bet.market_name === 'over_under') {
          const totalGoals = homeScore + awayScore;
          const point = parseFloat(bet.selection.split(' ').pop() || '0');
          if (sel.includes('OVER')) {
            isWon = totalGoals > point;
          } else {
            isWon = totalGoals < point;
          }
        }

        // Transaction payouts
        if (isVoid) {
          await conn.execute('UPDATE bets SET status = "VOIDED" WHERE id = ?', [bet.id]);
          await conn.execute(
            `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'DEPOSIT', ?, 'USD', 'COMPLETED', ?)`,
            [crypto.randomUUID(), bet.profile_id, bet.stake, `VOID-REF-${bet.id}`]
          );
        } else if (isWon) {
          await conn.execute('UPDATE bets SET status = "WON" WHERE id = ?', [bet.id]);
          await conn.execute(
            `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`,
            [crypto.randomUUID(), bet.profile_id, bet.potential_win, `PAY-${bet.id}`]
          );
        } else {
          await conn.execute('UPDATE bets SET status = "LOST" WHERE id = ?', [bet.id]);
        }

        const alertTitle = isVoid ? 'Bet Voided & Refunded' : isWon ? 'Wager Won!' : 'Wager Settled';
        const alertMsg = isVoid 
          ? `Your bet on ${game.home_team} vs ${game.away_team} was voided (Draw). Stake refunded.` 
          : isWon 
            ? `Congratulations! Your bet on ${game.home_team} vs ${game.away_team} was won.` 
            : `Your bet on ${game.home_team} vs ${game.away_team} was settled as lost.`;

        await conn.execute(
          `INSERT INTO notifications (id, profile_id, title, message, \`read\`) VALUES (?, ?, ?, ?, 0)`,
          [crypto.randomUUID(), bet.profile_id, alertTitle, alertMsg]
        );
      }

      // Deactivate all active market selections for this game
      await conn.execute(
        'UPDATE admin_game_markets SET active = 0 WHERE game_id = ?',
        [params.id]
      );

      await conn.commit();

      // Trigger Combo settlements to check if any player's active parlays are resolved
      try {
        await SettlementService.settleComboBets();
      } catch (comboError) {
        console.error('[Admin Settle Combo Error]:', comboError);
      }

      return { success: true, message: 'Game score registered and all single and combo wagers settled successfully!' };
    } catch (error: any) {
      await conn.rollback();
      return fail(500, { error: error.message || 'Failed to settle wagers' });
    } finally {
      conn.release();
    }
  },

  // Settle single market selection manually (Remains unchanged)
  settleMarketManually: async ({ request, params, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const marketName = formData.get('marketName') as string;
    const winningSelection = formData.get('winningSelection') as string;

    if (!marketName || !winningSelection) {
      return fail(400, { error: 'Please select both the market and the winning outcome' });
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [pendingBets] = await conn.execute<RowDataPacket[]>(
        `SELECT b.id, b.profile_id, b.potential_win, b.stake, m.selection, m.id as market_id,
                g.home_team, g.away_team
         FROM bets b
         INNER JOIN admin_game_markets m ON b.market_id = m.id
         INNER JOIN admin_games g ON b.game_id = g.id
         WHERE b.game_id = ? AND m.market_name = ? AND b.status = 'PENDING'`,
        [params.id, marketName]
      );

      for (const bet of pendingBets) {
        const isWon = bet.selection === winningSelection;

        if (isWon) {
          await conn.execute('UPDATE bets SET status = "WON" WHERE id = ?', [bet.id]);

          await conn.execute(
            `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
             VALUES (?, ?, 'PAYOUT', ?, 'USD', 'COMPLETED', ?)`,
            [crypto.randomUUID(), bet.profile_id, bet.potential_win, `MAN-PAY-${bet.id}`]
          );

          await conn.execute(
            `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
             VALUES (?, ?, ?, ?, 0)`,
            [
              crypto.randomUUID(),
              bet.profile_id,
              'Wager Settled: Won!',
              `Your wager on ${bet.home_team} vs ${bet.away_team} (${bet.selection}) was resolved as won. Payout processed.`
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
              'Wager Settled',
              `Your wager on ${bet.home_team} vs ${bet.away_team} (${bet.selection}) was resolved as lost.`
            ]
          );
        }
      }

      await conn.execute(
        'UPDATE admin_games SET status = "COMPLETED" WHERE id = ?',
        [params.id]
      );

      await conn.execute(
        'UPDATE admin_game_markets SET active = 0 WHERE game_id = ?',
        [params.id]
      );

      await conn.commit();

      try {
        await SettlementService.settleComboBets();
      } catch (comboError) {
        console.error('[Admin Settle Combo Error]:', comboError);
      }

      return { success: true, message: 'Market settled and payouts processed successfully!' };
    } catch (error: any) {
      await conn.rollback();
      return fail(500, { error: error.message || 'Failed to settle market' });
    } finally {
      conn.release();
    }
  }
};