import { d as db } from './db-BcGa8hoB.js';
import { r as redirect } from './index-BQZSrJq2.js';
import '@prisma/client';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/support/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	return { tickets: await db.supportConversation.findMany({
		orderBy: { createdAt: "desc" },
		include: { profile: { select: { username: true } } }
	}) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CSeAT-KM.js')).default;
const server_id = "src/routes/admin/support/+page.server.ts";
const imports = ["_app/immutable/nodes/10.BahbZXNx.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/Cv68DSkJ.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/rM84n8Ji.js","_app/immutable/chunks/CC39i5ha.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-Bm0rj2Uk.js.map
