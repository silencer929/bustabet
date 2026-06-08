<script lang="ts">
  import { page } from '$app/stores';
  import { 
    Flame, 
    Trophy,
    TrophyIcon,
    Tv, 
    FolderClosed,
    Target
  } from 'lucide-svelte';

  // Helper to determine if a specific sport filter is currently active in the URL
    function isActive(sportPath: string) {
      return $page.url.pathname === sportPath;
    }

  const sports = [
    { name: 'All', path: '/sportsbook', icon: Flame },
    { name: 'Football', path: '/sportsbook/football', icon: Trophy },
    { name: 'NBA', path: '/sportsbook/nba', icon: TrophyIcon },
    { name: 'Hockey', path: '/sportsbook/nhl', icon: Tv },
    { name: 'MMA', path: '/sportsbook/mma', icon: Flame },
    { name: 'NFL', path: '/sportsbook/nfl', icon: Trophy },
    { name: 'MLB', path: '/sportsbook/mlb', icon: FolderClosed },
    { name: 'Tennis', path: '/sportsbook/tennis-atp', icon: Target },
    { name: 'Boxing', path: '/sportsbook/boxing', icon: Target },
    { name: 'Cricket', path: '/sportsbook/cricket', icon: Trophy }
  ];
</script>

<div class="w-full border-b border-border/60 bg-background px-4 py-2.5">
  <div class="no-scrollbar flex items-center gap-2 overflow-x-auto scroll-smooth">
    {#each sports as sport}
      <a 
        href={sport.path}
        class="flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 py-1 text-xs font-bold transition-all duration-150
          {isActive(sport.path) 
            ? 'bg-amber-500 border-amber-500 text-neutral-950 font-black shadow-sm' 
            : 'border-border bg-background/30 text-muted-foreground hover:border-neutral-700 hover:text-foreground'}"
      >
        <sport.icon class="h-3.5 w-3.5" />
        <span>{sport.name}</span>
      </a>
    {/each}
  </div>
</div>

<style>
  /* Standard webkit style rules to hide horizontal scrollbar indicators on mobile */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>