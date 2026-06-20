import { b as private_env } from './shared-server-9-2j12mp.js';
import { d as db } from './db-CF_k3vJ4.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
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
import './index-DBqjc0Yf.js';

//#region src/routes/auth/reset-password/+page.server.ts
var JWT_SECRET = new TextEncoder().encode(private_env.JWT_SECRET || "fallback-secure-secret-key-at-least-256-bits-long");
var load = async ({ url }) => {
	const token = url.searchParams.get("token");
	if (!token) throw redirect(303, "/auth/login");
	try {
		const { payload } = await jwtVerify(token, JWT_SECRET);
		if (payload.purpose !== "password-reset") return {
			valid: false,
			error: "Invalid security payload"
		};
		return {
			valid: true,
			token
		};
	} catch (error) {
		return {
			valid: false,
			error: "The recovery link has expired or is invalid."
		};
	}
};
var actions = { default: async ({ request }) => {
	const formData = await request.formData();
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");
	const token = formData.get("token");
	if (!password || password.length < 6) return fail(400, { error: "Password must be at least 6 characters" });
	if (password !== confirmPassword) return fail(400, { error: "Passwords do not match" });
	try {
		const { payload } = await jwtVerify(token, JWT_SECRET);
		if (payload.purpose !== "password-reset" || !payload.userId) return fail(400, { error: "Invalid security session" });
		const passwordHash = await bcrypt.hash(password, 10);
		await db.execute("UPDATE users SET password_hash = ? WHERE id = ?", [passwordHash, payload.userId]);
		return {
			success: true,
			message: "Your password has been reset successfully."
		};
	} catch (error) {
		return fail(400, { error: "Your recovery session has expired. Please request a new link." });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 22;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cxw6Uz7H.js')).default;
const server_id = "src/routes/auth/reset-password/+page.server.ts";
const imports = ["_app/immutable/nodes/22.addGXDmD.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CO2igMKS.js","_app/immutable/chunks/DXdR_0i9.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C-HfmsJM.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=22-BaHWVFgy.js.map
