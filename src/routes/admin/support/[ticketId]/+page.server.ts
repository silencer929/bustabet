import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { SupportService } from '$lib/server/services/support.service';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, locals }) => {
  // Double-verify admin roles before loading conversation history logs
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  // Load ticket details (calls the refactored SQL-driven support service)
  const conversation = await SupportService.getTicketDetails(params.ticketId);
  if (!conversation) {
    throw error(404, 'Ticket conversation not found');
  }

  return { conversation };
};

export const actions: Actions = {
  // Appends an administrative reply message and transitions ticket status to RESOLVED
  default: async ({ request, params, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const message = formData.get('message') as string;

    if (!message || message.trim().length === 0) {
      return fail(400, { error: 'Please enter a reply message before sending' });
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // Write administrative reply to the support_messages table
      await conn.execute(
        'INSERT INTO support_messages (id, conversation_id, sender_id, message) VALUES (?, ?, ?, ?)',
        [crypto.randomUUID(), params.ticketId, locals.user.id, message]
      );

      // Transition ticket status to RESOLVED when support staff replies
      await conn.execute(
        'UPDATE support_conversations SET status = "RESOLVED" WHERE id = ?',
        [params.ticketId]
      );

      await conn.commit();
      return { success: true };
    } catch (error: any) {
      await conn.rollback();
      return fail(500, { error: error.message || 'Failed to dispatch reply' });
    } finally {
      conn.release();
    }
  },

  // Closes the support ticket conversation manually
  closeTicket: async ({ params }) => {
    try {
      await db.execute(
        'UPDATE support_conversations SET status = "CLOSED" WHERE id = ?',
        [params.ticketId]
      );
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to close ticket' });
    }
  }
};