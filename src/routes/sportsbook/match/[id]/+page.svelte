<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import OddsButton from '$lib/components/sportsbook/OddsButton.svelte';
  import { Button } from '$lib/components/ui/button';
  import { ChevronLeft, ChevronDown, ChevronUp, Trophy } from 'lucide-svelte';

  let { data } = $props<{ data: { game: GameWithMarkets } }>();

  // Svelte 5 state variables to control which accordion drawers are open
  let openDrawers = $state<Record<string, boolean>>({
    'double_chance': true,
    'draw_no_bet': false,
    'over_under': false
  });

  // Toggles the visibility state of a specific collapsible market accordion
  function toggleDrawer(marketKey: string) {
    openDrawers[marketKey] = !openDrawers[marketKey];
  }

  // Resolves markets dynamically by their standard grouping keys
  const h2hMarkets = $derived(data.game.markets.filter((m:any) => m.marketName === 'h2h'));
  const doubleChanceMarkets = $derived(data.game.markets.filter((m:any) => m.marketName === 'double_chance'));
  const drawNoBetMarkets = $derived(data.game.markets.filter((m:any) => m.marketName === 'draw_no_bet'));
  const overUnderMarkets = $derived(data.game.markets.filter((m:any) => m.marketName === 'over_under'));
</script>

<div class="space-y-6">
  <!-- Back Button Navigation -->
  <a href="/sportsbook" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to matches</span>
  </a>

  <!-- Hero Scoreboard Details Display -->
  <div class="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-8 text-center space-y-6">
    <div class="text-[10px] font-black tracking-widest text-neutral-500 uppercase">{data.game.league}</div>
    
    <div class="flex items-center justify-center gap-6 md:gap-12">
      <div class="text-base md:text-xl font-black text-neutral-100">{data.game.homeTeam}</div>
      <div class="text-xs font-black tracking-widest text-amber-500 uppercase px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">VS</div>
      <div class="text-base md:text-xl font-black text-neutral-100">{data.game.awayTeam}</div>
    </div>

    <!-- Match Result Primary Odds Panel -->
    {#if h2hMarkets.length > 0}
      <div class="max-w-md mx-auto space-y-2.5">
        <div class="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Match Result</div>
        <div class="grid grid-cols-3 gap-2">
          {#each h2hMarkets as market}
            <OddsButton
              gameId={data.game.id}
              marketId={market.id}
              homeTeam={data.game.homeTeam}
              awayTeam={data.game.awayTeam}
              marketName={market.marketName}
              selection={market.selection}
              odds={Number(market.odds)}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Advanced Collapsible Markets Accordions Panel -->
  <div class="space-y-3">
    <div class="text-xs font-black tracking-widest text-neutral-500 uppercase">More Markets</div>

    <!-- Accordion: Double Chance -->
    <div class="rounded-xl border border-neutral-800 bg-neutral-900/20 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('double_chance')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-neutral-200 bg-neutral-900/60 hover:bg-neutral-900 transition"
      >
        <span>Double Chance</span>
        {#if openDrawers.double_chance}
          <ChevronUp class="h-4 w-4" />
        {:else}
          <ChevronDown class="h-4 w-4" />
        {/if}
      </button>

      {#if openDrawers.double_chance}
        <div class="p-4 border-t border-neutral-800/60">
          {#if doubleChanceMarkets.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {#each doubleChanceMarkets as market}
                <OddsButton
                  gameId={data.game.id}
                  marketId={market.id}
                  homeTeam={data.game.homeTeam}
                  awayTeam={data.game.awayTeam}
                  marketName={market.marketName}
                  selection={market.selection}
                  odds={Number(market.odds)}
                />
              {/each}
            </div>
          {:else}
            <div class="text-center text-xs text-neutral-600">Double chance selections are temporarily unavailable</div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Accordion: Draw No Bet -->
    <div class="rounded-xl border border-neutral-800 bg-neutral-900/20 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('draw_no_bet')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-neutral-200 bg-neutral-900/60 hover:bg-neutral-900 transition"
      >
        <span>Draw No Bet</span>
        {#if openDrawers.draw_no_bet}
          <ChevronUp class="h-4 w-4" />
        {:else}
          <ChevronDown class="h-4 w-4" />
        {/if}
      </button>

      {#if openDrawers.draw_no_bet}
        <div class="p-4 border-t border-neutral-800/60">
          {#if drawNoBetMarkets.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each drawNoBetMarkets as market}
                <OddsButton
                  gameId={data.game.id}
                  marketId={market.id}
                  homeTeam={data.game.homeTeam}
                  awayTeam={data.game.awayTeam}
                  marketName={market.marketName}
                  selection={market.selection}
                  odds={Number(market.odds)}
                />
              {/each}
            </div>
          {:else}
            <div class="text-center text-xs text-neutral-600">Draw no bet selections are temporarily unavailable</div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Accordion: Over / Under Goals -->
    <div class="rounded-xl border border-neutral-800 bg-neutral-900/20 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('over_under')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-neutral-200 bg-neutral-900/60 hover:bg-neutral-900 transition"
      >
        <span>Over / Under Goals</span>
        {#if openDrawers.over_under}
          <ChevronUp class="h-4 w-4" />
        {:else}
          <ChevronDown class="h-4 w-4" />
        {/if}
      </button>

      {#if openDrawers.over_under}
        <div class="p-4 border-t border-neutral-800/60">
          {#if overUnderMarkets.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {#each overUnderMarkets as market}
                <OddsButton
                  gameId={data.game.id}
                  marketId={market.id}
                  homeTeam={data.game.homeTeam}
                  awayTeam={data.game.awayTeam}
                  marketName={market.marketName}
                  selection={market.selection}
                  odds={Number(market.odds)}
                />
              {/each}
            </div>
          {:else}
            <div class="text-center text-xs text-neutral-600">Over/Under market lines are temporarily unavailable</div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>