<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { ChevronLeft, ShieldAlert, CheckCircle2, Calendar, Trophy, Check } from 'lucide-svelte';
  import type { GameWithMarkets } from '$lib/types/game';

  // Svelte 5 page properties capturing server loaded fixtures data and action results
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

<div class="space-y-6 max-w-4xl mx-auto pb-12">
  <!-- Header Navigation -->
  <div class="flex items-center justify-between border-b border-border pb-4">
    <a href="/admin/games/{data.game.id}" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">
      <ChevronLeft class="h-4 w-4" />
      <span>Back to Odds Editor</span>
    </a>

    <div class="flex items-center gap-3">
      <span class="text-[10px] font-bold text-muted-foreground">Ref: {data.game.id}</span>
      <Badge class="border text-[9px] font-bold px-2.5 py-0.5 rounded
        {data.game.status === 'COMPLETED' ? 'bg-muted/80 text-muted-foreground border-border' : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80'}"
      >
        {data.game.status}
      </Badge>
    </div>
  </div>

  <!-- Scoreboard -->
  <div class="rounded-2xl border border-border bg-card p-6 text-center space-y-4">
    <span class="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{data.game.league}</span>
    <div class="flex items-center justify-between max-w-xs mx-auto">
      <span class="text-sm sm:text-base font-black text-foreground">{data.game.homeTeam}</span>
      {#if data.game.homeScore !== null}
          <!-- Displays running home score or final completed score -->
          <span class="text-sm sm:text-base font-black text-primary px-2.5 py-1 bg-muted/60 border border-border rounded-lg shadow-sm">{data.game.homeScore ?? 0}</span>
        {/if}
      <span class="text-xs font-black tracking-widest text-primary uppercase px-3 py-1 bg-background border border-border rounded-full shrink-0 shadow-sm">VS</span>
      <span class="text-sm sm:text-base font-black text-foreground">{data.game.awayTeam}</span>
           {#if data.game.awayScore !== null}
          <!-- Displays running away score or final completed score -->
          <span class="text-sm sm:text-base font-black text-primary px-2.5 py-1 bg-muted/60 border border-border rounded-lg shadow-sm">{data.game.awayScore ?? 0}</span>
        {/if}
    </div>
    <div class="text-[10px] font-bold text-muted-foreground flex items-center justify-center gap-1">
      <Calendar class="h-3.5 w-3.5" />
      <span>Kickoff {formatGameTime(data.game.startTime)}</span>
    </div>
  </div>

  <!-- Response Alerts -->
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

  <!-- Automated Score-Based Settlement Form -->
  <div class="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">
    <div class="space-y-1.5">
      <h2 class="text-sm font-black text-foreground flex items-center gap-2 uppercase tracking-wide">
        <Trophy class="h-4 w-4 text-primary" />
        Automated Score-Based Settlement
      </h2>
      <p class="text-xs text-muted-foreground font-semibold leading-relaxed">Enter match scorelines. Updating with completed status automatically evaluates outcomes, settles all wagers (Single & Combo), and credits player wallets instantly.</p>
    </div>

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
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4 animate-fade-in"
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
          class="bg-background border-border focus:border-primary text-xs h-10 font-bold text-foreground" 
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
          class="bg-background border-border focus:border-primary text-xs h-10 font-bold text-foreground" 
        />
      </div>

      <!-- Operational Status Selector -->
      <div class="sm:col-span-2 space-y-1.5">
        <label for="targetStatus" class="text-xs font-bold text-neutral-400">Match Status Update</label>
        <select id="targetStatus" name="targetStatus" required class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-neutral-400 focus:border-primary focus:outline-none">
          <option value="LIVE">LIVE (Halftime / In-Play Score Update — Keeps Wagers Pending)</option>
          <option value="COMPLETED">COMPLETED (Full-Time Result — Automatically Settles and Pays Out All Wagers)</option>
        </select>
      </div>

      <div class="sm:col-span-2 pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-lg text-xs cursor-pointer"
        >
          {isSubmitting ? 'Processing request...' : 'Submit Score & Status Update'}
        </Button>
      </div>
    </form>
  </div>

  <!-- Complete Market Settlement List (Renders every active market group simultaneously with local overrides) -->
  <div class="space-y-4">
    <div class="text-xs font-black tracking-widest text-muted-foreground uppercase">Manual Outlines Overrides</div>

    {#if activeMarketGroups.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg bg-muted/10">
        No active market lines exist for this match.
      </div>
    {:else}
      {#each activeMarketGroups as group}
        <div class="rounded-2xl border border-border bg-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition duration-150">
          
          <!-- Left Column: Selection outputs -->
          <div class="flex-1 space-y-3">
            <div class="space-y-1">
              <h3 class="text-xs font-black text-foreground uppercase tracking-wider">{group.name}</h3>
              <p class="text-[10px] text-muted-foreground font-semibold uppercase">Pending selection options</p>
            </div>

            <!-- Outcomes row -->
            <div class="flex flex-wrap gap-2">
              {#each group.items as option}
                <div class="rounded-lg border border-border bg-background px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
                  <span class="opacity-60">{option.selection}:</span>
                  <span class="text-primary font-black">{option.odds.toFixed(2)}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Right Column: Manual selector override -->
          <div class="w-full md:w-64 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0 md:pl-6 shrink-0">
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
                <label for="winningSelection-{group.key}" class="text-[10px] font-black tracking-wider text-muted-foreground uppercase">Select Winner</label>
                <select id="winningSelection-{group.key}" name="winningSelection" required class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-none">
                  {#each group.items as option}
                    <option value={option.selection}>{option.selection}</option>
                  {/each}
                </select>
              </div>

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