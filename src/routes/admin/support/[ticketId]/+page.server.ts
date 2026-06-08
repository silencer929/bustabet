import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { SupportService } from '$lib/server/services/support.service';
import { db } from '$lib/server/db';
import type { ConversationWithDetails } from '$lib/types/support';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const conversation = await SupportService.getTicketDetails(params.ticketId);
  if (!conversation) {
    throw error(404, 'Ticket conversation not found');
  }

  return {
    conversation: conversation as unknown as ConversationWithDetails
  };
};

export const actions: Actions = {
  // Appends an administrator reply message and updates status to RESOLVED
  default: async ({ request, params, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const message = formData.get('message') as string;

    if (!message || message.trim().length === 0) {
      return fail(400, { error: 'Please enter a reply message before sending' });
    }

    try {
      await db.$transaction(async (tx) => {
        await tx.supportMessage.create({
          data: {
            conversationId: params.ticketId,
            senderId: locals.user!.id,
            message
          }
        });

        // Set status to RESOLVED once support staff replies
        await tx.supportConversation.update({
          where: { id: params.ticketId },
          data: { status: 'RESOLVED' }
        });
      });
    } catch (error: any) {
      return fail(500, { error: error.message || 'Failed to dispatch reply' });
    }

    return { success: true };
  },

  // Closes the support ticket conversation
  closeTicket: async ({ params }) => {
    try {
      await db.supportConversation.update({
        where: { id: params.ticketId },
        data: { status: 'CLOSED' }
      });
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to close ticket' });
    }
  }
};