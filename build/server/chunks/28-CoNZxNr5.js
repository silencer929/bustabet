import { d as db } from './db-BcGa8hoB.js';
import { r as redirect } from './index-BQZSrJq2.js';
import '@prisma/client';
import './index-DBqjc0Yf.js';

//#region src/routes/referrals/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const profile = await db.profile.findUnique({ where: { id: locals.user.id } });
	if (!profile) throw redirect(303, "/auth/login");
	const refereesCount = await db.profile.count({ where: { referredBy: locals.user.id } });
	const serializedReferrals = (await db.referral.findMany({
		where: { referrerId: locals.user.id },
		orderBy: { createdAt: "desc" },
		include: { referee: { select: {
			username: true,
			createdAt: true
		} } }
	})).map((ref) => ({
		...ref,
		commission: Number(ref.commission)
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

const index = 28;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Y4iiw67F.js')).default;
const server_id = "src/routes/referrals/+page.server.ts";
const imports = ["_app/immutable/nodes/28.B7Sw95_v.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C8QbUkZA.js","_app/immutable/chunks/BQthCCqQ.js","_app/immutable/chunks/-IPS9uVo.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=28-CoNZxNr5.js.map
