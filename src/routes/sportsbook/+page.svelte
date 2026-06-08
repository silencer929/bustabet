<script lang="ts">
  import type { GameWithMarkets } from '$lib/types/game';
  import MatchCard from '$lib/components/sportsbook/MatchCard.svelte';
  import { Trophy } from 'lucide-svelte';

  // Svelte 5 properties capturing server-loaded games
  let { data } = $props<{ data: { games: GameWithMarkets[] } }>();
</script>

<div class="space-y-6">
  <!-- Section Header (Removed the global market selector) -->
  <div class="flex items-center gap-2 border-b border-border/80 pb-4">
    <Trophy class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Live & Upcoming Matches</h1>
  </div>

  {#if data.games.length === 0}
    <!-- Empty State: Sportsbook Fallback matching "NO GAMES" reference from Image 1 -->
    <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
      <div class="rounded-full bg-background p-4 border border-border mb-4">
        <Trophy class="h-8 w-8 text-neutral-600" />
      </div>
      <h2 class="text-lg font-black text-muted-foreground">NO GAMES</h2>
      <p class="text-xs text-neutral-600 mt-1 max-w-xs">There are no active or upcoming sports fixtures available at the moment. Please check back later.</p>
    </div>
  {:else}
    <!-- Active Matches: Rendered as a single vertical stack of full-width rows -->
    <div class="flex flex-col gap-3">
      {#each data.games as game}
        <!-- Locked to standard match results (h2h) for clean dashboard displays -->
        <MatchCard {game} activeMarket="h2h" />
      {/each}
    </div>
  {/if}
</div>