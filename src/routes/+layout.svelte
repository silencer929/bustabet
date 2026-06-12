<script lang="ts">
  import './layout.css';
  import { page } from '$app/stores'; // Import SvelteKit page store to read current route
  import { auth } from '$lib/stores/auth.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { notificationsStore } from '$lib/stores/notifications.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import MenuDrawer from '$lib/components/layout/MenuDrawer.svelte';
  import MobileNav from '$lib/components/layout/MobileNav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import BetSlip from '$lib/components/sportsbook/BetSlip.svelte';
  import Preloader from '$lib/components/ui/Preloader.svelte';
  import { Toaster } from 'svelte-sonner';

  let { data, children } = $props<{
    data: { user: any; balance: number; notifications: any[] };
    children: import('svelte').Snippet;
  }>();

  let isMenuOpen = $state(false);
  let isBetslipOpen = $state(false);
  let isLoading = $state(true);
  let theme = $state('dark');

  // Derived state to check if the user is currently browsing any admin route
  const isAdminRoute = $derived($page.url.pathname.startsWith('/admin'));
  // Synchronize server-loaded data with Svelte 5 client-side runes stores
  $effect(() => {
    auth.setUser(data.user);
    if (data.user) {
      wallet.setWallet(data.balance, data.user.currency || 'USD');
      notificationsStore.setList(data.notifications || []); // Sync notifications array
    } else {
      wallet.reset();
      notificationsStore.reset();
    }
  });
  $effect(() => {
    setTimeout(() => {
      isLoading = false;
    }, 800);
  });
</script>

<Toaster theme="light" position="top-right" richColors />

<Preloader active={isLoading} />

<div class="min-h-screen bg-background text-foreground flex flex-col font-sans">
  <!-- Top Navigation Header (Render globally across both admin and player routes) -->
  <Header onMenuToggle={() => isMenuOpen = !isMenuOpen} />

  <div class="flex flex-1 relative overflow-hidden">
    <!-- Conditionally render Left Sports Sidebar (Exclude on Admin routes) -->
    {#if !isAdminRoute}
      <Sidebar />
    {/if}

    <!-- Main Viewport Scroll Area: Dynamically removes left/right spacing if on an admin route -->
    <main class="flex-1 overflow-y-auto pb-24 md:pb-12 transition-all duration-150
      {isAdminRoute 
        ? 'px-6 py-8' 
        : 'px-4 py-6 md:pl-68 md:pr-84 min-h-[calc(100vh-8rem)]'}"
    >
      <div class="mx-auto max-w-7xl space-y-6">
        {@render children()}
      </div>
      
      {#if !isAdminRoute}
        <Footer />
      {/if}
    </main>

    <!-- Conditionally render Right-Hand BetSlip Drawer (Exclude on Admin routes) -->
    {#if !isAdminRoute}
      <div class="fixed top-28 bottom-0 right-0 z-30 w-80 border-l border-border bg-background transition-transform duration-300
        {isBetslipOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0"
      >
        <BetSlip />
      </div>
    {/if}

    <!-- Right-Hand Side Account Navigation Drawer -->
    <MenuDrawer bind:isOpen={isMenuOpen} />

    {#if isBetslipOpen && !isAdminRoute}
      <button 
        onclick={() => isBetslipOpen = false} 
        class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
        aria-label="Close Betslip"
      ></button>
    {/if}
  </div>

  <!-- Conditionally render Bottom Mobile Navigation Tab Bar (Exclude on Admin routes) -->
  {#if !isAdminRoute}
    <MobileNav bind:isBetslipOpen />
  {/if}
</div>