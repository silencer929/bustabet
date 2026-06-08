<script lang="ts">
  import { formatCurrency } from '$lib/utils/currency';
  import { 
    Users, 
    Ticket, 
    Coins, 
    HelpCircle,
    Activity
  } from 'lucide-svelte';

  // Svelte 5 page properties capturing loaded admin aggregates
  let { data } = $props<{
    data: {
      stats: {
        totalUsers: number;
        pendingBetsCount: number;
        pendingBetsTurnover: number;
        pendingWithdrawalsAmount: number;
        openTicketsCount: number;
      };
    };
  }>();
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <Activity class="h-5 w-5 text-red-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Overview Analytics</h1>
  </div>

  <!-- Stats Grid Cards -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Card: Total Registrations -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex items-center gap-4">
      <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
        <Users class="h-5 w-5 text-blue-500" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total Players</span>
        <div class="text-xl font-black text-neutral-100">{data.stats.totalUsers}</div>
      </div>
    </div>

    <!-- Card: Active Wagers Count -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex items-center gap-4">
      <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
        <Ticket class="h-5 w-5 text-amber-500" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Pending Bets</span>
        <div class="text-xl font-black text-neutral-100">{data.stats.pendingBetsCount}</div>
      </div>
    </div>

    <!-- Card: Locked Bet Stake Turnover -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex items-center gap-4">
      <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
        <Coins class="h-5 w-5 text-emerald-500" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Pending Stake</span>
        <div class="text-xl font-black text-neutral-100">
          {formatCurrency(data.stats.pendingBetsTurnover, 'USD')}
        </div>
      </div>
    </div>

    <!-- Card: Open Support Tickets -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex items-center gap-4">
      <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
        <HelpCircle class="h-5 w-5 text-purple-500" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Open Tickets</span>
        <div class="text-xl font-black text-neutral-100">{data.stats.openTicketsCount}</div>
      </div>
    </div>
  </div>

  <!-- Financial Payout Liabilities Banner -->
  <div class="rounded-2xl border border-neutral-800/80 bg-red-950/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div class="space-y-1">
      <h3 class="text-xs font-black tracking-widest text-red-400 uppercase">Immediate Payout Liability</h3>
      <p class="text-xs text-neutral-500 font-semibold leading-relaxed">This represents the total financial volume of pending user withdrawal requests awaiting review and approval.</p>
    </div>

    <div class="text-right shrink-0">
      <span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Liability Total</span>
      <div class="text-2xl font-black text-red-500 tracking-tight">
        {formatCurrency(data.stats.pendingWithdrawalsAmount, 'USD')}
      </div>
    </div>
  </div>
</div>