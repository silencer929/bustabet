<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import OddsButton from './OddsButton.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import { Clock } from 'lucide-svelte';

  // Svelte 5 properties: accepts activeMarket parameter (defaults to h2h)
  let { game, activeMarket = 'h2h' } = $props<{ game: GameWithMarkets; activeMarket?: string }>();

  // Derived filter to automatically update displayed odds when the market selector changes
  const filteredMarkets = $derived(
    game.markets.filter((m: { marketName: string; active: boolean }) => m.marketName === activeMarket && m.active)
  );

  const isLive = $derived(game.status === 'LIVE');

  // Calculates and displays the relative countdown timer (e.g. "4d 7h")
  const remainingTime = $derived.by(() => {
    const diffMs = new Date(game.startTime).getTime() - new Date().getTime();
    if (diffMs <= 0) return 'Live';
    const diffMins = Math.floor(diffMs / 60000);
    const days = Math.floor(diffMins / 1440);
    const hours = Math.floor((diffMins % 1440) / 60);
    return `${days}d ${hours}h`;
  });

  // Formats date/time structure matching the reference (e.g. "Jun 11, 10:00 PM")
  const formattedDate = $derived.by(() => {
    return new Date(game.startTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  });

  // Counts extra markets available for the detailed match page
  const extraMarketsCount = $derived(
    new Set(game.markets.filter((m: { marketName: string }) => m.marketName !== 'h2h').map((m: { marketName: string }) => m.marketName)).size
  );
</script>

<div class="rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-3 md:p-5 shadow-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-700/80 flex flex-col justify-between h-52 md:h-56 min-w-[260px] md:min-w-[280px]">
  <!-- Top: League Name (Left) & Countdown Timer (Right) -->
  <div class="flex items-start justify-between w-full gap-2">
    <span class="text-[9px] md:text-[10px] font-black tracking-wider text-neutral-400 dark:text-neutral-500 uppercase truncate">
      {game.league}
    </span>
    
    <div class="flex flex-col items-end text-right space-y-0.5 shrink-0">
      {#if isLive}
        <Badge class="bg-red-600 hover:bg-red-600 animate-pulse text-[7px] md:text-[8px] font-black px-1 md:px-1.5 py-0.5 tracking-wider rounded text-white">
          LIVE
        </Badge>
      {:else}
        <div class="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-neutral-800 dark:text-neutral-400">
          <Clock class="h-3 w-3 text-neutral-400 shrink-0" />
          <span>{remainingTime}</span>
        </div>
        <span class="text-[8px] md:text-[9px] font-bold text-neutral-400 dark:text-neutral-500">{formattedDate}</span>
      {/if}
    </div>
  </div>

  <!-- Middle: Team Names Stacked Vertically -->
  <div class="space-y-0.5 md:space-y-1 my-2">
    <div class="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-100 truncate">{game.homeTeam}</div>
    <div class="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-100 truncate">{game.awayTeam}</div>
  </div>

  <!-- Bottom: Odds Selection Panel (Left) & Advanced Markets Link (Right) -->
  <div class="flex items-end justify-between w-full border-t border-neutral-100 dark:border-neutral-800/60 pt-2 md:pt-3 gap-2">
    <!-- Horizontal Odds Buttons row -->
    <div class="flex items-center gap-1">
      {#if filteredMarkets.length > 0}
        {#each filteredMarkets as market}
          <OddsButton
            gameId={game.id}
            marketId={market.id}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            marketName={market.marketName}
            selection={market.selection}
            odds={Number(market.odds)}
          />
        {/each}
      {:else}
        <span class="text-xs font-semibold text-neutral-400 dark:text-neutral-600">Markets suspended</span>
      {/if}
    </div>

    <!-- Advanced markets redirect link -->
    <a 
      href="/sportsbook/match/{game.id}" 
      class="text-[9px] md:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-500 transition shrink-0 whitespace-nowrap"
    >
      +{extraMarketsCount > 0 ? extraMarketsCount + 12 : 28}
    </a>
  </div>
</div>