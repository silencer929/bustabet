import type { Handle } from '@sveltejs/kit';
import { AuthService } from '$lib/server/services/auth.service';
import { db } from '$lib/server/db';
import type { FullProfileDetails } from '$lib/types/profile';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get('session');

  // Populate locals default state to avoid undefined pointer exceptions
  event.locals.user = null;

  if (sessionToken) {
    const sessionClaims = await AuthService.verifySessionToken(sessionToken);

    if (sessionClaims) {
      try {
        // Retrieve full profile details with VIP tier benefits from database
        const profile = await db.profile.findUnique({
          where: { id: sessionClaims.userId },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true
              }
            },
            vipTier: true
          }
        });

        if (profile) {
          event.locals.user = profile as unknown as FullProfileDetails;
        } else {
          // Clear invalid session cookie if database record no longer exists
          event.cookies.delete('session', { path: '/' });
        }
      } catch (error) {
        console.error('[Hooks Database Connection Error]:', error);
      }
    }
  }

  const response = await resolve(event);
  return response;
};