<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { ShieldAlert, KeyRound, CheckCircle2 } from 'lucide-svelte';

  // Svelte 5 layout form actions return payload
   let { form } = $props<{ error?: string; success?: boolean; message?: string } | null>();

  let isSubmitting = $state(false);
</script>

<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8">
  <div class="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md space-y-6">
    <!-- Header Title -->
    <div class="text-center space-y-1.5">
      <h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">
        <KeyRound class="h-5 w-5 text-amber-500" />
        Reset Password
      </h2>
      <p class="text-xs text-neutral-500 font-semibold">Enter your email to receive a secure recovery link</p>
    </div>

    {#if form?.success}
      <!-- Success State -->
      <div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3">
        <div class="flex justify-center">
          <CheckCircle2 class="h-8 w-8 text-green-500 animate-bounce" />
        </div>
        <p class="text-xs text-green-400 font-bold leading-relaxed">{form.message}</p>
        <div class="pt-2">
          <a href="/auth/login">
            <Button variant="outline" class="h-9 w-full text-xs font-bold border-neutral-800 bg-neutral-950 text-neutral-200">
              Return to Login
            </Button>
          </a>
        </div>
      </div>
    {:else}
      <!-- Input Form -->
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

        <!-- Action Button -->
        <Button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          {isSubmitting ? 'Sending Request...' : 'Send Recovery Link'}
        </Button>
      </form>
    {/if}

    <!-- Footer Links -->
    {#if !form?.success}
      <div class="text-center border-t border-neutral-800/80 pt-4 text-xs font-semibold text-neutral-500">
        Remember your credentials? 
        <a href="/auth/login" class="text-amber-500 hover:text-amber-400 transition ml-1">Log In</a>
      </div>
    {/if}
  </div>
</div>