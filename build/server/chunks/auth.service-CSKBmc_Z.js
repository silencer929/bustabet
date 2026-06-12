import { d as db } from './db-BcGa8hoB.js';
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
		return await db.$transaction(async (tx) => {
			if (await tx.user.findUnique({ where: { email: data.email } })) throw new Error("Email is already registered");
			if (await tx.profile.findUnique({ where: { username: data.username } })) throw new Error("Username is already taken");
			let referredBy = null;
			if (data.referralCode) {
				const referrer = await tx.profile.findUnique({ where: { referralCode: data.referralCode } });
				if (referrer) referredBy = referrer.id;
			}
			let referralCode = "";
			let isUnique = false;
			while (!isUnique) {
				referralCode = "CHAMP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
				if (!await tx.profile.findUnique({ where: { referralCode } })) isUnique = true;
			}
			const baseVip = await tx.vipTier.findFirst({ orderBy: { minPoints: "asc" } });
			const user = await tx.user.create({ data: {
				email: data.email,
				passwordHash,
				role: "PLAYER"
			} });
			await tx.profile.create({ data: {
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
			} });
			return await this.generateSessionToken(user);
		});
	}
	static async login(data) {
		const user = await db.user.findUnique({ where: { email: data.email } });
		if (!user) throw new Error("Invalid email or password");
		if (!await bcrypt.compare(data.password, user.passwordHash)) throw new Error("Invalid email or password");
		return await this.generateSessionToken(user);
	}
};

export { AuthService as A };
//# sourceMappingURL=auth.service-CSKBmc_Z.js.map
