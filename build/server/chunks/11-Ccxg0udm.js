import { d as db } from './db-BcGa8hoB.js';
import { S as SupportService } from './support.service-D0mNTRsT.js';
import { f as fail, r as redirect, e as error } from './index-BQZSrJq2.js';
import '@prisma/client';
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
		try {
			await db.$transaction(async (tx) => {
				await tx.supportMessage.create({ data: {
					conversationId: params.ticketId,
					senderId: locals.user.id,
					message
				} });
				await tx.supportConversation.update({
					where: { id: params.ticketId },
					data: { status: "RESOLVED" }
				});
			});
		} catch (error) {
			return fail(500, { error: error.message || "Failed to dispatch reply" });
		}
		return { success: true };
	},
	closeTicket: async ({ params }) => {
		try {
			await db.supportConversation.update({
				where: { id: params.ticketId },
				data: { status: "CLOSED" }
			});
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
const component = async () => component_cache ??= (await import('./_page.svelte-Cxl4w-Hd.js')).default;
const server_id = "src/routes/admin/support/[ticketId]/+page.server.ts";
const imports = ["_app/immutable/nodes/11.C1f5X60K.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/1v0-xqgc.js","_app/immutable/chunks/DvwXlVgx.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/p6VmFF8Q.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/DiHnv9dC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-Ccxg0udm.js.map
