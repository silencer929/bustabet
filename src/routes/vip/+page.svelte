<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Crown, Sparkles, TrendingUp, ShieldCheck } from 'lucide-svelte';

  // Svelte 5 page properties capturing server loaded VIP details
  let { data } = $props<{
    data: { profile: any; pointsAccumulated: number; vipTiers: any[]; nextTier: any };
  }>();

  // Derived variables to calculate linear progress percentage toward the next level
  const progressMetrics = $derived.by(() => {
    if (!data.nextTier) return { percentage: 100, remaining: 0 };
    
    const currentTierMin = data.profile.vipTier?.minPoints || 0;
    const pointsNeeded = data.nextTier.minPoints - currentTierMin;
    const pointsAcquired = data.pointsAccumulated - currentTierMin;
    
    const percentage = Math.min(100, Math.max(0, (pointsAcquired / pointsNeeded) * 100));
    const remaining = data.nextTier.minPoints - data.pointsAccumulated;

    return { percentage, remaining };
  });
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <Crown class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">VIP Club</h1>
  </div>

  <!-- VIP Progress Dashboard Card -->
  <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="rounded-xl bg-neutral-950 p-4 border border-neutral-800 text-amber-500 shadow-sm relative">
          <Crown class="h-8 w-8 animate-pulse" />
          <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </div>
        
        <div>
          <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Active Loyalty Level</span>
          <h2 class="text-xl font-black text-neutral-100 tracking-tight">{data.profile.vipTier?.name || 'BRONZE LEVEL'}</h2>
        </div>
      </div>

      <div class="text-right">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total loyalty points</span>
        <div class="text-xl font-black text-amber-500 tracking-tight">{data.pointsAccumulated} Points</div>
      </div>
    </div>

    <!-- Svelte 5 Dynamic Progress Bar -->
    {#if data.nextTier}
      <div class="space-y-2 border-t border-neutral-800/60 pt-6">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-neutral-400 flex items-center gap-1.5">
            <TrendingUp class="h-4 w-4 text-neutral-500" />
            <span>Progress to {data.nextTier.name}</span>
          </span>
          <span class="text-amber-500">{progressMetrics.remaining} points remaining</span>
        </div>

        <div class="h-3 w-full bg-neutral-950 rounded-full border border-neutral-800 overflow-hidden p-0.5">
          <div 
            style="width: {progressMetrics.percentage}%" 
            class="h-full bg-amber-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
          ></div>
        </div>
      </div>
    {:else}
      <div class="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 text-center text-xs font-bold text-amber-500 flex items-center justify-center gap-2">
        <Sparkles class="h-4 w-4" />
        <span>Congratulations! You have reached our highest VIP rank.</span>
      </div>
    {/if}
  </div>

  <!-- Comparison Benefits Grid -->
  <div class="space-y-3">
    <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Loyalty Tier Benefits Comparison</h3>
    
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {#each data.vipTiers as tier}
        {@const isCurrent = data.profile.vipTier?.id === tier.id}
        <div class="rounded-xl border p-5 flex flex-col justify-between space-y-4 transition duration-150
          {isCurrent 
            ? 'border-amber-500 bg-amber-500/5 shadow-[0_0_12px_rgba(245,158,11,0.05)]' 
            : 'border-neutral-800 bg-neutral-900/20'}"
        >
          <div class="space-y-1">
            <h4 class="text-sm font-black text-neutral-100">{tier.name}</h4>
            <span class="text-[9px] font-bold text-neutral-500 tracking-wider">Required points: {tier.minPoints}</span>
          </div>

          <div class="border-t border-neutral-800/60 pt-3 space-y-2 text-xs font-semibold text-neutral-400">
            <div class="flex justify-between">
              <span>Monthly Cashback</span>
              <span class="text-neutral-200">{tier.cashbackPercent}%</span>
            </div>
            <div class="flex justify-between">
              <span>Deposit Bonus</span>
              <span class="text-neutral-200">+{tier.bonusPercent}%</span>
            </div>
          </div>

          {#if isCurrent}
            <div class="rounded bg-amber-500 text-neutral-950 text-center font-black py-1.5 text-[10px] tracking-widest uppercase">
              Current Rank
            </div>
          {:else}
            <div class="rounded bg-neutral-950 border border-neutral-800 text-neutral-500 text-center font-bold py-1.5 text-[10px] tracking-widest uppercase">
              Locked
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>