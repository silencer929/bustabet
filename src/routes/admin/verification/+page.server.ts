import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading compliance tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const documents = await db.verificationDoc.findMany({
    orderBy: { submittedAt: 'desc' },
    include: {
      profile: {
        select: { username: true }
      }
    }
  });

  return { documents };
};

export const actions: Actions = {
  // Approves a pending compliance document
  approve: async ({ request, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      const doc = await db.verificationDoc.update({
        where: { id },
        data: {
          status: 'APPROVED',
          reviewedBy: locals.user.id
        }
      });

      // Dispatch congratulatory account limits notification to player
      await db.notification.create({
        data: {
          profileId: doc.profileId,
          title: 'KYC Verification Approved',
          message: `Your ${doc.documentType.replace('_', ' ')} has been approved. Your account limits have been successfully removed.`,
          read: false
        }
      });

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
      const doc = await db.verificationDoc.update({
        where: { id },
        data: {
          status: 'REJECTED',
          reviewedBy: locals.user.id
        }
      });

      // Dispatch a corrective notice alerting the player to re-upload documents
      await db.notification.create({
        data: {
          profileId: doc.profileId,
          title: 'KYC Verification Rejected',
          message: `Your ${doc.documentType.replace('_', ' ')} was rejected. Please re-upload a clear, uncropped copy.`,
          read: false
        }
      });

      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to reject document' });
    }
  }
};