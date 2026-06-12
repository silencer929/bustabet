import { d as db } from './db-BcGa8hoB.js';
import { N as NotificationService } from './notification.service-a0m9nMr8.js';
import { f as fail } from './index-BQZSrJq2.js';
import { SignJWT } from 'jose';
import '@prisma/client';
import './private-CPklkgrX.js';
import 'nodemailer';
import './index-DBqjc0Yf.js';

//#region src/routes/auth/forgot-password/+page.server.ts
var JWT_SECRET = new TextEncoder().encode("login");
var actions = { default: async ({ request }) => {
	const email = (await request.formData()).get("email");
	if (!email || !email.includes("@")) return fail(400, { error: "Please enter a valid email address" });
	try {
		const user = await db.user.findUnique({ where: { email } });
		if (user) {
			const resetToken = await new SignJWT({
				userId: user.id,
				purpose: "password-reset"
			}).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("2h").sign(JWT_SECRET);
			await NotificationService.sendPasswordResetEmail(email, resetToken);
		}
	} catch (error) {
		console.error("[Forgot Password System Error]:", error);
	}
	return {
		success: true,
		message: "If that email is registered, a secure password reset link has been dispatched to it."
	};
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BqMUkcw6.js')).default;
const server_id = "src/routes/auth/forgot-password/+page.server.ts";
const imports = ["_app/immutable/nodes/17.Y2mEMObP.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/1v0-xqgc.js","_app/immutable/chunks/DvwXlVgx.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C-HfmsJM.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-BVugrfjA.js.map
