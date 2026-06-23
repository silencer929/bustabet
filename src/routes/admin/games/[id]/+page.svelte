<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { ChevronLeft, Plus, ShieldAlert, Check, Power, PowerOff, Trash2, Calendar, LayoutGrid } from 'lucide-svelte';
  import type { GameWithMarkets } from '$lib/types/game';

  let { data, form } = $props<{
    data: { game: GameWithMarkets; vipTiers: any[] };
    form: { error?: string } | null;
  }>();

  let isSubmitting = $state(false);
  
  // State variable controlling the active creation template selection (Defaults to H2H)
  let selectedTemplate = $state('h2h');

  const h2hMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'h2h'));
  const doubleChanceMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'double_chance'));
  const drawNoBetMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'draw_no_bet'));
  const totalsMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'totals' || m.marketName === 'over_under'));
  const bttsMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'btts'));
  const csMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'correct_score'));
  const wtnMarkets = $derived(data.game.markets.filter((m) => m.marketName === 'win_to_nil'));
</script>

<div class="space-y-6">
  <!-- Back Button -->
  <a href="/admin/games" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Fixtures</span>
  </a>

  <!-- Scoreboard Panel -->
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
    <!-- Template-Driven Add Market Container -->
    <div class="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 h-fit">
      <div class="space-y-1">
        <h3 class="text-xs font-black text-neutral-100 uppercase tracking-widest flex items-center gap-1.5">
          <LayoutGrid class="h-4 w-4 text-red-500" />
          <span>Market Templates</span>
        </h3>
        <p class="text-xs text-neutral-500 font-semibold leading-relaxed">Select a template to generate complete and mathematically correct markets atomically.</p>
      </div>

      <!-- Template Selector dropdown -->
      <div class="space-y-1">
        <label for="templateSelector" class="text-xs font-bold text-neutral-500">Select Template Category</label>
        <select id="templateSelector" bind:value={selectedTemplate} class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none">
          <option value="h2h">1. H2H (3 Options)</option>
          <option value="double_chance">2. Double Chance (3 Options)</option>
          <option value="over_under">3. Over/Under Goals (2 Options)</option>
          <option value="correct_score">4. Correct Score (1 Option)</option>
          <option value="totals">5. Totals Market (2 Options)</option>
          <option value="btts">6. Both Teams to Score (2 Options)</option>
          <option value="win_to_nil">7. Win to Nil (2 Options)</option>
        </select>
      </div>

      <!-- Dynamic Form rendered based on selectedTemplate -->
      <form 
        method="POST" 
        action="?/addMarketTemplate"
        use:enhance={() => {
          isSubmitting = true;
          return async ({ update }) => {
            isSubmitting = false;
            update();
          };
        }}
        class="space-y-4 border-t border-neutral-800 pt-3"
      >
        {#if form?.error}
          <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-3 py-2 text-xs text-red-400 font-bold">
            <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
            <span>{form.error}</span>
          </div>
        {/if}

        <input type="hidden" name="templateType" value={selectedTemplate} />

        <!-- Render H2H Form -->
        {#if selectedTemplate === 'h2h'}
          <div class="space-y-2.5">
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">{data.game.homeTeam} Win Odds</span>
              <Input type="number" step="0.01" name="homeOdds" required placeholder="1.85" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">Draw Odds</span>
              <Input type="number" step="0.01" name="drawOdds" required placeholder="3.40" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">{data.game.awayTeam} Win Odds</span>
              <Input type="number" step="0.01" name="awayOdds" required placeholder="2.90" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
          </div>
        {/if}

        <!-- Render Double Chance Form -->
        {#if selectedTemplate === 'double_chance'}
          <div class="space-y-2.5">
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">1X (Home/Draw) Odds</span>
              <Input type="number" step="0.01" name="hdOdds" required placeholder="1.23" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">X2 (Draw/Away) Odds</span>
              <Input type="number" step="0.01" name="daOdds" required placeholder="2.15" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">12 (Home/Away) Odds</span>
              <Input type="number" step="0.01" name="haOdds" required placeholder="1.16" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
          </div>
        {/if}

        <!-- Render Over/Under or Totals Form -->
        {#if selectedTemplate === 'over_under' || selectedTemplate === 'totals'}
          <div class="space-y-2.5">
            <div class="space-y-1">
              <label for="point" class="text-xs font-bold text-neutral-500">Goal Line Point</label>
              <select id="point" name="point" required class="flex h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none">
                <option value="0.5">0.5</option>
                <option value="1.5">1.5</option>
                <option value="2.5">2.5</option>
                <option value="3.5">3.5</option>
                <option value="4.5">4.5</option>
              </select>
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">Over Odds</span>
              <Input type="number" step="0.01" name="overOdds" required placeholder="1.90" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">Under Odds</span>
              <Input type="number" step="0.01" name="underOdds" required placeholder="1.90" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
          </div>
        {/if}

        <!-- Render Correct Score Form -->
        {#if selectedTemplate === 'correct_score'}
          <div class="space-y-2.5">
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">Predict Scoreline</span>
              <Input type="text" name="scoreLine" required placeholder="2 - 1" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">Odds</span>
              <Input type="number" step="0.01" name="odds" required placeholder="9.50" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
          </div>
        {/if}

        <!-- Render Both Teams to Score (BTTS) Form -->
        {#if selectedTemplate === 'btts'}
          <div class="space-y-2.5">
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">Yes Odds</span>
              <Input type="number" step="0.01" name="yesOdds" required placeholder="1.80" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">No Odds</span>
              <Input type="number" step="0.01" name="noOdds" required placeholder="1.95" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
          </div>
        {/if}

        <!-- Render Win to Nil Form -->
        {#if selectedTemplate === 'win_to_nil'}
          <div class="space-y-2.5">
            <div class="space-y-1">
              <label for="team" class="text-xs font-bold text-neutral-500">Target Team</label>
              <select id="team" name="team" required class="flex h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none">
                <option value="HOME">Home Team ({data.game.homeTeam})</option>
                <option value="AWAY">Away Team ({data.game.awayTeam})</option>
              </select>
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">Yes (Win to Nil) Odds</span>
              <Input type="number" step="0.01" name="yesOdds" required placeholder="2.60" class="h-9 bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs font-bold" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-neutral-500 uppercase">No (Win to Nil) Odds</span>
              <Input id="odds" name="odds" type="number" step="0.01" required placeholder="1.45" class="bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs h-9 font-bold text-neutral-200" />
            </div>
          </div>
        {/if}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full h-10 bg-red-600 hover:bg-red-500 text-white font-black rounded-lg text-xs cursor-pointer"
        >
          {isSubmitting ? 'Generating Line...' : 'Write Template to DB'}
        </Button>
      </form>
    </div>

    <!-- Active Markets Management List (Excludes the redundant single-item add form) -->
    <div class="lg:col-span-2 space-y-4">
      {#each [
        { title: 'Match Result (h2h)', items: h2hMarkets },
        { title: 'Double Chance', items: doubleChanceMarkets },
        { title: 'Draw No Bet', items: drawNoBetMarkets },
        { title: 'Totals / Over-Under Goals', items: totalsMarkets },
        { title: 'Both Teams to Score (BTTS)', items: bttsMarkets },
        { title: 'Correct Scores', items: csMarkets },
        { title: 'Win to Nil', items: wtnMarkets }
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