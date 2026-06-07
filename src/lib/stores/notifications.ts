// Notifications store
import { writable } from 'svelte/store';

export const notifications = writable({
	items: [] as any[],
	unread: 0,
});
