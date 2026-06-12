import { d as db } from './db-CT_Sl39P.js';
import { f as fail, r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/verification/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	return { documents: await db.verificationDoc.findMany({
		orderBy: { submittedAt: "desc" },
		include: { profile: { select: { username: true } } }
	}) };
};
var actions = {
	approve: async ({ request, locals }) => {
		if (!locals.user) return fail(401);
		const id = (await request.formData()).get("id");
		try {
			const doc = await db.verificationDoc.update({
				where: { id },
				data: {
					status: "APPROVED",
					reviewedBy: locals.user.id
				}
			});
			await db.notification.create({ data: {
				profileId: doc.profileId,
				title: "KYC Verification Approved",
				message: `Your ${doc.documentType.replace("_", " ")} has been approved. Your account limits have been successfully removed.`,
				read: false
			} });
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to approve document" });
		}
	},
	reject: async ({ request, locals }) => {
		if (!locals.user) return fail(401);
		const id = (await request.formData()).get("id");
		try {
			const doc = await db.verificationDoc.update({
				where: { id },
				data: {
					status: "REJECTED",
					reviewedBy: locals.user.id
				}
			});
			await db.notification.create({ data: {
				profileId: doc.profileId,
				title: "KYC Verification Rejected",
				message: `Your ${doc.documentType.replace("_", " ")} was rejected. Please re-upload a clear, uncropped copy.`,
				read: false
			} });
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to reject document" });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DrOFq0ze.js')).default;
const server_id = "src/routes/admin/verification/+page.server.ts";
const imports = ["_app/immutable/nodes/15.Ci5lTWO4.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BiJ5viip.js","_app/immutable/chunks/BqU7Q6ic.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/BJhGESTH.js","_app/immutable/chunks/B7W6-iS0.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-D4ZLdHb6.js.map
