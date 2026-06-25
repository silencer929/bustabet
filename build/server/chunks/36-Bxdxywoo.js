import { S as SupportService } from './support.service-DFkmHDmU.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
import './db-CF_k3vJ4.js';
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

//#region src/routes/support/new/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const formData = await request.formData();
	const subject = formData.get("subject");
	const message = formData.get("message");
	if (!subject || subject.length < 4) return fail(400, { error: "Subject must be at least 4 characters long" });
	if (!message || message.length < 10) return fail(400, { error: "Please describe your issue in more detail (min 10 characters)" });
	let conversation;
	try {
		conversation = await SupportService.createTicket(locals.user.id, subject, message);
	} catch (error) {
		return fail(500, { error: error.message || "Failed to open ticket" });
	}
	throw redirect(303, `/support/${conversation.id}`);
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BjuukFzg.js')).default;
const server_id = "src/routes/support/new/+page.server.ts";
const imports = ["_app/immutable/nodes/36.YrIICPZc.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BVGcDGVq.js","_app/immutable/chunks/p1RKQm4f.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/rM84n8Ji.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-Bxdxywoo.js.map
