<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Tv, Plus, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-svelte';

  let { data, form } = $props<{
    data: { games: any[] };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

  let isSubmitting = $state(false);
  let isAddOpen = $state(false);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-red-950/40 text-red-400 border-red-800/80';
      case 'UPCOMING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      default: return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
    <div class="flex items-center gap-2">
      <Tv class="h-5 w-5 text-red-500" />
      <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Fixtures Directory</h1>
    </div>

    <!-- Toggle Add Game form collapse -->
    <Button 
      onclick={() => isAddOpen = !isAddOpen}
      class="h-10 bg-red-600 text-white font-bold rounded-lg gap-1.5 shadow-md hover:bg-red-500"
    >
      <Plus class="h-4 w-4" />
      Manually Add Game
    </Button>
  </div>

  {#if isAddOpen}
    <!-- Add Game Card Form -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4 max-w-2xl">
      <div class="space-y-1">
        <h2 class="text-sm font-black text-neutral-100 uppercase tracking-wider">Register New Match</h2>
        <p class="text-xs text-neutral-500 font-semibold">Enter details below to create a custom manual sports fixture</p>
      </div>

      <form 
        method="POST" 
        action="?/createGame"
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
        {#if form?.success}
          <div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold">
            <CheckCircle2 class="h-4 w-4 shrink-0 mt-0.5" />
            <span>{form.message}</span>
          </div>
        {/if}

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- Sport Selector -->
          <div class="space-y-1.5">
            <label for="sport" class="text-xs font-bold text-neutral-400">Sport Category</label>
            <select id="sport" name="sport" required class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none">
              <option value="soccer_english_premier_league">Premier League Football</option>
              <option value="basketball_nba">NBA Basketball</option>
              <option value="tennis_atp_singles">Tennis ATP</option>
              <option value="americanfootball_nfl">NFL Football</option>
            </select>
          </div>

          <!-- League Title -->
          <div class="space-y-1.5">
            <label for="league" class="text-xs font-bold text-neutral-400">League / Tournament</label>
            <Input id="league" name="league" type="text" required placeholder="La Liga" class="bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs h-10 font-bold text-neutral-200" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label for="homeTeam" class="text-xs font-bold text-neutral-400">Home Team</label>
            <Input id="homeTeam" name="homeTeam" type="text" required placeholder="Barcelona" class="bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs h-10 font-bold text-neutral-200" />
          </div>

          <div class="space-y-1.5">
            <label for="awayTeam" class="text-xs font-bold text-neutral-400">Away Team</label>
            <Input id="awayTeam" name="awayTeam" type="text" required placeholder="Real Madrid" class="bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs h-10 font-bold text-neutral-200" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label for="startTime" class="text-xs font-bold text-neutral-400">Kickoff Date & Time</label>
          <Input id="startTime" name="startTime" type="datetime-local" required class="bg-neutral-950 border-neutral-800 focus:border-red-500 text-xs h-10 font-bold text-neutral-200" />
        </div>

        <div class="flex justify-end pt-2">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            class="h-11 px-6 bg-red-600 hover:bg-red-500 text-white font-black rounded-lg shadow-md transition"
          >
            {isSubmitting ? 'Registering...' : 'Register Game'}
          </Button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Active Games List -->
  <div class="space-y-3">
    <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Active Games</h3>

    {#if data.games.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-neutral-800 rounded-lg">
        No games registered. Click "Manually Add Game" to start.
      </div>
    {:else}
      <div class="space-y-2">
        {#each data.games as game}
          <a 
            href="/admin/games/{game.id}" 
            class="flex items-center justify-between border border-neutral-800/80 bg-neutral-900/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"
          >
            <div class="flex items-center gap-4">
              <div class="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-neutral-400">
                <Tv class="h-4 w-4 text-red-500" />
              </div>
              <div>
                <div class="text-xs font-bold text-neutral-200">{game.homeTeam} vs {game.awayTeam}</div>
                <div class="text-[10px] text-neutral-500 mt-1">{game.league} &bull; Ref: {game.id} &bull; Kickoff {formatGameTime(game.startTime)}</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <Badge class="border text-[9px] font-bold px-2.5 py-0.5 rounded {getStatusClass(game.status)}">
                {game.status}
              </Badge>
              <ChevronRight class="h-4 w-4 text-neutral-500" />
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>