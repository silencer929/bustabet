import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { SupportService } from '$lib/server/services/support.service';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      throw redirect(303, '/auth/login');
    }

    const formData = await request.formData();
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!subject || subject.length < 4) {
      return fail(400, { error: 'Subject must be at least 4 characters long' });
    }

    if (!message || message.length < 10) {
      return fail(400, { error: 'Please describe your issue in more detail (min 10 characters)' });
    }

    let conversation;

    try {
      conversation = await SupportService.createTicket(
        locals.user.id,
        subject,
        message
      );
    } catch (error: any) {
      return fail(500, { error: error.message || 'Failed to open ticket' });
    }

    // Redirect user directly into the newly created ticketing conversation
    throw redirect(303, `/support/${conversation.id}`);
  }
};