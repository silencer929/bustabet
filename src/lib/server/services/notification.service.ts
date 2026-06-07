import { db } from '../db';
import { mailer, fromAddress } from '../mailer';
import type { Notification } from '@prisma/client';

export class NotificationService {
  // Dispatches a formatted email using Nodemailer
  static async sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
    try {
      await mailer.sendMail({
        from: fromAddress,
        to,
        subject,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error('[Email Dispatch Error]:', error);
      return false;
    }
  }

  // Logs an in-app alert notification inside the database
  static async createInAppNotification(profileId: string, title: string, message: string): Promise<Notification> {
    return await db.notification.create({
      data: {
        profileId,
        title,
        message,
        read: false
      }
    });
  }

  // Sends a stylized gold/black confirmation email upon successful registration
  static async sendRegistrationEmail(email: string, username: string): Promise<boolean> {
    const htmlTemplate = `
      <div style="background-color: #0a0a0a; color: #f5f5f5; font-family: sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #262626; border-radius: 12px;">
        <h2 style="color: #ffd11a; font-weight: 900; letter-spacing: 1px; border-b: 1px solid #262626; padding-bottom: 20px;">CHAMPION<span style="color: #f5f5f5;">BET</span></h2>
        <p style="font-size: 14px; line-height: 1.6; color: #d4d4d4;">Hello <strong>${username}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6; color: #d4d4d4;">Welcome Busta Bet! Your account has been registered successfully. You can now deposit and place live sports wagers securely on our platform.</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://championbet.space/sportsbook" style="background-color: #ffd11a; color: #0a0a0a; padding: 12px 30px; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 8px; box-shadow: 0 0 10px rgba(255, 209, 26, 0.2);">Go to Sportsbook</a>
        </div>
        <p style="font-size: 11px; color: #737373; border-t: 1px solid #262626; pt: 20px; margin-top: 40px;">This is an automated operational system email. Please do not reply directly. Strictly 18+.</p>
      </div>
    `;

    return await this.sendEmail(email, 'Welcome to Champion Bet!', htmlTemplate);
  }

  // Sends a stylized password reset link containing a dynamic verification claim token
  static async sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
    const resetUrl = `https://championbet.space/auth/reset-password?token=${resetToken}`;
    
    const htmlTemplate = `
      <div style="background-color: #0a0a0a; color: #f5f5f5; font-family: sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #262626; border-radius: 12px;">
        <h2 style="color: #ffd11a; font-weight: 900; letter-spacing: 1px; border-b: 1px solid #262626; padding-bottom: 20px;">BUSTA<span style="color: #f5f5f5;">BET</span></h2>
        <p style="font-size: 14px; line-height: 1.6; color: #d4d4d4;">Hello,</p>
        <p style="font-size: 14px; line-height: 1.6; color: #d4d4d4;">We received a request to reset your Busta BET account password. Click the secure link below to proceed with setting a new credential:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${resetUrl}" style="background-color: #ffd11a; color: #0a0a0a; padding: 12px 30px; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 8px; box-shadow: 0 0 10px rgba(255, 209, 26, 0.2);">Reset Password</a>
        </div>
        <p style="font-size: 12px; color: #a3a3a3;">This password reset link is highly sensitive and will expire in 2 hours.</p>
        <p style="font-size: 11px; color: #737373; border-t: 1px solid #262626; pt: 20px; margin-top: 40px;">If you did not make this request, you can safely ignore this email.</p>
      </div>
    `;

    return await this.sendEmail(email, 'Reset Your Busta BET Password', htmlTemplate);
  }

  // Returns all unread notifications belonging to a profile
  static async getUnreadNotifications(profileId: string): Promise<Notification[]> {
    return await db.notification.findMany({
      where: { profileId, read: false },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Marks a specific notification as read in the database
  static async markAsRead(notificationId: string): Promise<void> {
    await db.notification.update({
      where: { id: notificationId },
      data: { read: true }
    });
  }
}