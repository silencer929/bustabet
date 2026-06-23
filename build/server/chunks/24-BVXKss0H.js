import { d as db } from './db-CF_k3vJ4.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
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

//#region src/routes/profile/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const formData = await request.formData();
	const fullName = formData.get("fullName");
	const phone = formData.get("phone");
	if (!fullName || fullName.trim().length < 2) return fail(400, { error: "Full name must be at least 2 characters long" });
	if (!phone || !phone.match(/^\+?[1-9]\d{1,14}$/)) return fail(400, { error: "Invalid phone format (must be E.164)" });
	try {
		await db.execute("UPDATE profiles SET fullName = ?, phone = ? WHERE id = ?", [
			fullName.trim(),
			phone.trim(),
			locals.user.id
		]);
		return {
			success: true,
			message: "Profile details updated successfully!"
		};
	} catch (error) {
		return fail(500, { error: error.message || "Failed to update details" });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BNjIrLdn.js')).default;
const server_id = "src/routes/profile/+page.server.ts";
const imports = ["_app/immutable/nodes/24.B6JPlduo.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BdmOd4cx.js","_app/immutable/chunks/DRsjQXMR.js","_app/immutable/chunks/Cv68DSkJ.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/DZFLuljg.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/DiHnv9dC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=24-BVXKss0H.js.map
