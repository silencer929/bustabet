<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { theme } from '$lib/stores/theme.svelte';
  import { auth } from '$lib/stores/auth.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { notificationsStore } from '$lib/stores/notifications.svelte';
  import { Input } from '$lib/components/ui/input';
  import { formatCurrency } from '$lib/utils/currency';
  import SportsScroll from '../sportsbook/SportsScroll.svelte';
  import { Sun, Moon, Search, Bell, Menu, UserRound, Check, X, Wallet } from 'lucide-svelte';

  let { onMenuToggle } = $props<{ onMenuToggle: () => void }>();

  let searchQuery = $state('');
  let isNotificationsOpen = $state(false);
  let isSearchOpen = $state(false); // Controls mobile inline search toggle

  const isDark = $derived(theme.current === 'dark');
  const isAdminRoute = $derived($page.url.pathname.startsWith('/admin'));

  function handleSearchKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && searchQuery.trim().length > 0) {
      goto(`/sportsbook?search=${encodeURIComponent(searchQuery)}`);
      searchQuery = '';
      isSearchOpen = false;
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

<!-- bg-background and border-border adapt dynamically to both Light/Dark theme toggles -->
<header class="sticky top-0 z-40 w-full border-b border-border bg-background shadow-sm transition-colors duration-150">
  
  <!-- Main Header Row (Scaled down to compact h-14) -->
  <div class="flex h-14 items-center justify-between px-2 sm:px-4 gap-1 sm:gap-3">
    
    <!-- Left Section: Logo & Compact Search Icon -->
    <div class="flex items-center gap-1 sm:gap-2 shrink-0">
      <!-- Mobile hamburger menu trigger -->
      <button 
        onclick={onMenuToggle} 
        class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground md:hidden cursor-pointer"
        aria-label="Toggle Menu"
      >
        <Menu class="h-4.5 w-4.5" />
      </button>

      <!-- Brand Logo -->
      <a href="/" class="flex items-center">
        <img 
          src="/logos/logo.png" 
          alt="BUSTA Bet" 
          class="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-lg"
        />
      </a>

      <!-- Mobile Search Toggle Button (Toggles inline search bar input) -->
      <button 
        onclick={() => isSearchOpen = !isSearchOpen}
        class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground md:hidden cursor-pointer"
      >
        <Search class="h-4 w-4" />
      </button>
    </div>

    <!-- Center Section: Desktop Search Bar (Hidden on mobile) -->
    <div class="hidden flex-1 max-w-xs lg:max-w-sm mx-4 md:block relative">
      <Search class="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
      <Input 
        type="text" 
        bind:value={searchQuery}
        onkeydown={handleSearchKeyDown}
        placeholder="Search matches... (Press Enter)" 
        class="h-9 w-full pl-9 pr-4 bg-muted/40 border-border text-[11px] font-semibold focus:border-primary rounded-lg text-foreground"
      />
    </div>

    <!-- Right Section: Compact controls matching reference layout spacing -->
    <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
      {#if auth.isAuthenticated}
        <!-- Localized wallet balance capsule (Uses theme-sensitive variables: bg-muted/50 and border-border) -->
        <div class="flex h-8 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1">
          <Wallet class="h-3.5 w-3.5 text-primary" />
          <span class="text-[11px] font-black text-foreground tracking-tight">{formatCurrency(wallet.balance, wallet.currency)}</span>
        </div>

        <!-- Theme Toggle Button -->
        <button 
          onclick={() => theme.toggle()} 
          class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition cursor-pointer"
        >
          {#if isDark}<Sun class="h-3.5 w-3.5" />{:else}<Moon class="h-3.5 w-3.5" />{/if}
        </button>

        <!-- Compact Solid Gold Deposit Button -->
        <a href="/wallet/deposit">
          <button class="h-8 px-3.5 bg-primary text-[11px] font-black text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm transition active:scale-95 cursor-pointer">
            Deposit
          </button>
        </a>

        <!-- Notifications Bell -->
        <div class="relative">
          <button 
            onclick={() => isNotificationsOpen = !isNotificationsOpen} 
            class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition cursor-pointer"
          >
            {#if notificationsStore.unreadCount > 0}
              <span class="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-destructive rounded-full text-[8px] font-black text-white flex items-center justify-center">
                {notificationsStore.unreadCount}
              </span>
            {/if}
            <Bell class="h-3.5 w-3.5" />
          </button>

          <!-- Floating Notification Dropdown -->
          {#if isNotificationsOpen}
            <div class="absolute right-0 mt-3 w-76 rounded-xl border border-border bg-card p-3 shadow-2xl space-y-2.5 z-50">
              <div class="flex justify-between items-center border-b border-border pb-2">
                <span class="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Alerts</span>
                <button onclick={() => isNotificationsOpen = false} class="text-muted-foreground hover:text-foreground transition">
                  <X class="h-3.5 w-3.5" />
                </button>
              </div>

              <div class="max-h-56 overflow-y-auto space-y-2 pr-1">
                {#if notificationsStore.unreadCount === 0}
                  <div class="text-center text-[11px] font-semibold text-muted-foreground py-4">No unread alerts</div>
                {:else}
                  {#each notificationsStore.list as alert}
                    <div class="flex items-start justify-between border border-border bg-muted/20 p-2 rounded-lg gap-2 text-left">
                      <div class="space-y-0.5 max-w-[80%]">
                        <div class="text-[9px] font-black text-foreground">{alert.title}</div>
                        <p class="text-[8px] font-bold text-muted-foreground leading-snug">{alert.message}</p>
                      </div>
                      <button onclick={() => handleDismissNotification(alert.id)} class="text-muted-foreground hover:text-primary transition">
                        <Check class="h-3 w-3" />
                      </button>
                    </div>
                  {/each}
                {/if}
              </div>
              <a href="/notifications" onclick={() => isNotificationsOpen = false} class="block text-center text-[9px] font-black text-primary hover:text-primary/80 transition border-t border-border pt-1.5">View All Alerts</a>
            </div>
          {/if}
        </div>

        <!-- Profile Drawer Trigger -->
        <button 
          onclick={onMenuToggle} 
          class="h-8 flex items-center justify-center gap-1.5 border border-border bg-muted/20 px-2 text-muted-foreground hover:text-foreground rounded-lg cursor-pointer transition"
        >
          <UserRound class="h-3.5 w-3.5 text-primary" />
          <span class="hidden md:inline text-[11px] font-bold text-foreground">{auth.user?.username}</span>
        </button>
      {:else}
        <!-- Responsive Guest Controls -->
        <button 
          onclick={() => theme.toggle()} 
          class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition cursor-pointer"
        >
          {#if isDark}<Sun class="h-3.5 w-3.5" />{:else}<Moon class="h-3.5 w-3.5" />{/if}
        </button>
        <a href="/auth/login" class="text-[11px] font-bold text-muted-foreground hover:text-foreground px-2 py-1.5">Log In</a>
        <a href="/auth/register">
          <button class="h-8 px-3.5 bg-primary text-[11px] font-black text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm cursor-pointer">
            Register
          </button>
        </a>
      {/if}
    </div>
  </div>

  <!-- Mobile Inline Search Overlay (Expands beneath Header on clicking search icon) -->
  {#if isSearchOpen}
    <div class="flex items-center px-3 py-2 border-t border-border bg-background md:hidden relative">
      <Search class="absolute left-6 top-5 h-3.5 w-3.5 text-muted-foreground" />
      <Input 
        type="text" 
        bind:value={searchQuery}
        onkeydown={handleSearchKeyDown}
        placeholder="Search matches... (Press Enter)" 
        class="h-9 w-full pl-9 pr-10 bg-muted/40 border-border text-[11px] font-semibold focus:border-primary rounded-lg text-foreground"
      />
      <button 
        onclick={() => { isSearchOpen = false; searchQuery = ''; }}
        class="absolute right-6 top-5 text-muted-foreground hover:text-foreground"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  {/if}

  <!-- Row 2: Sports Categories scrollbar (Excluded on Admin pages) -->
  {#if !isAdminRoute}
    <SportsScroll />
  {/if}
</header>