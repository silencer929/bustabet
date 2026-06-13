<script lang="ts">
  import { fade } from 'svelte/transition';

  // ✅ Fixed: Correct declaration structure for Svelte 5 props
  let { active = false } = $props<{ active?: boolean }>();
</script>

{#if active}
  <div 
    transition:fade={{ duration: 450 }}
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
  >
    <div class="relative flex items-center justify-center">
      <div class="h-40 w-40 rounded-full border-2 border-neutral-900 border-t-2 border-t-amber-500 animate-spin"></div>
      
      <img 
        src="/logos/logo.png" 
        alt="Bustar Bet Loading" 
        class="absolute h-30 w-30 object-contain rounded-lg shadow-sm"
        onerror={(e) => {
          // ✅ Fixed: Explicitly cast target to an HTMLImageElement
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  </div>
{/if}
