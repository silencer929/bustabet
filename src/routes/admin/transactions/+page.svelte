<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { ArrowRightLeft, ArrowDownLeft, ArrowUpRight, Check, X } from 'lucide-svelte';

  // Svelte 5 page properties capturing loaded transaction tables
  let { data } = $props<{ data: { transactions: any[] } }>();

  // Filter to compute the queue of pending withdrawals awaiting review
  const pendingWithdrawals = $derived(
    data.transactions.filter((tx:any) => tx.type === 'WITHDRAWAL' && tx.status === 'PENDING')
  );

  let isSubmitting = $state(false);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80';
      case 'PENDING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      default: return 'bg-red-950/40 text-red-400 border-red-800/80';
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-border/80 pb-3">
    <ArrowRightLeft class="h-5 w-5 text-red-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Transaction Overseer</h1>
  </div>

  <!-- Section: Pending Approvals Queue -->
  <div class="space-y-3">
    <h2 class="text-xs font-black tracking-widest text-red-400 uppercase flex items-center gap-1.5">
      <span>Pending Withdrawal Queue</span>
      {#if pendingWithdrawals.length > 0}
        <span class="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-foreground">{pendingWithdrawals.length}</span>
      {/if}
    </h2>

    {#if pendingWithdrawals.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-12 border border-dashed border-border rounded-lg bg-background/10">
        All payouts clear! No pending withdrawals awaiting approval.
      </div>
    {:else}
      <div class="space-y-2">
        {#each pendingWithdrawals as tx}
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-border bg-background/40 p-4 rounded-xl gap-4">
            <div>
              <div class="text-xs font-bold text-foreground">Withdrawal Request: {tx.profile.username}</div>
              <div class="text-[10px] text-neutral-500 mt-1">Ref: {tx.reference} &bull; Requested {formatGameTime(tx.createdAt)}</div>
              <div class="text-xs font-black text-red-500 mt-1">{formatCurrency(tx.amount, tx.currency)}</div>
            </div>

            <!-- Approval / Rejection Actions -->
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <!-- Approve form -->
              <form 
                action="?/approve" 
                method="POST" 
                use:enhance={() => {
                  isSubmitting = true;
                  return async ({ update }) => {
                    isSubmitting = false;
                    update();
                  };
                }}
                class="flex-1 sm:flex-none"
              >
                <input type="hidden" name="id" value={tx.id} />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  class="w-full bg-emerald-600 hover:bg-emerald-500 text-foreground font-bold h-9 px-4 rounded-lg text-xs gap-1.5"
                >
                  <Check class="h-4 w-4" />
                  Approve
                </Button>
              </form>

              <!-- Reject form -->
              <form 
                action="?/reject" 
                method="POST" 
                use:enhance={() => {
                  isSubmitting = true;
                  return async ({ update }) => {
                    isSubmitting = false;
                    update();
                  };
                }}
                class="flex-1 sm:flex-none"
              >
                <input type="hidden" name="id" value={tx.id} />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  variant="outline"
                  class="w-full border-border bg-background text-foreground hover:bg-background hover:text-red-400 font-bold h-9 px-4 rounded-lg text-xs gap-1.5"
                >
                  <X class="h-4 w-4" />
                  Reject
                </Button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Section: Global Transaction Audit Ledger -->
  <div class="space-y-3">
    <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Global Audit Ledger</h3>

    <div class="overflow-x-auto rounded-xl border border-border bg-background/20">
      <table class="w-full border-collapse text-left text-xs text-muted-foreground">
        <thead class="border-b border-border bg-background/60 font-bold uppercase tracking-wider text-neutral-500 text-[10px]">
          <tr>
            <th class="px-4 py-3">Player</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Reference Code</th>
            <th class="px-4 py-3">Date</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-800 font-medium">
          {#each data.transactions as tx}
            <tr class="hover:bg-background/10 transition duration-150">
              <td class="whitespace-nowrap px-4 py-4 text-foreground font-bold">{tx.profile.username}</td>
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-2">
                  {#if tx.type === 'DEPOSIT' || tx.type === 'PAYOUT'}
                    <ArrowDownLeft class="h-4 w-4 text-emerald-500" />
                  {:else}
                    <ArrowUpRight class="h-4 w-4 text-red-500" />
                  {/if}
                  <span>{tx.type}</span>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4 font-mono font-bold tracking-tight text-neutral-300">{tx.reference}</td>
              <td class="whitespace-nowrap px-4 py-4 text-muted-foreground">{formatGameTime(tx.createdAt)}</td>
              <td class="whitespace-nowrap px-4 py-4">
                <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded {getStatusClass(tx.status)}">
                  {tx.status}
                </Badge>
              </td>
              <td class="whitespace-nowrap px-4 py-4 text-right font-black {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? 'text-emerald-500' : 'text-red-500'}">
                {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>