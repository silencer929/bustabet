import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  const balance = await WalletService.getBalance(locals.user.id);
  return { balance };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      throw redirect(303, '/auth/login');
    }

    const formData = await request.formData();
    const amountStr = formData.get('amount') as string;
    const destination = formData.get('destination') as string;

    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
      return fail(400, { error: 'Please enter a valid withdrawal amount' });
    }

    if (!destination || destination.length < 4) {
      return fail(400, { error: 'Please specify a valid payment destination (e.g. Phone Number)' });
    }
    try {
      // Processes the request inside the WalletService checking local ledger balances
      await WalletService.initiateWithdrawal(
        locals.user.id,
        amount,
        destination // Pass the phone destination
      );

      return { 
        success: true, 
        message: 'Your withdrawal request has been queued. Payouts are usually processed within 2 hours.' 
      };
    } catch (error: any) {
      return fail(400, { error: error.message || 'Withdrawal request failed' });
    }
  }
};