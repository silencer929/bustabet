<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Landmark, Trophy, ShieldAlert } from 'lucide-svelte';

  let isSubmitting = $state(false);

  // Automatically captures the referral code from the URL query parameters
  const referralQuery = $derived($page.url.searchParams.get('ref') || '');
</script>

<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8">
  <div class="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md space-y-6">
    <!-- Header Title -->
    <div class="text-center space-y-1.5">
      <h2 class="text-2xl font-black tracking-tight text-neutral-100">Create Your Account</h2>
      <p class="text-xs text-neutral-500 font-semibold">Join Busta Bet to access premium decimal odds</p>
    </div>

    <!-- SvelteKit Progressive Enhancement Form -->
    <form 
      method="POST" 
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          isSubmitting = false;
          update();
        };
      }}
      class="space-y-4"
    >
      {#if $page.form?.error}
        <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">
          <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
          <span>{$page.form.error}</span>
        </div>
      {/if}

      <!-- Grid Group -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <label for="email" class="text-xs font-bold text-neutral-400">Email Address</label>
          <Input id="email" name="email" type="email" required placeholder="name@example.com" class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10" />
        </div>

        <div class="space-y-1.5">
          <label for="username" class="text-xs font-bold text-neutral-400">Username</label>
          <Input id="username" name="username" type="text" required placeholder="username" class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <label for="fullName" class="text-xs font-bold text-neutral-400">Full Name</label>
          <Input id="fullName" name="fullName" type="text" required placeholder="John Doe" class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10" />
        </div>

        <div class="space-y-1.5">
          <label for="password" class="text-xs font-bold text-neutral-400">Password</label>
          <Input id="password" name="password" type="password" required placeholder="••••••••" class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <label for="phone" class="text-xs font-bold text-neutral-400">Phone Number (E.164)</label>
          <Input id="phone" name="phone" type="tel" required placeholder="+254712345678" class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10" />
        </div>

        <div class="space-y-1.5">
          <label for="country" class="text-xs font-bold text-neutral-400">Country</label>
          <Input id="country" name="country" type="text" required placeholder="Kenya" class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <label for="currency" class="text-xs font-bold text-neutral-400">Preferred Currency</label>
          <select id="currency" name="currency" required class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-amber-500 focus:outline-none">
            <option value="KES">KES (Kenyan Shilling)</option>
            <option value="NGN">NGN (Nigerian Naira)</option>
            <option value="GHS">GHS (Ghanaian Cedi)</option>
            <option value="TZS">TZS (Tanzanian Shilling)</option>
            <option value="UGX">UGX (Ugandan Shilling)</option>
            <option value="ZAR">ZAR (South African Rand)</option>
            <option value="USD">USD (US Dollar)</option>
          </select>
        </div>

        <div class="space-y-1.5 relative">
          <label for="referralCode" class="text-xs font-bold text-neutral-400">Referral Code (Optional)</label>
          <Input id="referralCode" name="referralCode" type="text" value={referralQuery} placeholder="CHAMP-XXXXXX" class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10 pr-16" />
          {#if referralQuery}
            <Badge class="absolute right-2.5 top-8 bg-amber-500 text-neutral-950 text-[9px] font-black h-5 py-0">Active</Badge>
          {/if}
        </div>
      </div>

      <!-- Action Button -->
      <Button 
        type="submit" 
        disabled={isSubmitting}
        class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-neutral-800 disabled:text-neutral-500"
      >
        {isSubmitting ? 'Creating Account...' : 'Register'}
      </Button>
    </form>

    <!-- Footer Links -->
    <div class="text-center border-t border-neutral-800/80 pt-4 text-xs font-semibold text-neutral-500">
      Already have an account? 
      <a href="/auth/login" class="text-amber-500 hover:text-amber-400 transition ml-1">Log In</a>
    </div>
  </div>
</div>