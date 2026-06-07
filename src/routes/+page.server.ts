import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Automatically redirect users landing on the base domain to the sportsbook dashboard
  throw redirect(303, '/sportsbook');
};