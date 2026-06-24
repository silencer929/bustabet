<script lang="ts">
  import { page } from '$app/stores';
  import { betslip } from '$lib/stores/betslip.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { formatCurrency } from '$lib/utils/currency';
  import { X, Trash2, Ticket, Smartphone, Loader2, Coins } from 'lucide-svelte';

  let isSubmitting = $state(false);
  let errorMessage = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  const minDeposit = $derived($page.data.minDeposit || 200.00);
  const minStake = $derived($page.data.minStake || 10.00);

  const stakeIsValid = $derived(betslip.stake >= minStake);
  const needsTopup = $derived(wallet.balance < betslip.stake);
  const deficit = $derived(needsTopup ? Number((betslip.stake - wallet.balance).toFixed(2)) : 0);
  const depositAmount = $derived(needsTopup ? Math.max(deficit, minDeposit) : 0);
  const excessRefund = $derived(needsTopup ? Number((depositAmount - deficit).toFixed(2)) : 0);

  async function handleAction() {
    if (betslip.selections.length === 0 || !stakeIsValid) return;

    isSubmitting = true;
    errorMessage = null;
    successMessage = null;

    try {
      if (needsTopup) {
        if (!auth.isAuthenticated || !auth.user?.phone) {
          throw new Error('Please log in and register a mobile number to deposit');
        }

        const formData = new FormData();
        formData.append('amount', depositAmount.toString());
        formData.append('phone', auth.user.phone);

        const response = await fetch('/wallet/deposit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (!response.ok || (result.type === 'failure')) {
          throw new Error(result.data?.error || 'STK Push failed to initiate');
        }

        successMessage = `STK prompt sent for ${formatCurrency(depositAmount, wallet.currency)}! Once approved, your bet will place.`;
      } else {
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

<div class="flex h-full w-full flex-col bg-background border-l border-border text-foreground transition-colors duration-150">
  
  <!-- Fixed Header (Always stays pinned at the top) -->
  <div class="flex h-12 items-center justify-between border-b border-border px-4 py-3 bg-muted/20 shrink-0">
    <div class="flex items-center gap-2">
      <Ticket class="h-4 w-4 text-primary" />
      <span class="text-xs font-bold uppercase tracking-wider">Bet Slip</span>
      {#if betslip.count > 0}
        <span class="rounded-full bg-primary px-2 py-0.5 text-[10px] font-black text-primary-foreground">{betslip.count}</span>
      {/if}
    </div>
    {#if betslip.count > 0}
      <button onclick={() => betslip.clear()} class="text-muted-foreground hover:text-destructive transition cursor-pointer" title="Clear All">
        <Trash2 class="h-4 w-4" />
      </button>
    {/if}
  </div>

  <!-- SINGLE Unified Scrollable Container: Contains both active selections AND checkout details -->
  <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-between pb-20 sm:pb-0">
    
    <!-- Top Area: Active Wager Cards -->
    <div class="p-4 space-y-3">
      {#if betslip.count === 0}
        <div class="flex h-full flex-col items-center justify-center text-center py-12">
          <div class="rounded-full bg-muted/40 p-4 mb-3 border border-border">
            <Ticket class="h-8 w-8 text-muted-foreground" />
          </div>
          <p class="text-sm font-bold text-muted-foreground">Your betslip is empty</p>
          <p class="text-xs text-muted-foreground mt-1 font-semibold">Select odds from any match to add selection</p>
        </div>
      {:else}
        {#each betslip.selections as selection}
          <div class="relative rounded-lg border border-border bg-muted/20 p-3 shadow-sm">
            <button 
              onclick={() => betslip.removeSelection(selection.gameId, selection.marketName)}
              class="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground transition cursor-pointer"
            >
              <X class="h-3.5 w-3.5" />
            </button>
            
            <div class="text-[10px] font-bold text-primary uppercase tracking-wide mb-1">Single Bet</div>
            <div class="text-xs font-bold text-foreground">{selection.selection}</div>
            <div class="text-[10px] text-muted-foreground mt-0.5">Market: {selection.marketName.toUpperCase().replace('_', ' ')}</div>
            <div class="text-xs font-semibold text-muted-foreground mt-1.5">{selection.homeTeam} vs {selection.awayTeam}</div>
            
            <div class="mt-2.5 flex items-center justify-between border-t border-border pt-2">
              <span class="text-xs text-muted-foreground font-semibold">Odds</span>
              <span class="text-xs font-black text-primary">{selection.odds.toFixed(2)}</span>
            </div>
          </div>
        {/each}
      {/if}
    </div>

    <!-- Bottom Area: Checkout Panel (Nested inside the scrollbar flow, mt-auto pushes it to bottom on large screens) -->
    {#if betslip.count > 0}
      <div class="border-t border-border p-4 bg-muted/10 space-y-4 mt-auto shrink-0">
        <!-- Response Alerts -->
        {#if errorMessage}
          <div class="rounded bg-red-950/40 border border-red-800/80 px-3 py-2 text-xs text-red-400 font-bold leading-relaxed">{errorMessage}</div>
        {/if}
        {#if successMessage}
          <div class="rounded bg-green-950/40 border border-green-800/80 px-3 py-2 text-xs text-green-400 font-bold leading-relaxed">{successMessage}</div>
        {/if}

        <!-- Top-up warning note -->
        {#if needsTopup && stakeIsValid && deficit < minDeposit}
          <div class="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-left text-[10px] font-bold text-amber-500 leading-normal flex items-start gap-2">
            <Coins class="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Note: Your balance deficit is {formatCurrency(deficit, wallet.currency)}, but the minimum deposit is {formatCurrency(minDeposit, wallet.currency)}. 
              You will be prompted to deposit {minDeposit}. The excess ({formatCurrency(excessRefund, wallet.currency)}) will remain in your wallet.
            </span>
          </div>
        {/if}

        <!-- Stake Input -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-muted-foreground">Stake Amount</span>
            <span class="text-[10px] font-bold text-neutral-500">Balance: {formatCurrency(wallet.balance, wallet.currency)}</span>
          </div>
          <div class="relative">
            <Input 
              type="number" 
              placeholder="0.00" 
              bind:value={betslip.stake} 
              disabled={isSubmitting}
              class="h-10 border-border bg-background text-foreground pr-12 font-bold focus:border-primary"
            />
            <span class="absolute right-3 top-2.5 text-xs font-bold text-muted-foreground">{wallet.currency}</span>
          </div>
          
          <!-- helper warnings -->
          <div class="flex justify-between items-center text-[10px] font-bold">
            <span class="text-neutral-500">Min Bet: {formatCurrency(minStake, wallet.currency)}</span>
            {#if betslip.stake > 0 && !stakeIsValid}
              <span class="text-red-400">Stake is below the minimum limit</span>
            {/if}
          </div>
        </div>

        <!-- Financial Metrics -->
        <div class="space-y-1.5 text-xs font-semibold text-neutral-400">
          <div class="flex justify-between">
            <span>Overall Odds</span>
            <span class="text-foreground font-black">{betslip.totalOdds.toFixed(2)}</span>
          </div>
          <div class="flex justify-between border-t border-border pt-1.5">
            <span class="text-foreground font-bold">Potential Payout</span>
            <span class="text-primary font-black text-sm">{formatCurrency(betslip.potentialWin, wallet.currency)}</span>
          </div>
        </div>

        <!-- Action Button -->
        <Button 
          onclick={handleAction}
          disabled={isSubmitting || !stakeIsValid}
          class="w-full h-11 text-neutral-950 font-black rounded-lg transition shadow-md gap-2 cursor-pointer
            {needsTopup 
              ? 'bg-emerald-500 hover:bg-emerald-400' 
              : 'bg-primary hover:bg-primary/95'}
            disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          {#if isSubmitting}
            <Loader2 class="h-4 w-4 animate-spin" />
            <span>Processing...</span>
          {:else}
            {#if needsTopup}
              <Smartphone class="h-4 w-4" />
            {/if}
            <span>{needsTopup ? 'Place Bet' : 'Place Bets'}</span>
          {/if}
        </Button>
      </div>
    {/if}
  </div>
</div>