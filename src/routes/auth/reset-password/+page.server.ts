import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import { JWT_SECRET as ENV_JWT_SECRET } from '$env/static/private';

const JWT_SECRET = new TextEncoder().encode(ENV_JWT_SECRET || 'fallback-secure-secret-key-at-least-256-bits-long');

export const load: PageServerLoad = async ({ url }) => {
  const token = url.searchParams.get('token');
  
  if (!token) {
    throw redirect(303, '/auth/login');
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    if (payload.purpose !== 'password-reset') {
      return { valid: false, error: 'Invalid security payload' };
    }
    
    return { valid: true, token };
  } catch (error) {
    return { valid: false, error: 'The recovery link has expired or is invalid.' };
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const token = formData.get('token') as string;

    if (!password || password.length < 6) {
      return fail(400, { error: 'Password must be at least 6 characters' });
    }

    if (password !== confirmPassword) {
      return fail(400, { error: 'Passwords do not match' });
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      if (payload.purpose !== 'password-reset' || !payload.userId) {
        return fail(400, { error: 'Invalid security session' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      
      const conn = await db.execute<RowDataPacket[]>(
        'UPDATE users SET password_hash = ? WHERE id = ?',
        [passwordHash, payload.userId as string]
      );

      return { success: true, message: 'Your password has been reset successfully.' };
    } catch (error) {
      return fail(400, { error: 'Your recovery session has expired. Please request a new link.' });
    }
  }
};