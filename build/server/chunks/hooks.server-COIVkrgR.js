import { d as db } from './db-BcGa8hoB.js';
import { A as AuthService } from './auth.service-CSKBmc_Z.js';
import '@prisma/client';
import 'bcryptjs';
import 'jose';

//#region src/hooks.server.ts
var handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get("session");
	event.locals.user = null;
	if (sessionToken) {
		const sessionClaims = await AuthService.verifySessionToken(sessionToken);
		if (sessionClaims) try {
			const profile = await db.profile.findUnique({
				where: { id: sessionClaims.userId },
				include: {
					user: { select: {
						id: true,
						email: true,
						role: true
					} },
					vipTier: true
				}
			});
			if (profile) event.locals.user = profile;
			else event.cookies.delete("session", { path: "/" });
		} catch (error) {
			console.error("[Hooks Database Connection Error]:", error);
		}
	}
	return await resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-COIVkrgR.js.map
