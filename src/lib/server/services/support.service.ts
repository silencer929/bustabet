import { db } from '../db';
import type { SupportConversation, SupportMessage } from '@prisma/client';

export class SupportService {
  // Opens a new support ticket and logs the initial message atomically
  static async createTicket(profileId: string, subject: string, initialMessage: string): Promise<SupportConversation> {
    return await db.$transaction(async (tx) => {
      const conversation = await tx.supportConversation.create({
        data: {
          profileId,
          subject,
          status: 'OPEN'
        }
      });

      await tx.supportMessage.create({
        data: {
          conversationId: conversation.id,
          senderId: profileId,
          message: initialMessage
        }
      });

      return conversation;
    });
  }

  // Appends a reply message to an active support conversation
  static async replyToTicket(
    conversationId: string,
    senderId: string,
    messageText: string,
    attachments?: { url: string; name: string }[]
  ): Promise<SupportMessage> {
    return await db.$transaction(async (tx) => {
      const conversation = await tx.supportConversation.findUnique({
        where: { id: conversationId }
      });

      if (!conversation || conversation.status === 'CLOSED') {
        throw new Error('This ticket is closed or does not exist');
      }

      const message = await tx.supportMessage.create({
        data: {
          conversationId,
          senderId,
          message: messageText
        }
      });

      // If files are attached, log them to the database
      if (attachments && attachments.length > 0) {
        const attachmentData = attachments.map((att) => ({
          messageId: message.id,
          fileUrl: att.url,
          fileName: att.name
        }));

        await tx.supportAttachment.createMany({
          data: attachmentData
        });
      }

      // Re-open conversation if resolved or closed manually by player reply
      if (conversation.status === 'RESOLVED') {
        await tx.supportConversation.update({
          where: { id: conversationId },
          data: { status: 'OPEN' }
        });
      }

      return message;
    });
  }

  // Resolves list of open or closed tickets owned by a specific profile
  static async getUserTickets(profileId: string): Promise<SupportConversation[]> {
    return await db.supportConversation.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Resolves nested message logs and attachment metadata for a ticket conversation
  static async getTicketDetails(conversationId: string): Promise<SupportConversation | null> {
    return await db.supportConversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                fullName: true
              }
            },
            attachments: true
          }
        }
      }
    });
  }
}