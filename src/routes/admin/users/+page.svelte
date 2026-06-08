<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Users, Search, ChevronRight, ShieldCheck } from 'lucide-svelte';
  import type { FullProfileDetails } from '$lib/types/profile';

  let { data } = $props<{ data: { profiles: FullProfileDetails[] } }>();

  let searchQuery = $state('');

  // Svelte 5 derived state: executes real-time typing-based filters
  const filteredProfiles = $derived(
    data.profiles.filter((profile:any) => {
      return (
        profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (profile.fullName && profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
  );

  const getRoleClass = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-950/40 text-red-400 border-red-800/80';
      case 'SUPPORT': return 'bg-blue-950/40 text-blue-400 border-blue-800/80';
      default: return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <Users class="h-5 w-5 text-red-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">User Directory</h1>
  </div>

  <!-- Real-time Search input -->
  <div class="relative w-full">
    <Search class="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
    <Input 
      type="text" 
      bind:value={searchQuery}
      placeholder="Search by username, email, or full name..." 
      class="h-10 w-full pl-9 bg-neutral-900/40 border-neutral-800 focus:border-red-500 text-xs font-semibold text-neutral-200"
    />
  </div>

  <!-- User List -->
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Accounts Registry</h3>
      <span class="text-[10px] font-bold text-neutral-600">Showing {filteredProfiles.length} of {data.profiles.length} entries</span>
    </div>

    {#if filteredProfiles.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-neutral-800 rounded-lg">
        No registered player accounts match your active search filters.
      </div>
    {:else}
      <div class="space-y-2">
        {#each filteredProfiles as profile}
          <a 
            href="/admin/users/{profile.id}" 
            class="flex items-center justify-between border border-neutral-800/80 bg-neutral-900/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"
          >
            <div class="flex items-center gap-4">
              <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
                <Users class="h-4 w-4 text-red-500" />
              </div>
              <div>
                <div class="text-xs font-bold text-neutral-200">{profile.username} <span class="text-neutral-500">({profile.email})</span></div>
                <div class="text-[10px] text-neutral-500 mt-1">Country: {profile.country || 'Not Set'} &bull; Registered {formatGameTime(profile.createdAt)}</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <!-- VIP Tier badge -->
              <Badge class="bg-amber-500/10 border border-amber-500/20 text-[8px] font-black tracking-widest px-2 py-0 h-5 text-amber-500 uppercase">
                {profile.vipTier?.name || 'BRONZE'}
              </Badge>
              <!-- Role Badge -->
              <Badge class="border text-[9px] font-bold px-2.5 py-0.5 rounded {getRoleClass(profile.user.role)}">
                {profile.user.role}
              </Badge>
              <ChevronRight class="h-4 w-4 text-neutral-500" />
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>