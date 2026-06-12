import { d as db } from './db-BcGa8hoB.js';
import { P as PAYHERO_API_USERNAME, d as PAYHERO_API_PASSWORD, e as PAYHERO_CALLBACK_URL, f as PAYHERO_CHANNEL_ID } from './private-CPklkgrX.js';

//#region src/lib/server/services/wallet.service.ts
var WalletService = class {
	static async getBalance(profileId) {
		const transactions = await db.transaction.groupBy({
			by: ["type", "status"],
			where: { profileId },
			_sum: { amount: true }
		});
		const pendingBets = await db.bet.aggregate({
			where: {
				profileId,
				status: "PENDING"
			},
			_sum: { stake: true }
		});
		let balance = 0;
		for (const group of transactions) {
			const sum = Number(group._sum.amount || 0);
			if (group.status === "COMPLETED") {
				if (group.type === "DEPOSIT" || group.type === "PAYOUT") balance += sum;
				else if (group.type === "WITHDRAWAL") balance -= sum;
			} else if (group.status === "PENDING" && group.type === "WITHDRAWAL") balance -= sum;
		}
		const activeStakes = Number(pendingBets._sum.stake || 0);
		balance -= activeStakes;
		return Number(balance.toFixed(2));
	}
	static async initiateMpesaDeposit(profileId, amount, phoneNumber) {
		const profile = await db.profile.findUnique({ where: { id: profileId } });
		if (!profile) throw new Error("User profile not found");
		return await db.$transaction(async (tx) => {
			const transaction = await tx.transaction.create({ data: {
				profileId,
				type: "DEPOSIT",
				amount,
				currency: profile.currency || "KES",
				status: "PENDING",
				reference: "PH-" + Math.random().toString(36).substring(2, 12).toUpperCase()
			} });
			const authHeader = "Basic " + Buffer.from(`${PAYHERO_API_USERNAME}:${PAYHERO_API_PASSWORD}`).toString("base64");
			try {
				const response = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": authHeader
					},
					body: JSON.stringify({
						amount: Math.round(amount),
						phone_number: phoneNumber,
						channel_id: Number(PAYHERO_CHANNEL_ID),
						provider: "m-pesa",
						external_reference: transaction.reference,
						callback_url: PAYHERO_CALLBACK_URL,
						customer_name: profile.fullName || profile.username
					})
				});
				const result = await response.json();
				if (response.status === 201 && result.status === "QUEUED") return {
					success: true,
					message: "STK push prompt sent successfully to your device",
					reference: transaction.reference
				};
				else {
					await tx.transaction.update({
						where: { id: transaction.id },
						data: { status: "FAILED" }
					});
					return {
						success: false,
						message: result.message || "Payment initiation failed",
						reference: transaction.reference
					};
				}
			} catch (error) {
				await tx.transaction.update({
					where: { id: transaction.id },
					data: { status: "FAILED" }
				});
				return {
					success: false,
					message: "An unexpected connection error occurred",
					reference: transaction.reference
				};
			}
		});
	}
	static async handleMpesaCallback(payload) {
		const transaction = await db.transaction.findUnique({ where: { reference: payload.external_reference } });
		if (!transaction || transaction.status !== "PENDING") return false;
		await db.$transaction(async (tx) => {
			const finalStatus = payload.status === "SUCCESS" ? "COMPLETED" : "FAILED";
			const referenceCode = payload.MpesaCode || transaction.reference;
			await tx.transaction.update({
				where: { id: transaction.id },
				data: {
					status: finalStatus,
					reference: referenceCode
				}
			});
			await tx.notification.create({ data: {
				profileId: transaction.profileId,
				title: payload.status === "SUCCESS" ? "Deposit Completed" : "Deposit Failed",
				message: payload.status === "SUCCESS" ? `Your deposit of ${transaction.currency} ${transaction.amount} has been approved.` : `Your deposit of ${transaction.currency} ${transaction.amount} was not processed.`,
				read: false
			} });
		});
		return true;
	}
	static async initiateWithdrawal(profileId, amount, reference) {
		if (await this.getBalance(profileId) < amount) throw new Error("Insufficient balance");
		const profile = await db.profile.findUnique({ where: { id: profileId } });
		if (!profile) throw new Error("User profile not found");
		await db.transaction.create({ data: {
			profileId,
			type: "WITHDRAWAL",
			amount,
			currency: profile.currency || "USD",
			status: "PENDING",
			reference
		} });
		return true;
	}
};

export { WalletService as W };
//# sourceMappingURL=wallet.service-BdUTK0kZ.js.map
