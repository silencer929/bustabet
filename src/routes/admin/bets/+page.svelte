<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Ticket, Search, Check, X, ShieldAlert, Ban } from 'lucide-svelte';

  let { data, form } = $props<{
    data: { bets: any[] };
    form: { error?: string } | null;
  }>();

  let isSubmitting = $state(false);

  // Filter state trackers
  let searchQuery = $state('');
  let selectedStatus = $state('all');

  // Svelte 5 derived filter: processes search matching player usernames or fixture teams
  const filteredBets = $derived(
    data.bets.filter((bet: any) => {
      const matchesSearch = 
        bet.profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bet.game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bet.game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || bet.status === selectedStatus;

      return matchesSearch && matchesStatus;
    })
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'WON': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80';
      case 'PENDING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      case 'VOIDED': return 'bg-blue-950/40 text-blue-400 border-blue-800/80';
      default: return 'bg-red-950/40 text-red-400 border-red-800/80';
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-border/80 pb-3">
    <Ticket class="h-5 w-5 text-red-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Wagers Overwatch</h1>
  </div>

  {#if form?.error}
    <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold max-w-lg">
      <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
      <span>{form.error}</span>
    </div>
  {/if}

  <!-- Interactive Filters Panel -->
  <div class="rounded-xl border border-border bg-background/20 p-4 flex flex-col sm:flex-row items-center gap-3">
    <div class="relative w-full sm:flex-1">
      <Search class="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
      <Input 
        type="text" 
        bind:value={searchQuery}
        placeholder="Search by player or team matchups..." 
        class="h-10 w-full pl-9 bg-background border-border focus:border-red-500 text-xs font-semibold text-foreground"
      />
    </div>

    <!-- Status Dropdown Selector -->
    <select 
      bind:value={selectedStatus}
      class="flex h-10 w-full sm:w-40 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
    >
      <option value="all">All Wagers</option>
      <option value="PENDING">Pending</option>
      <option value="WON">Won</option>
      <option value="LOST">Lost</option>
      <option value="VOIDED">Voided</option>
    </select>
  </div>

  <!-- Active Bets List -->
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Bets Registry</h3>
      <span class="text-[10px] font-bold text-neutral-600">Showing {filteredBets.length} of {data.bets.length} wagers</span>
    </div>

    {#if filteredBets.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">
        No registered wagers match your active search filters.
      </div>
    {:else}
      <div class="space-y-3">
        {#each filteredBets as bet}
          <div class="rounded-xl border border-border bg-background/40 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Wager Info Details -->
            <div class="space-y-1.5 flex-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-black text-foreground">{bet.game.homeTeam} vs {bet.game.awayTeam}</span>
                <Badge class="border text-[8px] font-bold px-1.5 py-0 rounded {getStatusClass(bet.status)}">
                  {bet.status}
                </Badge>
              </div>
              <div class="text-[10px] text-neutral-500">
                Player: <span class="text-neutral-300 font-bold">{bet.profile.username}</span> &bull; 
                Selection: <span class="text-amber-500 font-black">{bet.market.selection}</span> &bull; 
                Odds: <span class="text-muted-foreground font-bold">{bet.odds.toFixed(2)}</span> &bull; 
                Placed {formatGameTime(bet.createdAt)}
              </div>
              <div class="text-xs font-bold text-muted-foreground">
                Stake: {formatCurrency(bet.stake, 'USD')} &bull; 
                Potential Payout: <span class="text-emerald-500 font-black">{formatCurrency(bet.potentialWin, 'USD')}</span>
              </div>
            </div>

            <!-- Manual Overrides Form Panel (Visible only if the bet is currently pending) -->
            {#if bet.status === 'PENDING'}
              <div class="flex items-center gap-2 border-t md:border-t-0 border-border/60 pt-3 md:pt-0">
                <!-- Settle Won Form -->
                <form 
                  action="?/settleWon" 
                  method="POST" 
                  use:enhance={() => {
                    isSubmitting = true;
                    return async ({ update }) => {
                      isSubmitting = false;
                      update();
                    };
                  }}
                >
                  <input type="hidden" name="id" value={bet.id} />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    class="bg-emerald-600 hover:bg-emerald-500 text-foreground font-bold h-9 px-3 rounded-lg text-xs gap-1.5"
                    title="Settle as Won"
                  >
                    <Check class="h-3.5 w-3.5" />
                    Won
                  </Button>
                </form>

                <!-- Settle Lost Form -->
                <form 
                  action="?/settleLost" 
                  method="POST" 
                  use:enhance={() => {
                    isSubmitting = true;
                    return async ({ update }) => {
                      isSubmitting = false;
                      update();
                    };
                  }}
                >
                  <input type="hidden" name="id" value={bet.id} />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    variant="outline"
                    class="border-border bg-background text-foreground hover:bg-background hover:text-red-400 font-bold h-9 px-3 rounded-lg text-xs gap-1.5"
                    title="Settle as Lost"
                  >
                    <X class="h-3.5 w-3.5" />
                    Lost
                  </Button>
                </form>

                <!-- Void Bet Form -->
                <form 
                  action="?/voidBet" 
                  method="POST" 
                  use:enhance={() => {
                    isSubmitting = true;
                    return async ({ update }) => {
                      isSubmitting = false;
                      update();
                    };
                  }}
                >
                  <input type="hidden" name="id" value={bet.id} />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    variant="outline"
                    class="border-border bg-background text-muted-foreground hover:text-neutral-300 font-bold h-9 px-3 rounded-lg text-xs gap-1.5"
                    title="Void & Refund Stake"
                  >
                    <Ban class="h-3.5 w-3.5 text-red-500" />
                    Void
                  </Button>
                </form>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>