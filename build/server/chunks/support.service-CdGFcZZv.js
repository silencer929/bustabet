import { d as db } from './db-CT_Sl39P.js';

//#region src/lib/server/services/support.service.ts
var SupportService = class {
	static async createTicket(profileId, subject, initialMessage) {
		const conn = await db.getConnection();
		const conversationId = crypto.randomUUID();
		const messageId = crypto.randomUUID();
		try {
			await conn.beginTransaction();
			await conn.execute("INSERT INTO support_conversations (id, profile_id, subject, status) VALUES (?, ?, ?, \"OPEN\")", [
				conversationId,
				profileId,
				subject
			]);
			await conn.execute("INSERT INTO support_messages (id, conversation_id, sender_id, message) VALUES (?, ?, ?, ?)", [
				messageId,
				conversationId,
				profileId,
				initialMessage
			]);
			await conn.commit();
			return {
				id: conversationId,
				profileId,
				subject,
				status: "OPEN",
				createdAt: /* @__PURE__ */ new Date()
			};
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
	static async replyToTicket(conversationId, senderId, messageText, attachments) {
		const conn = await db.getConnection();
		const messageId = crypto.randomUUID();
		try {
			await conn.beginTransaction();
			const [conversations] = await conn.execute("SELECT status FROM support_conversations WHERE id = ? LIMIT 1", [conversationId]);
			if (conversations.length === 0 || conversations[0].status === "CLOSED") throw new Error("This ticket is closed or does not exist");
			await conn.execute("INSERT INTO support_messages (id, conversation_id, sender_id, message) VALUES (?, ?, ?, ?)", [
				messageId,
				conversationId,
				senderId,
				messageText
			]);
			if (attachments && attachments.length > 0) for (const att of attachments) await conn.execute("INSERT INTO support_attachments (id, message_id, file_url, file_name) VALUES (?, ?, ?, ?)", [
				crypto.randomUUID(),
				messageId,
				att.url,
				att.name
			]);
			if (conversations[0].status === "RESOLVED") await conn.execute("UPDATE support_conversations SET status = \"OPEN\" WHERE id = ?", [conversationId]);
			await conn.commit();
		} catch (error) {
			await conn.rollback();
			throw error;
		} finally {
			conn.release();
		}
	}
	static async getUserTickets(profileId) {
		const [rows] = await db.execute("SELECT id, profile_id, subject, status, created_at FROM support_conversations WHERE profile_id = ? ORDER BY created_at DESC", [profileId]);
		return rows.map((row) => ({
			id: row.id,
			profileId: row.profile_id,
			subject: row.subject,
			status: row.status,
			createdAt: new Date(row.created_at)
		}));
	}
	static async getTicketDetails(conversationId) {
		const [conversations] = await db.execute("SELECT id, profile_id, subject, status, created_at FROM support_conversations WHERE id = ? LIMIT 1", [conversationId]);
		if (conversations.length === 0) return null;
		const conversation = conversations[0];
		const [messages] = await db.execute(`SELECT m.id, m.conversation_id, m.sender_id, m.message, m.created_at,
              p.username, p.full_name
       FROM support_messages m
       INNER JOIN profiles p ON m.sender_id = p.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`, [conversationId]);
		const messagesWithDetails = [];
		for (const msg of messages) {
			const [attachments] = await db.execute("SELECT id, message_id, file_url, file_name FROM support_attachments WHERE message_id = ?", [msg.id]);
			messagesWithDetails.push({
				id: msg.id,
				conversationId: msg.conversation_id,
				senderId: msg.sender_id,
				message: msg.message,
				createdAt: new Date(msg.created_at),
				sender: {
					id: msg.sender_id,
					username: msg.username,
					fullName: msg.full_name
				},
				attachments: attachments.map((att) => ({
					id: att.id,
					messageId: att.message_id,
					fileUrl: att.file_url,
					fileName: att.file_name
				}))
			});
		}
		return {
			id: conversation.id,
			profileId: conversation.profile_id,
			subject: conversation.subject,
			status: conversation.status,
			createdAt: new Date(conversation.created_at),
			messages: messagesWithDetails
		};
	}
};

export { SupportService as S };
//# sourceMappingURL=support.service-CdGFcZZv.js.map
