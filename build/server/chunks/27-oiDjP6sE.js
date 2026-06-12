import { d as db } from './db-BcGa8hoB.js';
import '@prisma/client';

//#region src/lib/server/services/promotion.service.ts
var PromotionService = class {
	static async getActivePromotions() {
		const now = /* @__PURE__ */ new Date();
		return await db.promotion.findMany({
			where: {
				active: true,
				startDate: { lte: now },
				endDate: { gte: now }
			},
			orderBy: { endDate: "asc" }
		});
	}
	static async recalculateVipTier(profileId) {
		const betAggregates = await db.bet.aggregate({
			where: {
				profileId,
				status: { in: ["WON", "LOST"] }
			},
			_sum: { stake: true }
		});
		const totalTurnover = Number(betAggregates._sum.stake || 0);
		const calculatedPoints = Math.floor(totalTurnover);
		const qualifiedTier = await db.vipTier.findFirst({
			where: { minPoints: { lte: calculatedPoints } },
			orderBy: { minPoints: "desc" }
		});
		if (!qualifiedTier) return {
			upgraded: false,
			newTier: null
		};
		const profile = await db.profile.findUnique({ where: { id: profileId } });
		if (!profile) throw new Error("User profile not found");
		if (profile.vipTierId !== qualifiedTier.id) {
			await db.profile.update({
				where: { id: profileId },
				data: { vipTierId: qualifiedTier.id }
			});
			await db.notification.create({ data: {
				profileId,
				title: "VIP Upgrade!",
				message: `Congratulations! You have been upgraded to the ${qualifiedTier.name} tier. Enjoy increased cashback and bonuses.`,
				read: false
			} });
			return {
				upgraded: true,
				newTier: qualifiedTier
			};
		}
		return {
			upgraded: false,
			newTier: qualifiedTier
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
const component = async () => component_cache ??= (await import('./_page.svelte-Cty8pPS0.js')).default;
const server_id = "src/routes/promotions/+page.server.ts";
const imports = ["_app/immutable/nodes/27.Bc4mEFFm.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/EfA6GbtJ.js","_app/immutable/chunks/DRo8kKFD.js","_app/immutable/chunks/B5xKPP2C.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/DiHnv9dC.js","_app/immutable/chunks/CDRkEAiv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=27-oiDjP6sE.js.map
