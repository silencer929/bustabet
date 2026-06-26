<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { betslip } from '$lib/stores/betslip.svelte';
  import { wallet } from '$lib/stores/wallet.svelte';
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { formatCurrency } from '$lib/utils/currency';
  import { toast } from 'svelte-sonner';
  import { fade, scale } from 'svelte/transition'; // Import smooth Svelte transitions
  import { X, Trash2, Ticket, Smartphone, LoaderCircle, Coins, Share2, FolderUp, CircleCheck } from 'lucide-svelte';

  let isSubmitting = $state(false);
  let isSharing = $state(false);
  let isLoadingCode = $state(false);
  let isSuccessOpen = $state(false); // Controls the success modal visibility
  let errorMessage = $state<string | null>(null);

  let shareCodeResult = $state<string | null>(null);
  let loadCodeInput = $state('');
  let isLoadOpen = $state(false);

  let betMode = $state<'SINGLE' | 'COMBO'>('COMBO');

  const minDeposit = $derived($page.data.minDeposit || 200.00);
  const minStake = $derived($page.data.minStake || 10.00);

  const stakeIsValid = $derived(betslip.stake >= minStake);

  const totalRequiredStake = $derived(
    betMode === 'SINGLE' 
      ? Number((betslip.stake * betslip.count).toFixed(2)) 
      : betslip.stake
  );

  const needsTopup = $derived(wallet.balance < totalRequiredStake);

  const potentialWin = $derived.by(() => {
    if (betslip.count === 0 || betslip.stake <= 0) return 0;
    if (betMode === 'COMBO') {
      return Number((betslip.stake * betslip.totalOdds).toFixed(2));
    } else {
      return Number(betslip.selections.reduce((sum, s) => sum + (betslip.stake * s.odds), 0).toFixed(2));
    }
  });

  const deficit = $derived(needsTopup ? Number((totalRequiredStake - wallet.balance).toFixed(2)) : 0);
  const depositAmount = $derived(needsTopup ? Math.max(deficit, minDeposit) : 0);
  const excessRefund = $derived(needsTopup ? Number((depositAmount - deficit).toFixed(2)) : 0);

  // Cached parameters to display on the success modal after the slip is cleared
  let lastStake = $state(0);
  let lastPayout = $state(0);
  let lastType = $state('');

  async function handleShareSlip() {
    if (betslip.selections.length === 0) return;
    isSharing = true;
    shareCodeResult = null;

    try {
      const response = await fetch('/api/betslip/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selections: betslip.selections })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        shareCodeResult = result.code;
        toast.success(`Slip shared! Code: ${result.code}`);
      } else {
        toast.error(result.message || 'Failed to generate share code');
      }
    } catch {
      toast.error('An unexpected connection error occurred');
    } finally {
      isSharing = false;
    }
  }

  async function handleLoadSlip() {
    if (loadCodeInput.trim().length === 0) return;
    isLoadingCode = true;

    try {
      const response = await fetch(`/api/betslip/load?code=${encodeURIComponent(loadCodeInput)}`);
      const result = await response.json();

      if (response.ok && result.success) {
        betslip.selections = result.selections;
        isLoadOpen = false;
        loadCodeInput = '';
        toast.success('Betslip loaded successfully!');
      } else {
        toast.error(result.message || 'Invalid or expired code');
      }
    } catch {
      toast.error('An unexpected connection error occurred');
    } finally {
      isLoadingCode = false;
    }
  }

  async function handleAction() {
    if (betslip.selections.length === 0 || !stakeIsValid) return;

    isSubmitting = true;
    errorMessage = null;

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

        toast.success(`STK prompt sent for ${formatCurrency(depositAmount, wallet.currency)}!`);
      } else {
        const selectionsPayload = betslip.selections.map(s => ({
          marketId: s.marketId,
          odds: s.odds
        }));

        const response = await fetch('/api/place-bet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: betMode,
            selections: selectionsPayload,
            stake: betslip.stake
          })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Betslip processing failed');
        }

        wallet.deductStake(totalRequiredStake);

        // Cache summary values for success modal display
        lastStake = totalRequiredStake;
        lastPayout = potentialWin;
        lastType = betMode;

        // Trigger success modal popup
        isSuccessOpen = true;

        // Auto-dismiss after 3 seconds and return to the primary sportsbook route
        setTimeout(() => {
          isSuccessOpen = false;
          betslip.clear();
          goto('/sportsbook');
        }, 10200);
      }
    } catch (err: any) {
      errorMessage = err.message || 'An unexpected error occurred';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<!-- Render Success Modal Overlay -->
{#if isSuccessOpen}
  <div 
    transition:fade={{ duration: 250 }}
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
  >
    <div 
      transition:scale={{ duration: 300, start: 0.9 }}
      class="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center space-y-5 shadow-2xl"
    >
      <!-- Success Check Icon -->
      <div class="flex justify-center">
        <div class="rounded-full bg-emerald-500/10 border border-emerald-500/20 p-4">
          <CircleCheck class="h-10 w-10 text-emerald-500 animate-bounce" />
        </div>
      </div>

      <!-- Text Details -->
      <div class="space-y-1">
        <h3 class="text-lg font-black text-foreground">Bet Placed!</h3>
        <p class="text-xs text-muted-foreground font-semibold">Your bets have been successfully placed.</p>
      </div>

      <!-- Quick Summary -->
      <div class="rounded-lg bg-background border border-border p-3.5 space-y-2 text-xs font-bold text-muted-foreground text-left">
        <div class="flex justify-between">
          <span>Bet Type</span>
          <span class="text-foreground uppercase">{lastType}</span>
        </div>
        <div class="flex justify-between">
          <span>Stake Placed</span>
          <span class="text-foreground">{formatCurrency(lastStake, wallet.currency)}</span>
        </div>
        <div class="flex justify-between border-t border-border/80 pt-2">
          <span>Potential Payout</span>
          <span class="text-primary font-black">{formatCurrency(lastPayout, wallet.currency)}</span>
        </div>
      </div>

      <!-- Countdown helper -->
      <div class="text-[10px] text-muted-foreground font-bold animate-pulse">
        Returning to Sportsbook dashboard in 10s...
      </div>
    </div>
  </div>
{/if}

<div class="flex h-full w-full flex-col bg-background border-l border-border text-foreground transition-colors duration-150">
  
  <!-- Fixed Header -->
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

  <!-- SINGLE Unified Scrollable Container -->
  <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-between pb-20 sm:pb-0">
    
    <!-- Top Area: Active Wager Cards -->
    <div class="p-4 space-y-3">
      <!-- "Load betslip code" Row -->
      {#if isLoadOpen}
        <div class="rounded-lg border border-border bg-muted/10 p-2.5 flex items-center gap-2">
          <Input 
            type="text" 
            bind:value={loadCodeInput} 
            placeholder="Enter Code (e.g. SLIP-XXXXXX)" 
            disabled={isLoadingCode}
            class="h-9 text-xs bg-background border-border font-bold uppercase"
          />
          <Button 
            onclick={handleLoadSlip} 
            disabled={isLoadingCode || loadCodeInput.trim().length === 0}
            class="h-9 px-3 bg-primary text-primary-foreground font-black text-xs rounded cursor-pointer"
          >
            Load
          </Button>
        </div>
      {:else}
        <button 
          onclick={() => isLoadOpen = true}
          class="w-full h-10 border border-dashed border-border bg-muted/10 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition cursor-pointer"
        >
          <FolderUp class="h-4 w-4 text-primary" />
          <span>Load betslip code</span>
        </button>
      {/if}

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

    <!-- Bottom Area: Checkout Panel -->
    {#if betslip.count > 0}
      <div class="border-t border-border p-4 bg-muted/10 space-y-4 mt-auto shrink-0">
        <!-- Response Alerts -->
        {#if errorMessage}
          <div class="rounded bg-red-950/40 border border-red-800/80 px-3 py-2 text-xs text-red-400 font-bold leading-relaxed">{errorMessage}</div>
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

        <!-- Active Share Slip Code Display -->
        {#if shareCodeResult}
          <div class="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-center text-xs font-bold text-amber-500">
            Share Code: <span class="font-mono text-sm font-black underline select-all">{shareCodeResult}</span>
          </div>
        {/if}

        <!-- Stake Form -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-muted-foreground">Stake {betMode === 'SINGLE' ? 'per Bet' : 'Amount'}</span>
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
            <span>{betMode === 'SINGLE' ? 'Total Required Stake' : 'Overall Odds'}</span>
            <span class="text-foreground font-black">
              {betMode === 'SINGLE' ? formatCurrency(totalRequiredStake, wallet.currency) : betslip.totalOdds.toFixed(2)}
            </span>
          </div>
          <div class="flex justify-between border-t border-border pt-1.5">
            <span class="text-foreground font-bold">Potential Payout</span>
            <span class="text-primary font-black text-sm">{formatCurrency(potentialWin, wallet.currency)}</span>
          </div>
        </div>

        <div class="flex gap-2">
          <!-- Share Slip Button -->
          <Button 
            onclick={handleShareSlip}
            disabled={isSharing || isSubmitting}
            variant="outline"
            class="h-11 px-4 border-border bg-background text-foreground hover:bg-muted font-bold rounded-lg cursor-pointer"
            title="Share Selections"
          >
            <Share2 class="h-4 w-4 text-primary" />
          </Button>

          <!-- Place Bet Button -->
          <Button 
            onclick={handleAction}
            disabled={isSubmitting || !stakeIsValid}
            class="flex-1 h-11 text-neutral-950 font-black rounded-lg transition shadow-md gap-2 cursor-pointer
              {needsTopup 
                ? 'bg-emerald-500 hover:bg-emerald-400' 
                : 'bg-primary hover:bg-primary/95'}
              disabled:bg-neutral-800 disabled:text-neutral-500"
          >
            {#if isSubmitting}
              <LoaderCircle class="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            {:else}
              {#if needsTopup}
                <Smartphone class="h-4 w-4" />
              {/if}
              <span>{needsTopup ? 'Place Bet' : 'Place Bets'}</span>
            {/if}
          </Button>
        </div>
      </div>
    {/if}
  </div>
</div>