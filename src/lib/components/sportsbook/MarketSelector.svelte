<script lang="ts">
  import { Button } from '$lib/components/ui/button';

  // Defines a bindable property to communicate the selected market type back to the parent layout
  let { selectedMarket = $bindable('h2h') } = $props<{ selectedMarket: string }>();

  const markets = [
    { key: 'h2h', name: 'Moneyline (H2H)' },
    { key: 'spreads', name: 'Spreads' },
    { key: 'totals', name: 'Totals (Over/Under)' }
  ];
</script>

<div class="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/40 p-1.5 w-full sm:w-auto">
  {#each markets as market}
    <Button
      variant="ghost"
      onclick={() => selectedMarket = market.key}
      class="h-9 flex-1 sm:flex-initial rounded-lg px-4 text-xs font-bold transition-all duration-150
        {selectedMarket === market.key 
          ? 'bg-neutral-800 text-amber-500 shadow-sm' 
          : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-white'}"
    >
      {market.name}
    </Button>
  {/each}
</div>