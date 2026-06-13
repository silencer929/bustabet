import { N as NotificationService } from './notification.service-DRcMeY8M.js';
import { A as AuthService } from './auth.service-ks9kmqgl.js';
import { r as registerSchema } from './validation-COmr84X5.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
import './db-CT_Sl39P.js';
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

const index = 20;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cp5F8KXr.js')).default;
const server_id = "src/routes/auth/register/+page.server.ts";
const imports = ["_app/immutable/nodes/20.5ny2BQEf.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CZvqM0u8.js","_app/immutable/chunks/D1bb2Z5h.js","_app/immutable/chunks/B9snSL_B.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-CBarhlVX.js.map
