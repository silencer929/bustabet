<script lang="ts">
  import { formatCurrency } from '$lib/utils/currency';
  import { 
    Users, 
    Ticket, 
    Coins, 
    HelpCircle,
    Activity,
    ShieldAlert,
    BarChart3,
    ArrowUpRight,
    ArrowDownLeft
  } from 'lucide-svelte';

  // Svelte 5 page properties capturing expanded metrics
  let { data } = $props<{
    data: {
      stats: {
        totalUsers: number;
        pendingBetsCount: number;
        pendingBetsTurnover: number;
        pendingWithdrawalsAmount: number;
        openTicketsCount: number;
        pendingKycCount: number;
        totalTurnover: number;
        grossGamingRevenue: number;
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

  <!-- Primary Interactive Metrics Grid -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Card: Total Registrations (Links to Users Directory) -->
    <a 
      href="/admin/users" 
      class="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 flex items-center justify-between gap-4 transition duration-150 hover:border-red-500/40 hover:bg-neutral-900/60 group"
    >
      <div class="flex items-center gap-4">
        <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400 group-hover:text-white transition">
          <Users class="h-5 w-5 text-blue-500" />
        </div>
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total Players</span>
          <div class="text-xl font-black text-neutral-100">{data.stats.totalUsers}</div>
        </div>
      </div>
      <ArrowUpRight class="h-4 w-4 text-neutral-600 group-hover:text-red-400 transition" />
    </a>

    <!-- Card: Active Wagers Count (Links to Wagers Overwatch) -->
    <a 
      href="/admin/bets" 
      class="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 flex items-center justify-between gap-4 transition duration-150 hover:border-red-500/40 hover:bg-neutral-900/60 group"
    >
      <div class="flex items-center gap-4">
        <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400 group-hover:text-white transition">
          <Ticket class="h-5 w-5 text-amber-500" />
        </div>
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Pending Bets</span>
          <div class="text-xl font-black text-neutral-100">{data.stats.pendingBetsCount}</div>
        </div>
      </div>
      <ArrowUpRight class="h-4 w-4 text-neutral-600 group-hover:text-red-400 transition" />
    </a>

    <!-- Card: Pending Stakes (Links to Wagers Overwatch) -->
    <a 
      href="/admin/bets" 
      class="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 flex items-center justify-between gap-4 transition duration-150 hover:border-red-500/40 hover:bg-neutral-900/60 group"
    >
      <div class="flex items-center gap-4">
        <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400 group-hover:text-white transition">
          <Coins class="h-5 w-5 text-emerald-500" />
        </div>
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Pending Stake</span>
          <div class="text-xl font-black text-neutral-100">
            {formatCurrency(data.stats.pendingBetsTurnover, 'USD')}
          </div>
        </div>
      </div>
      <ArrowUpRight class="h-4 w-4 text-neutral-600 group-hover:text-red-400 transition" />
    </a>

    <!-- Card: Open Support Tickets (Links to Ticketing Board) -->
    <a 
      href="/admin/support" 
      class="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 flex items-center justify-between gap-4 transition duration-150 hover:border-red-500/40 hover:bg-neutral-900/60 group"
    >
      <div class="flex items-center gap-4">
        <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400 group-hover:text-white transition">
          <HelpCircle class="h-5 w-5 text-purple-500" />
        </div>
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Open Tickets</span>
          <div class="text-xl font-black text-neutral-100">{data.stats.openTicketsCount}</div>
        </div>
      </div>
      <ArrowUpRight class="h-4 w-4 text-neutral-600 group-hover:text-red-400 transition" />
    </a>
  </div>

  <!-- Secondary Advanced Insights Grid -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <!-- Card: Gross Gaming Revenue (GGR) -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex items-center gap-4">
      <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
        <BarChart3 class="h-5 w-5 text-emerald-500" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Gross Revenue (GGR)</span>
        <div class="text-xl font-black {data.stats.grossGamingRevenue >= 0 ? 'text-emerald-500' : 'text-red-500'}">
          {formatCurrency(data.stats.grossGamingRevenue, 'USD')}
        </div>
      </div>
    </div>

    <!-- Card: Total Volume Turnover -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex items-center gap-4">
      <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
        <Coins class="h-5 w-5 text-neutral-300" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total Turnover Volume</span>
        <div class="text-xl font-black text-neutral-100">
          {formatCurrency(data.stats.totalTurnover, 'USD')}
        </div>
      </div>
    </div>

    <!-- Card: Pending KYC Uploads (Links to KYC Audits) -->
    <a 
      href="/admin/verification" 
      class="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 flex items-center justify-between gap-4 transition duration-150 hover:border-red-500/40 hover:bg-neutral-900/60 group"
    >
      <div class="flex items-center gap-4">
        <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400 group-hover:text-white transition">
          <ShieldAlert class="h-5 w-5 text-amber-500" />
        </div>
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Pending KYC Uploads</span>
          <div class="text-xl font-black text-neutral-100">{data.stats.pendingKycCount}</div>
        </div>
      </div>
      <ArrowUpRight class="h-4 w-4 text-neutral-600 group-hover:text-red-400 transition" />
    </a>
  </div>

  <!-- Interactive Liability Payout Banner (Links to Transactions) -->
  <a 
    href="/admin/transactions" 
    class="block rounded-2xl border border-neutral-800/80 bg-red-950/5 hover:border-red-500/40 hover:bg-red-950/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-150 group"
  >
    <div class="space-y-1">
      <h3 class="text-xs font-black tracking-widest text-red-400 uppercase flex items-center gap-1.5">
        <span>Immediate Payout Liability</span>
        <ArrowUpRight class="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:text-red-400 transition" />
      </h3>
      <p class="text-xs text-neutral-500 font-semibold leading-relaxed">This represents the total financial volume of pending user withdrawal requests awaiting review and approval.</p>
    </div>

    <div class="text-right shrink-0">
      <span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Liability Total</span>
      <div class="text-2xl font-black text-red-500 tracking-tight">
        {formatCurrency(data.stats.pendingWithdrawalsAmount, 'USD')}
      </div>
    </div>
  </a>
</div>