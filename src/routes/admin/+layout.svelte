<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { 
    LayoutDashboard, 
    ArrowRightLeft, 
    ShieldCheck, 
    HelpCircle, 
    Tv,
    ArrowLeft,
    ChevronRight
  } from 'lucide-svelte';

  // Svelte 5 layout property: renders children page snippets
  let { children } = $props<{ children: import('svelte').Snippet }>();

  // Helper check to determine if an admin sub-route is currently active
  const isActive = (path: string) => { return $page.url.pathname === path;};

  const adminNav = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/admin/transactions', icon: ArrowRightLeft },
    { name: 'KYC Verification', path: '/admin/verification', icon: ShieldCheck },
    { name: 'Support Tickets', path: '/admin/support', icon: HelpCircle },
    { name: 'Fixtures Overseer', path: '/admin/games', icon: Tv }
  ];
</script>

<div class="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col md:flex-row">
  <!-- Admin Navigation Sidebar -->
  <aside class="w-full md:w-64 border-r border-neutral-800/80 bg-neutral-900/40 p-5 shrink-0 space-y-6">
    <!-- Header Back CTA -->
    <div class="flex items-center justify-between border-b border-neutral-800 pb-4 mb-2">
      <a href="/sportsbook" class="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-amber-500 transition">
        <ArrowLeft class="h-3.5 w-3.5" />
        <span>Exit Portal</span>
      </a>
      <span class="rounded bg-red-950/40 border border-red-800/80 px-2 py-0.5 text-[9px] font-black tracking-widest text-red-400 uppercase">Admin</span>
    </div>

    <!-- Links -->
    <nav class="space-y-1.5">
      {#each adminNav as item}
        <a 
          href={item.path} 
          class="flex h-11 items-center justify-between rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all duration-150
            {isActive(item.path) ? 'bg-red-600 text-white font-black' : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-white'}"
        >
          <div class="flex items-center gap-3">
            <item.icon class="h-4 w-4 shrink-0" />
            <span>{item.name}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 opacity-60" />
        </a>
      {/each}
    </nav>
  </aside>

  <!-- Administrative Main Panel Scroll Area -->
  <main class="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
    <div class="mx-auto max-w-5xl space-y-6">
      {@render children()}
    </div>
  </main>
</div>