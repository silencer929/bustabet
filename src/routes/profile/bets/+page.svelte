<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Badge } from '$lib/components/ui/badge';
  import { Ticket, ChevronLeft, Layers, UserRound } from 'lucide-svelte';

  let { data } = $props<{ data: { bets: any[] } }>();

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
  <!-- Back button -->
  <a href="/profile" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Profile</span>
  </a>

  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <Ticket class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">My Placed Bets</h1>
  </div>

  {#if data.bets.length === 0}
    <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-neutral-800 rounded-lg">
      You have not placed any wagers yet. Go to the Sportsbook to make your first selection!
    </div>
  {:else}
    <div class="space-y-4">
      {#each data.bets as bet}
        <div class="rounded-xl border border-border bg-card p-5 flex flex-col justify-between gap-4">
          
          <!-- Bet Metadata Row -->
          <div class="flex justify-between items-center border-b border-border/60 pb-3">
            <div class="flex items-center gap-2">
              <!-- Render different icons depending on SINGLE vs COMBO wagers -->
              {#if bet.type === 'COMBO'}
                <Layers class="h-4 w-4 text-primary shrink-0" />
                <span class="text-xs font-black text-neutral-200">COMBO / MULTIBET</span>
              {:else}
                <UserRound class="h-4 w-4 text-primary shrink-0" />
                <span class="text-xs font-black text-neutral-200">SINGLE BET</span>
              {/if}
              
              <Badge class="border text-[8px] font-bold px-1.5 py-0 rounded {getStatusClass(bet.status)}">
                {bet.status}
              </Badge>
            </div>
            
            <span class="text-[9px] font-bold text-neutral-500">{formatGameTime(bet.createdAt)}</span>
          </div>

          <!-- Bet Selections details -->
          <div class="space-y-2">
            {#if bet.type === 'COMBO'}
              <!-- For Combo: Iterate over the safe-parsed selections -->
              <div class="space-y-2">
                {#each bet.selections as selection}
                  <div class="pl-3 border-l-2 border-primary/40 space-y-0.5">
                    <div class="text-xs font-bold text-neutral-300">{selection.selection}</div>
                    <div class="text-[9px] text-neutral-500 font-semibold">{selection.homeTeam} vs {selection.awayTeam} &bull; Odds: {selection.odds.toFixed(2)}</div>
                  </div>
                {/each}
              </div>
            {:else}
              <!-- For Single: Display the single fixture information -->
              <div class="pl-3 border-l-2 border-primary/40 space-y-0.5">
                <div class="text-xs font-bold text-neutral-300">{bet.market.selection}</div>
                <div class="text-[9px] text-neutral-500 font-semibold">{bet.game.homeTeam} vs {bet.game.awayTeam} &bull; Odds: {bet.odds.toFixed(2)}</div>
              </div>
            {/if}
          </div>

          <!-- Financial calculations panel -->
          <div class="border-t border-border/60 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-bold text-neutral-400">
            <div class="flex gap-4">
              <span>Stake: <span class="text-foreground">{formatCurrency(bet.stake, auth.user?.currency || 'USD')}</span></span>
              <span>Total Odds: <span class="text-primary">{bet.odds.toFixed(2)}</span></span>
            </div>
            <div>
              <span>Potential Payout: <span class="text-emerald-500 font-black text-sm">{formatCurrency(bet.potentialWin, auth.user?.currency || 'USD')}</span></span>
            </div>
          </div>

        </div>
      {/each}
    </div>
  {/if}
</div>