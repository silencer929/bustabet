import type { Profile as PrismaProfile, User, VipTier } from '@prisma/client';

// Profile type including core authentication credentials
export interface ProfileWithUser extends PrismaProfile {
  user: Omit<User, 'passwordHash'>;
}

// Profile details resolved with VIP tier benefits
export interface ProfileWithVip extends PrismaProfile {
  vipTier: VipTier | null;
}

// Complete profile detail resolved during session retrieval
export interface FullProfileDetails extends PrismaProfile {
  user: Omit<User, 'passwordHash'>;
  vipTier: VipTier | null;
  referrer: PrismaProfile | null;
  _count?: {
    bets: number;
    transactions: number;
    referees: number;
  };
}