import { error, redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { SupportService } from '$lib/server/services/support.service';
import type { ConversationWithDetails } from '$lib/types/support';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  const conversation = await SupportService.getTicketDetails(params.ticketId);

  if (!conversation) {
    throw error(404, 'Support ticket not found');
  }

  // Prevent users from accessing other player's private support logs
  if (conversation.profileId !== locals.user.id && locals.user.user.role !== 'ADMIN') {
    throw error(403, 'Unauthorized access to this conversation');
  }

  return {
    conversation: conversation as unknown as ConversationWithDetails
  };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    if (!locals.user) return fail(401);

    const formData = await request.formData();
    const message = formData.get('message') as string;

    if (!message || message.trim().length === 0) {
      return fail(400, { error: 'Please enter a reply message before sending' });
    }

    try {
      await SupportService.replyToTicket(
        params.ticketId,
        locals.user.id,
        message
      );
    } catch (error: any) {
      return fail(500, { error: error.message || 'Failed to dispatch reply' });
    }

    return { success: true };
  }
};