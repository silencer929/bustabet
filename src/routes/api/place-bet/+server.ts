import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BettingService } from '$lib/server/services/betting.service';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ success: false, message: 'Please log in to place wagers' }, { status: 401 });
  }

  try {
    const payload = await request.json(); // Expects { type: 'SINGLE'|'COMBO', selections: Array, stake: number }

    if (!payload.type || !payload.selections || !Array.isArray(payload.selections) || !payload.stake) {
      return json({ success: false, message: 'Invalid betting payload structure' }, { status: 400 });
    }

    const result = await BettingService.placeWager(locals.user.id, {
      type: payload.type,
      selections: payload.selections,
      stake: Number(payload.stake)
    });

    return json({ success: true, message: result.message });
  } catch (error: any) {
    console.error('[API Place Wager Error]:', error);
    return json({ 
      success: false, 
      message: error.message || 'An unexpected error occurred during placement' 
    }, { status: 500 });
  }
};