const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["icons/android-chrome-512x512.png","icons/apple-touch-icon.png","icons/favicon-16x16.png","icons/favicon-32x32.png","icons/favicon.ico","logos/logo.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CfGehADw.js",app:"_app/immutable/entry/app.BBuzywa2.js",imports:["_app/immutable/entry/start.CfGehADw.js","_app/immutable/chunks/D1bb2Z5h.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/entry/app.BBuzywa2.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/kNaey6uv.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BTUuFY_0.js')),
			__memo(() => import('./chunks/1-BsPPRprj.js')),
			__memo(() => import('./chunks/2-O2mHtqvX.js')),
			__memo(() => import('./chunks/3-CH3BHKyB.js')),
			__memo(() => import('./chunks/4-CBfWAWXW.js')),
			__memo(() => import('./chunks/5-B4NQV2bY.js')),
			__memo(() => import('./chunks/6-Lg9yZvjy.js')),
			__memo(() => import('./chunks/7-BFSODv_x.js')),
			__memo(() => import('./chunks/8-BdwC-QSz.js')),
			__memo(() => import('./chunks/9-B9HsWWMg.js')),
			__memo(() => import('./chunks/10-CcY_8Qrk.js')),
			__memo(() => import('./chunks/11-CkNVYYxO.js')),
			__memo(() => import('./chunks/12-BeTR3IZZ.js')),
			__memo(() => import('./chunks/13-BAUDyKM-.js')),
			__memo(() => import('./chunks/14-DVNC4iqB.js')),
			__memo(() => import('./chunks/15-CqRfuSEX.js')),
			__memo(() => import('./chunks/16-Dtl1HX_s.js')),
			__memo(() => import('./chunks/17-6E4psro1.js')),
			__memo(() => import('./chunks/18-CBq2yzXq.js')),
			__memo(() => import('./chunks/19-BNkIHWc8.js')),
			__memo(() => import('./chunks/20-CBarhlVX.js')),
			__memo(() => import('./chunks/21-Dhv4upUR.js')),
			__memo(() => import('./chunks/22-DVB_9V5Z.js')),
			__memo(() => import('./chunks/23-DTsuLxys.js')),
			__memo(() => import('./chunks/24-C-WsQ0b2.js')),
			__memo(() => import('./chunks/25-C9oryrzg.js')),
			__memo(() => import('./chunks/26-B4uHoleY.js')),
			__memo(() => import('./chunks/27-BI6UK6iM.js')),
			__memo(() => import('./chunks/28-CQzSFl71.js')),
			__memo(() => import('./chunks/29-CTmwjo7_.js')),
			__memo(() => import('./chunks/30-DOEbdFSu.js')),
			__memo(() => import('./chunks/31-CsJaWbRa.js')),
			__memo(() => import('./chunks/32-C8rVemfq.js')),
			__memo(() => import('./chunks/33-Clx-Xk2k.js')),
			__memo(() => import('./chunks/34-BH7oVfPd.js')),
			__memo(() => import('./chunks/35-2i0iQGVf.js')),
			__memo(() => import('./chunks/36-BizCueCi.js')),
			__memo(() => import('./chunks/37-DPvpPXtB.js')),
			__memo(() => import('./chunks/38-BONtlp5q.js')),
			__memo(() => import('./chunks/39-DYuiB2xx.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin/bets",
				pattern: /^\/admin\/bets\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/dashboard",
				pattern: /^\/admin\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/games",
				pattern: /^\/admin\/games\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/games/[id]",
				pattern: /^\/admin\/games\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/markets",
				pattern: /^\/admin\/markets\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/promotions",
				pattern: /^\/admin\/promotions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/support",
				pattern: /^\/admin\/support\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/support/[ticketId]",
				pattern: /^\/admin\/support\/([^/]+?)\/?$/,
				params: [{"name":"ticketId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/transactions",
				pattern: /^\/admin\/transactions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/users/[id]",
				pattern: /^\/admin\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/verification",
				pattern: /^\/admin\/verification\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/vip",
				pattern: /^\/admin\/vip\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/api/payhero/callback",
				pattern: /^\/api\/payhero\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CfFIqHYf.js'))
			},
			{
				id: "/api/settle-bets",
				pattern: /^\/api\/settle-bets\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BxsFqCa7.js'))
			},
			{
				id: "/api/sync-odds",
				pattern: /^\/api\/sync-odds\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DGYx1bkz.js'))
			},
			{
				id: "/auth/forgot-password",
				pattern: /^\/auth\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/auth/logout",
				pattern: /^\/auth\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/auth/reset-password",
				pattern: /^\/auth\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/notifications",
				pattern: /^\/notifications\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/profile/preferences",
				pattern: /^\/profile\/preferences\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/profile/security",
				pattern: /^\/profile\/security\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/profile/verification",
				pattern: /^\/profile\/verification\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/promotions",
				pattern: /^\/promotions\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/referrals",
				pattern: /^\/referrals\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/sportsbook",
				pattern: /^\/sportsbook\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/sportsbook/match/[id]",
				pattern: /^\/sportsbook\/match\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/sportsbook/[sport]",
				pattern: /^\/sportsbook\/([^/]+?)\/?$/,
				params: [{"name":"sport","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/support",
				pattern: /^\/support\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/support/new",
				pattern: /^\/support\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/support/[ticketId]",
				pattern: /^\/support\/([^/]+?)\/?$/,
				params: [{"name":"ticketId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/vip",
				pattern: /^\/vip\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/wallet",
				pattern: /^\/wallet\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/wallet/deposit",
				pattern: /^\/wallet\/deposit\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/wallet/history",
				pattern: /^\/wallet\/history\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/wallet/withdraw",
				pattern: /^\/wallet\/withdraw\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 39 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
