import { d as db } from './db-BcGa8hoB.js';
import { r as redirect } from './index-BQZSrJq2.js';
import '@prisma/client';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/users/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	return { profiles: await db.profile.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			user: { select: {
				id: true,
				email: true,
				role: true
			} },
			vipTier: true
		}
	}) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D1HZn6F4.js')).default;
const server_id = "src/routes/admin/users/+page.server.ts";
const imports = ["_app/immutable/nodes/13.DvTSmcPc.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/Cv68DSkJ.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/OQ4u24rf.js","_app/immutable/chunks/-IPS9uVo.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-CneLmix6.js.map
