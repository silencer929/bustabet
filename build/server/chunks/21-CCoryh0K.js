import { N as NotificationService } from './notification.service-Br-QM6R8.js';
import { A as AuthService } from './auth.service-Dl0vjVs0.js';
import { r as registerSchema } from './validation-COmr84X5.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
import './shared-server-9-2j12mp.js';
import './db-CF_k3vJ4.js';
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
import 'bcryptjs';
import 'jose';
import 'zod';
import './index-DBqjc0Yf.js';

//#region src/routes/auth/register/+page.server.ts
var load = async ({ locals }) => {
	if (locals.user) throw redirect(303, "/sportsbook");
};
var actions = { default: async ({ request, cookies }) => {
	const formData = await request.formData();
	const email = formData.get("email");
	const username = formData.get("username");
	const password = formData.get("password");
	const fullName = formData.get("fullName");
	const phone = formData.get("phone");
	const country = formData.get("country");
	const currency = formData.get("currency");
	const referralCode = formData.get("referralCode") || void 0;
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
		cookies.set("session", sessionToken, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			maxAge: 3600 * 24 * 7
		});
		await NotificationService.sendRegistrationEmail(email, username);
	} catch (error) {
		return fail(400, { error: error.message || "Registration failed" });
	}
	throw redirect(303, "/sportsbook");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 21;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B8KI2IpU.js')).default;
const server_id = "src/routes/auth/register/+page.server.ts";
const imports = ["_app/immutable/nodes/21.DVohrxm7.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CDd_s-5h.js","_app/immutable/chunks/DSBC8WEr.js","_app/immutable/chunks/DzF3gb9d.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=21-CCoryh0K.js.map
