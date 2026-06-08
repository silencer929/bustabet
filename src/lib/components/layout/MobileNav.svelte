<script lang="ts">
  import { page } from '$app/stores';
  import { betslip } from '$lib/stores/betslip.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { auth } from '$lib/stores/auth.svelte';
  import { Home, Wallet, Ticket, User, HelpCircle } from 'lucide-svelte';

  // Defines a bindable state allowing this tab bar to open/close the betslip drawer globally
  let { isBetslipOpen = $bindable(false) } = $props<{ isBetslipOpen: boolean }>();

  // Evaluates active routes to toggle active highlight formatting
  function isActive(path: string) {
    return $page.url.pathname === path;
  }
</script>

<div class="fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t border-border/80 bg-background/95 shadow-lg backdrop-blur-md md:hidden">
  <!-- Sportsbook Tab -->
  <a 
    href="/sportsbook" 
    onclick={() => isBetslipOpen = false}
    class="flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200
      {isActive('/sportsbook') ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-300'}"
  >
    <Home class="h-5 w-5" />
    <span class="text-[9px] font-bold tracking-wide">Sports</span>
  </a>

  <!-- Wallet Tab -->
  <a 
    href="/wallet" 
    onclick={() => isBetslipOpen = false}
    class="flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200
      {isActive('/wallet') ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-300'}"
  >
    <Wallet class="h-5 w-5" />
    <span class="text-[9px] font-bold tracking-wide">Wallet</span>
  </a>

  <!-- Betslip Toggle Tab -->
  <button 
    onclick={() => isBetslipOpen = !isBetslipOpen}
    class="relative flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200
      {isBetslipOpen ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-300'}"
  >
    {#if betslip.count > 0}
      <span class="absolute top-2.5 right-7 rounded-full bg-amber-500 px-1.5 py-0.5 text-[8px] font-black leading-none text-neutral-950 animate-bounce">
        {betslip.count}
      </span>
    {/if}
    <Ticket class="h-5 w-5" />
    <span class="text-[9px] font-bold tracking-wide">Betslip</span>
  </button>

  <!-- Support Tab -->
  <a 
    href="/support" 
    onclick={() => isBetslipOpen = false}
    class="flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200
      {isActive('/support') ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-300'}"
  >
    <HelpCircle class="h-5 w-5" />
    <span class="text-[9px] font-bold tracking-wide">Support</span>
  </a>

  <!-- Profile Tab -->
  <a 
    href="/profile" 
    onclick={() => isBetslipOpen = false}
    class="flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200
      {isActive('/profile') ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-300'}"
  >
    <User class="h-5 w-5" />
    <span class="text-[9px] font-bold tracking-wide">Profile</span>
  </a>
</div>