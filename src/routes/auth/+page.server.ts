import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Automatically redirect users landing on the base domain to the sportsbook
  throw redirect(303, '/sportsbook');
};

export const actions: Actions = {
  // Global logout action accessible from any route on the platform
  logout: async ({ cookies }) => {
    cookies.delete('session', { path: '/' });
    throw redirect(303, '/auth/login');
  }
};