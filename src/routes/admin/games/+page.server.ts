import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading fixture directories
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Load basic game information (keep query lightweight; markets are loaded inside detailed routes)
  const [games] = await db.execute<RowDataPacket[]>(
    `SELECT id, sport, league, home_team as homeTeam, away_team as awayTeam, start_time as startTime, status 
     FROM admin_games 
     ORDER BY start_time DESC`
  );

  return { games };
};

export const actions: Actions = {
  // Registers a new sports game fixture manually inside MySQL using parameter injections
  createGame: async ({ request }) => {
    const formData = await request.formData();
    const sport = formData.get('sport') as string;
    const league = formData.get('league') as string;
    const homeTeam = formData.get('homeTeam') as string;
    const awayTeam = formData.get('awayTeam') as string;
    const startTimeStr = formData.get('startTime') as string;

    if (!sport || !league || !homeTeam || !awayTeam || !startTimeStr) {
      return fail(400, { error: 'All fields are required to register a game' });
    }

    const gameId = 'MAN-' + Math.random().toString(36).substring(2, 12).toUpperCase(); // Unique manual key

    try {
      await db.execute(
        `INSERT INTO admin_games (id, sport, league, home_team, away_team, start_time, status) 
         VALUES (?, ?, ?, ?, ?, ?, 'UPCOMING')`,
        [gameId, sport, league, homeTeam, awayTeam, new Date(startTimeStr)]
      );

      return { success: true, message: 'Fixture created successfully!', gameId };
    } catch (error: any) {
      return fail(500, { error: error.message || 'Failed to create game record' });
    }
  }
};