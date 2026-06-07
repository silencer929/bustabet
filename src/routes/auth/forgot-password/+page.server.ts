import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { NotificationService } from '$lib/server/services/notification.service';
import { SignJWT } from 'jose';
import { JWT_SECRET as ENV_JWT_SECRET } from '$env/static/private';

const JWT_SECRET = new TextEncoder().encode(ENV_JWT_SECRET || 'fallback-secure-secret-key-at-least-256-bits-long');

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email || !email.includes('@')) {
      return fail(400, { error: 'Please enter a valid email address' });
    }

    try {
      const user = await db.user.findUnique({ where: { email } });

      if (user) {
        // Sign a short-lived, stateless secure JWT for the password reset request
        const resetToken = await new SignJWT({ userId: user.id, purpose: 'password-reset' })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('2h')
          .sign(JWT_SECRET);

        await NotificationService.sendPasswordResetEmail(email, resetToken);
      }
    } catch (error) {
      console.error('[Forgot Password System Error]:', error);
    }

    // Always output a generic confirmation message to prevent security enumeration attacks
    return { 
      success: true, 
      message: 'If that email is registered, a secure password reset link has been dispatched to it.' 
    };
  }
};