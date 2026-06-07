<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import MatchCard from '$lib/components/sportsbook/MatchCard.svelte';
  import { Trophy } from 'lucide-svelte';

  // Svelte 5 page properties capturing mapped sport details
  let { data } = $props<{ data: { games: GameWithMarkets[]; sportTitle: string } }>();
</script>

<div class="space-y-6">
  <!-- Section Title -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <Trophy class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">{data.sportTitle}</h1>
  </div>

  {#if data.games.length === 0}
    <!-- Empty State: Sportsbook Fallback matching "NO GAMES" reference from Image 1 -->
    <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 py-24 text-center">
      <div class="rounded-full bg-neutral-900 p-4 border border-neutral-800 mb-4">
        <Trophy class="h-8 w-8 text-neutral-600" />
      </div>
      <h2 class="text-lg font-black text-neutral-400">NO GAMES</h2>
      <p class="text-xs text-neutral-600 mt-1 max-w-xs">There are no active or upcoming fixtures listed for {data.sportTitle} at the moment.</p>
    </div>
  {:else}
    <!-- Active Matches Grid -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {#each data.games as game}
        <MatchCard {game} />
      {/each}
    </div>
  {/if}
</div>