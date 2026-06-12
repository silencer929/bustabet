<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { betslip } from '$lib/stores/betslip.svelte';

  let {
    gameId,
    marketId,
    homeTeam,
    awayTeam,
    marketName,
    selection,
    odds
  } = $props<{
    gameId: string;
    marketId: string;
    homeTeam: string;
    awayTeam: string;
    marketName: string;
    selection: string;
    odds: number;
  }>();

  const isSelected = $derived(
    betslip.selections.some(
      (s) => s.gameId === gameId && s.marketId === marketId && s.selection === selection
    )
  );

  const shortLabel = $derived.by(() => {
    if (selection === homeTeam) return '1';
    if (selection === awayTeam) return '2';
    return 'X';
  });

  function handleOddsClick() {
    if (isSelected) {
      betslip.removeSelection(gameId);
    } else {
      betslip.addSelection({
        gameId,
        marketId,
        homeTeam,
        awayTeam,
        marketName,
        selection,
        odds
      });
    }
  }
</script>

<!-- Configured using native CSS variables for instant theme compatibility -->
<Button
  variant="outline"
  onclick={handleOddsClick}
  class="flex flex-col h-14 w-16 items-center justify-center p-1.5 transition-all duration-150 rounded-lg border-border bg-muted/40 text-foreground hover:bg-muted/80
    {isSelected ? 'bg-primary border-primary text-primary-foreground hover:bg-amber-400 dark:hover:bg-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]' : ''}"
>
  <span class="text-[9px] font-bold opacity-60 uppercase">{shortLabel}</span>
  <span class="text-sm font-black tracking-tight mt-0.5">{odds.toFixed(2)}</span>
</Button>