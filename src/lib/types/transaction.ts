import type { Transaction as PrismaTransaction } from '@prisma/client';

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'PAYOUT';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

// Strict typing representation of transaction logs
export interface TransactionDetails extends PrismaTransaction {
  type: TransactionType;
  status: TransactionStatus;
}