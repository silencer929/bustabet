import { d as db } from './db-CT_Sl39P.js';
import { r as redirect } from './index-BQZSrJq2.js';
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

//#region src/routes/vip/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const profile = await db.profile.findUnique({
		where: { id: locals.user.id },
		include: { vipTier: true }
	});
	if (!profile) throw redirect(303, "/auth/login");
	const betAggregates = await db.bet.aggregate({
		where: {
			profileId: locals.user.id,
			status: { in: ["WON", "LOST"] }
		},
		_sum: { stake: true }
	});
	const pointsAccumulated = Math.floor(Number(betAggregates._sum.stake || 0));
	const serializedTiers = (await db.vipTier.findMany({ orderBy: { minPoints: "asc" } })).map((tier) => ({
		...tier,
		cashbackPercent: Number(tier.cashbackPercent),
		bonusPercent: Number(tier.bonusPercent)
	}));
	const nextTier = serializedTiers.find((tier) => tier.minPoints > pointsAccumulated) || null;
	return {
		profile: {
			...profile,
			vipTier: profile.vipTier ? {
				...profile.vipTier,
				cashbackPercent: Number(profile.vipTier.cashbackPercent),
				bonusPercent: Number(profile.vipTier.bonusPercent)
			} : null
		},
		pointsAccumulated,
		vipTiers: serializedTiers,
		nextTier
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 35;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DaysVtkC.js')).default;
const server_id = "src/routes/vip/+page.server.ts";
const imports = ["_app/immutable/nodes/35.D_cc5qTB.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DGOG7_Yz.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/DiHnv9dC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=35-BWFRb2QL.js.map
