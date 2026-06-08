<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Users, ChevronLeft, ShieldAlert, CheckCircle2, KeyRound, Coins, History, Ticket } from 'lucide-svelte';

  let { data, form } = $props<{
    data: { targetProfile: any; balance: number; vipTiers: any[]; transactions: any[]; bets: any[] };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

  let isSubmitting = $state(false);
  let activeTab = $state<'bets' | 'transactions'>('bets');

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'COMPLETED': case 'WON': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80';
      case 'PENDING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      default: return 'bg-red-950/40 text-red-400 border-red-800/80';
    }
  };
</script>

<div class="space-y-6">
  <!-- Back button -->
  <a href="/admin/users" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-foreground transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Users</span>
  </a>

  <!-- Feedback Alerts -->
  {#if form?.error}
    <div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold max-w-lg">
      <ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
      <span>{form.error}</span>
    </div>
  {/if}
  {#if form?.success}
    <div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold max-w-lg">
      <CheckCircle2 class="h-4 w-4 shrink-0 mt-0.5" />
      <span>{form.message}</span>
    </div>
  {/if}

  <!-- Header Banner -->
  <div class="rounded-2xl border border-border bg-background/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <span class="text-[9px] font-black tracking-widest text-neutral-500 uppercase">Player Account Console</span>
      <h2 class="text-xl font-black text-neutral-100 mt-1">{data.targetProfile.username}</h2>
      <p class="text-xs text-neutral-500 font-medium">{data.targetProfile.email}</p>
    </div>

    <div class="text-right shrink-0">
      <span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Active Wallet Balance</span>
      <div class="text-2xl font-black text-amber-500 tracking-tight">{formatCurrency(data.balance, data.targetProfile.currency)}</div>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <!-- Left Panel: Profile settings and security -->
    <div class="space-y-6">
      <!-- Form: Permissions and Loyalty Tier -->
      <div class="rounded-xl border border-border bg-background/20 p-5 space-y-4">
        <h3 class="text-xs font-black text-foreground uppercase tracking-widest border-b border-border pb-2">Modify Status</h3>
        <form 
          method="POST" 
          action="?/updateProfile"
          use:enhance={() => {
            isSubmitting = true;
            return async ({ update }) => {
              isSubmitting = false;
              update();
            };
          }}
          class="space-y-3.5"
        >
          <div class="space-y-1">
            <label for="role" class="text-xs font-bold text-neutral-500">System Role</label>
            <select id="role" name="role" value={data.targetProfile.user.role} class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none">
              <option value="PLAYER">PLAYER</option>
              <option value="SUPPORT">SUPPORT</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div class="space-y-1">
            <label for="vipTierId" class="text-xs font-bold text-neutral-500">VIP Loyalty Level</label>
            <select id="vipTierId" name="vipTierId" value={data.targetProfile.vipTierId} class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none">
              {#each data.vipTiers as tier}
                <option value={tier.id}>{tier.name} (Min: {tier.minPoints})</option>
              {/each}
            </select>
          </div>

          <Button type="submit" disabled={isSubmitting} class="w-full bg-red-600 hover:bg-red-500 text-foreground font-bold h-10 rounded-lg text-xs">Save Status</Button>
        </form>
      </div>

      <!-- Form: Password reset override -->
      <div class="rounded-xl border border-border bg-background/20 p-5 space-y-4">
        <h3 class="text-xs font-black text-foreground uppercase tracking-widest border-b border-border pb-2 flex items-center gap-1.5">
          <KeyRound class="h-4 w-4 text-red-500" />
          <span>Reset Password</span>
        </h3>
        <form 
          method="POST" 
          action="?/resetPassword"
          use:enhance={() => {
            isSubmitting = true;
            return async ({ update }) => {
              isSubmitting = false;
              update();
            };
          }}
          class="space-y-3.5"
        >
          <div class="space-y-1.5">
            <label for="newPassword" class="text-xs font-bold text-neutral-500">New Password</label>
            <Input id="newPassword" name="newPassword" type="password" required placeholder="••••••••" disabled={isSubmitting} class="bg-background border-border focus:border-red-500 text-xs h-10 font-medium text-foreground" />
          </div>
          <Button type="submit" disabled={isSubmitting} class="w-full bg-red-600 hover:bg-red-500 text-foreground font-bold h-10 rounded-lg text-xs">Reset Password</Button>
        </form>
      </div>

      <!-- Form: Balance Adjustment -->
      <div class="rounded-xl border border-border bg-background/20 p-5 space-y-4">
        <h3 class="text-xs font-black text-foreground uppercase tracking-widest border-b border-border pb-2 flex items-center gap-1.5">
          <Coins class="h-4 w-4 text-red-500" />
          <span>Balance Adjustment</span>
        </h3>
        <form 
          method="POST" 
          action="?/manualAdjustment"
          use:enhance={() => {
            isSubmitting = true;
            return async ({ update }) => {
              isSubmitting = false;
              update();
            };
          }}
          class="space-y-3.5"
        >
          <div class="space-y-1">
            <label for="type" class="text-xs font-bold text-neutral-500">Adjustment Type</label>
            <select id="type" name="type" required class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none">
              <option value="DEPOSIT">DEPOSIT (Add Credit)</option>
              <option value="WITHDRAWAL">WITHDRAWAL (Deduct Debit)</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label for="amount" class="text-xs font-bold text-neutral-500">Amount</label>
            <Input id="amount" name="amount" type="number" step="0.01" required placeholder="500" disabled={isSubmitting} class="bg-background border-border focus:border-red-500 text-xs h-10 font-medium text-foreground" />
          </div>

          <Button type="submit" disabled={isSubmitting} class="w-full bg-red-600 hover:bg-red-500 text-foreground font-bold h-10 rounded-lg text-xs">Process Adjustment</Button>
        </form>
      </div>
    </div>

    <!-- Right Panel: Tabbed history logs (bets vs transactions) -->
    <div class="lg:col-span-2 space-y-4">
      <!-- Tabs header buttons -->
      <div class="flex items-center gap-1.5 rounded-xl border border-border bg-background/20 p-1.5 w-full sm:w-auto">
        <Button
          variant="ghost"
          onclick={() => activeTab = 'bets'}
          class="h-9 flex-1 sm:flex-initial rounded-lg px-4 text-xs font-bold transition-all duration-150 gap-1.5
            {activeTab === 'bets' ? 'bg-background text-red-500' : 'text-muted-foreground hover:text-foreground'}"
        >
          <Ticket class="h-4 w-4" />
          Bets History
        </Button>
        <Button
          variant="ghost"
          onclick={() => activeTab = 'transactions'}
          class="h-9 flex-1 sm:flex-initial rounded-lg px-4 text-xs font-bold transition-all duration-150 gap-1.5
            {activeTab === 'transactions' ? 'bg-background text-red-500' : 'text-muted-foreground hover:text-foreground'}"
        >
          <History class="h-4 w-4" />
          Transactions Ledger
        </Button>
      </div>

      <!-- Tab Content: Bets -->
      {#if activeTab === 'bets'}
        {#if data.bets.length === 0}
          <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">
            No registered wagers logged for this player.
          </div>
        {:else}
          <div class="space-y-3">
            {#each data.bets as bet}
              <div class="rounded-xl border border-border bg-background/40 p-4 flex justify-between items-center gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-foreground">{bet.game.homeTeam} vs {bet.game.awayTeam}</span>
                    <Badge class="border text-[8px] font-bold px-1.5 py-0 rounded {getStatusClass(bet.status)}">
                      {bet.status}
                    </Badge>
                  </div>
                  <div class="text-[10px] text-neutral-500">
                    Selection: <span class="text-amber-500 font-bold">{bet.market.selection}</span> &bull; 
                    Odds: {bet.odds.toFixed(2)} &bull; 
                    Placed {formatGameTime(bet.createdAt)}
                  </div>
                  <div class="text-[10px] text-muted-foreground font-bold">
                    Stake: {formatCurrency(bet.stake, 'USD')} &bull; 
                    Payout: <span class="text-emerald-500">{formatCurrency(bet.potentialWin, 'USD')}</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      {:else}
        <!-- Tab Content: Transactions -->
        {#if data.transactions.length === 0}
          <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">
            No transaction records in this player's ledger.
          </div>
        {:else}
          <div class="space-y-2">
            {#each data.transactions as tx}
              <div class="flex items-center justify-between border border-border bg-background/40 p-3.5 rounded-xl">
                <div>
                  <div class="text-xs font-bold text-foreground">{tx.type}</div>
                  <div class="text-[10px] text-neutral-500 mt-1">Ref: {tx.reference} &bull; {formatGameTime(tx.createdAt)}</div>
                </div>

                <div class="flex items-center gap-4">
                  <span class="text-xs font-black {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? 'text-emerald-500' : 'text-red-500'}">
                    {tx.type === 'DEPOSIT' || tx.type === 'PAYOUT' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
                  </span>
                  <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded {getStatusClass(tx.status)}">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>