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

//#region src/routes/referrals/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const [profiles] = await db.execute("SELECT referral_code as referralCode FROM profiles WHERE id = ? LIMIT 1", [locals.user.id]);
	if (profiles.length === 0) throw redirect(303, "/auth/login");
	const profile = profiles[0];
	const [counts] = await db.execute("SELECT COUNT(id) as refereesCount FROM profiles WHERE referred_by = ?", [locals.user.id]);
	const refereesCount = Number(counts[0].refereesCount || 0);
	const [referrals] = await db.execute(`SELECT r.id, r.referrer_id as referrerId, r.referee_id as refereeId, r.commission, r.status, r.created_at as createdAt,
            p.username as refereeUsername, p.created_at as refereeCreatedAt
     FROM referrals r
     INNER JOIN profiles p ON r.referee_id = p.id
     WHERE r.referrer_id = ?
     ORDER BY r.created_at DESC`, [locals.user.id]);
	const serializedReferrals = referrals.map((ref) => ({
		id: ref.id,
		referrerId: ref.referrerId,
		refereeId: ref.refereeId,
		commission: Number(ref.commission),
		status: ref.status,
		createdAt: new Date(ref.createdAt),
		referee: {
			username: ref.refereeUsername,
			createdAt: new Date(ref.refereeCreatedAt)
		}
	}));
	return {
		referralCode: profile.referralCode,
		refereesCount,
		referrals: serializedReferrals
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 29;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DtrmvWlG.js')).default;
const server_id = "src/routes/referrals/+page.server.ts";
const imports = ["_app/immutable/nodes/29.Kv-cnYpr.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C8QbUkZA.js","_app/immutable/chunks/BQthCCqQ.js","_app/immutable/chunks/-IPS9uVo.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=29-kolv9cNo.js.map
