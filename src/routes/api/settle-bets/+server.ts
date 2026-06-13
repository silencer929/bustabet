import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SettlementService } from '$lib/server/services/settlement.service';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
  const incomingSecret = url.searchParams.get('secret');

  if (incomingSecret !== env.CRON_SECRET) {
    return json({ success: false, message: 'Unauthorized access' }, { status: 401 });
  }

  try {
    // Settle all pending bets globally by syncing recent results across active sports
    await SettlementService.settleSportBets('upcoming');

    return json({
      success: true,
      message: 'Global bet settlements updated successfully'
    });
  } catch (error: any) {
    console.error('[API Settle Bets Error]:', error);
    return json({
      success: false,
      message: error.message || 'An unexpected error occurred during settlement'
    }, { status: 500 });
  }
};