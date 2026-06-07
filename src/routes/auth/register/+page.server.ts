import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { AuthService } from '$lib/server/services/auth.service';
import { registerSchema } from '$lib/utils/validation';
import { NotificationService } from '$lib/server/services/notification.service';

export const load: PageServerLoad = async ({ locals }) => {
  // Redirect already authenticated users directly back to the sportsbook
  if (locals.user) {
    throw redirect(303, '/sportsbook');
  }
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const country = formData.get('country') as string;
    const currency = formData.get('currency') as string;
    const referralCode = formData.get('referralCode') as string || undefined;

    const validation = registerSchema.safeParse({
      email,
      username,
      password,
      fullName,
      phone,
      country,
      currency,
      referralCode
    });

    if (!validation.success) {
      const errorMessage = validation.error.issues[0].message;
      return fail(400, { error: errorMessage });
    }

    try {
      const sessionToken = await AuthService.register(validation.data);

      // Save secure HTTP-Only session cookie
      cookies.set('session', sessionToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      // Dispatch registration email message asynchronously
      await NotificationService.sendRegistrationEmail(email, username);
    } catch (error: any) {
      return fail(400, { error: error.message || 'Registration failed' });
    }

    throw redirect(303, '/sportsbook');
  }
};