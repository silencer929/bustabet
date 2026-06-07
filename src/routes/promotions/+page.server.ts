import type { PageServerLoad } from './$types';
import { PromotionService } from '$lib/server/services/promotion.service';

export const load: PageServerLoad = async () => {
  const promotionsRaw = await PromotionService.getActivePromotions();

  // Serialize custom Prisma Decimal objects to standard numbers before load dispatch
  const serializedPromotions = promotionsRaw.map((promo) => ({
    ...promo,
    bonusAmount: Number(promo.bonusAmount)
  }));

  return {
    promotions: serializedPromotions
  };
};