import { d as db } from './db-CF_k3vJ4.js';
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
import './index-DBqjc0Yf.js';

//#region src/routes/admin/verification/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [documents] = await db.execute("SELECT d.*, p.username FROM verification_documents d LEFT JOIN profiles p ON d.profileId = p.id ORDER BY d.submittedAt DESC");
	return { documents };
};
var actions = {
	approve: async ({ request, locals }) => {
		if (!locals.user) return fail(401);
		const id = (await request.formData()).get("id");
		try {
			await db.execute("UPDATE verification_documents SET status = ?, reviewedBy = ? WHERE id = ?", [
				"APPROVED",
				locals.user.id,
				id
			]);
			return { success: true };
		} catch {
			return fail(500, { error: "Failed to approve document" });
		}
	},
	reject: async ({ request, locals }) => {
		if (!locals.user) return fail(401);
		const id = (await request.formData()).get("id");
		try {
			await db.execute("UPDATE verification_documents SET status = ?, reviewedBy = ? WHERE id = ?", [
				"REJECTED",
				locals.user.id,
				id
			]);
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
const component = async () => component_cache ??= (await import('./_page.svelte-BkjRRzIa.js')).default;
const server_id = "src/routes/admin/verification/+page.server.ts";
const imports = ["_app/immutable/nodes/15.DG8XtSFt.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BJme-EP-.js","_app/immutable/chunks/BIzhRwQX.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/BJhGESTH.js","_app/immutable/chunks/B7W6-iS0.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-B1jgKQ-V.js.map
