import type { VipTier } from '@prisma/client';

// Client-side mapping for tier thresholds
export interface VipProgress {
  currentTier: VipTier;
  nextTier: VipTier | null;
  pointsAccumulated: number;
  pointsRequiredForNext: number;
  percentageProgress: number;
}