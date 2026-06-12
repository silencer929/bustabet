import { d as db } from './db-BcGa8hoB.js';
import { N as NotificationService } from './notification.service-a0m9nMr8.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
import '@prisma/client';
import './private-CPklkgrX.js';
import 'nodemailer';
import './index-DBqjc0Yf.js';

//#region src/routes/notifications/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	return { notifications: await db.notification.findMany({
		where: { profileId: locals.user.id },
		orderBy: { createdAt: "desc" }
	}) };
};
var actions = {
	markRead: async ({ request, locals }) => {
		if (!locals.user) return fail(401);
		const id = (await request.formData()).get("id");
		if (!id) return fail(400, { message: "Missing notification identifier" });
		try {
			await NotificationService.markAsRead(id);
			return { success: true };
		} catch (error) {
			return fail(500, { error: error.message });
		}
	},
	clearAll: async ({ locals }) => {
		if (!locals.user) return fail(401);
		try {
			await db.notification.updateMany({
				where: {
					profileId: locals.user.id,
					read: false
				},
				data: { read: true }
			});
			return { success: true };
		} catch (error) {
			return fail(500, { error: error.message });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 22;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BqvYsDEo.js')).default;
const server_id = "src/routes/notifications/+page.server.ts";
const imports = ["_app/immutable/nodes/22.f8i4J2oF.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/1v0-xqgc.js","_app/immutable/chunks/DvwXlVgx.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/C5Fs53qb.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/Bp_PgSiZ.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=22-CIBfML1_.js.map
