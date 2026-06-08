<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { formatCurrency } from '$lib/utils/currency';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Wallet, ArrowDownLeft, ArrowUpRight, History, ArrowRightLeft } from 'lucide-svelte';

  // Svelte 5 page properties capturing server loaded financial wagers
  let { data } = $props<{
    data: { balance: number; transactions: any[] };
  }>();

  // Helper to determine tailwind badge styling based on transaction states
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80';
      case 'PENDING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      default: return 'bg-red-950/40 text-red-400 border-red-800/80';
    }
  };
</script>

<div class="space-y-6">
  <!-- Section Title -->
  <div class="flex items-center gap-2 border-b border-border/80 pb-3">
    <Wallet class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Wallet Dashboard</h1>
  </div>

  <!-- Balance Visual Hero Card -->
  <div class="rounded-2xl border border-border bg-background/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
    <div class="space-y-1.5">
      <span class="text-xs font-bold text-neutral-500 uppercase tracking-widest">Available Balance</span>
      <div class="text-3xl font-black text-neutral-100 tracking-tight">
        {formatCurrency(data.balance, auth.user?.currency || 'USD')}
      </div>
    </div>

    <!-- Action Shortcuts -->
    <div class="flex items-center gap-2.5 w-full sm:w-auto">
      <a href="/wallet/deposit" class="flex-1 sm:flex-none">
        <Button class="w-full h-10 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg gap-1.5">
          <ArrowDownLeft class="h-4 w-4" />
          Deposit
        </Button>
      </a>
      <a href="/wallet/withdraw" class="flex-1 sm:flex-none">
        <Button variant="outline" class="w-full h-10 border-border bg-background text-foreground hover:bg-background font-bold rounded-lg gap-1.5">
          <ArrowUpRight class="h-4 w-4" />
          Withdraw
        </Button>
      </a>
    </div>
  </div>

  <!-- Recent Transactions Log -->
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h2 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Recent Transactions</h2>
      <a href="/wallet/history" class="text-[10px] font-bold text-amber-500 hover:text-amber-400 transition flex items-center gap-1">
        <History class="h-3.5 w-3.5" />
        Full History
      </a>
    </div>

    {#if data.transactions.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-12 border border-dashed border-border rounded-lg">
        No transactions logged yet
      </div>
    {:else}
      <div class="space-y-2">
        {#each data.transactions as tx}
          <div class="flex items-center justify-between border border-border bg-background/20 p-3.5 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="rounded-lg bg-background p-2 border border-border text-muted-foreground">
                {#if tx.type === 'DEPOSIT' || tx.type === 'PAYOUT'}
                  <ArrowDownLeft class="h-4 w-4 text-emerald-500" />
                {:else}
                  <ArrowUpRight class="h-4 w-4 text-red-500" />
                {/if}
              </div>
              <div>
                <div class="text-xs font-bold text-foreground">{tx.type}</div>
                <div class="text-[10px] text-neutral-500 mt-0.5">{tx.reference} &bull; {formatGameTime(tx.createdAt)}</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-xs font-black {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? 'text-emerald-500' : 'text-red-500'}">
                {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
              </span>
              <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded {getStatusClass(tx.status)}">
                {tx.status}
              </Badge>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>