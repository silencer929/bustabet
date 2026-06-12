import { db } from '../db';
import type { RowDataPacket } from 'mysql2';

export interface LocalPromotion {
  id: string;
  title: string;
  description: string | null;
  bonusAmount: number;
  active: boolean;
  startDate: Date;
  endDate: Date;
}

export class PromotionService {
  // Retrieves active promotional campaigns based on the current system clock
  static async getActivePromotions(): Promise<LocalPromotion[]> {
    const now = new Date();
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, title, description, bonus_amount, active, start_date, end_date 
       FROM promotions 
       WHERE active = 1 AND start_date <= ? AND end_date >= ? 
       ORDER BY end_date ASC`,
      [now, now]
    );

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

  // Audits user wagers and updates VIP tier classifications dynamically using standard SQL
  static async recalculateVipTier(profileId: string): Promise<{ upgraded: boolean; newTierId: string | null }> {
    // Aggregate completed wagers stake turnover
    const [aggregates] = await db.execute<RowDataPacket[]>(
      "SELECT SUM(stake) as totalTurnover FROM bets WHERE profile_id = ? AND status IN ('WON', 'LOST')",
      [profileId]
    );

    const totalTurnover = Number(aggregates[0].totalTurnover || 0);
    const calculatedPoints = Math.floor(totalTurnover);

    // Retrieve the highest qualified VIP tier
    const [qualifiedTiers] = await db.execute<RowDataPacket[]>(
      'SELECT id, name FROM vip_tiers WHERE min_points <= ? ORDER BY min_points DESC LIMIT 1',
      [calculatedPoints]
    );

    if (qualifiedTiers.length === 0) {
      return { upgraded: false, newTierId: null };
    }

    const qualifiedTier = qualifiedTiers[0];

    const [profiles] = await db.execute<RowDataPacket[]>(
      'SELECT vip_tier_id FROM profiles WHERE id = ? LIMIT 1',
      [profileId]
    );

    if (profiles.length === 0) throw new Error('User profile not found');
    const currentVipTierId = profiles[0].vip_tier_id;

    if (currentVipTierId !== qualifiedTier.id) {
      await db.execute(
        'UPDATE profiles SET vip_tier_id = ? WHERE id = ?',
        [qualifiedTier.id, profileId]
      );

      // Log a congratulations system notification alert
      await db.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          profileId,
          'VIP Upgrade!',
          `Congratulations! You have been upgraded to the ${qualifiedTier.name} tier. Enjoy increased cashback and bonuses.`
        ]
      );

      return { upgraded: true, newTierId: qualifiedTier.id };
    }

    return { upgraded: false, newTierId: qualifiedTier.id };
  }
}