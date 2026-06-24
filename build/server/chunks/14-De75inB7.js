import { d as db } from './db-CF_k3vJ4.js';
import { r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/admin/users/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.user.role !== "ADMIN") throw redirect(303, "/sportsbook");
	const [profiles] = await db.execute(`SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.vip_tier_id as vipTierId, p.created_at as createdAt,
            u.role,
            v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
     FROM profiles p
     INNER JOIN users u ON p.id = u.id
     LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
     ORDER BY p.created_at DESC`);
	return { profiles: profiles.map((p) => ({
		id: p.id,
		email: p.email,
		username: p.username,
		fullName: p.fullName,
		phone: p.phone,
		country: p.country,
		currency: p.currency,
		vipTierId: p.vipTierId,
		createdAt: new Date(p.createdAt),
		user: {
			id: p.id,
			email: p.email,
			role: p.role
		},
		vipTier: p.vipTierId ? {
			id: p.vipTierId,
			name: p.vipTierName,
			minPoints: p.vipTierMinPoints,
			cashbackPercent: Number(p.vipTierCashback),
			bonusPercent: Number(p.vipTierBonus)
		} : null
	})) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D1HZn6F4.js')).default;
const server_id = "src/routes/admin/users/+page.server.ts";
const imports = ["_app/immutable/nodes/14.DvTSmcPc.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/Cv68DSkJ.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/OQ4u24rf.js","_app/immutable/chunks/-IPS9uVo.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/BjJjuk4L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-De75inB7.js.map
