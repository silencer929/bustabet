import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/auth/login');

    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;

    if (!fullName || fullName.trim().length < 2) {
      return fail(400, { error: 'Full name must be at least 2 characters long' });
    }

    if (!phone || !phone.match(/^\+?[1-9]\d{1,14}$/)) {
      return fail(400, { error: 'Invalid phone format (must be E.164)' });
    }

    try {
      await db.profile.update({
        where: { id: locals.user.id },
        data: { fullName, phone }
      });

      return { success: true, message: 'Profile details updated successfully!' };
    } catch (error: any) {
      return fail(500, { error: error.message || 'Failed to update details' });
    }
  }
};