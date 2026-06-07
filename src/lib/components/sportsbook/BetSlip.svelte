<script lang="ts">
  import { betslip } from '$lib/stores/betslip.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { formatCurrency } from '$lib/utils/currency';
  import { X, Trash2, Ticket, Smartphone, Loader2 } from 'lucide-svelte';

  let isSubmitting = $state(false);
  let errorMessage = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  // Derived state to check if user has insufficient balance and needs an instant top-up
  const needsTopup = $derived(wallet.balance < betslip.stake);

  // Coordinates bet placement or instant STK push depending on balance limits
  async function handleAction() {
    if (betslip.selections.length === 0 || betslip.stake <= 0) return;

    isSubmitting = true;
    errorMessage = null;
    successMessage = null;

    try {
      if (needsTopup) {
        // Enforce user authentication checks before initiating payments
        if (!auth.isAuthenticated || !auth.user?.phone) {
          throw new Error('Please log in and register a mobile number to deposit');
        }

        const formData = new FormData();
        formData.append('amount', betslip.stake.toString());
        formData.append('phone', auth.user.phone);

        // POST directly to SvelteKit's existing deposit action
        const response = await fetch('/wallet/deposit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        // SvelteKit returns action results wrapped inside data arrays/objects
        if (!response.ok || (result.type === 'failure')) {
          throw new Error(result.data?.error || 'STK Push failed to initiate');
        }

        successMessage = 'STK prompt sent! Enter your PIN on your phone to complete deposit.';
      } else {
        // Place wagers normally if the wallet holds sufficient balance
        for (const selection of betslip.selections) {
          const response = await fetch('/api/place-bet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              marketId: selection.marketId,
              stake: betslip.stake
            })
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || 'Wager processing failed');
          }

          wallet.deductStake(betslip.stake);
        }

        successMessage = 'All wagers placed successfully!';
        betslip.clear();
      }
    } catch (err: any) {
      errorMessage = err.message || 'An unexpected error occurred';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="flex h-full w-full flex-col bg-neutral-950 border-l border-neutral-800 text-neutral-200">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-neutral-800 px-4 py-3 bg-neutral-900/40">
    <div class="flex items-center gap-2">
      <Ticket class="h-4 w-4 text-amber-500" />
      <span class="text-xs font-bold uppercase tracking-wider">Bet Slip</span>
      {#if betslip.count > 0}
        <span class="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-neutral-950">{betslip.count}</span>
      {/if}
    </div>
    {#if betslip.count > 0}
      <button onclick={() => betslip.clear()} class="text-neutral-500 hover:text-red-400 transition" title="Clear All">
        <Trash2 class="h-4 w-4" />
      </button>
    {/if}
  </div>

  <!-- Selection List -->
  <div class="flex-1 overflow-y-auto p-4 space-y-3">
    {#if betslip.count === 0}
      <div class="flex h-full flex-col items-center justify-center text-center py-12">
        <div class="rounded-full bg-neutral-900 p-4 mb-3 border border-neutral-800">
          <Ticket class="h-8 w-8 text-neutral-600" />
        </div>
        <p class="text-sm font-bold text-neutral-400">Your betslip is empty</p>
        <p class="text-xs text-neutral-600 mt-1">Select odds from any match to add selection</p>
      </div>
    {:else}
      {#each betslip.selections as selection}
        <div class="relative rounded-lg border border-neutral-800 bg-neutral-900/40 p-3 shadow-sm">
          <button 
            onclick={() => betslip.removeSelection(selection.gameId)}
            class="absolute top-2.5 right-2.5 text-neutral-500 hover:text-white transition"
          >
            <X class="h-3.5 w-3.5" />
          </button>
          
          <div class="text-[10px] font-bold text-amber-500 uppercase tracking-wide mb-1">Single Bet</div>
          <div class="text-xs font-bold text-neutral-200">{selection.selection}</div>
          <div class="text-[10px] text-neutral-500 mt-0.5">Market: {selection.marketName.toUpperCase()}</div>
          <div class="text-xs font-semibold text-neutral-400 mt-1.5">{selection.homeTeam} vs {selection.awayTeam}</div>
          
          <div class="mt-2.5 flex items-center justify-between border-t border-neutral-800/80 pt-2">
            <span class="text-xs text-neutral-500 font-semibold">Odds</span>
            <span class="text-xs font-black text-amber-500">{selection.odds.toFixed(2)}</span>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Checkout Footer Panel -->
  {#if betslip.count > 0}
    <div class="border-t border-neutral-800 p-4 bg-neutral-900/20 space-y-4">
      <!-- Response Alerts -->
      {#if errorMessage}
        <div class="rounded bg-red-950/40 border border-red-800/80 px-3 py-2 text-xs text-red-400 font-bold leading-relaxed">{errorMessage}</div>
      {/if}
      {#if successMessage}
        <div class="rounded bg-green-950/40 border border-green-800/80 px-3 py-2 text-xs text-green-400 font-bold leading-relaxed">{successMessage}</div>
      {/if}

      <!-- Stake Form -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-neutral-400">Stake Amount</span>
          <span class="text-[10px] font-bold text-neutral-500">Balance: {formatCurrency(wallet.balance, wallet.currency)}</span>
        </div>
        <div class="relative">
          <Input 
            type="number" 
            placeholder="0.00" 
            bind:value={betslip.stake} 
            disabled={isSubmitting}
            class="h-10 border-neutral-800 bg-neutral-950 text-neutral-200 focus:border-amber-500 focus:ring-amber-500 pr-12 font-bold"
          />
          <span class="absolute right-3 top-2.5 text-xs font-bold text-neutral-500">{wallet.currency}</span>
        </div>
      </div>

      <!-- Financial Metrics -->
      <div class="space-y-1.5 text-xs font-semibold text-neutral-400">
        <div class="flex justify-between">
          <span>Overall Odds</span>
          <span class="text-neutral-200 font-black">{betslip.totalOdds.toFixed(2)}</span>
        </div>
        <div class="flex justify-between border-t border-neutral-800/80 pt-1.5">
          <span class="text-neutral-300 font-bold">Potential Payout</span>
          <span class="text-amber-500 font-black text-sm">{formatCurrency(betslip.potentialWin, wallet.currency)}</span>
        </div>
      </div>

      <!-- Action Button (Toggles dynamically between standard Place Bet and direct M-Pesa STK Prompting) -->
      <Button 
        onclick={handleAction}
        disabled={isSubmitting || betslip.stake <= 0}
        class="w-full h-11 text-neutral-950 font-black rounded-lg transition shadow-md gap-2
          {needsTopup 
            ? 'bg-emerald-500 hover:bg-emerald-400' 
            : 'bg-amber-500 hover:bg-amber-400'}
          disabled:bg-neutral-800 disabled:text-neutral-500"
      >
        {#if isSubmitting}
          <Loader2 class="h-4 w-4 animate-spin" />
          <span>Processing...</span>
        {:else if needsTopup}
          <Smartphone class="h-4 w-4" />
          <span>M-Pesa Deposit & Play</span>
        {:else}
          <span>Place Bets</span>
        {/if}
      </Button>
    </div>
  {/if}
</div>