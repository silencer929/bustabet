import { r as redirect } from './index-BQZSrJq2.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/+layout.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	return { user: locals.user };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-6nKE6ifM.js')).default;
const server_id = "src/routes/admin/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.DcOyOugd.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/WLUPmRs-.js","_app/immutable/chunks/fhcoFGn2.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/_7EwW-Fe.js","_app/immutable/chunks/l58uqKd0.js","_app/immutable/chunks/Cv68DSkJ.js","_app/immutable/chunks/rM84n8Ji.js","_app/immutable/chunks/B7W6-iS0.js","_app/immutable/chunks/DoSFkTfC.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-Gwlf3z56.js.map
