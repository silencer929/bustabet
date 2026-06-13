import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { NotificationService } from '$lib/server/services/notification.service';
import { SignJWT } from 'jose';
import { JWT_SECRET as ENV_JWT_SECRET } from '$env/static/private';
import type { RowDataPacket } from 'mysql2';

const JWT_SECRET = new TextEncoder().encode(ENV_JWT_SECRET || 'fallback-secure-secret-key-at-least-256-bits-long');

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email || !email.includes('@')) {
      return fail(400, { error: 'Please enter a valid email address' });
    }

    try {
      // Query player credentials by email using standard SQL
      const [users] = await db.execute<RowDataPacket[]>(
        'SELECT id FROM users WHERE email = ? LIMIT 1',
        [email]
      );

      if (users.length > 0) {
        const user = users[0];

        // Sign a short-lived, stateless secure JWT for the password recovery link
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