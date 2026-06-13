<script lang="ts">
  import { page } from '$app/stores'; // Import SvelteKit page store to detect active routes
  import { goto } from '$app/navigation';
  import { theme } from '$lib/stores/theme.svelte';
  import { auth } from '$lib/stores/auth.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { notificationsStore } from '$lib/stores/notifications.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { formatCurrency } from '$lib/utils/currency';
  import SportsScroll from '../sportsbook/SportsScroll.svelte'; // Import SportsScroll component
  import { Sun, Moon, Search, Bell, Menu, UserRound, Check, X } from 'lucide-svelte';

  let { onMenuToggle } = $props<{ onMenuToggle: () => void }>();

  let searchQuery = $state('');
  let isNotificationsOpen = $state(false);

  const isDark = $derived(theme.current === 'dark');

  // Derived state to check if we are on an admin route to toggle the sports scrollbar
  const isAdminRoute = $derived($page.url.pathname.startsWith('/admin'));

  function handleSearchKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && searchQuery.trim().length > 0) {
      goto(`/sportsbook?search=${encodeURIComponent(searchQuery)}`);
      searchQuery = '';
    }
  }

  async function handleDismissNotification(id: string) {
    notificationsStore.markAsReadLocally(id);
    const formData = new FormData();
    formData.append('id', id);

    await fetch('/notifications?/markRead', {
      method: 'POST',
      body: formData
    });
  }
</script>

<!-- The sticky header houses both the primary navigation and the sports scroll bar -->
<header class="sticky top-0 z-40 w-full border-b border-border-800/80 bg-background-950 shadow-sm backdrop-blur-md">
  
  <!-- Row 1: Logo, Search, and Account Controls -->
  <div class="flex h-16 items-center justify-between px-4">
    <!-- Left Logo -->
    <div class="flex items-center gap-3">
      <Button variant="ghost" size="icon" onclick={onMenuToggle} class="text-foreground-400 hover:text-white md:hidden">
        <Menu class="h-5 w-5" />
      </Button>
      <a href="/" class="flex items-center gap-2">
        <span class="text-base font-black tracking-wider text-white">BUSTA<span class="text-amber-500">BET</span></span>
      </a>
    </div>

    <!-- Center Search Input -->
    <div class="hidden flex-1 max-w-md mx-6 md:block relative">
      <Search class="absolute left-3.5 top-3 h-4 w-4 text-foreground-500" />
      <Input 
        type="text" 
        bind:value={searchQuery}
        onkeydown={handleSearchKeyDown}
        placeholder="Search events, teams, leagues... (Press Enter)" 
        class="h-10 w-full pl-10 pr-4 bg-background-900/50 border-border-800 text-xs font-semibold focus:border-amber-500 rounded-lg text-foreground-200"
      />
    </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-3 relative">
      {#if auth.isAuthenticated}
        <div class="flex h-10 items-center gap-2 rounded-lg border border-border-800 bg-background-900/40 px-3.5 py-1.5">
          <div class="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
          <span class="text-xs font-black text-foreground-200 tracking-tight">{formatCurrency(wallet.balance, wallet.currency)}</span>
        </div>

        <Button variant="ghost" size="icon" onclick={() => theme.toggle()} class="text-foreground-400 hover:text-white">
          {#if isDark}<Sun class="h-4 w-4" />{:else}<Moon class="h-4 w-4" />{/if}
        </Button>

        <a href="/wallet/deposit">
          <Button class="h-10 bg-amber-500 px-5 text-xs font-black text-foreground-950 hover:bg-amber-400 rounded-lg shadow-md">Deposit</Button>
        </a>

        <!-- Notifications -->
        <div class="relative">
          <Button variant="ghost" size="icon" onclick={() => isNotificationsOpen = !isNotificationsOpen} class="text-foreground-400 hover:text-white">
            {#if notificationsStore.unreadCount > 0}
              <span class="absolute top-2 right-2 h-4 w-4 bg-red-600 rounded-full text-[9px] font-black text-white flex items-center justify-center animate-bounce">
                {notificationsStore.unreadCount}
              </span>
            {/if}
            <Bell class="h-4 w-4" />
          </Button>

          {#if isNotificationsOpen}
            <div class="absolute right-0 mt-3 w-80 rounded-xl border border-border-800 bg-background-950 p-4 shadow-2xl space-y-3 z-50">
              <div class="flex justify-between items-center border-b border-border-800 pb-2.5">
                <span class="text-xs font-black tracking-widest text-foreground-400 uppercase">Alerts</span>
                <button onclick={() => isNotificationsOpen = false} class="text-foreground-500 hover:text-white transition">
                  <X class="h-4 w-4" />
                </button>
              </div>

              <div class="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                {#if notificationsStore.unreadCount === 0}
                  <div class="text-center text-xs font-semibold text-foreground-600 py-6">No unread alerts</div>
                {:else}
                  {#each notificationsStore.list as alert}
                    <div class="flex items-start justify-between border border-border-800 bg-background-900/40 p-2.5 rounded-lg gap-2 text-left">
                      <div class="space-y-0.5 max-w-[80%]">
                        <div class="text-[10px] font-black text-foreground-200">{alert.title}</div>
                        <p class="text-[9px] font-bold text-foreground-500 leading-snug">{alert.message}</p>
                      </div>
                      <button onclick={() => handleDismissNotification(alert.id)} class="text-foreground-500 hover:text-amber-500 transition">
                        <Check class="h-3.5 w-3.5" />
                      </button>
                    </div>
                  {/each}
                {/if}
              </div>
              <a href="/notifications" onclick={() => isNotificationsOpen = false} class="block text-center text-[10px] font-bold text-amber-500 hover:text-amber-400 transition border-t border-border-800 pt-2">View All Alerts</a>
            </div>
          {/if}
        </div>

        <Button variant="ghost" onclick={onMenuToggle} class="h-10 flex items-center gap-2 border border-border-800 bg-background-900/20 px-3 text-foreground-400 hover:text-white rounded-lg">
          <UserRound class="h-4 w-4 text-amber-500" />
          <span class="hidden sm:inline text-xs font-bold text-foreground-200">{auth.user?.username}</span>
        </Button>
      {:else}
        <!-- Guest Controls -->
        <Button variant="ghost" size="icon" onclick={() => theme.toggle()} class="text-foreground-400 hover:text-white">
          {#if isDark}<Sun class="h-4 w-4" />{:else}<Moon class="h-4 w-4" />{/if}
        </Button>
        <a href="/auth/login"><Button variant="ghost" class="h-10 text-xs font-bold text-foreground-400 hover:text-white">Log In</Button></a>
        <a href="/auth/register"><Button class="h-10 bg-amber-500 px-5 text-xs font-black text-foreground-950 hover:bg-amber-400 rounded-lg shadow-md">Register</Button></a>
      {/if}
    </div>
  </div>

  <!-- Row 2: Conditionally Render Sports categories Scrollbar (Excluded on Admin pages) -->
  {#if !isAdminRoute}
    <SportsScroll />
  {/if}
</header>