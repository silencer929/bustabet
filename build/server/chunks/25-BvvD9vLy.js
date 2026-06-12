import { d as db } from './db-BcGa8hoB.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
import bcrypt from 'bcryptjs';
import '@prisma/client';
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
		const user = await db.user.findUnique({ where: { id: locals.user.id } });
		if (!user) throw new Error("User record not found");
		if (!await bcrypt.compare(currentPassword, user.passwordHash)) return fail(400, { error: "Your current password is incorrect" });
		const passwordHash = await bcrypt.hash(newPassword, 10);
		await db.user.update({
			where: { id: locals.user.id },
			data: { passwordHash }
		});
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

const index = 25;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BksME6ss.js')).default;
const server_id = "src/routes/profile/security/+page.server.ts";
const imports = ["_app/immutable/nodes/25.BUXzOmrS.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/1v0-xqgc.js","_app/immutable/chunks/DvwXlVgx.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/C-HfmsJM.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=25-BvvD9vLy.js.map
