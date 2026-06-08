<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { ChevronLeft, Plus, ShieldAlert, Check, Power, PowerOff, Trash2, Calendar } from 'lucide-svelte';
  import type { GameWithMarkets } from '$lib/types/game';

  let { data, form } = $props<{
    data: { game: GameWithMarkets };
    form: { error?: string } | null;
  }>();

  let isSubmitting = $state(false);

  // Group market items dynamically based on their category keys
  const h2hMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'h2h'));
  const doubleChanceMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'double_chance'));
  const drawNoBetMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'draw_no_bet'));
  const overUnderMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'over_under'));

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80';
      case 'PENDING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      default: return 'bg-red-950/40 text-red-400 border-red-800/80';
    }
  };
</script>

<div class="space-y-6">
  <!-- Back navigation button -->
  <a href="/admin/games" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Fixtures</span>
  </a>

  <!-- Scoreboard Header Display -->
  <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-center space-y-4">
    <span class="text-[10px] font-black tracking-widest text-neutral-500 uppercase">{data.game.league}</span>
    <div class="flex items-center justify-between max-w-xl mx-auto">
      <span class="text-sm font-black text-neutral-200">{data.game.homeTeam}</span>
      <span class="text-xs font-black tracking-widest text-red-500 uppercase px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full">VS</span>
      <span class="text-sm font-black text-neutral-200">{data.game.awayTeam}</span>
    </div>
    <div class="text-[10px] font-bold text-neutral-500 flex items-center justify-center gap-1">
      <Calendar class="h-3.5 w-3.5" />
      <span>Kickoff {formatGameTime(data.game.startTime)}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Form: Add Custom Market Option -->
    <div class="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 h-fit">
      <div class="space-y-1">
        <h3 class="text-xs font-black text-neutral-100 uppercase tracking-widest">Add Market Selection</h3>
        <p class="text-xs text-neutral-500 font-semibold leading-relaxed">Add a single new outcome line (e.g. Over 2.5 goals or Draw No Bet outcomes) manually.</p>
      </div>

      <form 
        method="POST" 
        action="?/addMarketOption"
        use:enhance={() => {
          isSubmitting = true;
          return async ({ update }) => {
            isSubmitting = false;
            update();
          };
        }}
        class="space-y-3"
      >
        {#if form?.error}
          <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-3 py-2 text-xs text-red-400 font-bold">
            <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
            <span>{form.error}</span>
          </div>
        {/if}

        <!-- Market Type Selection -->
        <div class="space-y-1">
          <label for="marketName" class="text-xs font-bold text-neutral-500">Market Category</label>
          <select id="marketName" name="marketName" required class="flex h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none">
            <option value="h2h">Match Result (h2h)</option>
            <option value="double_chance">Double Chance</option>
            <option value="draw_no_bet">Draw No Bet</option>
            <option value="over_under">Over / Under Goals</option>
          </select>
        </div>

        <!-- Selection Name -->
        <div class="space-y-1">
          <label for="selection" class="text-xs font-bold text-neutral-500">Outcome Label</label>
          <Input id="selection" name="selection" type="text" required placeholder="1X or Over 2.5" class="bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs h-9 font-bold text-neutral-200" />
        </div>

        <!-- Odds decimal value -->
        <div class="space-y-1">
          <label for="odds" class="text-xs font-bold text-neutral-500">Decimal Price</label>
          <Input id="odds" name="odds" type="number" step="0.01" required placeholder="2.40" class="bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs h-9 font-bold text-neutral-200" />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full h-10 bg-red-600 hover:bg-red-500 text-white font-black rounded-lg text-xs"
        >
          Add Selection Line
        </Button>
      </form>
    </div>

    <!-- Active Markets Management List -->
    <div class="lg:col-span-2 space-y-4">
      <!-- Helper loop to render list groups -->
      {#each [
        { title: 'Match Result (h2h)', items: h2hMarkets },
        { title: 'Double Chance', items: doubleChanceMarkets },
        { title: 'Draw No Bet', items: drawNoBetMarkets },
        { title: 'Over / Under Goals', items: overUnderMarkets }
      ] as group}
        {#if group.items.length > 0}
          <div class="space-y-2">
            <h4 class="text-xs font-black tracking-widest text-neutral-500 uppercase">{group.title}</h4>
            
            <div class="space-y-2">
              {#each group.items as market}
                <div class="flex items-center justify-between border border-neutral-800 bg-neutral-900/40 p-3 rounded-xl gap-4
                  {market.active ? 'border-neutral-800' : 'border-red-900/20 opacity-60'}"
                >
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="text-xs font-bold text-neutral-200">{market.selection}</div>
                      <span class="text-[9px] font-black text-neutral-500 uppercase tracking-widest">ID: {market.id}</span>
                    </div>
                  </div>

                  <!-- Controls row -->
                  <div class="flex items-center gap-2">
                    <!-- Update odds inline form -->
                    <form 
                      action="?/updateOdds" 
                      method="POST" 
                      use:enhance={() => {
                        isSubmitting = true;
                        return async ({ update }) => {
                          isSubmitting = false;
                          update();
                        };
                      }}
                      class="flex gap-1"
                    >
                      <input type="hidden" name="marketId" value={market.id} />
                      <Input 
                        type="number" 
                        step="0.01" 
                        name="odds" 
                        value={market.odds} 
                        disabled={isSubmitting}
                        class="h-8 border-neutral-800 bg-neutral-950 text-neutral-200 text-xs font-bold px-2 w-20"
                      />
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        size="icon"
                        class="h-8 w-8 bg-red-600 hover:bg-red-500 text-white rounded"
                        title="Update Odds"
                      >
                        <Check class="h-3.5 w-3.5" />
                      </Button>
                    </form>

                    <!-- Toggle market active suspension form -->
                    <form 
                      action="?/toggleMarket" 
                      method="POST" 
                      use:enhance={() => {
                        isSubmitting = true;
                        return async ({ update }) => {
                          isSubmitting = false;
                          update();
                        };
                      }}
                    >
                      <input type="hidden" name="marketId" value={market.id} />
                      <input type="hidden" name="active" value={market.active ? 'false' : 'true'} />
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        size="icon"
                        variant="outline"
                        class="h-8 w-8 border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white rounded"
                        title={market.active ? 'Suspend Market' : 'Activate Market'}
                      >
                        {#if market.active}
                          <PowerOff class="h-3.5 w-3.5 text-red-500" />
                        {:else}
                          <Power class="h-3.5 w-3.5 text-emerald-500" />
                        {/if}
                      </Button>
                    </form>

                    <!-- Delete market option line form -->
                    <form 
                      action="?/deleteMarketOption" 
                      method="POST" 
                      use:enhance={() => {
                        isSubmitting = true;
                        return async ({ update }) => {
                          isSubmitting = false;
                          update();
                        };
                      }}
                    >
                      <input type="hidden" name="marketId" value={market.id} />
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        size="icon"
                        variant="outline"
                        class="h-8 w-8 border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-red-400 rounded"
                        title="Delete Selection Line"
                      >
                        <Trash2 class="h-3.5 w-3.5" />
                      </Button>
                    </form>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>