<script lang="ts">
  // import '../app.css';
  import './layout.css';
  import { auth } from '$lib/stores/auth.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import MenuDrawer from '$lib/components/layout/MenuDrawer.svelte';
  import MobileNav from '$lib/components/layout/MobileNav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import SportsScroll from '$lib/components/sportsbook/SportsScroll.svelte';
  import BetSlip from '$lib/components/sportsbook/BetSlip.svelte';
  import Preloader from '$lib/components/ui/Preloader.svelte'; // Import Preloader
  import { Toaster } from 'svelte-sonner';

  let { data, children } = $props<{
    data: { user: any; balance: number };
    children: import('svelte').Snippet;
  }>();

  // Control responsive drawer states
  let isMenuOpen = $state(false);
  let isBetslipOpen = $state(false);

  // Svelte 5 state to manage preloader visibility
  let isLoading = $state(true);

  // Synchronize server-loaded session data with Svelte 5 stores
  $effect(() => {
    auth.setUser(data.user);
    if (data.user) {
      wallet.setWallet(data.balance, data.user.currency || 'USD');
    } else {
      wallet.reset();
    }
  });

  // Fade out preloader once mounting and browser hydration have fully completed
  $effect(() => {
    setTimeout(() => {
      isLoading = false;
    }, 2000); // 800ms artificial timeout for premium brand presentation
  });
</script>

<Toaster theme="dark" position="top-right" richColors />

<!-- Mount Preloader on top of everything -->
<Preloader active={isLoading} />

<div class="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col font-sans">
  <!-- Top Navigation Header -->
  <Header onMenuToggle={() => isMenuOpen = !isMenuOpen} />

  <!-- Horizontal Sports Navigation sub-header -->
  <SportsScroll />

  <div class="flex flex-1 relative overflow-hidden">
    <!-- Left Sidebar (Desktop Only: Lists Sports Categories) -->
    <Sidebar />

    <!-- Main Viewport Scroll Area -->
    <main class="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-6 md:pl-64 md:pr-80 pb-20 md:pb-12 min-h-[calc(100vh-8rem)]">
      <div class="mx-auto max-w-6xl space-y-4 md:space-y-6">
        {@render children()}
      </div>
      <Footer />
    </main>

    <!-- Right-Hand Side: BetSlip Panel -->
    <div class="fixed top-28 bottom-0 right-0 z-30 w-80 border-l border-neutral-800 bg-neutral-950 transition-transform duration-300
      {isBetslipOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0"
    >
      <BetSlip />
    </div>

    <!-- Right-Hand Side: Account Navigation Drawer -->
    <MenuDrawer bind:isOpen={isMenuOpen} />

    {#if isBetslipOpen}
      <button 
        onclick={() => isBetslipOpen = false} 
        class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
        aria-label="Close Betslip"
      ></button>
    {/if}
  </div>

  <!-- Bottom Mobile Tab Bar -->
  <MobileNav bind:isBetslipOpen />
</div>