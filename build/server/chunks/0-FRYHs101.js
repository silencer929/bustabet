import { d as db } from './db-BcGa8hoB.js';
import { W as WalletService } from './wallet.service-BdUTK0kZ.js';
import '@prisma/client';
import './private-CPklkgrX.js';

//#region src/routes/+layout.server.ts
var load = async ({ locals }) => {
	if (locals.user) {
		const balance = await WalletService.getBalance(locals.user.id);
		const notifications = await db.notification.findMany({
			where: {
				profileId: locals.user.id,
				read: false
			},
			orderBy: { createdAt: "desc" }
		});
		return {
			user: locals.user,
			balance,
			notifications
		};
	}
	return {
		user: null,
		balance: 0,
		notifications: []
	};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-C4fauzKp.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.CC3EwTf7.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/DvwXlVgx.js","_app/immutable/chunks/1v0-xqgc.js","_app/immutable/chunks/DJmjR7Xo.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C5Fs53qb.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/rM84n8Ji.js","_app/immutable/chunks/DGOG7_Yz.js","_app/immutable/chunks/DRo8kKFD.js","_app/immutable/chunks/DRbXN33w.js","_app/immutable/chunks/OQ4u24rf.js","_app/immutable/chunks/C8QbUkZA.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/B7W6-iS0.js","_app/immutable/chunks/J3KNlKVe.js","_app/immutable/chunks/Bp_PgSiZ.js","_app/immutable/chunks/BQthCCqQ.js","_app/immutable/chunks/DoSFkTfC.js","_app/immutable/chunks/DZFLuljg.js","_app/immutable/chunks/Bcj3QQwp.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CR81KSpz.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = ["_app/immutable/assets/0.DVjwCgAw.css"];
const fonts = ["_app/immutable/assets/inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2","_app/immutable/assets/inter-cyrillic-wght-normal.DqGufNeO.woff2","_app/immutable/assets/inter-greek-ext-wght-normal.DlzME5K_.woff2","_app/immutable/assets/inter-greek-wght-normal.CkhJZR-_.woff2","_app/immutable/assets/inter-vietnamese-wght-normal.CBcvBZtf.woff2","_app/immutable/assets/inter-latin-ext-wght-normal.DO1Apj_S.woff2","_app/immutable/assets/inter-latin-wght-normal.Dx4kXJAl.woff2"];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-FRYHs101.js.map
