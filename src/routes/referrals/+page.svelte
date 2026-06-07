<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { formatCurrency } from '$lib/utils/currency';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { toast } from 'svelte-sonner';
  import { Share2, Copy, Users, Trophy, ClipboardCheck } from 'lucide-svelte';

  // Svelte 5 page properties capturing loaded referral metrics
  let { data } = $props<{
    data: { referralCode: string; refereesCount: number; referrals: any[] };
  }>();

  let hasCopied = $state(false);

  // Computes the dynamic registration link appended with the player's custom referral code
  const referralLink = $derived(`https://championbet.space/auth/register?ref=${data.referralCode}`);

  // Triggers clipboard write copy utilities and displays a sonner toast confirmation
  function handleCopy() {
    navigator.clipboard.writeText(referralLink);
    hasCopied = true;
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => (hasCopied = false), 2000);
  }
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <Share2 class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Affiliate Center</h1>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <!-- Active sign-ups -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex items-center gap-4">
      <div class="rounded-full bg-neutral-950 p-3 border border-neutral-800 text-amber-500">
        <Users class="h-5 w-5" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total Referees</span>
        <div class="text-2xl font-black text-neutral-100">{data.refereesCount}</div>
      </div>
    </div>

    <!-- Active sign-ups -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex items-center gap-4">
      <div class="rounded-full bg-neutral-950 p-3 border border-neutral-800 text-amber-500">
        <Trophy class="h-5 w-5" />
      </div>
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Commission Earned</span>
        <div class="text-2xl font-black text-neutral-100">
          {formatCurrency(data.referrals.reduce((sum: number, r: { commission: number }) => sum + r.commission, 0), auth.user?.currency || 'USD')}
        </div>
      </div>
    </div>
  </div>

  <!-- Referral Link Box -->
  <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
    <div class="space-y-1.5">
      <h2 class="text-xs font-black tracking-widest text-neutral-300 uppercase">My Invite Link</h2>
      <p class="text-xs text-neutral-500 font-semibold leading-relaxed">Share this custom link with friends. You will receive commissions on their turnovers and initial deposits!</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-2">
      <div class="flex-1 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-mono font-bold text-neutral-300 truncate">
        {referralLink}
      </div>
      <Button 
        onclick={handleCopy}
        class="h-11 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg gap-2 shadow-md shrink-0"
      >
        {#if hasCopied}
          <ClipboardCheck class="h-4 w-4" />
          <span>Copied!</span>
        {:else}
          <Copy class="h-4 w-4" />
          <span>Copy Link</span>
        {/if}
      </Button>
    </div>
  </div>

  <!-- Referrals history logs -->
  <div class="space-y-3">
    <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Referee Commission Ledgers</h3>

    {#if data.referrals.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-neutral-800 rounded-lg">
        No active referrals logged yet
      </div>
    {:else}
      <div class="space-y-2">
        {#each data.referrals as ref}
          <div class="flex items-center justify-between border border-neutral-800 bg-neutral-900/40 p-4 rounded-xl">
            <div>
              <div class="text-xs font-bold text-neutral-200">User: {ref.referee.username}</div>
              <div class="text-[10px] text-neutral-500 mt-1">Converted: {formatGameTime(ref.createdAt)}</div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-xs font-black text-emerald-500">+{formatCurrency(ref.commission, auth.user?.currency || 'USD')}</span>
              <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded
                {ref.status === 'PAID' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80' : 'bg-amber-950/40 text-amber-400 border-amber-800/80'}"
              >
                {ref.status}
              </Badge>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>