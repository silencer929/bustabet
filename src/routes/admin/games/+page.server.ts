import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Load basic game information (keep query lightweight, markets are loaded in detailed view)
  const games = await db.adminGame.findMany({
    orderBy: { startTime: 'desc' }
  });

  return { games };
};

export const actions: Actions = {
  // Registers a new sports game fixture manually inside MySQL
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

    try {
      const game = await db.adminGame.create({
        data: {
          id: 'MAN-' + Math.random().toString(36).substring(2, 12).toUpperCase(), // Generate unique manual game key
          sport,
          league,
          homeTeam,
          awayTeam,
          startTime: new Date(startTimeStr),
          status: 'UPCOMING'
        }
      });

      return { success: true, message: 'Fixture created successfully!', gameId: game.id };
    } catch (error: any) {
      return fail(500, { error: error.message || 'Failed to create game record' });
    }
  }
};