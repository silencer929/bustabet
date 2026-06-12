import { db } from '../db';
import type { RowDataPacket } from 'mysql2';

export interface LocalConversation {
  id: string;
  profileId: string;
  subject: string;
  status: string;
  createdAt: Date;
  messages?: any[];
}

export class SupportService {
  // Opens a new support ticket and logs the initial message atomically
  static async createTicket(profileId: string, subject: string, initialMessage: string): Promise<LocalConversation> {
    const conn = await db.getConnection();
    const conversationId = crypto.randomUUID();
    const messageId = crypto.randomUUID();

    try {
      await conn.beginTransaction();

      // Insert record in support_conversations
      await conn.execute(
        'INSERT INTO support_conversations (id, profile_id, subject, status) VALUES (?, ?, ?, "OPEN")',
        [conversationId, profileId, subject]
      );

      // Insert record in support_messages
      await conn.execute(
        'INSERT INTO support_messages (id, conversation_id, sender_id, message) VALUES (?, ?, ?, ?)',
        [messageId, conversationId, profileId, initialMessage]
      );

      await conn.commit();

      return {
        id: conversationId,
        profileId,
        subject,
        status: 'OPEN',
        createdAt: new Date()
      };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // Appends a reply message to an active support conversation
  static async replyToTicket(
    conversationId: string,
    senderId: string,
    messageText: string,
    attachments?: { url: string; name: string }[]
  ): Promise<void> {
    const conn = await db.getConnection();
    const messageId = crypto.randomUUID();

    try {
      await conn.beginTransaction();

      // Fetch the active ticket status
      const [conversations] = await conn.execute<RowDataPacket[]>(
        'SELECT status FROM support_conversations WHERE id = ? LIMIT 1',
        [conversationId]
      );

      if (conversations.length === 0 || conversations[0].status === 'CLOSED') {
        throw new Error('This ticket is closed or does not exist');
      }

      // Insert the reply message
      await conn.execute(
        'INSERT INTO support_messages (id, conversation_id, sender_id, message) VALUES (?, ?, ?, ?)',
        [messageId, conversationId, senderId, messageText]
      );

      // Write attachment references if any exist
      if (attachments && attachments.length > 0) {
        for (const att of attachments) {
          await conn.execute(
            'INSERT INTO support_attachments (id, message_id, file_url, file_name) VALUES (?, ?, ?, ?)',
            [crypto.randomUUID(), messageId, att.url, att.name]
          );
        }
      }

      // Re-open conversation if player replies to a resolved ticket
      if (conversations[0].status === 'RESOLVED') {
        await conn.execute(
          'UPDATE support_conversations SET status = "OPEN" WHERE id = ?',
          [conversationId]
        );
      }

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // Resolves list of open or closed tickets owned by a specific profile
  static async getUserTickets(profileId: string): Promise<LocalConversation[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT id, profile_id, subject, status, created_at FROM support_conversations WHERE profile_id = ? ORDER BY created_at DESC',
      [profileId]
    );

    return rows.map((row) => ({
      id: row.id,
      profileId: row.profile_id,
      subject: row.subject,
      status: row.status,
      createdAt: new Date(row.created_at)
    }));
  }

  // Resolves nested message logs and attachment metadata for a ticket conversation
  static async getTicketDetails(conversationId: string): Promise<LocalConversation | null> {
    const [conversations] = await db.execute<RowDataPacket[]>(
      'SELECT id, profile_id, subject, status, created_at FROM support_conversations WHERE id = ? LIMIT 1',
      [conversationId]
    );

    if (conversations.length === 0) return null;
    const conversation = conversations[0];

    // Fetch and join the message sender profiles
    const [messages] = await db.execute<RowDataPacket[]>(
      `SELECT m.id, m.conversation_id, m.sender_id, m.message, m.created_at,
              p.username, p.full_name
       FROM support_messages m
       INNER JOIN profiles p ON m.sender_id = p.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`,
      [conversationId]
    );

    const messagesWithDetails = [];

    for (const msg of messages) {
      // Fetch attachments registered to each message
      const [attachments] = await db.execute<RowDataPacket[]>(
        'SELECT id, message_id, file_url, file_name FROM support_attachments WHERE message_id = ?',
        [msg.id]
      );

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
        attachments: attachments.map(att => ({
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
}