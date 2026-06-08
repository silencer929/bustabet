<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Badge } from '$lib/components/ui/badge';
  import { Wallet, ArrowDownLeft, ArrowUpRight, History } from 'lucide-svelte';

  // Svelte 5 page properties capturing server loaded history wagers
  let { data } = $props<{ data: { transactions: any[] } }>();

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
  <!-- Back Navigation Button -->
  <a href="/wallet" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">
    <History class="h-4 w-4" />
    <span>Back to Wallet Dashboard</span>
  </a>

  <!-- Section Title -->
  <div class="flex items-center gap-2 border-b border-border/80 pb-3">
    <Wallet class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Transaction Ledger</h1>
  </div>

  {#if data.transactions.length === 0}
    <!-- Empty State -->
    <div class="text-center text-xs font-semibold text-neutral-600 py-24 border border-dashed border-border rounded-lg">
      No transactions recorded in your ledger history
    </div>
  {:else}
    <!-- Ledger Table Layout -->
    <div class="overflow-x-auto rounded-xl border border-border bg-background/20">
      <table class="w-full border-collapse text-left text-xs text-muted-foreground">
        <!-- Table Header -->
        <thead class="border-b border-border bg-background/60 font-bold uppercase tracking-wider text-neutral-500 text-[10px]">
          <tr>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Reference Code</th>
            <th class="px-4 py-3">Date & Time</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-neutral-800 font-medium">
          {#each data.transactions as tx}
            <tr class="hover:bg-background/10 transition duration-150">
              <!-- Type Column -->
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-2 text-foreground">
                  {#if tx.type === 'DEPOSIT' || tx.type === 'PAYOUT'}
                    <ArrowDownLeft class="h-4 w-4 text-emerald-500" />
                  {:else}
                    <ArrowUpRight class="h-4 w-4 text-red-500" />
                  {/if}
                  <span>{tx.type}</span>
                </div>
              </td>

              <!-- Reference Column -->
              <td class="whitespace-nowrap px-4 py-4 font-mono font-bold tracking-tight text-neutral-300">
                {tx.reference}
              </td>

              <!-- Date Column -->
              <td class="whitespace-nowrap px-4 py-4 text-muted-foreground">
                {formatGameTime(tx.createdAt)}
              </td>

              <!-- Status Badge Column -->
              <td class="whitespace-nowrap px-4 py-4">
                <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded {getStatusClass(tx.status)}">
                  {tx.status}
                </Badge>
              </td>

              <!-- Amount Column (Right aligned) -->
              <td class="whitespace-nowrap px-4 py-4 text-right font-black {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? 'text-emerald-500' : 'text-red-500'}">
                {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>