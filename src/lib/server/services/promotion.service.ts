import { db } from '../db';
import type { Promotion, VipTier } from '@prisma/client';

export class PromotionService {
  // Retrieves all active promotional campaigns based on the current system clock
  static async getActivePromotions(): Promise<Promotion[]> {
    const now = new Date();
    return await db.promotion.findMany({
      where: {
        active: true,
        startDate: { lte: now },
        endDate: { gte: now }
      },
      orderBy: { endDate: 'asc' }
    });
  }

  // Audits user wagers and updates VIP tier classifications dynamically
  static async recalculateVipTier(profileId: string): Promise<{ upgraded: boolean; newTier: VipTier | null }> {
    // Aggregates total wagers placed (completed bets represent player turnover volume)
    const betAggregates = await db.bet.aggregate({
      where: {
        profileId,
        status: { in: ['WON', 'LOST'] }
      },
      _sum: { stake: true }
    });

    const totalTurnover = Number(betAggregates._sum.stake || 0);
    const calculatedPoints = Math.floor(totalTurnover);

    // Fetch the highest VIP tier where the points threshold is met or exceeded
    const qualifiedTier = await db.vipTier.findFirst({
      where: {
        minPoints: { lte: calculatedPoints }
      },
      orderBy: { minPoints: 'desc' }
    });

    if (!qualifiedTier) {
      return { upgraded: false, newTier: null };
    }

    const profile = await db.profile.findUnique({
      where: { id: profileId }
    });

    if (!profile) throw new Error('User profile not found');

    if (profile.vipTierId !== qualifiedTier.id) {
      await db.profile.update({
        where: { id: profileId },
        data: { vipTierId: qualifiedTier.id }
      });

      // Send congratulations notification to player on tier upgrade
      await db.notification.create({
        data: {
          profileId,
          title: 'VIP Upgrade!',
          message: `Congratulations! You have been upgraded to the ${qualifiedTier.name} tier. Enjoy increased cashback and bonuses.`,
          read: false
        }
      });

      return { upgraded: true, newTier: qualifiedTier };
    }

    return { upgraded: false, newTier: qualifiedTier };
  }
}