import type { LayoutServerLoad } from './$types';
import { WalletService } from '$lib/server/services/wallet.service';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Transfer server session state and wallet balances down to Svelte layout components
  if (locals.user) {
    const balance = await WalletService.getBalance(locals.user.id);
    
    return {
      user: locals.user,
      balance
    };
  }

  return {
    user: null,
    balance: 0
  };
};