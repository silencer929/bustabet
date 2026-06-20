<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import OddsButton from './OddsButton.svelte';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Badge } from '$lib/components/ui/badge';
  import { Clock } from 'lucide-svelte';

  let { game, activeMarket = 'h2h' } = $props<{ game: GameWithMarkets; activeMarket?: string }>();

  const filteredMarkets = $derived(
    game.markets.filter((m) => m.marketName === activeMarket && m.active)
  );

  // Deterministic sorting helper to force standard H2H odds layout (1 - X - 2) on the dashboard
  const sortedMarkets = $derived.by(() => {
    if (activeMarket !== 'h2h') return filteredMarkets;

    const sorted = [...filteredMarkets];
    return sorted.sort((a, b) => {
      const isHomeA = a.selection === game.homeTeam;
      const isHomeB = b.selection === game.homeTeam;
      const isAwayA = a.selection === game.awayTeam;
      const isAwayB = b.selection === game.awayTeam;

      if (isHomeA) return -1; // Move Home (1) to the left
      if (isHomeB) return 1;
      if (isAwayA) return 1;  // Move Away (2) to the right
      if (isAwayB) return -1;
      return 0;               // Keep Draw (X) in the center
    });
  });

  const isLive = $derived(game.status === 'LIVE');

  const extraMarketsCount = $derived(
    new Set(game.markets.filter((m) => m.marketName !== 'h2h').map((m) => m.marketName)).size
  );
</script>

<div class="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-700/80 flex flex-col justify-between h-58 min-w-[280px]">
  <!-- Top: League Name (Left) & Countdown Timer (Right) -->
  <div class="flex items-start justify-between w-full">
    <span class="text-[10px] font-black tracking-wider text-muted-foreground uppercase">
      {game.league}
    </span>
    
    <div class="flex flex-col items-end text-right space-y-0.5">
      {#if isLive}
        <Badge class="bg-red-600 hover:bg-red-600 animate-pulse text-[8px] font-black px-1.5 py-0.5 tracking-wider rounded text-white">
          LIVE
        </Badge>
      {:else}
        <div class="flex items-center gap-1 text-[11px] font-bold text-foreground">
          <Clock class="h-3 w-3 text-muted-foreground" />
          <span>{formatGameTime(game.startTime)}</span>
        </div>
      {/if}
    </div>
  </div>

  <!-- Middle: Team Names Stacked Vertically -->
  <div class="space-y-1 my-2">
    <div class="text-sm font-bold text-foreground">{game.homeTeam}</div>
    <div class="text-sm font-bold text-foreground">{game.awayTeam}</div>
  </div>

  <!-- Bottom: Odds Grid and Payout Links separated vertically to prevent horizontal squeezes -->
  <div class="border-t border-border pt-4 mt-auto space-y-2.5">
    <!-- 1. Row of 3 Odds Buttons (Full-Width 3-Column Grid) -->
    <div class="grid grid-cols-3 gap-2">
      {#if sortedMarkets.length > 0}
        {#each sortedMarkets as market}
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
        <div class="col-span-3 text-center text-xs font-semibold text-muted-foreground py-3">
          Markets temporarily suspended
        </div>
      {/if}
    </div>

    <!-- 2. Clean, right-aligned link on its own line below the buttons -->
    <div class="flex justify-end px-0.5">
      <a 
        href="/sportsbook/match/{game.id}" 
        class="text-[10px] font-bold text-muted-foreground hover:text-primary transition tracking-wide uppercase"
      >
        +{extraMarketsCount > 0 ? extraMarketsCount + 12 : 28} markets &rarr;
      </a>
    </div>
  </div>
</div>