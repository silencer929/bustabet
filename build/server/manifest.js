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
		client: {start:"_app/immutable/entry/start.DStv_iH2.js",app:"_app/immutable/entry/app.bZwtH_Um.js",imports:["_app/immutable/entry/start.DStv_iH2.js","_app/immutable/chunks/p1RKQm4f.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/entry/app.bZwtH_Um.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/kNaey6uv.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BlEFsAeL.js')),
			__memo(() => import('./chunks/1-D5i1cOgs.js')),
			__memo(() => import('./chunks/2-DDjTckli.js')),
			__memo(() => import('./chunks/3-CH3BHKyB.js')),
			__memo(() => import('./chunks/4-DjifjRfH.js')),
			__memo(() => import('./chunks/5-CfsH47tm.js')),
			__memo(() => import('./chunks/6-B3l5-_VQ.js')),
			__memo(() => import('./chunks/7-BgbGByoE.js')),
			__memo(() => import('./chunks/8-DQzfF8jH.js')),
			__memo(() => import('./chunks/9-CDMoZBwG.js')),
			__memo(() => import('./chunks/10-CBFhgcsK.js')),
			__memo(() => import('./chunks/11-Dk7rBx6k.js')),
			__memo(() => import('./chunks/12-DKR-k2C2.js')),
			__memo(() => import('./chunks/13-C5WrY9tj.js')),
			__memo(() => import('./chunks/14-De75inB7.js')),
			__memo(() => import('./chunks/15-B_-LYUQl.js')),
			__memo(() => import('./chunks/16-BO1dkwj6.js')),
			__memo(() => import('./chunks/17-GIwr0Kkq.js')),
			__memo(() => import('./chunks/18-rLWgoz7i.js')),
			__memo(() => import('./chunks/19-DNme5bZ4.js')),
			__memo(() => import('./chunks/20-B7DQD6B_.js')),
			__memo(() => import('./chunks/21-DNTXSPVO.js')),
			__memo(() => import('./chunks/22-BJzCkRKm.js')),
			__memo(() => import('./chunks/23-lcQI1iao.js')),
			__memo(() => import('./chunks/24-rvy1DDED.js')),
			__memo(() => import('./chunks/25-MRLYg1Bi.js')),
			__memo(() => import('./chunks/26-DIRxqSUc.js')),
			__memo(() => import('./chunks/27-DyOuT1tE.js')),
			__memo(() => import('./chunks/28-C4BrEz5j.js')),
			__memo(() => import('./chunks/29-BbErUGUZ.js')),
			__memo(() => import('./chunks/30-D7IL0zOx.js')),
			__memo(() => import('./chunks/31-BaIyWKAe.js')),
			__memo(() => import('./chunks/32-CSLnzWjz.js')),
			__memo(() => import('./chunks/33-D3j9I4-h.js')),
			__memo(() => import('./chunks/34-RHKi9v8X.js')),
			__memo(() => import('./chunks/35-BBTep5cK.js')),
			__memo(() => import('./chunks/36-Bxdxywoo.js')),
			__memo(() => import('./chunks/37-VW1jP50n.js')),
			__memo(() => import('./chunks/38-DZnY3TsS.js')),
			__memo(() => import('./chunks/39-sJMGD2rG.js')),
			__memo(() => import('./chunks/40-DzPEGtBZ.js')),
			__memo(() => import('./chunks/41-ErEJuTPL.js')),
			__memo(() => import('./chunks/42-CH7VsWEw.js'))
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
				id: "/admin/games/[id]/settle",
				pattern: /^\/admin\/games\/([^/]+?)\/settle\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/markets",
				pattern: /^\/admin\/markets\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/promotions",
				pattern: /^\/admin\/promotions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/support",
				pattern: /^\/admin\/support\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/support/[ticketId]",
				pattern: /^\/admin\/support\/([^/]+?)\/?$/,
				params: [{"name":"ticketId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/transactions",
				pattern: /^\/admin\/transactions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/users/[id]",
				pattern: /^\/admin\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/verification",
				pattern: /^\/admin\/verification\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/vip",
				pattern: /^\/admin\/vip\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/api/betslip/load",
				pattern: /^\/api\/betslip\/load\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BBd9s15m.js'))
			},
			{
				id: "/api/betslip/share",
				pattern: /^\/api\/betslip\/share\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BapH5XLf.js'))
			},
			{
				id: "/api/payhero/callback",
				pattern: /^\/api\/payhero\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B0QzArzp.js'))
			},
			{
				id: "/api/place-bet",
				pattern: /^\/api\/place-bet\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CCkvz5lY.js'))
			},
			{
				id: "/api/settle-bets",
				pattern: /^\/api\/settle-bets\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B98FTi-1.js'))
			},
			{
				id: "/api/sync-live-scores",
				pattern: /^\/api\/sync-live-scores\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CoQlHy6Q.js'))
			},
			{
				id: "/api/sync-odds",
				pattern: /^\/api\/sync-odds\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BEUIfikQ.js'))
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/auth/forgot-password",
				pattern: /^\/auth\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/auth/logout",
				pattern: /^\/auth\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/auth/reset-password",
				pattern: /^\/auth\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/notifications",
				pattern: /^\/notifications\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/profile/bets",
				pattern: /^\/profile\/bets\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/profile/preferences",
				pattern: /^\/profile\/preferences\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/profile/security",
				pattern: /^\/profile\/security\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/profile/verification",
				pattern: /^\/profile\/verification\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/promotions",
				pattern: /^\/promotions\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/referrals",
				pattern: /^\/referrals\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/sportsbook",
				pattern: /^\/sportsbook\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/sportsbook/match/[id]",
				pattern: /^\/sportsbook\/match\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/sportsbook/[sport]",
				pattern: /^\/sportsbook\/([^/]+?)\/?$/,
				params: [{"name":"sport","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/support",
				pattern: /^\/support\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/support/new",
				pattern: /^\/support\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/support/[ticketId]",
				pattern: /^\/support\/([^/]+?)\/?$/,
				params: [{"name":"ticketId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/vip",
				pattern: /^\/vip\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/wallet",
				pattern: /^\/wallet\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/wallet/deposit",
				pattern: /^\/wallet\/deposit\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/wallet/history",
				pattern: /^\/wallet\/history\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/wallet/withdraw",
				pattern: /^\/wallet\/withdraw\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 42 },
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
