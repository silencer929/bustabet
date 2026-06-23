import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
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
    throw error(404, 'Fixture not found');
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
  // Writes an entire structured market group atomically based on selection templates
  addMarketTemplate: async ({ request, params }) => {
    const formData = await request.formData();
    const templateType = formData.get('templateType') as string;
    
    // Retrieve base game team names required for template string rendering
    const [games] = await db.execute<RowDataPacket[]>(
      'SELECT home_team, away_team FROM admin_games WHERE id = ? LIMIT 1',
      [params.id]
    );
    if (games.length === 0) return fail(400, { error: 'Game not found' });
    const game = games[0];

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      if (templateType === 'h2h') {
        const homeOdds = parseFloat(formData.get('homeOdds') as string);
        const drawOdds = parseFloat(formData.get('drawOdds') as string);
        const awayOdds = parseFloat(formData.get('awayOdds') as string);

        if (isNaN(homeOdds) || isNaN(drawOdds) || isNaN(awayOdds)) {
          throw new Error('All H2H odds are required');
        }

        const lines = [
          { selection: game.home_team, odds: homeOdds },
          { selection: 'Draw', odds: drawOdds },
          { selection: game.away_team, odds: awayOdds }
        ];

        for (const line of lines) {
          await conn.execute(
            'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, "h2h", ?, ?, 1)',
            [crypto.randomUUID(), params.id, line.selection, line.odds]
          );
        }
      } 
      
      else if (templateType === 'double_chance') {
        const hdOdds = parseFloat(formData.get('hdOdds') as string); // Home or Draw
        const daOdds = parseFloat(formData.get('daOdds') as string); // Draw or Away
        const haOdds = parseFloat(formData.get('haOdds') as string); // Home or Away

        if (isNaN(hdOdds) || isNaN(daOdds) || isNaN(haOdds)) {
          throw new Error('All Double Chance odds are required');
        }

        const lines = [
          { selection: `${game.home_team} or Draw`, odds: hdOdds },
          { selection: `Draw or ${game.away_team}`, odds: daOdds },
          { selection: `${game.home_team} or ${game.away_team}`, odds: haOdds }
        ];

        for (const line of lines) {
          await conn.execute(
            'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, "double_chance", ?, ?, 1)',
            [crypto.randomUUID(), params.id, line.selection, line.odds]
          );
        }
      } 
      
      else if (templateType === 'over_under' || templateType === 'totals') {
        const point = formData.get('point') as string; // e.g. "2.5"
        const overOdds = parseFloat(formData.get('overOdds') as string);
        const underOdds = parseFloat(formData.get('underOdds') as string);

        if (!point || isNaN(overOdds) || isNaN(underOdds)) {
          throw new Error('Point value and all odds are required');
        }

        await conn.execute(
          'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
          [crypto.randomUUID(), params.id, templateType, `Over ${point}`, overOdds]
        );
        await conn.execute(
          'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, ?, ?, ?, 1)',
          [crypto.randomUUID(), params.id, templateType, `Under ${point}`, underOdds]
        );
      } 

      else if (templateType === 'correct_score') {
        const scoreLine = formData.get('scoreLine') as string; // e.g. "2 - 1"
        const odds = parseFloat(formData.get('odds') as string);

        if (!scoreLine || isNaN(odds)) {
          throw new Error('Scoreline and odds are required');
        }

        await conn.execute(
          'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, "correct_score", ?, ?, 1)',
          [crypto.randomUUID(), params.id, scoreLine, odds]
        );
      }

      else if (templateType === 'btts') {
        const yesOdds = parseFloat(formData.get('yesOdds') as string);
        const noOdds = parseFloat(formData.get('noOdds') as string);

        if (isNaN(yesOdds) || isNaN(noOdds)) {
          throw new Error('Both Yes and No odds are required');
        }

        await conn.execute(
          'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, "btts", "Yes (BTTS)", ?, 1)',
          [crypto.randomUUID(), params.id, yesOdds]
        );
        await conn.execute(
          'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, "btts", "No (BTTS)", ?, 1)',
          [crypto.randomUUID(), params.id, noOdds]
        );
      }

      else if (templateType === 'win_to_nil') {
        const team = formData.get('team') as 'HOME' | 'AWAY';
        const yesOdds = parseFloat(formData.get('yesOdds') as string);
        const noOdds = parseFloat(formData.get('noOdds') as string);

        if (!team || isNaN(yesOdds) || isNaN(noOdds)) {
          throw new Error('Team selection and both odds are required');
        }

        const teamName = team === 'HOME' ? game.home_team : game.away_team;

        await conn.execute(
          'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, "win_to_nil", ?, ?, 1)',
          [crypto.randomUUID(), params.id, `${teamName} to Win to Nil - Yes`, yesOdds]
        );
        await conn.execute(
          'INSERT INTO admin_game_markets (id, game_id, market_name, selection, odds, active) VALUES (?, ?, "win_to_nil", ?, ?, 1)',
          [crypto.randomUUID(), params.id, `${teamName} to Win to Nil - No`, noOdds]
        );
      }

      await conn.commit();
      return { success: true };
    } catch (error: any) {
      await conn.rollback();
      return fail(400, { error: error.message || 'Failed to apply market template' });
    } finally {
      conn.release();
    }
  },

  // Updates current odds value (Remains identical and stable)
  updateOdds: async ({ request }) => {
    const formData = await request.formData();
    const marketId = formData.get('marketId') as string;
    const oddsStr = formData.get('odds') as string;

    const odds = parseFloat(oddsStr);
    if (isNaN(odds) || odds <= 1.0) {
      return fail(400, { error: 'Odds must exceed 1.00' });
    }

    try {
      await db.execute('UPDATE admin_game_markets SET odds = ? WHERE id = ?', [odds, marketId]);
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to update odds value' });
    }
  },

  // Suspends or activates market availability (Remains identical and stable)
  toggleMarket: async ({ request }) => {
    const formData = await request.formData();
    const marketId = formData.get('marketId') as string;
    const activeStr = formData.get('active') as string;

    try {
      await db.execute(
        'UPDATE admin_game_markets SET active = ? WHERE id = ?',
        [activeStr === 'true' ? 1 : 0, marketId]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to toggle status' });
    }
  },

  // Removes a custom market selection row (Remains identical and stable)
  deleteMarketOption: async ({ request }) => {
    const formData = await request.formData();
    const marketId = formData.get('marketId') as string;

    try {
      await db.execute('DELETE FROM admin_game_markets WHERE id = ?', [marketId]);
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to delete market option' });
    }
  }
};