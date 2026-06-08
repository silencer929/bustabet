<script lang="ts">
  import { enhance } from '$app/forms';
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { ShieldAlert, ArrowDownLeft, CheckCircle2, Loader2 } from 'lucide-svelte';

  // Svelte 5 page properties capturing server loaded actions responses
  let { form } = $props<{ form: { error?: string; success?: boolean; message?: string } | null }>();

  let isSubmitting = $state(false);
</script>

<div class="space-y-6">
  <!-- Back Navigation Button -->
  <a href="/wallet" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">
    <ArrowDownLeft class="h-4 w-4" />
    <span>Back to Wallet</span>
  </a>

  <div class="flex items-center justify-center min-h-[calc(100vh-16rem)]">
    <div class="w-full max-w-md rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6">
      <!-- Title Header -->
      <div class="text-center space-y-1.5">
        <h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">
          <ArrowDownLeft class="h-5 w-5 text-amber-500" />
          Deposit Funds
        </h2>
        <p class="text-xs text-neutral-500 font-semibold">Initiate an instant Safaricom M-Pesa STK push deposit</p>
      </div>

      {#if form?.success}
        <!-- Success State: Prompt successfully sent -->
        <div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3">
          <div class="flex justify-center">
            <CheckCircle2 class="h-8 w-8 text-green-500 animate-bounce" />
          </div>
          <p class="text-xs text-green-400 font-bold leading-relaxed">{form.message}</p>
          <p class="text-[10px] text-neutral-500">Please enter your M-Pesa PIN on your phone to authorize. Your balance will update instantly upon confirmation.</p>
          <div class="pt-2">
            <a href="/wallet">
              <Button class="h-10 w-full bg-amber-500 text-neutral-950 font-black rounded-lg">
                View Wallet Balance
              </Button>
            </a>
          </div>
        </div>
      {:else}
        <!-- Payment Request Form -->
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

          <!-- Amount Input -->
          <div class="space-y-1.5">
            <label for="amount" class="text-xs font-bold text-muted-foreground">Amount to Deposit</label>
            <div class="relative">
              <Input 
                id="amount" 
                name="amount" 
                type="number" 
                required 
                placeholder="500" 
                disabled={isSubmitting}
                class="bg-background border-border focus:border-amber-500 text-xs h-10 pr-12 font-bold text-foreground" 
              />
              <span class="absolute right-3 top-2.5 text-xs font-bold text-neutral-500">{auth.user?.currency || 'KES'}</span>
            </div>
          </div>

          <!-- M-Pesa Phone Number Input -->
          <div class="space-y-1.5">
            <label for="phone" class="text-xs font-bold text-muted-foreground">M-Pesa Mobile Number</label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              required 
              value={auth.user?.phone || ''}
              placeholder="+254712345678" 
              disabled={isSubmitting}
              class="bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground" 
            />
            <span class="text-[10px] text-neutral-500 block">Please enter in international E.164 format (+254...)</span>
          </div>

          <!-- Action Button -->
          <Button 
            type="submit" 
            disabled={isSubmitting}
            class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500"
          >
            {#if isSubmitting}
              <div class="flex items-center justify-center gap-2">
                <Loader2 class="h-4 w-4 animate-spin" />
                Sending prompt...
              </div>
            {:else}
              Request STK Push
            {/if}
          </Button>
        </form>
      {/if}
    </div>
  </div>
</div>