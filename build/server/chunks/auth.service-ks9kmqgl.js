import { d as db } from './db-CT_Sl39P.js';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

//#region src/lib/server/services/auth.service.ts
var JWT_SECRET = new TextEncoder().encode("login");
var AuthService = class {
	static async generateSessionToken(user) {
		return await new SignJWT({
			userId: user.id,
			email: user.email,
			role: user.role
		}).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(JWT_SECRET);
	}
	static async verifySessionToken(token) {
		try {
			const { payload } = await jwtVerify(token, JWT_SECRET);
			return {
				userId: payload.userId,
				email: payload.email,
				role: payload.role
			};
		} catch {
			return null;
		}
	}
	static async register(data) {
		const passwordHash = await bcrypt.hash(data.password, 10);
		const userId = crypto.randomUUID();
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const [existingUsers] = await conn.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [data.email]);
			if (existingUsers.length > 0) throw new Error("Email is already registered");
			const [existingProfiles] = await conn.execute("SELECT id FROM profiles WHERE username = ? LIMIT 1", [data.username]);
			if (existingProfiles.length > 0) throw new Error("Username is already taken");
			let referredBy = null;
			if (data.referralCode) {
				const [referrer] = await conn.execute("SELECT id FROM profiles WHERE referral_code = ? LIMIT 1", [data.referralCode]);
				if (referrer.length > 0) referredBy = referrer[0].id;
			}
			let referralCode = "";
			let isUnique = false;
			while (!isUnique) {
				referralCode = "CHAMP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
				const [codeCheck] = await conn.execute("SELECT id FROM profiles WHERE referral_code = ? LIMIT 1", [referralCode]);
				if (codeCheck.length === 0) isUnique = true;
			}
			const [vipTiers] = await conn.execute("SELECT id FROM vip_tiers ORDER BY min_points ASC LIMIT 1");
			const baseVipId = vipTiers.length > 0 ? vipTiers[0].id : null;
			await conn.execute("INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)", [
				userId,
				data.email,
				passwordHash,
				"PLAYER"
			]);
			await conn.execute("INSERT INTO profiles (id, email, username, full_name, phone, country, currency, referral_code, referred_by, vip_tier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
				userId,
				data.email,
				data.username,
				data.fullName,
				data.phone,
				data.country,
				data.currency,
				referralCode,
				referredBy,
				baseVipId
			]);
			await conn.commit();
			return await this.generateSessionToken({
				id: userId,
				email: data.email,
				role: "PLAYER"
			});
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
	static async login(data) {
		const [users] = await db.execute("SELECT id, email, password_hash, role FROM users WHERE email = ? LIMIT 1", [data.email]);
		if (users.length === 0) throw new Error("Invalid email or password");
		const user = users[0];
		if (!await bcrypt.compare(data.password, user.password_hash)) throw new Error("Invalid email or password");
		return await this.generateSessionToken({
			id: user.id,
			email: user.email,
			role: user.role
		});
	}
};

export { AuthService as A };
//# sourceMappingURL=auth.service-ks9kmqgl.js.map
