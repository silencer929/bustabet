import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/auth/login');
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/auth/login');

    const formData = await request.formData();
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!newPassword || newPassword.length < 6) {
      return fail(400, { error: 'New password must be at least 6 characters long' });
    }

    if (newPassword !== confirmPassword) {
      return fail(400, { error: 'Passwords do not match' });
    }

    try {
      const user = await db.user.findUnique({ where: { id: locals.user.id } });
      if (!user) throw new Error('User record not found');

      // Verify current password hash match
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return fail(400, { error: 'Your current password is incorrect' });
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);

      await db.user.update({
        where: { id: locals.user.id },
        data: { passwordHash }
      });

      return { success: true, message: 'Password updated successfully!' };
    } catch (error: any) {
      return fail(500, { error: error.message || 'Failed to update password' });
    }
  }
};