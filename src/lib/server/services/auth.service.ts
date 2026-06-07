import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET as ENV_JWT_SECRET } from '$env/static/private';
import { db } from '../db';
import type { registerSchema, loginSchema } from '$lib/utils/validation';
import type { z } from 'zod';

// HMAC key initialization using SvelteKit static private environment variable
const JWT_SECRET = new TextEncoder().encode(ENV_JWT_SECRET || 'fallback-secure-secret-key-at-least-256-bits-long');

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export class AuthService {
  // Signs a secure HS256 stateless session JWT
  static async generateSessionToken(user: { id: string; email: string; role: string }): Promise<string> {
    return await new SignJWT({ userId: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);
  }

  // Verifies the payload signature of an active session token
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

  // Registers a new user and profile inside an atomic database transaction
  static async register(data: RegisterInput): Promise<string> {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return await db.$transaction(async (tx) => {
      const existingUser = await tx.user.findUnique({ where: { email: data.email } });
      if (existingUser) throw new Error('Email is already registered');

      const existingProfile = await tx.profile.findUnique({ where: { username: data.username } });
      if (existingProfile) throw new Error('Username is already taken');

      // Check if a referral code was provided and match it to a referrer profile
      let referredBy: string | null = null;
      if (data.referralCode) {
        const referrer = await tx.profile.findUnique({ where: { referralCode: data.referralCode } });
        if (referrer) {
          referredBy = referrer.id;
        }
      }

      // Generate a highly random and unique referral code for the new profile
      let referralCode = '';
      let isUnique = false;
      while (!isUnique) {
        referralCode = 'CHAMP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const codeCheck = await tx.profile.findUnique({ where: { referralCode } });
        if (!codeCheck) isUnique = true;
      }

      // Retrieve the base VIP tier with the lowest points threshold
      const baseVip = await tx.vipTier.findFirst({
        orderBy: { minPoints: 'asc' }
      });

      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          role: 'PLAYER'
        }
      });

      await tx.profile.create({
        data: {
          id: user.id,
          email: data.email,
          username: data.username,
          fullName: data.fullName,
          phone: data.phone,
          country: data.country,
          currency: data.currency,
          referralCode,
          referredBy,
          vipTierId: baseVip ? baseVip.id : null
        }
      });

      return await this.generateSessionToken(user);
    });
  }

  // Verifies email credentials and outputs a session token upon matching password hash
  static async login(data: LoginInput): Promise<string> {
    const user = await db.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid email or password');

    return await this.generateSessionToken(user);
  }
}