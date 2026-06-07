import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SupportService } from '$lib/server/services/support.service';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  const tickets = await SupportService.getUserTickets(locals.user.id);
  return { tickets };
};