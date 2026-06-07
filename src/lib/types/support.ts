import type { SupportConversation, SupportMessage, SupportAttachment, Profile } from '@prisma/client';

// Message containing attached payload metadata
export interface SupportMessageWithAttachments extends SupportMessage {
  sender: Pick<Profile, 'id' | 'username' | 'fullName'>;
  attachments: SupportAttachment[];
}

// Full conversation payload mapped to support interface
export interface ConversationWithDetails extends SupportConversation {
  profile: Pick<Profile, 'id' | 'username' | 'fullName'>;
  messages: SupportMessageWithAttachments[];
}