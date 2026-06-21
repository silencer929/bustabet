import { d as db } from './db-CF_k3vJ4.js';
import { S as SupportService } from './support.service-DFkmHDmU.js';
import { f as fail, r as redirect, e as error } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/support/[ticketId]/+page.server.ts
var load = async ({ params, locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const conversation = await SupportService.getTicketDetails(params.ticketId);
	if (!conversation) throw error(404, "Ticket conversation not found");
	return { conversation };
};
var actions = {
	default: async ({ request, params, locals }) => {
		if (!locals.user) return fail(401);
		const message = (await request.formData()).get("message");
		if (!message || message.trim().length === 0) return fail(400, { error: "Please enter a reply message before sending" });
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			await conn.execute("INSERT INTO support_messages (id, conversation_id, sender_id, message) VALUES (?, ?, ?, ?)", [
				crypto.randomUUID(),
				params.ticketId,
				locals.user.id,
				message
			]);
			await conn.execute("UPDATE support_conversations SET status = \"RESOLVED\" WHERE id = ?", [params.ticketId]);
			await conn.commit();
			return { success: true };
		} catch (error) {
			await conn.rollback();
			return fail(500, { error: error.message || "Failed to dispatch reply" });
		} finally {
			conn.release();
		}
	},
	closeTicket: async ({ params }) => {
		try {
			await db.execute("UPDATE support_conversations SET status = \"CLOSED\" WHERE id = ?", [params.ticketId]);
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to close ticket" });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DZkbmz4o.js')).default;
const server_id = "src/routes/admin/support/[ticketId]/+page.server.ts";
const imports = ["_app/immutable/nodes/11.Bwg4-fPD.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/CDd_s-5h.js","_app/immutable/chunks/DSBC8WEr.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/p6VmFF8Q.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/DiHnv9dC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-Dgti9AGK.js.map
