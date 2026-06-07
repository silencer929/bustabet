<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { betslip } from '$lib/stores/betslip.svelte';

  // Define Svelte 5 properties
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

  // Derived state to check if this selection is highlighted in the active betslip
  const isSelected = $derived(
    betslip.selections.some(
      (s) => s.gameId === gameId && s.marketId === marketId && s.selection === selection
    )
  );

  // Maps full team/outcome names to standard short indicators (1, X, 2)
  const shortLabel = $derived.by(() => {
    if (selection === homeTeam) return '1';
    if (selection === awayTeam) return '2';
    return 'X';
  });

  // Appends or removes the selection from the global betslip state
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

<Button
  variant="outline"
  onclick={handleOddsClick}
  class="flex flex-col h-14 w-16 items-center justify-center p-1.5 transition-all duration-150 rounded-lg border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800
    {isSelected ? 'bg-amber-500 border-amber-500 dark:bg-amber-500 dark:border-amber-500 text-neutral-950 dark:text-neutral-950 hover:bg-amber-400 dark:hover:bg-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]' : ''}"
>
  <span class="text-[9px] font-bold opacity-60 uppercase">{shortLabel}</span>
  <span class="text-sm font-black tracking-tight mt-0.5">{odds.toFixed(2)}</span>
</Button>