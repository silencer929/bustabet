<script lang="ts">
  import { page } from '$app/stores';
  import { enhance } from '$app/forms'; // 1. Import SvelteKit's progressive enhancement
  import { auth } from '$lib/stores/auth.svelte';
  import { wallet } from '$lib/stores/wallet.svelte'; // 2. Import wallet to clear balances on logout
  import { Button } from '$lib/components/ui/button';
  import { 
    Home, 
    Wallet, 
    Gift, 
    Crown, 
    UserRound,
    Share2, 
    HelpCircle, 
    Shield, 
    LogOut,
    X,
    ChevronLeft
  } from 'lucide-svelte';

  let { isOpen = $bindable(false) } = $props<{ isOpen: boolean }>();
  // Utility to check if a navigation item is active based on the current URL
  const isActive = (path: string) => $page.url.pathname.startsWith(path);

  const navItems = [
    {name: 'My Account', path: '/profile', icon: UserRound },
    { name: 'Sportsbook', path: '/sportsbook', icon: Home },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Promotions', path: '/promotions', icon: Gift },
    { name: 'VIP Rewards', path: '/vip', icon: Crown },
    { name: 'Referrals', path: '/referrals', icon: Share2 },
    { name: 'Support', path: '/support', icon: HelpCircle }
  ];
</script>

<!-- Backdrop overlay click dismiss -->
{#if isOpen}
  <button 
    onclick={() => isOpen = false} 
    class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
    aria-label="Close Navigation"
  ></button>
{/if}

<aside class="fixed top-0 bottom-0 right-0 z-50 w-72 border-l border-neutral-800 bg-neutral-950 px-5 py-6 shadow-2xl transition-transform duration-300
  {isOpen ? 'translate-x-0' : 'translate-x-full'}"
>
  <!-- Drawer Header -->
  <div class="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
    <span class="text-xs font-black tracking-widest text-neutral-400 uppercase">Navigation</span>
    <button onclick={() => isOpen = false} class="text-neutral-500 hover:text-white transition">
      <X class="h-5 w-5" />
    </button>
  </div>

  <div class="flex h-[calc(100vh-8rem)] flex-col justify-between">
    <!-- Links -->
    <nav class="space-y-1.5">
      {#each navItems as item}
        <a 
          href={item.path} 
          onclick={() => isOpen = false}
          class="flex h-11 items-center justify-between rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all duration-200
            {isActive(item.path) ? 'bg-amber-500 text-neutral-950 font-black' : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-white'}"
        >
          <div class="flex items-center gap-3">
            <item.icon class="h-4 w-4" />
            <span>{item.name}</span>
          </div>
          <ChevronLeft class="h-3.5 w-3.5 opacity-60" />
        </a>
      {/each}

      {#if auth.isAdmin}
        <div class="border-t border-neutral-800 my-4 pt-4">
          <div class="px-3 mb-2 text-[10px] font-black tracking-widest text-neutral-500 uppercase">Management</div>
          <a 
            href="/admin/dashboard" 
            onclick={() => isOpen = false}
            class="flex h-11 items-center justify-between rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all duration-200
              {isActive('/admin') ? 'bg-red-600 text-white' : 'text-red-400 hover:bg-red-950/20 hover:text-red-300'}"
          >
            <div class="flex items-center gap-3">
              <Shield class="h-4 w-4" />
              <span>Admin Panel</span>
            </div>
            <ChevronLeft class="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      {/if}
    </nav>

    <!-- Logout (Optimized with Svelte 5 state resets and Progressive Enhancement) -->
    {#if auth.isAuthenticated}
      <form 
        action="/auth?/logout" 
        method="POST" 
        use:enhance={() => {
          return async ({ update }) => {
            // Instantly clear client-side state models before SvelteKit redirects
            auth.logout();
            wallet.reset();
            isOpen = false;
            update();
          };
        }}
        class="border-t border-neutral-800 pt-4"
      >
        <Button 
          type="submit"
          variant="ghost" 
          class="flex h-11 w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-xs font-bold text-neutral-400 hover:bg-red-950/10 hover:text-red-400 transition"
        >
          <LogOut class="h-4 w-4" />
          <span>Log Out</span>
        </Button>
      </form>
    {/if}
  </div>
</aside>