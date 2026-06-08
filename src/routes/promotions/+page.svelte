<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Gift, Calendar, ArrowRight, ShieldCheck } from 'lucide-svelte';

  // Svelte 5 layout page properties capturing loaded promotions
  let { data } = $props<{ data: { promotions: any[] } }>();
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-border/80 pb-3">
    <Gift class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Offers & Promotions</h1>
  </div>

  {#if data.promotions.length === 0}
    <!-- Empty State -->
    <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
      <div class="rounded-full bg-background p-4 border border-border mb-4">
        <Gift class="h-8 w-8 text-neutral-600" />
      </div>
      <h2 class="text-lg font-black text-muted-foreground">No Active Offers</h2>
      <p class="text-xs text-neutral-600 mt-1 max-w-xs">There are no active promotional campaigns running at the moment. Please check back soon!</p>
    </div>
  {:else}
    <!-- Promotions Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      {#each data.promotions as promo}
        <div class="rounded-2xl border border-border bg-background/40 overflow-hidden flex flex-col justify-between transition hover:border-neutral-700">
          <div class="p-6 space-y-4">
            <!-- Header Badge -->
            <div class="flex items-center gap-2">
              <span class="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] font-black tracking-wider text-amber-500 uppercase">Active Offer</span>
              {#if promo.bonusAmount > 0}
                <span class="text-xs font-bold text-muted-foreground">Up to {formatCurrency(promo.bonusAmount, auth.user?.currency || 'USD')} Bonus</span>
              {/if}
            </div>

            <!-- Promotion Title -->
            <h2 class="text-lg font-black text-neutral-100 leading-snug">{promo.title}</h2>
            <p class="text-xs text-neutral-500 font-semibold leading-relaxed">{promo.description || 'No description available for this campaign.'}</p>
          </div>

          <!-- Bottom Footer Details -->
          <div class="border-t border-border/60 p-4 bg-background/40 flex items-center justify-between text-[10px] font-bold text-neutral-500">
            <div class="flex items-center gap-1.5">
              <Calendar class="h-3.5 w-3.5 text-neutral-600" />
              <span>Ends {formatGameTime(promo.endDate)}</span>
            </div>
            
            <a href="/wallet/deposit">
              <Button variant="ghost" class="h-8 text-[10px] font-black text-amber-500 hover:text-amber-400 px-2 gap-1 rounded-lg">
                <span>Deposit & Claim</span>
                <ArrowRight class="h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>