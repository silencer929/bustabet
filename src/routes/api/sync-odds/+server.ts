import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OddsSyncService } from '$lib/server/services/oddsSync.service';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
  const incomingSecret = url.searchParams.get('secret');

  if (incomingSecret !== env.CRON_SECRET) {
    return json({ success: false, message: 'Unauthorized access' }, { status: 401 });
  }

  try {
    // Sync all upcoming and live matches across ALL active sports in a single call
    await OddsSyncService.syncSportOdds('upcoming');

    return json({
      success: true,
      message: 'Dynamic upcoming odds synced successfully across all active sports'
    });
  } catch (error: any) {
    console.error('[API Sync Odds Error]:', error);
    return json({
      success: false,
      message: error.message || 'An unexpected error occurred during sync'
    }, { status: 500 });
  }
};