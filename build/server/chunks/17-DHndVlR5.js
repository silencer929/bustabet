import { r as redirect } from './index-BQZSrJq2.js';
import './index-DBqjc0Yf.js';

//#region src/routes/auth/+page.server.ts
var load = async () => {
	throw redirect(303, "/sportsbook");
};
var actions = { logout: async ({ cookies }) => {
	cookies.delete("session", { path: "/" });
	throw redirect(303, "/auth/login");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 17;
const server_id = "src/routes/auth/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-DHndVlR5.js.map
