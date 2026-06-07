<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
  import { auth } from '$lib/stores/auth.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { formatCurrency } from '$lib/utils/currency';
  import { Sun, Moon, Search, Bell, Menu, UserRound } from 'lucide-svelte';

  // Layout callback to trigger the slide-out navigation menu from the right
  let { onMenuToggle } = $props<{ onMenuToggle: () => void }>();

  const isDark = $derived(theme.current === 'dark');
</script>

<header class="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-neutral-800/80 bg-neutral-950 px-4 shadow-sm backdrop-blur-md">
  <!-- Left Side: Logo & Mobile Hamburger Menu -->
  <div class="flex items-center gap-3">
    <Button 
      variant="ghost" 
      size="icon" 
      onclick={onMenuToggle}
      class="text-neutral-400 hover:text-white md:hidden"
    >
      <Menu class="h-5 w-5" />
    </Button>
    
    <a href="/" class="flex items-center gap-2">
      <span class="text-base font-black tracking-wider text-white">
        Busta<span class="text-amber-500">BET</span>
      </span>
    </a>
  </div>

  <!-- Center: Universal Search Bar (Hidden on Mobile) -->
  <div class="hidden flex-1 max-w-md mx-6 md:block relative">
    <Search class="absolute left-3.5 top-3 h-4 w-4 text-neutral-500" />
    <Input 
      type="text" 
      placeholder="Search events, teams, leagues..." 
      class="h-10 w-full pl-10 pr-4 bg-neutral-900/50 border-neutral-800 text-xs font-semibold focus:border-amber-500 rounded-lg text-neutral-200"
    />
  </div>

  <!-- Right Side: Wallet, Settings, & Account Dropdown -->
  <div class="flex items-center gap-3">
    {#if auth.isAuthenticated}
      <!-- Localized wallet balance badge -->
      <div class="flex h-10 items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3.5 py-1.5">
        <div class="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
        <span class="text-xs font-black text-neutral-200 tracking-tight">
          {formatCurrency(wallet.balance, wallet.currency)}
        </span>
      </div>

      <!-- Theme Switcher -->
      <Button 
        variant="ghost" 
        size="icon" 
        onclick={() => theme.toggle()}
        class="text-neutral-400 hover:text-white"
      >
        {#if isDark}
          <Sun class="h-4 w-4" />
        {:else}
          <Moon class="h-4 w-4" />
        {/if}
      </Button>

      <!-- Deposit Shortcut CTA -->
      <a href="/wallet/deposit">
        <Button class="h-10 bg-amber-500 px-5 text-xs font-black text-neutral-950 hover:bg-amber-400 rounded-lg transition-transform active:scale-95 shadow-md">
          Deposit
        </Button>
      </a>

      <!-- Notifications -->
      <Button 
        variant="ghost" 
        size="icon" 
        class="text-neutral-400 hover:text-white relative"
      >
        <span class="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
        <Bell class="h-4 w-4" />
      </Button>

      <!-- Profile Menu Trigger -->
      <Button 
        variant="ghost" 
        onclick={onMenuToggle}
        class="h-10 flex items-center gap-2 border border-neutral-800 bg-neutral-900/20 px-3 text-neutral-400 hover:text-white rounded-lg"
      >
        <UserRound class="h-4 w-4 text-amber-500" />
        <span class="hidden sm:inline text-xs font-bold text-neutral-200">{auth.user?.username}</span>
      </Button>
    {:else}
      <!-- Guest Controls -->
      <Button 
        variant="ghost" 
        size="icon" 
        onclick={() => theme.toggle()}
        class="text-neutral-400 hover:text-white"
      >
        {#if isDark}
          <Sun class="h-4 w-4" />
        {:else}
          <Moon class="h-4 w-4" />
        {/if}
      </Button>
      <a href="/auth/login">
        <Button variant="ghost" class="h-10 text-xs font-bold text-neutral-400 hover:text-white">
          Log In
        </Button>
      </a>
      <a href="/auth/register">
        <Button class="h-10 bg-amber-500 px-5 text-xs font-black text-neutral-950 hover:bg-amber-400 rounded-lg shadow-md">
          Register
        </Button>
      </a>
    {/if}
  </div>
</header>