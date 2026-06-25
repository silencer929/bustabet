<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Input } from '$lib/components/ui/input';
  import { ChevronLeft, ShieldAlert, CheckCircle2, Calendar, Trophy, Check } from 'lucide-svelte';
  import type { GameWithMarkets } from '$lib/types/game';

  // Svelte 5 page properties capturing loaded fixtures data and action results
  let { data, form } = $props<{
    data: { game: GameWithMarkets };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

  let isSubmitting = $state(false);

  // Group market items dynamically based on their category keys
  const h2hMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'h2h'));
  const doubleChanceMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'double_chance'));
  const drawNoBetMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'draw_no_bet'));
  const totalsMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'totals' || m.marketName === 'over_under'));
  const bttsMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'btts'));
  const csMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'correct_score'));
  const wtnMarkets = $derived(data.game.markets.filter((m: { marketName: string }) => m.marketName === 'win_to_nil'));

  // Compiles and returns only the market groups that actually contain active database lines
  const activeMarketGroups = $derived([
    { key: 'h2h', name: 'Match Result (h2h)', items: h2hMarkets },
    { key: 'double_chance', name: 'Double Chance', items: doubleChanceMarkets },
    { key: 'draw_no_bet', name: 'Draw No Bet', items: drawNoBetMarkets },
    { key: 'totals', name: 'Over / Under Goals', items: totalsMarkets },
    { key: 'btts', name: 'Both Teams to Score (BTTS)', items: bttsMarkets },
    { key: 'correct_score', name: 'Correct Scores', items: csMarkets },
    { key: 'win_to_nil', name: 'Win to Nil', items: wtnMarkets }
  ].filter(group => group.items.length > 0));
</script>

<div class="space-y-6 max-w-4xl mx-auto">
  <!-- Back Button (Returns back to the Odds Editor parent page) -->
  <div class="flex items-center justify-between border-b border-neutral-800/80 pb-4">
    <a href="/admin/games/{data.game.id}" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white transition">
      <ChevronLeft class="h-4 w-4" />
      <span>Back to Odds Editor</span>
    </a>

    <div class="flex items-center gap-3">
      <span class="text-[10px] font-bold text-neutral-500">Ref: {data.game.id}</span>
      <Badge class="border text-[9px] font-bold px-2.5 py-0.5 rounded
        {data.game.status === 'CLOSED' ? 'bg-neutral-800 text-neutral-400 border-neutral-700' : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80'}"
      >
        {data.game.status}
      </Badge>
    </div>
  </div>

  <!-- Scoreboard -->
  <div class="rounded-2xl  border border-border bg-card/40 p-6 text-center space-y-4">
    <span class="text-[10px] font-black tracking-widest text-neutral-500 uppercase">{data.game.league}</span>
    <div class="flex items-center justify-between max-w-xs mx-auto">
      <span class="text-sm font-black text-neutral-200">{data.game.homeTeam}</span>
      <span class="text-xs font-black tracking-widest text-red-500 uppercase px-3 py-1 bg-background border-border rounded-full">VS</span>
      <span class="text-sm font-black text-neutral-200">{data.game.awayTeam}</span>
    </div>
    <div class="text-[10px] font-bold text-neutral-500 flex items-center justify-center gap-1">
      <Calendar class="h-3.5 w-3.5" />
      <span>Kickoff {formatGameTime(data.game.startTime)}</span>
    </div>
  </div>
  <!-- Insert this card directly below your scoreboard panel inside +page.svelte -->
  <div class="rounded-2xl border border-border bg-card/60 p-6 space-y-6">
    <div class="space-y-1.5">
      <h2 class="text-base font-black text-primary flex items-center gap-2">
        <Trophy class="h-5 w-5 text-amber-500" />
        Automated Score-Based Settlement
      </h2>
      <p class="text-xs text-muted-foreground font-semibold">Enter final scorelines. SvelteKit will mathematically evaluate and settle ALL markets (H2H, DNB, BTTS, Over/Under, Correct Score) simultaneously and process payouts instantly.</p>
    </div>

    <!-- SvelteKit Form submitting to the auto-calculator action -->
    <form 
      method="POST" 
      action="?/settleWithScores"
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          isSubmitting = false;
          update();
        };
      }}
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-800 pt-4"
    >
      <!-- Home Score -->
      <div class="space-y-1.5">
        <label for="homeScore" class="text-xs font-bold text-neutral-400">{data.game.homeTeam} Score</label>
        <Input 
          id="homeScore" 
          name="homeScore" 
          type="number" 
          min="0" 
          required 
          disabled={isSubmitting}
          placeholder="2" 
          class="bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-neutral-200" 
        />
      </div>

      <!-- Away Score -->
      <div class="space-y-1.5">
        <label for="awayScore" class="text-xs font-bold text-neutral-400">{data.game.awayTeam} Score</label>
        <Input 
          id="awayScore" 
          name="awayScore" 
          type="number" 
          min="0" 
          required 
          disabled={isSubmitting}
          placeholder="1" 
          class="bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground" 
        />
      </div>

      <div class="sm:col-span-2 pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg text-xs cursor-pointer"
        >
          {isSubmitting ? 'Evaluating & Paying Winners...' : 'Register Score & Settle All Markets'}
        </Button>
      </div>
    </form>
  </div>

  <!-- Response Alerts -->
  {#if form?.error}
    <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold leading-normal">
      <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
      <span>{form.error}</span>
    </div>
  {/if}
  {#if form?.success}
    <div class="flex items-start gap-2 rounded-lg bg-background border border-border-800/80 px-4 py-3 text-xs text-green-400 font-bold leading-normal">
      <CheckCircle2 class="h-4 w-4 shrink-0 mt-0.5" />
      <span>{form.message}</span>
    </div>
  {/if}

  <!-- Complete Market Settlement List (Renders every active market group simultaneously) -->
  <div class="space-y-4">
    <div class="text-xs font-black tracking-widest text-neutral-500 uppercase">Available Markets For Settlement</div>

    {#if activeMarketGroups.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-neutral-800 rounded-lg">
        No active market lines exist for this match.
      </div>
    {:else}
      {#each activeMarketGroups as group}
        <div class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition duration-150">
          
          <!-- Left Column: Market details and dynamic outcomes with odds -->
          <div class="flex-1 space-y-3">
            <div class="space-y-1">
              <h3 class="text-xs font-black text-neutral-100 uppercase tracking-wider">{group.name}</h3>
              <p class="text-[10px] text-neutral-500 font-semibold uppercase">Pending selection options</p>
            </div>

            <!-- Displays the registered outcome options inline -->
            <div class="flex flex-wrap gap-2">
              {#each group.items as option}
                <div class="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-300">
                  <span class="opacity-60">{option.selection}:</span>
                  <span class="text-amber-500 font-black">{option.odds.toFixed(2)}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Right Column: Dedicated, focused, inline manual settlement form -->
          <div class="w-full md:w-64 border-t md:border-t-0 md:border-l border-neutral-800/80 pt-4 md:pt-0 md:pl-6 shrink-0">
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
              class="space-y-3"
            >
              <input type="hidden" name="marketName" value={group.key} />
              
              <div class="space-y-1">
                <label for="winningSelection-{group.key}" class="text-[10px] font-black tracking-wider text-neutral-500 uppercase">Select Winner</label>
                <select id="winningSelection-{group.key}" name="winningSelection" required class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-emerald-500 focus:outline-none">
                  {#each group.items as option}
                    <option value={option.selection}>{option.selection}</option>
                  {/each}
                </select>
              </div>

              <!-- Dedicated "Settle Market" Trigger -->
              <Button 
                type="submit" 
                disabled={isSubmitting}
                class="w-full h-9 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-xs gap-1.5 cursor-pointer disabled:bg-neutral-800"
              >
                <Check class="h-4 w-4" />
                Settle {group.name.split(' ')[0]}
              </Button>
            </form>
          </div>

        </div>
      {/each}
    {/if}
  </div>
</div>