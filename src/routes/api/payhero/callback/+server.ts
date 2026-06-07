import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const payload = await request.json();

    // Validate the basic payload structure before processing database changes
    if (!payload || !payload.external_reference || !payload.status || !payload.amount) {
      return json({ success: false, message: 'Invalid payload parameters' }, { status: 400 });
    }

    // Call the wallet service to update the database and credit the player
    const processed = await WalletService.handleMpesaCallback({
      status: payload.status,
      amount: Number(payload.amount),
      external_reference: payload.external_reference,
      MpesaCode: payload.MpesaCode
    });

    if (processed) {
      // Respond with 200 OK to inform PayHero that the webhook was successfully consumed
      return json({ success: true, message: 'Transaction reconciled successfully' });
    } else {
      return json({ 
        success: false, 
        message: 'Transaction reference not found or already settled' 
      }, { status: 404 });
    }
  } catch (error: any) {
    console.error('[PayHero Webhook Process Error]:', error);
    return json({ success: false, message: 'Internal server processing error' }, { status: 500 });
  }
};