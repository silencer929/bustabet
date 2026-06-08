<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Tv, Plus, ShieldAlert, CheckCircle2, ChevronRight, Search, Filter } from 'lucide-svelte';

  let { data, form } = $props<{
    data: { games: any[] };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

  let isSubmitting = $state(false);
  let isAddOpen = $state(false);

  // Svelte 5 state variables tracking the active filter configurations
  let searchQuery = $state('');
  let selectedSport = $state('all');
  let selectedStatus = $state('all');

  // Svelte 5 derived state: executes real-time filtering whenever inputs are changed
  const filteredGames = $derived(
    data.games.filter((game:any) => {
      const matchesSearch = 
        game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.league.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSport = selectedSport === 'all' || game.sport === selectedSport;
      const matchesStatus = selectedStatus === 'all' || game.status === selectedStatus;

      return matchesSearch && matchesSport && matchesStatus;
    })
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-red-950/40 text-red-400 border-red-800/80';
      case 'UPCOMING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      default: return 'bg-background text-muted-foreground border-neutral-700';
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
    <div class="flex items-center gap-2">
      <Tv class="h-5 w-5 text-red-500" />
      <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Fixtures Directory</h1>
    </div>

    <Button 
      onclick={() => isAddOpen = !isAddOpen}
      class="h-10 bg-red-600 text-foreground font-bold rounded-lg gap-1.5 shadow-md hover:bg-red-500"
    >
      <Plus class="h-4 w-4" />
      Manually Add Game
    </Button>
  </div>

  {#if isAddOpen}
    <!-- Add Game Card Form -->
    <div class="rounded-2xl border border-border bg-background/40 p-6 space-y-4 max-w-2xl">
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
            <label for="sport" class="text-xs font-bold text-muted-foreground">Sport Category</label>
            <select id="sport" name="sport" required class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-red-500 focus:outline-none">
              <option value="soccer_english_premier_league">Premier League Football</option>
              <option value="basketball_nba">NBA Basketball</option>
              <option value="tennis_atp_singles">Tennis ATP</option>
              <option value="americanfootball_nfl">NFL Football</option>
            </select>
          </div>

          <!-- League Title -->
          <div class="space-y-1.5">
            <label for="league" class="text-xs font-bold text-muted-foreground">League / Tournament</label>
            <Input id="league" name="league" type="text" required placeholder="La Liga" class="bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label for="homeTeam" class="text-xs font-bold text-muted-foreground">Home Team</label>
            <Input id="homeTeam" name="homeTeam" type="text" required placeholder="Barcelona" class="bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground" />
          </div>

          <div class="space-y-1.5">
            <label for="awayTeam" class="text-xs font-bold text-muted-foreground">Away Team</label>
            <Input id="awayTeam" name="awayTeam" type="text" required placeholder="Real Madrid" class="bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label for="startTime" class="text-xs font-bold text-muted-foreground">Kickoff Date & Time</label>
          <Input id="startTime" name="startTime" type="datetime-local" required class="bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground" />
        </div>

        <div class="flex justify-end pt-2">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            class="h-11 px-6 bg-red-600 hover:bg-red-500 text-foreground font-black rounded-lg shadow-md transition"
          >
            {isSubmitting ? 'Registering...' : 'Register Game'}
          </Button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Interactive Filters Panel (Typing Search & Select Dropdowns) -->
  <div class="rounded-xl border border-border bg-background/20 p-4 flex flex-col md:flex-row items-center gap-3">
    <!-- Typing Search input -->
    <div class="relative w-full md:flex-1">
      <Search class="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
      <Input 
        type="text" 
        bind:value={searchQuery}
        placeholder="Search by team or league..." 
        class="h-10 w-full pl-9 bg-background border-border focus:border-red-500 text-xs font-semibold text-foreground"
      />
    </div>

    <div class="flex items-center gap-3 w-full md:w-auto shrink-0">
      <!-- Sport Filter Dropdown -->
      <select 
        bind:value={selectedSport}
        class="flex h-10 w-full md:w-44 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
      >
        <option value="all">All Sports</option>
        <option value="soccer_english_premier_league">Premier League</option>
        <option value="basketball_nba">NBA</option>
        <option value="tennis_atp_singles">Tennis ATP</option>
        <option value="americanfootball_nfl">NFL</option>
      </select>

      <!-- Status Filter Dropdown -->
      <select 
        bind:value={selectedStatus}
        class="flex h-10 w-full md:w-36 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
      >
        <option value="all">All Statuses</option>
        <option value="UPCOMING">Upcoming</option>
        <option value="LIVE">Live</option>
        <option value="COMPLETED">Completed</option>
      </select>
    </div>
  </div>

  <!-- Active Games List (Renders the reactive, filtered derived array) -->
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Fixtures Matches</h3>
      <span class="text-[10px] font-bold text-neutral-600">Showing {filteredGames.length} of {data.games.length} entries</span>
    </div>

    {#if filteredGames.length === 0}
      <!-- Empty Filter State fallback -->
      <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">
        No matches match the active search or filter configuration.
      </div>
    {:else}
      <div class="space-y-2">
        {#each filteredGames as game}
          <a 
            href="/admin/games/{game.id}" 
            class="flex items-center justify-between border border-border/80 bg-background/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"
          >
            <div class="flex items-center gap-4">
              <div class="rounded-lg bg-background p-2.5 border border-border text-muted-foreground">
                <Tv class="h-4 w-4 text-red-500" />
              </div>
              <div>
                <div class="text-xs font-bold text-foreground">{game.homeTeam} vs {game.awayTeam}</div>
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