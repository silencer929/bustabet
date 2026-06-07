import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { AuthService } from '$lib/server/services/auth.service';
import { loginSchema } from '$lib/utils/validation';

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
    const password = formData.get('password') as string;

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
		const errorMessage = validation.error.issues[0].message;
		return fail(400, { error: errorMessage });
    }

    try {
      const sessionToken = await AuthService.login(validation.data);

      // Save secure HTTP-Only session cookie
      cookies.set('session', sessionToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    } catch (error: any) {
      return fail(400, { error: error.message || 'Invalid credentials' });
    }

    throw redirect(303, '/sportsbook');
  }
};