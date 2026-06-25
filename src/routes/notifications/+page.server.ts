import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import { NotificationService } from '$lib/server/services/notification.service';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  const notifications = await NotificationService.getUnreadNotifications(locals.user.id);

  return { notifications };
};

export const actions: Actions = {
  // Marks an individual notification as read
  markRead: async ({ request, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const id = formData.get('id') as string;

    if (!id) return fail(400, { message: 'Missing notification identifier' });

    try {
      await NotificationService.markAsRead(id);
      return { success: true };
    } catch (error: any) {
      return fail(500, { error: error.message });
    }
  },

  // Marks all notifications belonging to the active profile as read
  clearAll: async ({ locals }) => {
    if (!locals.user) return fail(401);

    try {
      await NotificationService.markAsRead(locals.user.id);
      return { success: true };
    } catch (error: any) {
      return fail(500, { error: error.message });
    }
  }
};