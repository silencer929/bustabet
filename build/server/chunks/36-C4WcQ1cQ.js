import { S as SupportService } from './support.service-DFkmHDmU.js';
import { f as fail, r as redirect, e as error } from './index-BQZSrJq2.js';
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

//#region src/routes/support/[ticketId]/+page.server.ts
var load = async ({ params, locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const conversation = await SupportService.getTicketDetails(params.ticketId);
	if (!conversation) throw error(404, "Support ticket not found");
	if (conversation.profileId !== locals.user.id && locals.user.user.role !== "ADMIN") throw error(403, "Unauthorized access to this conversation");
	return { conversation };
};
var actions = { default: async ({ request, params, locals }) => {
	if (!locals.user) return fail(401);
	const message = (await request.formData()).get("message");
	if (!message || message.trim().length === 0) return fail(400, { error: "Please enter a reply message before sending" });
	try {
		await SupportService.replyToTicket(params.ticketId, locals.user.id, message);
	} catch (error) {
		return fail(500, { error: error.message || "Failed to dispatch reply" });
	}
	return { success: true };
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bg6u4uEj.js')).default;
const server_id = "src/routes/support/[ticketId]/+page.server.ts";
const imports = ["_app/immutable/nodes/36.B9EwqyiN.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CPSaL4gT.js","_app/immutable/chunks/Dx_W4i5u.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/p6VmFF8Q.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/DiHnv9dC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-C4WcQ1cQ.js.map
