<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Badge } from '$lib/components/ui/badge';
  import { Ticket, ChevronLeft } from 'lucide-svelte';

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
    <div class="space-y-3">
      {#each data.bets as bet}
        <div class="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-black text-foreground">{bet.game.homeTeam} vs {bet.game.awayTeam}</span>
              <Badge class="border text-[8px] font-bold px-2 py-0.5 rounded {getStatusClass(bet.status)}">
                {bet.status}
              </Badge>
            </div>
            
            <div class="text-[10px] text-neutral-500 font-semibold">
              Selection: <span class="text-primary font-black">{bet.market.selection}</span> &bull; 
              Odds: <span class="text-foreground">{bet.odds.toFixed(2)}</span> &bull; 
              Placed {formatGameTime(bet.createdAt)}
            </div>

            <div class="text-xs font-bold text-neutral-400">
              Stake: {formatCurrency(bet.stake, auth.user?.currency || 'USD')} &bull; 
              Payout: <span class="text-emerald-500 font-black">{formatCurrency(bet.potentialWin, auth.user?.currency || 'USD')}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>