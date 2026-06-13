import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading compliance tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }
  const [documents] = await db.execute<RowDataPacket[]>(
    'SELECT d.*, p.username FROM verification_documents d LEFT JOIN profiles p ON d.profileId = p.id ORDER BY d.submittedAt DESC'
  ); 

  return { documents };
};

export const actions: Actions = {
  // Approves a pending compliance document
  approve: async ({ request, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      await db.execute(
        'UPDATE verification_documents SET status = ?, reviewedBy = ? WHERE id = ?',
        ['APPROVED', locals.user.id, id]
      );

      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to approve document' });
    }
  },

  // Rejects a pending compliance document
  reject: async ({ request, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      await db.execute(
        'UPDATE verification_documents SET status = ?, reviewedBy = ? WHERE id = ?',
        ['REJECTED', locals.user.id, id]
      );

      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to reject document' });
    }
  }
};