<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import MatchCard from '$lib/components/sportsbook/MatchCard.svelte';
  import { Trophy, SearchCode, X } from 'lucide-svelte';

  let { data } = $props<{ data: { games: GameWithMarkets[]; searchQuery: string | null } }>();
</script>

<div class="space-y-6">
  <!-- Section Header -->
  <div class="flex items-center justify-between border-b border-neutral-800/80 pb-4">
    <div class="flex items-center gap-2">
      <Trophy class="h-5 w-5 text-amber-500" />
      <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">
        {#if data.searchQuery}
          Search Results for "{data.searchQuery}"
        {:else}
          Live & Upcoming Matches
        {/if}
      </h1>
    </div>

    <!-- Clear Search Button -->
    {#if data.searchQuery}
      <a href="/sportsbook" class="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-white transition">
        <span>Clear Search</span>
        <X class="h-4 w-4" />
      </a>
    {/if}
  </div>

  {#if data.games.length === 0}
    <!-- Empty State -->
    <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 py-24 text-center">
      <div class="rounded-full bg-background p-4 border border-neutral-800 mb-4">
        <SearchCode class="h-8 w-8 text-neutral-600" />
      </div>
      <h2 class="text-lg font-black text-neutral-400">NO GAMES MATCHED</h2>
      <p class="text-xs text-neutral-600 mt-1 max-w-xs">No active wagers match your search query. Try typing another team or league.</p>
    </div>
  {:else}
    <!-- Active Matches -->
    <div class="flex flex-col gap-3">
      {#each data.games as game}
        <MatchCard {game} activeMarket="h2h" />
      {/each}
    </div>
  {/if}
</div>