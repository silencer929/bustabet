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

//#region src/routes/vip/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const [profiles] = await db.execute(`SELECT p.id, p.email, p.username, p.full_name as fullName, p.phone, p.country, p.currency, p.referral_code as referralCode, p.referred_by as referredBy, p.vip_tier_id as vipTierId, p.created_at as createdAt,
            v.name as vipTierName, v.min_points as vipTierMinPoints, v.cashback_percent as vipTierCashback, v.bonus_percent as vipTierBonus
     FROM profiles p
     LEFT JOIN vip_tiers v ON p.vip_tier_id = v.id
     WHERE p.id = ? LIMIT 1`, [locals.user.id]);
	if (profiles.length === 0) throw redirect(303, "/auth/login");
	const profile = profiles[0];
	const [betAggregates] = await db.execute("SELECT SUM(stake) as totalTurnover FROM bets WHERE profile_id = ? AND status IN ('WON', 'LOST')", [locals.user.id]);
	const pointsAccumulated = Math.floor(Number(betAggregates[0].totalTurnover || 0));
	const [tiers] = await db.execute("SELECT id, name, min_points as minPoints, cashback_percent as cashbackPercent, bonus_percent as bonusPercent FROM vip_tiers ORDER BY min_points ASC");
	const serializedTiers = tiers.map((tier) => ({
		id: tier.id,
		name: tier.name,
		minPoints: tier.minPoints,
		cashbackPercent: Number(tier.cashbackPercent),
		bonusPercent: Number(tier.bonusPercent)
	}));
	const nextTier = serializedTiers.find((tier) => tier.minPoints > pointsAccumulated) || null;
	return {
		profile: {
			id: profile.id,
			email: profile.email,
			username: profile.username,
			fullName: profile.fullName,
			phone: profile.phone,
			country: profile.country,
			currency: profile.currency,
			referralCode: profile.referralCode,
			referredBy: profile.referredBy,
			vipTierId: profile.vipTierId,
			createdAt: new Date(profile.createdAt),
			vipTier: profile.vipTierId ? {
				id: profile.vipTierId,
				name: profile.vipTierName,
				minPoints: profile.vipTierMinPoints,
				cashbackPercent: Number(profile.vipTierCashback),
				bonusPercent: Number(profile.vipTierBonus)
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

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B9kRM_wK.js')).default;
const server_id = "src/routes/vip/+page.server.ts";
const imports = ["_app/immutable/nodes/36.YPA8agGD.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DGOG7_Yz.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/DiHnv9dC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-B4JmMp_4.js.map
