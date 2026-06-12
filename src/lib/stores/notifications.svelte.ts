import type { Notification } from '@prisma/client';

class NotificationsStore {
  // Array of unread notifications loaded on active session
  list = $state<Notification[]>([]);

  // Computes the total unread alert count
  unreadCount = $derived(this.list.length);

  setList(notifications: Notification[]) {
    this.list = notifications;
  }

  // Removes a notification locally upon being read to provide instant feedback
  markAsReadLocally(id: string) {
    this.list = this.list.filter((n) => n.id !== id);
  }

  // Resets the state values upon user logout
  reset() {
    this.list = [];
  }
}

export const notificationsStore = new NotificationsStore();