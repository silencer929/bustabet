import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET as ENV_JWT_SECRET } from '$env/static/private';
import { db } from '../db';
import type { registerSchema, loginSchema } from '$lib/utils/validation';
import type { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

const JWT_SECRET = new TextEncoder().encode(ENV_JWT_SECRET || 'fallback-secure-secret-key-at-least-256-bits-long');

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export class AuthService {
  static async generateSessionToken(user: { id: string; email: string; role: string }): Promise<string> {
    return await new SignJWT({ userId: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);
  }

  static async verifySessionToken(token: string): Promise<{ userId: string; email: string; role: string } | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return {
        userId: payload.userId as string,
        email: payload.email as string,
        role: payload.role as string
      };
    } catch {
      return null;
    }
  }

  // Registers a new user and profile inside an atomic SQL transaction pool
  static async register(data: RegisterInput): Promise<string> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = crypto.randomUUID();

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // Check email uniqueness
      const [existingUsers] = await conn.execute<RowDataPacket[]>(
        'SELECT id FROM users WHERE email = ? LIMIT 1',
        [data.email]
      );
      if (existingUsers.length > 0) throw new Error('Email is already registered');

      // Check username uniqueness
      const [existingProfiles] = await conn.execute<RowDataPacket[]>(
        'SELECT id FROM profiles WHERE username = ? LIMIT 1',
        [data.username]
      );
      if (existingProfiles.length > 0) throw new Error('Username is already taken');

      // Check referrer code
      let referredBy: string | null = null;
      if (data.referralCode) {
        const [referrer] = await conn.execute<RowDataPacket[]>(
          'SELECT id FROM profiles WHERE referral_code = ? LIMIT 1',
          [data.referralCode]
        );
        if (referrer.length > 0) referredBy = referrer[0].id;
      }

      // Generate unique referral code
      let referralCode = '';
      let isUnique = false;
      while (!isUnique) {
        referralCode = 'CHAMP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const [codeCheck] = await conn.execute<RowDataPacket[]>(
          'SELECT id FROM profiles WHERE referral_code = ? LIMIT 1',
          [referralCode]
        );
        if (codeCheck.length === 0) isUnique = true;
      }

      // Find default VIP tier
      const [vipTiers] = await conn.execute<RowDataPacket[]>(
        'SELECT id FROM vip_tiers ORDER BY min_points ASC LIMIT 1'
      );
      const baseVipId = vipTiers.length > 0 ? vipTiers[0].id : null;

      // Insert User record
      await conn.execute(
        'INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [userId, data.email, passwordHash, 'PLAYER']
      );

      // Insert Profile record
      await conn.execute(
        'INSERT INTO profiles (id, email, username, full_name, phone, country, currency, referral_code, referred_by, vip_tier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, data.email, data.username, data.fullName, data.phone, data.country, data.currency, referralCode, referredBy, baseVipId]
      );

      await conn.commit();

      return await this.generateSessionToken({ id: userId, email: data.email, role: 'PLAYER' });
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // Verifies login credentials using standard SQL queries
  static async login(data: LoginInput): Promise<string> {
    const [users] = await db.execute<RowDataPacket[]>(
      'SELECT id, email, password_hash, role FROM users WHERE email = ? LIMIT 1',
      [data.email]
    );

    if (users.length === 0) throw new Error('Invalid email or password');
    const user = users[0];

    const isMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!isMatch) throw new Error('Invalid email or password');

    return await this.generateSessionToken({ id: user.id, email: user.email, role: user.role });
  }
}