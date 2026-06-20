import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OddsSyncService } from '$lib/server/services/oddsSync.service';
import { CRON_SECRET } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
  const incomingSecret = url.searchParams.get('secret');

  // Verify secret token to prevent public requests from consuming credits
  if (incomingSecret !== CRON_SECRET) {
    return json({ success: false, message: 'Unauthorized access' }, { status: 401 });
  }

  const eventId = url.searchParams.get('eventId');
  const sport = url.searchParams.get('sport');

  try {
    if (eventId && sport) {
      // Execute targeted Deep Harvest sync on player click or admin demand (Locked behind a 30-min cache)
      // await OddsSyncService.syncEventOddsDeep(sport, eventId);
      return json({
        success: true,
        message: `Deep harvest sync requested for event: ${eventId}`
      });
    } else {
      // Quota-Locked Sync: Standard sync for the 4 famous leagues (Locked behind a 1-hour cache)
      const synced = await OddsSyncService.syncFamousLeaguesStandard();
      return json({
        success: true,
        message: 'Standard famous leagues sync execution complete',
        synced
      });
    }
  } catch (error: any) {
    console.error('[API Sync Odds Error]:', error);
    return json({
      success: false,
      message: error.message || 'An unexpected error occurred during sync'
    }, { status: 500 });
  }
};