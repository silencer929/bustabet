import { b as private_env } from './shared-server-9-2j12mp.js';
import { d as db } from './db-CF_k3vJ4.js';
import { N as NotificationService } from './notification.service-Br-QM6R8.js';
import { f as fail } from './index-BQZSrJq2.js';
import { SignJWT } from 'jose';
import 'node:buffer';
import 'events';
import 'process';
import 'net';
import 'tls';
import 'timers';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'crypto';
import 'zlib';
import 'util';
import 'url';
import 'nodemailer';
import './index-DBqjc0Yf.js';

//#region src/routes/auth/forgot-password/+page.server.ts
var JWT_SECRET = new TextEncoder().encode(private_env.JWT_SECRET || "fallback-secure-secret-key-at-least-256-bits-long");
var actions = { default: async ({ request }) => {
	const email = (await request.formData()).get("email");
	if (!email || !email.includes("@")) return fail(400, { error: "Please enter a valid email address" });
	try {
		const [users] = await db.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
		if (users.length > 0) {
			const user = users[0];
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

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5ojsi9GL.js')).default;
const server_id = "src/routes/auth/forgot-password/+page.server.ts";
const imports = ["_app/immutable/nodes/19.eqsa247v.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CeDpphpI.js","_app/immutable/chunks/C-Z3mU-d.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C-HfmsJM.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-Di1ptOk7.js.map
