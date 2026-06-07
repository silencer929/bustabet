<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { ShieldAlert, LogIn } from 'lucide-svelte';

  // Svelte 5 layout form actions return payload
   let { form } = $props<{ error?: string } | null>();

  let isSubmitting = $state(false);
</script>

<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8">
  <div class="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md space-y-6">
    <!-- Header Title -->
    <div class="text-center space-y-1.5">
      <h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">
        <LogIn class="h-5 w-5 text-amber-500" />
        Log In
      </h2>
      <p class="text-xs text-neutral-500 font-semibold">Welcome back! Please enter your credentials</p>
    </div>

    <!-- SvelteKit Progressive Enhancement Form -->
    <form 
      method="POST" 
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

      <div class="space-y-1.5">
        <label for="email" class="text-xs font-bold text-neutral-400">Email Address</label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          placeholder="name@example.com" 
          disabled={isSubmitting}
          class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10 font-medium text-neutral-200" 
        />
      </div>

      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <label for="password" class="text-xs font-bold text-neutral-400">Password</label>
          <a href="/auth/forgot-password" class="text-[10px] font-bold text-amber-500 hover:text-amber-400 transition">Forgot Password?</a>
        </div>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          required 
          placeholder="••••••••" 
          disabled={isSubmitting}
          class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10 font-medium text-neutral-200" 
        />
      </div>

      <!-- Action Button -->
      <Button 
        type="submit" 
        disabled={isSubmitting}
        class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-neutral-800 disabled:text-neutral-500"
      >
        {isSubmitting ? 'Authenticating...' : 'Sign In'}
      </Button>
    </form>

    <!-- Footer Links -->
    <div class="text-center border-t border-neutral-800/80 pt-4 text-xs font-semibold text-neutral-500">
      New to Busta Bet? 
      <a href="/auth/register" class="text-amber-500 hover:text-amber-400 transition ml-1">Register Now</a>
    </div>
  </div>
</div>