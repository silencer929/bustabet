import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';
import { paymentSchema } from '$lib/utils/validation';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      throw redirect(303, '/auth/login');
    }

    const formData = await request.formData();
    const amountStr = formData.get('amount') as string;
    const phone = formData.get('phone') as string;

    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
      return fail(400, { error: 'Please enter a valid deposit amount' });
    }

    if (!phone || !phone.match(/^\+?[1-9]\d{1,14}$/)) {
      return fail(400, { error: 'Invalid phone format. Please enter in international format (+254...)' });
    }

    try {
      const result = await WalletService.initiateMpesaDeposit(
        locals.user.id,
        amount,
        phone
      );

      if (result.success) {
        return { success: true, message: result.message };
      } else {
        return fail(400, { error: result.message });
      }
    } catch (error: any) {
      return fail(400, { error: error.message || 'Payment initiation failed' });
    }
  }
};