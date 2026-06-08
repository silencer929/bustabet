<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { ShieldAlert, Trophy, ArrowLeft, RefreshCw } from 'lucide-svelte';

  // Svelte 5 derived state capturing active SvelteKit compiled errors
  const status = $derived($page.status);
  const message = $derived($page.error?.message || 'Page not found');
</script>

<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center text-foreground">
  <div class="max-w-md w-full space-y-8">
    <!-- Visual Indicator -->
    <div class="relative flex justify-center">
      <!-- Rotating outer ring -->
      <div class="h-32 w-32 rounded-full border-2 border-neutral-900 border-t-2 border-t-amber-500 animate-spin"></div>
      
      <!-- Center static icon -->
      <div class="absolute inset-0 flex items-center justify-center">
        {#if status === 404}
          <!-- Offside / Out-of-bounds sport metaphor -->
          <ShieldAlert class="h-12 w-12 text-amber-500 animate-bounce" />
        {:else}
          <Trophy class="h-12 w-12 text-amber-500 animate-bounce" />
        {/if}
      </div>
    </div>

    <!-- Error Codes & Typography -->
    <div class="space-y-3">
      <span class="rounded bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-black tracking-widest text-amber-500 uppercase">
        Error {status}
      </span>
      <h1 class="text-2xl font-black text-neutral-100 tracking-tight">
        {#if status === 404}
          Offside! Page Not Found
        {:else}
          Match Postponed
        {/if}
      </h1>
      <p class="text-xs leading-relaxed text-neutral-500 font-semibold max-w-sm mx-auto">
        {message}. The page you are looking for has been moved, completed, or suspended.
      </p>
    </div>

    <!-- Actions portal shortcuts -->
    <div class="flex flex-col sm:flex-row items-center gap-3 justify-center pt-4">
      <a href="/sportsbook" class="w-full sm:w-auto">
        <Button class="w-full h-11 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg gap-1.5 shadow-md">
          <ArrowLeft class="h-4 w-4" />
          Back to Sportsbook
        </Button>
      </a>
      
      <button 
        onclick={() => window.location.reload()} 
        class="w-full sm:w-auto"
      >
        <Button variant="outline" class="w-full h-11 px-6 border-border bg-background/40 text-foreground hover:bg-background font-bold rounded-lg gap-1.5">
          <RefreshCw class="h-4 w-4" />
          Retry Connection
        </Button>
      </button>
    </div>
  </div>
</div>