import { d as db } from './db-CF_k3vJ4.js';
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

//#region src/lib/server/services/promotion.service.ts
var PromotionService = class {
	static async getActivePromotions() {
		const now = /* @__PURE__ */ new Date();
		const [rows] = await db.execute(`SELECT id, title, description, bonus_amount, active, start_date, end_date 
       FROM promotions 
       WHERE active = 1 AND start_date <= ? AND end_date >= ? 
       ORDER BY end_date ASC`, [now, now]);
		return rows.map((row) => ({
			id: row.id,
			title: row.title,
			description: row.description,
			bonusAmount: Number(row.bonus_amount),
			active: Boolean(row.active),
			startDate: new Date(row.start_date),
			endDate: new Date(row.end_date)
		}));
	}
	static async recalculateVipTier(profileId) {
		const [aggregates] = await db.execute("SELECT SUM(stake) as totalTurnover FROM bets WHERE profile_id = ? AND status IN ('WON', 'LOST')", [profileId]);
		const totalTurnover = Number(aggregates[0].totalTurnover || 0);
		const calculatedPoints = Math.floor(totalTurnover);
		const [qualifiedTiers] = await db.execute("SELECT id, name FROM vip_tiers WHERE min_points <= ? ORDER BY min_points DESC LIMIT 1", [calculatedPoints]);
		if (qualifiedTiers.length === 0) return {
			upgraded: false,
			newTierId: null
		};
		const qualifiedTier = qualifiedTiers[0];
		const [profiles] = await db.execute("SELECT vip_tier_id FROM profiles WHERE id = ? LIMIT 1", [profileId]);
		if (profiles.length === 0) throw new Error("User profile not found");
		if (profiles[0].vip_tier_id !== qualifiedTier.id) {
			await db.execute("UPDATE profiles SET vip_tier_id = ? WHERE id = ?", [qualifiedTier.id, profileId]);
			await db.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`, [
				crypto.randomUUID(),
				profileId,
				"VIP Upgrade!",
				`Congratulations! You have been upgraded to the ${qualifiedTier.name} tier. Enjoy increased cashback and bonuses.`
			]);
			return {
				upgraded: true,
				newTierId: qualifiedTier.id
			};
		}
		return {
			upgraded: false,
			newTierId: qualifiedTier.id
		};
	}
};
//#endregion
//#region src/routes/promotions/+page.server.ts
var load = async () => {
	return { promotions: (await PromotionService.getActivePromotions()).map((promo) => ({
		...promo,
		bonusAmount: Number(promo.bonusAmount)
	})) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 27;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DnH-XzK2.js')).default;
const server_id = "src/routes/promotions/+page.server.ts";
const imports = ["_app/immutable/nodes/27.BopZ_bQ3.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/EfA6GbtJ.js","_app/immutable/chunks/DRo8kKFD.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=27-2q3Ete2z.js.map
