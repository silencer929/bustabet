import { b as private_env } from './shared-server-9-2j12mp.js';
import { d as db } from './db-CF_k3vJ4.js';

//#region src/lib/server/services/wallet.service.ts
var WalletService = class {
	static async getBalance(profileId) {
		const [transactions] = await db.execute(`SELECT type, status, SUM(amount) as sumAmount 
       FROM transactions 
       WHERE profile_id = ? 
       GROUP BY type, status`, [profileId]);
		const [pendingBets] = await db.execute("SELECT SUM(stake) as activeStakes FROM bets WHERE profile_id = ? AND status = 'PENDING'", [profileId]);
		let balance = 0;
		for (const group of transactions) {
			const sum = Number(group.sumAmount || 0);
			if (group.status === "COMPLETED") {
				if (group.type === "DEPOSIT" || group.type === "PAYOUT") balance += sum;
				else if (group.type === "WITHDRAWAL") balance -= sum;
			} else if (group.status === "PENDING" && group.type === "WITHDRAWAL") balance -= sum;
		}
		const activeStakes = Number(pendingBets[0].activeStakes || 0);
		balance -= activeStakes;
		return Number(balance.toFixed(2));
	}
	static async initiateMpesaDeposit(profileId, amount, phoneNumber) {
		const [profiles] = await db.execute("SELECT currency, full_name, username FROM profiles WHERE id = ? LIMIT 1", [profileId]);
		if (profiles.length === 0) throw new Error("User profile not found");
		const profile = profiles[0];
		const conn = await db.getConnection();
		const transactionId = crypto.randomUUID();
		const reference = "PH-" + Math.random().toString(36).substring(2, 12).toUpperCase();
		try {
			await conn.beginTransaction();
			await conn.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
         VALUES (?, ?, 'DEPOSIT', ?, ?, 'PENDING', ?)`, [
				transactionId,
				profileId,
				amount,
				profile.currency || "KES",
				reference
			]);
			const authHeader = "Basic " + Buffer.from(`${private_env.PAYHERO_API_USERNAME}:${private_env.PAYHERO_API_PASSWORD}`).toString("base64");
			const response = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": authHeader
				},
				body: JSON.stringify({
					amount: Math.round(amount),
					phone_number: phoneNumber,
					channel_id: Number(private_env.PAYHERO_CHANNEL_ID),
					provider: "m-pesa",
					external_reference: reference,
					callback_url: private_env.PAYHERO_CALLBACK_URL,
					customer_name: profile.full_name || profile.username
				})
			});
			const result = await response.json();
			if (response.status === 201 && result.status === "QUEUED") {
				await conn.commit();
				return {
					success: true,
					message: "STK push prompt sent successfully to your device",
					reference
				};
			} else {
				await conn.execute("UPDATE transactions SET status = \"FAILED\" WHERE id = ?", [transactionId]);
				await conn.commit();
				return {
					success: false,
					message: result.message || "Payment initiation failed",
					reference
				};
			}
		} catch (error) {
			await conn.rollback();
			await db.execute("UPDATE transactions SET status = \"FAILED\" WHERE id = ?", [transactionId]);
			throw error;
		} finally {
			conn.release();
		}
	}
	static async handleMpesaCallback(payload) {
		const [transactions] = await db.execute("SELECT id, profile_id, currency, amount, status FROM transactions WHERE reference = ? LIMIT 1", [payload.external_reference]);
		if (transactions.length === 0 || transactions[0].status !== "PENDING") return false;
		const transaction = transactions[0];
		const conn = await db.getConnection();
		try {
			await conn.beginTransaction();
			const finalStatus = payload.status === "SUCCESS" ? "COMPLETED" : "FAILED";
			const referenceCode = payload.MpesaCode || payload.external_reference;
			await conn.execute("UPDATE transactions SET status = ?, reference = ? WHERE id = ?", [
				finalStatus,
				referenceCode,
				transaction.id
			]);
			await conn.execute(`INSERT INTO notifications (id, profile_id, title, message, \`read\`) 
         VALUES (?, ?, ?, ?, 0)`, [
				crypto.randomUUID(),
				transaction.profile_id,
				payload.status === "SUCCESS" ? "Deposit Completed" : "Deposit Failed",
				payload.status === "SUCCESS" ? `Your deposit of ${transaction.currency} ${transaction.amount} has been approved.` : `Your deposit of ${transaction.currency} ${transaction.amount} was not processed.`
			]);
			await conn.commit();
			return true;
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
	static async initiateWithdrawal(profileId, amount, reference) {
		if (await this.getBalance(profileId) < amount) throw new Error("Insufficient balance");
		const [profiles] = await db.execute("SELECT currency FROM profiles WHERE id = ? LIMIT 1", [profileId]);
		if (profiles.length === 0) throw new Error("User profile not found");
		const profile = profiles[0];
		const id = crypto.randomUUID();
		await db.execute(`INSERT INTO transactions (id, profile_id, type, amount, currency, status, reference) 
       VALUES (?, ?, 'WITHDRAWAL', ?, ?, 'PENDING', ?)`, [
			id,
			profileId,
			amount,
			profile.currency || "USD",
			reference
		]);
		return true;
	}
};

export { WalletService as W };
//# sourceMappingURL=wallet.service-C_hJrwoI.js.map
