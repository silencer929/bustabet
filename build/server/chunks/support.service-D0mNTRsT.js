import { d as db } from './db-BcGa8hoB.js';

//#region src/lib/server/services/support.service.ts
var SupportService = class {
	static async createTicket(profileId, subject, initialMessage) {
		return await db.$transaction(async (tx) => {
			const conversation = await tx.supportConversation.create({ data: {
				profileId,
				subject,
				status: "OPEN"
			} });
			await tx.supportMessage.create({ data: {
				conversationId: conversation.id,
				senderId: profileId,
				message: initialMessage
			} });
			return conversation;
		});
	}
	static async replyToTicket(conversationId, senderId, messageText, attachments) {
		return await db.$transaction(async (tx) => {
			const conversation = await tx.supportConversation.findUnique({ where: { id: conversationId } });
			if (!conversation || conversation.status === "CLOSED") throw new Error("This ticket is closed or does not exist");
			const message = await tx.supportMessage.create({ data: {
				conversationId,
				senderId,
				message: messageText
			} });
			if (attachments && attachments.length > 0) {
				const attachmentData = attachments.map((att) => ({
					messageId: message.id,
					fileUrl: att.url,
					fileName: att.name
				}));
				await tx.supportAttachment.createMany({ data: attachmentData });
			}
			if (conversation.status === "RESOLVED") await tx.supportConversation.update({
				where: { id: conversationId },
				data: { status: "OPEN" }
			});
			return message;
		});
	}
	static async getUserTickets(profileId) {
		return await db.supportConversation.findMany({
			where: { profileId },
			orderBy: { createdAt: "desc" }
		});
	}
	static async getTicketDetails(conversationId) {
		return await db.supportConversation.findUnique({
			where: { id: conversationId },
			include: { messages: {
				orderBy: { createdAt: "asc" },
				include: {
					sender: { select: {
						id: true,
						username: true,
						fullName: true
					} },
					attachments: true
				}
			} }
		});
	}
};

export { SupportService as S };
//# sourceMappingURL=support.service-D0mNTRsT.js.map
