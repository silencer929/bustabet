<script lang="ts">
  import { enhance } from '$app/forms';
  import { auth } from '$lib/stores/auth.svelte';
  import { formatCurrency } from '$lib/utils/currency';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { ShieldAlert, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-svelte';

  // Svelte 5 layout properties capturing load balance data and action results
  let { data, form } = $props<{
    data: { balance: number };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

  let isSubmitting = $state(false);
  let inputAmount = $state<number | null>(null);

  // Derived client-side check to determine if entered value exceeds account limits
  const exceedsBalance = $derived(inputAmount !== null && inputAmount > data.balance);
</script>

<div class="space-y-6">
  <!-- Back Navigation Button -->
  <a href="/wallet" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">
    <ArrowUpRight class="h-4 w-4" />
    <span>Back to Wallet</span>
  </a>

  <div class="flex items-center justify-center min-h-[calc(100vh-16rem)]">
    <div class="w-full max-w-md rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6">
      <!-- Title Header -->
      <div class="text-center space-y-1.5">
        <h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">
          <ArrowUpRight class="h-5 w-5 text-amber-500" />
          Request Withdrawal
        </h2>
        <p class="text-xs text-neutral-500 font-semibold">Withdraw funds from your active wallet ledger</p>
      </div>

      {#if form?.success}
        <!-- Success State: Request logged -->
        <div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3">
          <div class="flex justify-center">
            <CheckCircle2 class="h-8 w-8 text-green-500 animate-bounce" />
          </div>
          <p class="text-xs text-green-400 font-bold leading-relaxed">{form.message}</p>
          <div class="pt-2">
            <a href="/wallet">
              <Button class="h-10 w-full bg-amber-500 text-neutral-950 font-black rounded-lg">
                View Wallet Dashboard
              </Button>
            </a>
          </div>
        </div>
      {:else}
        <!-- Withdrawal Request Form -->
        <form 
          method="POST" 
          use:enhance={() => {
            isSubmitting = true;
            return async ({ update }) => {
              isSubmitting = false;
              update();
            };
          }}
          class="space-y-4"
        >
          {#if form?.error}
            <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">
              <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
              <span>{form.error}</span>
            </div>
          {/if}

          <!-- Balance Metric Display -->
          <div class="rounded-lg bg-background border border-border/80 px-4 py-2.5 flex justify-between items-center text-xs font-bold">
            <span class="text-neutral-500">Available Balance</span>
            <span class="text-foreground">{formatCurrency(data.balance, auth.user?.currency || 'USD')}</span>
          </div>

          <!-- Amount Input -->
          <div class="space-y-1.5">
            <label for="amount" class="text-xs font-bold text-muted-foreground">Withdrawal Amount</label>
            <div class="relative">
              <Input 
                id="amount" 
                name="amount" 
                type="number" 
                required 
                bind:value={inputAmount}
                placeholder="500" 
                disabled={isSubmitting}
                class="bg-background border-border focus:border-amber-500 text-xs h-10 pr-12 font-bold text-foreground" 
              />
              <span class="absolute right-3 top-2.5 text-xs font-bold text-neutral-500">{auth.user?.currency || 'KES'}</span>
            </div>
            {#if exceedsBalance}
              <span class="text-[10px] text-red-400 font-bold block">Entered amount exceeds your available balance limit</span>
            {/if}
          </div>

          <!-- Destination Identifier (Phone or Account number) -->
          <div class="space-y-1.5">
            <label for="destination" class="text-xs font-bold text-muted-foreground">Destination Number / Account</label>
            <Input 
              id="destination" 
              name="destination" 
              type="text" 
              required 
              value={auth.user?.phone || ''}
              placeholder="+254712345678" 
              disabled={isSubmitting}
              class="bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground" 
            />
            <span class="text-[10px] text-neutral-500 block">Payouts are sent to this registered telephone or account number</span>
          </div>

          <!-- Action Button -->
          <Button 
            type="submit" 
            disabled={isSubmitting || exceedsBalance || inputAmount === null || inputAmount <= 0}
            class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500"
          >
            {#if isSubmitting}
              <div class="flex items-center justify-center gap-2">
                <Loader2 class="h-4 w-4 animate-spin" />
                Requesting payout...
              </div>
            {:else}
              Request Withdrawal
            {/if}
          </Button>
        </form>
      {/if}
    </div>
  </div>
</div>