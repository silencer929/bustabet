<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { ChevronLeft, ShieldAlert, CheckCircle2, Calendar, Trophy } from 'lucide-svelte';
  import type { GameWithMarkets } from '$lib/types/game';

  let { data, form } = $props<{
    data: { game: GameWithMarkets };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

  let isSubmitting = $state(false);
  let settleMarketCategory = $state('h2h');

  // Derived state to filter and display database selections associated with chosen category
  const activeSettleSelections = $derived(
    data.game.markets.filter((m: { marketName: string }) => m.marketName === settleMarketCategory)
  );
</script>

<div class="space-y-6 max-w-xl mx-auto">
  <!-- Back Button (Returns back to the Odds Editor parent page) -->
  <a href="/admin/games/{data.game.id}" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Odds Editor</span>
  </a>

  <!-- Scoreboard -->
  <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-center space-y-4">
    <span class="text-[10px] font-black tracking-widest text-neutral-500 uppercase">{data.game.league}</span>
    <div class="flex items-center justify-between max-w-xs mx-auto">
      <span class="text-sm font-black text-neutral-200">{data.game.homeTeam}</span>
      <span class="text-xs font-black tracking-widest text-red-500 uppercase px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full">VS</span>
      <span class="text-sm font-black text-neutral-200">{data.game.awayTeam}</span>
    </div>
    <div class="text-[10px] font-bold text-neutral-500 flex items-center justify-center gap-1">
      <Calendar class="h-3.5 w-3.5" />
      <span>Kickoff {formatGameTime(data.game.startTime)}</span>
    </div>
  </div>

  <!-- Manual Settlement Form Card -->
  <div class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-6">
    <div class="space-y-1.5">
      <h2 class="text-base font-black text-neutral-100 flex items-center gap-2">
        <Trophy class="h-5 w-5 text-emerald-500" />
        Settle Match & Pay Winners
      </h2>
      <p class="text-xs text-muted-foreground font-semibold">Select the winning option to close wagers, suspend markets, and credit user wallets instantly.</p>
    </div>

    <form 
      method="POST" 
      action="?/settleMarketManually"
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          isSubmitting = false;
          update();
        };
      }}
      class="space-y-4 border-t border-neutral-800 pt-4"
    >
      {#if form?.error}
        <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold leading-normal">
          <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
          <span>{form.error}</span>
        </div>
      {/if}
      {#if form?.success}
        <div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold leading-normal">
          <CheckCircle2 class="h-4 w-4 shrink-0 mt-0.5" />
          <span>{form.message}</span>
        </div>
      {/if}

      <!-- Market Category dropdown -->
      <div class="space-y-1.5">
        <label for="marketName" class="text-xs font-bold text-neutral-400">Market to Settle</label>
        <select id="marketName" bind:value={settleMarketCategory} name="marketName" class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-emerald-500 focus:outline-none">
          <option value="h2h">Match Result (h2h)</option>
          <option value="double_chance">Double Chance</option>
          <option value="draw_no_bet">Draw No Bet</option>
          <option value="totals">Over / Under Goals</option>
          <option value="btts">Both Teams to Score</option>
        </select>
      </div>

      <!-- Winning Outcome dropdown (loaded dynamically from actual DB records) -->
      <div class="space-y-1.5">
        <label for="winningSelection" class="text-xs font-bold text-neutral-400">Winning Selection Outcome</label>
        {#if activeSettleSelections.length > 0}
          <select id="winningSelection" name="winningSelection" required class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-emerald-500 focus:outline-none">
            {#each activeSettleSelections as market}
              <option value={market.selection}>{market.selection} (Odds: {market.odds.toFixed(2)})</option>
            {/each}
          </select>
        {:else}
          <div class="text-center text-xs text-neutral-600 py-3 border border-dashed border-neutral-800 rounded-lg bg-neutral-950/20">
            No active lines found under this market category.
          </div>
        {/if}
      </div>

      <!-- Submit Payouts -->
      <Button 
        type="submit" 
        disabled={isSubmitting || activeSettleSelections.length === 0}
        class="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-xs cursor-pointer disabled:bg-neutral-800"
      >
        {isSubmitting ? 'Processing Payouts...' : 'Settle Market & Disburse Payouts'}
      </Button>
    </form>
  </div>
</div>