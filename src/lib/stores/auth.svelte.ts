import type { FullProfileDetails } from '$lib/types/profile';

class AuthStore {
  // Active session profile state
  user = $state<FullProfileDetails | null>(null);

  // Computes active authenticated session status
  isAuthenticated = $derived(this.user !== null);

  // Computes administrator role access check
  isAdmin = $derived(this.user?.user?.role === 'ADMIN');

  // Computes support staff role access check
  isSupport = $derived(this.user?.user?.role === 'SUPPORT');

  // Set the current authenticated session profile details
  setUser(profile: FullProfileDetails | null) {
    this.user = profile;
  }

  // Clears active session profile details on logout
  logout() {
    this.user = null;
  }
}

export const auth = new AuthStore();