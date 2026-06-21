import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { ScoresSyncService } from '$lib/server/services/scoresSync.service';
import { CRON_SECRET } from '$env/static/private';
import type { RowDataPacket } from 'mysql2';

export const GET: RequestHandler = async ({ url }) => {
  const incomingSecret = url.searchParams.get('secret');

  // Verify secret token to prevent public requests from consuming credits
  if (incomingSecret !== CRON_SECRET) {
    return json({ success: false, message: 'Unauthorized access' }, { status: 401 });
  }

  try {
    // 1. Query your database to find only sports keys that have active 'LIVE' matches
    const [liveSports] = await db.execute<RowDataPacket[]>(
      "SELECT DISTINCT sport FROM admin_games WHERE status = 'LIVE'"
    );

    // Safeguard: If no matches are live, skip making API requests (Consumes 0 Credits)
    if (liveSports.length === 0) {
      return json({ 
        success: true, 
        message: 'No live matches active in the database. Sync skipped (0 credits used).' 
      });
    }

    const syncedLeagues: string[] = [];

    // 2. Selectively pull live scores only for the active, ongoing categories
    for (const row of liveSports) {
      await ScoresSyncService.syncLiveScores(row.sport);
      syncedLeagues.push(row.sport);
    }

    return json({
      success: true,
      message: 'Active live scores updated successfully',
      synced: syncedLeagues
    });
  } catch (error: any) {
    console.error('[API Sync Live Scores Error]:', error);
    return json({
      success: false,
      message: error.message || 'An unexpected error occurred during score sync'
    }, { status: 500 });
  }
};