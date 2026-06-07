<script lang="ts">
  import { page } from '$app/stores';
  import { 
    Flame, 
    TrophyIcon, 
    Tv, 
    FolderClosed,
    Trophy
  } from 'lucide-svelte';

  // Helper to determine if a specific sport filter is currently active in the URL
    function isActive(sportPath: string) {
      return $page.url.pathname === sportPath;
    }

  const sportsList = [
    { name: 'All Sports', path: '/sportsbook', icon: Flame },
    { name: 'Football', path: '/sportsbook/football', icon: Trophy },
    { name: 'NBA', path: '/sportsbook/nba', icon: TrophyIcon },
    { name: 'Euroleague', path: '/sportsbook/euroleague', icon: TrophyIcon },
    { name: 'NHL', path: '/sportsbook/nhl', icon: Tv },
    { name: 'NFL', path: '/sportsbook/nfl', icon: Trophy },
    { name: 'MLB', path: '/sportsbook/mlb', icon: FolderClosed },
    { name: 'MMA', path: '/sportsbook/mma', icon: Flame },
    { name: 'Tennis ATP', path: '/sportsbook/tennis-atp', icon: Trophy },
    { name: 'Tennis WTA', path: '/sportsbook/tennis-wta', icon: Trophy },
    { name: 'Rugby NRL', path: '/sportsbook/rugby-nrl', icon: Trophy },
    { name: 'AFL', path: '/sportsbook/afl', icon: Trophy }
  ];
</script>

<aside class="fixed top-16 bottom-0 left-0 z-30 hidden w-64 border-r border-neutral-800/80 bg-neutral-950 px-4 py-6 md:block">
  <div class="mb-4 px-3 text-[10px] font-black tracking-widest text-neutral-500 uppercase">Sports</div>
  <nav class="space-y-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
    {#each sportsList as sport}
      <a 
        href={sport.path} 
        class="flex h-10 items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-150
          {isActive(sport.name.toLowerCase().replace(' ', '-')) ? 'bg-amber-500 text-neutral-950 font-black' : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-white'}"
      >
        <sport.icon class="h-4 w-4 shrink-0" />
        <span class="truncate">{sport.name}</span>
      </a>
    {/each}
  </nav>
</aside>