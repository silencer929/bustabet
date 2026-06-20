<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import OddsButton from '$lib/components/sportsbook/OddsButton.svelte';
  import { Button } from '$lib/components/ui/button';
  import { ChevronLeft, ChevronDown, ChevronUp, Calendar } from 'lucide-svelte';

  let { data } = $props<{ data: { game: GameWithMarkets } }>();

  // Svelte 5 state variables to control which accordion drawers are open
  let openDrawers = $state<Record<string, boolean>>({
    'double_chance': true,
    'draw_no_bet': false,
    'totals': false,
    'btts': false,
    'correct_score': false
  });

  // Toggles the visibility state of a specific collapsible market accordion
  function toggleDrawer(marketKey: string) {
    openDrawers[marketKey] = !openDrawers[marketKey];
  }

  // Derived filters matching the standard API and synthesized database keys
  const h2hMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'h2h'));
  const doubleChanceMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'double_chance'));
  const drawNoBetMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'draw_no_bet'));
  const totalsMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'totals'));
  const bttsMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'btts'));
  const correctScoreMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'correct_score'));
</script>

<div class="space-y-6">
  <!-- Back Button Navigation -->
  <a href="/sportsbook" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to matches</span>
  </a>

  <!-- Scoreboard Details Display (Dynamic Light/Dark Mode) -->
  <div class="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 text-center space-y-6">
    <div class="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{data.game.league}</div>
    
    <div class="flex items-center justify-center gap-6 md:gap-12">
      <div class="text-base md:text-xl font-black text-foreground">{data.game.homeTeam}</div>
      <div class="text-xs font-black tracking-widest text-primary uppercase px-3 py-1 bg-background border border-border rounded-full">VS</div>
      <div class="text-base md:text-xl font-black text-foreground">{data.game.awayTeam}</div>
    </div>

    <!-- Match Result (H2H) -->
    {#if h2hMarkets.length > 0}
      <div class="max-w-md mx-auto space-y-2.5">
        <div class="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Match Result</div>
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
    <div class="text-xs font-black tracking-widest text-muted-foreground uppercase">More Markets</div>

    <!-- Accordion: Double Chance -->
    <div class="rounded-xl border border-border bg-card/40 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('double_chance')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-foreground bg-card/60 hover:bg-card transition cursor-pointer"
      >
        <span>Double Chance</span>
        {#if openDrawers.double_chance}<ChevronUp class="h-4 w-4" />{:else}<ChevronDown class="h-4 w-4" />{/if}
      </button>

      {#if openDrawers.double_chance}
        <div class="p-4 border-t border-border">
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
            <div class="text-center text-xs text-muted-foreground py-2">Double chance selections are temporarily suspended</div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Accordion: Draw No Bet -->
    <div class="rounded-xl border border-border bg-card/40 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('draw_no_bet')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-foreground bg-card/60 hover:bg-card transition cursor-pointer"
      >
        <span>Draw No Bet</span>
        {#if openDrawers.draw_no_bet}<ChevronUp class="h-4 w-4" />{:else}<ChevronDown class="h-4 w-4" />{/if}
      </button>

      {#if openDrawers.draw_no_bet}
        <div class="p-4 border-t border-border">
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
            <div class="text-center text-xs text-muted-foreground py-2">Draw no bet selections are temporarily suspended</div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Accordion: Over / Under Goals (Standard API totals) -->
    <div class="rounded-xl border border-border bg-card/40 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('totals')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-foreground bg-card/60 hover:bg-card transition cursor-pointer"
      >
        <span>Over / Under Goals</span>
        {#if openDrawers.totals}<ChevronUp class="h-4 w-4" />{:else}<ChevronDown class="h-4 w-4" />{/if}
      </button>

      {#if openDrawers.totals}
        <div class="p-4 border-t border-border">
          {#if totalsMarkets.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {#each totalsMarkets as market}
                <OddsButton
                  gameId={data.game.id}
                  marketId={market.id}
                  homeTeam={data.game.homeTeam}
                  awayTeam={data.game.awayTeam}
                  marketName={market.marketName}
                  selection={`${market.selection} ${market.point || ''}`}
                  odds={Number(market.odds)}
                />
              {/each}
            </div>
          {:else}
            <div class="text-center text-xs text-muted-foreground py-2">Over/Under market lines are temporarily suspended</div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Accordion: Both Teams to Score (Synthesized) -->
    <div class="rounded-xl border border-border bg-card/40 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('btts')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-foreground bg-card/60 hover:bg-card transition cursor-pointer"
      >
        <span>Both Teams to Score</span>
        {#if openDrawers.btts}<ChevronUp class="h-4 w-4" />{:else}<ChevronDown class="h-4 w-4" />{/if}
      </button>

      {#if openDrawers.btts}
        <div class="p-4 border-t border-border">
          {#if bttsMarkets.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each bttsMarkets as market}
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
            <div class="text-center text-xs text-muted-foreground py-2">BTTS lines are temporarily suspended</div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Accordion: Correct Scores (Synthesized - Compact Grid matching 0:12 in the video) -->
    <div class="rounded-xl border border-border bg-card/40 overflow-hidden">
      <button 
        onclick={() => toggleDrawer('correct_score')}
        class="flex w-full items-center justify-between p-4 text-xs font-bold text-foreground bg-card/60 hover:bg-card transition cursor-pointer"
      >
        <span>Correct Score</span>
        {#if openDrawers.correct_score}<ChevronUp class="h-4 w-4" />{:else}<ChevronDown class="h-4 w-4" />{/if}
      </button>

      {#if openDrawers.correct_score}
        <div class="p-4 border-t border-border">
          {#if correctScoreMarkets.length > 0}
            <!-- 2-cols on mobile, 4-cols on tablet, 6-cols on desktop for space-efficiency -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {#each correctScoreMarkets as market}
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
            <div class="text-center text-xs text-muted-foreground py-2">Correct score predictions are temporarily suspended</div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>