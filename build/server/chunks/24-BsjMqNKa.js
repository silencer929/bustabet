import './db-CF_k3vJ4.js';
import { N as NotificationService } from './notification.service-Br-QM6R8.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
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
import 'nodemailer';
import './index-DBqjc0Yf.js';

//#region src/routes/notifications/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	return { notifications: await NotificationService.getUnreadNotifications(locals.user.id) };
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
			await NotificationService.markAsRead(locals.user.id);
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

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-W4wYwfVd.js')).default;
const server_id = "src/routes/notifications/+page.server.ts";
const imports = ["_app/immutable/nodes/24.C9e3dNSP.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/DTnltfDP.js","_app/immutable/chunks/BNzKY-Lz.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/C5Fs53qb.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/Bp_PgSiZ.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=24-BsjMqNKa.js.map
