<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import OddsButton from './OddsButton.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import { Clock } from 'lucide-svelte';

  let { game, activeMarket = 'h2h' } = $props<{ game: GameWithMarkets; activeMarket?: string }>();

  const filteredMarkets = $derived(
    game.markets.filter((m:any) => m.marketName === activeMarket && m.active)
  );

  const isLive = $derived(game.status === 'LIVE');

  // Calculates and displays the remaining countdown time
  const remainingTime = $derived.by(() => {
    const diffMs = new Date(game.startTime).getTime() - new Date().getTime();
    if (diffMs <= 0) return 'Live';
    const diffMins = Math.floor(diffMs / 60000);
    const days = Math.floor(diffMins / 1440);
    const hours = Math.floor((diffMins % 1440) / 60);
    return `${days}d ${hours}h`;
  });

  // Formats kickoff date
  const formattedDate = $derived.by(() => {
    return new Date(game.startTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  });

  const extraMarketsCount = $derived(
    new Set(game.markets.filter((m:any) => m.marketName !== 'h2h').map((m:any) => m.marketName)).size
  );
</script>

<!-- bg-card and border-border automatically adapt to theme toggles -->
<div class="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-neutral-400 dark:hover:border-neutral-700 flex flex-col justify-between h-56 min-w-[280px]">
  <!-- Top Section -->
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
          <span>{remainingTime}</span>
        </div>
        <span class="text-[9px] font-bold text-muted-foreground">{formattedDate}</span>
      {/if}
    </div>
  </div>

  <!-- Middle Section -->
  <div class="space-y-1 my-2">
    <div class="text-sm font-bold text-foreground">{game.homeTeam}</div>
    <div class="text-sm font-bold text-foreground">{game.awayTeam}</div>
  </div>

  <!-- Bottom Section -->
  <div class="flex items-end justify-between w-full border-t border-border pt-3">
    <div class="flex items-center gap-1.5">
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
        <span class="text-xs font-semibold text-muted-foreground">Markets suspended</span>
      {/if}
    </div>

    <a 
      href="/sportsbook/match/{game.id}" 
      class="text-[11px] font-bold text-foreground hover:text-primary transition shrink-0"
    >
      +{extraMarketsCount > 0 ? extraMarketsCount + 12 : 28} markets
    </a>
  </div>
</div>