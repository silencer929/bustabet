import { d as db } from './db-CF_k3vJ4.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
import bcrypt from 'bcryptjs';
import './shared-server-9-2j12mp.js';
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

//#region src/routes/profile/security/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const formData = await request.formData();
	const currentPassword = formData.get("currentPassword");
	const newPassword = formData.get("newPassword");
	const confirmPassword = formData.get("confirmPassword");
	if (!newPassword || newPassword.length < 6) return fail(400, { error: "New password must be at least 6 characters long" });
	if (newPassword !== confirmPassword) return fail(400, { error: "Passwords do not match" });
	try {
		const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [locals.user.id]);
		if (!user) throw new Error("User record not found");
		if (!await bcrypt.compare(currentPassword, user[0].passwordHash)) return fail(400, { error: "Your current password is incorrect" });
		const passwordHash = await bcrypt.hash(newPassword, 10);
		await db.execute("UPDATE users SET passwordHash = ? WHERE id = ?", [passwordHash, locals.user.id]);
		return {
			success: true,
			message: "Password updated successfully!"
		};
	} catch (error) {
		return fail(500, { error: error.message || "Failed to update password" });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 28;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dc-iTIH-.js')).default;
const server_id = "src/routes/profile/security/+page.server.ts";
const imports = ["_app/immutable/nodes/28.qt3t93Yb.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/DbaNhHbf.js","_app/immutable/chunks/Crdp9ooN.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/C-HfmsJM.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=28-0aAlAsdu.js.map
