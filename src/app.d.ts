import type { FullProfileDetails } from '$lib/types/profile';

declare global {
  namespace App {
    // Injected session user object verified on server-side hooks
    interface Locals {
      user: FullProfileDetails | null;
    }

    // interface PageData {}
    // interface Platform {}
    // interface Metadata {}
    // interface Error {}
  }
}

export {};