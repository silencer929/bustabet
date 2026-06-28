import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SettlementService } from '$lib/server/services/settlement.service';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
  const incomingSecret = url.searchParams.get('secret');

  // Verify secret token to prevent unauthorized execution of bet settlement routines
  if (incomingSecret !== env.CRON_SECRET) {
    return json({ success: false, message: 'Unauthorized access' }, { status: 401 });
  }

  try {
    // 1. Settle all pending, real-world Single bets first (Cost: 1 Credit per sport)
    await SettlementService.settleSportBets('upcoming');

    // 2. Automate Combo Multibet Payouts: Iterates over and resolves all pending parlay tickets (Cost: 0 Credits)
    await SettlementService.settleComboBets();

    return json({
      success: true,
      message: 'All single and combo multibet wagers evaluated and settled successfully'
    });
  } catch (error: any) {
    console.error('[API Settle Bets Error]:', error);
    return json({
      success: false,
      message: error.message || 'An unexpected error occurred during settlement'
    }, { status: 500 });
  }
};