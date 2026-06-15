import { r as redirect } from './index-BQZSrJq2.js';
import './index-DBqjc0Yf.js';

//#region src/routes/auth/logout/+page.server.ts
var actions = { logout: async ({ cookies }) => {
	cookies.delete("session", { path: "/" });
	throw redirect(303, "/auth/login");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions
});

const index = 20;
const server_id = "src/routes/auth/logout/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-BjMLZB0z.js.map
