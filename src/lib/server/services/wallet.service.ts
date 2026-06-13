import { db } from '../db';
import { env } from '$env/dynamic/private';
import type { RowDataPacket } from 'mysql2';

export class WalletService {
  // Computes active user balance: Deposits + Payouts - Completed/Pending Withdrawals - Pending Bets
  static async getBalance(profileId: string): Promise<number> {
    // Aggregate transactions by type and status
    const [transactions] = await db.execute<RowDataPacket[]>(
      `SELECT type, status, SUM(amount) as sumAmount 
       FROM transactions 
       WHERE profile_id = ? 
       GROUP BY type, status`,
      [profileId]
    );

    // Aggregate pending bet stakes
    const [pendingBets] = await db.execute<RowDataPacket[]>(
      "SELECT SUM(stake) as activeStakes FROM bets WHERE profile_id = ? AND status = 'PENDING'",
      [profileId]
    );

    let balance = 0;

    for (const group of transactions) {
      const sum = Number(group.sumAmount || 0);
      
      if (group.status === 'COMPLETED') {
        if (group.type === 'DEPOSIT' || group.type === 'PAYOUT') {
          balance += sum;
        } else if (group.type === 'WITHDRAWAL') {
          balance -= sum;
        }
      } else if (group.status === 'PENDING' && group.type === 'WITHDRAWAL') {
        // Freeze pending withdrawals to protect balance from double-spending
        balance -= sum;
      }
    }

    const activeStakes = Number(pendingBets[0].activeStakes || 0);
    balance -= activeStakes;

    return Number(balance.toFixed(2));
  }

  // Initiates an M-Pesa STK Push deposit using the PayHero gateway API
  static async initiateMpesaDeposit(profileId: string, amount: number, phoneNumber: string): Promise<{ success: boolean; message: string; reference: string }> {
    const [profiles] = await db.execute<RowDataPacket[]>(
      'SELECT currency, full_name, username FROM profiles WHERE id = ? LIMIT 1',
      [profileId]
    );
    if (profiles.length === 0) throw new Error('User profile not found');
    const profile = profiles[0];

    const conn = await db.getConnection();
    const transactionId = crypto.randomUUID();
    const reference = 'PH-' + Math.random().toString(36).substring(2, 12).toUpperCase();

    try {
      await conn.beginTransaction();

      // Create a pending transaction record inside the local database
      await conn.execute(
        `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, 'DEPOSIT', ?, ?, 'PENDING', ?)`,
        [transactionId, profileId, amount, profile.currency || 'KES', reference]
      );

      const authHeader = 'Basic ' + Buffer.from(`${env.PAYHERO_API_USERNAME}:${env.PAYHERO_API_PASSWORD}`).toString('base64');

      const response = await fetch('https://backend.payhero.co.ke/api/v2/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          amount: Math.round(amount),
          phone_number: phoneNumber,
          channel_id: Number(env.PAYHERO_CHANNEL_ID),
          provider: 'm-pesa',
          external_reference: reference,
          callback_url: env.PAYHERO_CALLBACK_URL,
          customer_name: profile.full_name || profile.username
        })
      });

      const result = await response.json();

      if (response.status === 201 && result.status === 'QUEUED') {
        await conn.commit();
        return {
          success: true,
          message: 'STK push prompt sent successfully to your device',
          reference
        };
      } else {
        // Mark transaction as failed if PayHero rejects initiation
        await conn.execute(
          'UPDATE transactions SET status = "FAILED" WHERE id = ?',
          [transactionId]
        );
        await conn.commit();
        return {
          success: false,
          message: result.message || 'Payment initiation failed',
          reference
        };
      }
    } catch (error) {
      await conn.rollback();
      // Update local transaction status to FAILED on connection timeouts
      await db.execute(
        'UPDATE transactions SET status = "FAILED" WHERE id = ?',
        [transactionId]
      );
      throw error;
    } finally {
      conn.release();
    }
  }

  // Processes incoming secure transaction updates from PayHero webhook callbacks
  static async handleMpesaCallback(payload: {
    status: 'SUCCESS' | 'FAILED';
    amount: number;
    external_reference: string;
    MpesaCode?: string;
  }): Promise<boolean> {
    const [transactions] = await db.execute<RowDataPacket[]>(
      'SELECT id, profile_id, currency, amount, status FROM transactions WHERE reference = ? LIMIT 1',
      [payload.external_reference]
    );

    if (transactions.length === 0 || transactions[0].status !== 'PENDING') return false;
    const transaction = transactions[0];

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const finalStatus = payload.status === 'SUCCESS' ? 'COMPLETED' : 'FAILED';
      const referenceCode = payload.MpesaCode || payload.external_reference;

      // Update the transaction status and map actual Mpesa transaction code
      await conn.execute(
        'UPDATE transactions SET status = ?, reference = ? WHERE id = ?',
        [finalStatus, referenceCode, transaction.id]
      );

      // Create an in-app player notification
      await conn.execute(
        `INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`,
        [
          crypto.randomUUID(),
          transaction.profile_id,
          payload.status === 'SUCCESS' ? 'Deposit Completed' : 'Deposit Failed',
          payload.status === 'SUCCESS' 
            ? `Your deposit of ${transaction.currency} ${transaction.amount} has been approved.` 
            : `Your deposit of ${transaction.currency} ${transaction.amount} was not processed.`
        ]
      );

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // Initiates a withdrawal transaction after checking if the user has a sufficient balance
  static async initiateWithdrawal(profileId: string, amount: number, reference: string): Promise<boolean> {
    const currentBalance = await this.getBalance(profileId);
    if (currentBalance < amount) throw new Error('Insufficient balance');

    const [profiles] = await db.execute<RowDataPacket[]>(
      'SELECT currency FROM profiles WHERE id = ? LIMIT 1',
      [profileId]
    );
    if (profiles.length === 0) throw new Error('User profile not found');
    const profile = profiles[0];

    const id = crypto.randomUUID();
    await db.execute(
      `INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
       VALUES (?, ?, 'WITHDRAWAL', ?, ?, 'PENDING', ?)`,
      [id, profileId, amount, profile.currency || 'USD', reference]
    );

    return true;
  }
}