<script lang="ts">
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

  // Corrected: Verifies if this specific outcome is selected within its market category
  const isSelected = $derived(
    betslip.selections.some(
      (s) => s.gameId === gameId && s.marketName === marketName && s.selection === selection
    )
  );

  // Smart label translator: Keeps 1, X, 2 for H2H, displays explicit text for all other markets
  const shortLabel = $derived.by(() => {
    if (marketName === 'h2h') {
      if (selection === homeTeam) return '1';
      if (selection === awayTeam) return '2';
      if (selection === 'Draw' || selection.toUpperCase().includes('DRAW')) return 'X';
    }
    return selection;
  });

  // Appends or removes the selection from the global betslip state
  function handleOddsClick() {
    if (isSelected) {
      // Corrected: Pass both gameId and marketName to release the option
      betslip.removeSelection(gameId, marketName);
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

<button
  onclick={handleOddsClick}
  class="flex flex-col h-14 w-full sm:w-20 items-center justify-center p-1.5 transition-all duration-150 rounded-lg border border-border bg-neutral-100/40 dark:bg-neutral-900/40 text-foreground hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 cursor-pointer outline-none focus:ring-2 focus:ring-primary/20
    {isSelected ? 'bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-black shadow-[0_0_12px_rgba(255,209,26,0.25)]' : ''}"
>
  <span class="text-[9px] font-bold opacity-60 uppercase tracking-wider text-center">{shortLabel}</span>
  <span class="text-sm font-black tracking-tight mt-0.5">{odds.toFixed(2)}</span>
</button>