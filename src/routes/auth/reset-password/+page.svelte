<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { ShieldAlert, KeyRound, CheckCircle2 } from 'lucide-svelte';

  // Svelte 5 layout props capturing page loader data and form action results
  let { data, form } = $props<{
    data: { valid: boolean; token?: string; error?: string };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

  let isSubmitting = $state(false);
</script>

<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8">
  <div class="w-full max-w-md rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6">
    <!-- Header Title -->
    <div class="text-center space-y-1.5">
      <h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">
        <KeyRound class="h-5 w-5 text-amber-500" />
        New Password
      </h2>
      <p class="text-xs text-neutral-500 font-semibold">Enter and confirm your new secure password</p>
    </div>

    {#if !data.valid}
      <!-- Error State: Token Expired or Invalid link -->
      <div class="rounded-lg bg-red-950/40 border border-red-800/80 p-4 text-center space-y-3">
        <div class="flex justify-center">
          <ShieldAlert class="h-8 w-8 text-red-500" />
        </div>
        <p class="text-xs text-red-400 font-bold leading-relaxed">{data.error}</p>
        <div class="pt-2">
          <a href="/auth/forgot-password">
            <Button class="h-10 w-full bg-amber-500 text-neutral-950 font-black rounded-lg">
              Request New Link
            </Button>
          </a>
        </div>
      </div>
    {:else}
      {#if form?.success}
        <!-- Success State: Reset complete -->
        <div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3">
          <div class="flex justify-center">
            <CheckCircle2 class="h-8 w-8 text-green-500 animate-bounce" />
          </div>
          <p class="text-xs text-green-400 font-bold leading-relaxed">{form.message}</p>
          <div class="pt-2">
            <a href="/auth/login">
              <Button class="h-10 w-full bg-amber-500 text-neutral-950 font-black rounded-lg">
                Proceed to Login
              </Button>
            </a>
          </div>
        </div>
      {:else}
        <!-- Password Reset Input Form -->
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

          <!-- Hidden Token field required for verification postback -->
          <input type="hidden" name="token" value={data.token} />

          <div class="space-y-1.5">
            <label for="password" class="text-xs font-bold text-muted-foreground">New Password</label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••" 
              disabled={isSubmitting}
              class="bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground" 
            />
          </div>

          <div class="space-y-1.5">
            <label for="confirmPassword" class="text-xs font-bold text-muted-foreground">Confirm New Password</label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              required 
              placeholder="••••••••" 
              disabled={isSubmitting}
              class="bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground" 
            />
          </div>

          <!-- Action Button -->
          <Button 
            type="submit" 
            disabled={isSubmitting}
            class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500"
          >
            {isSubmitting ? 'Resetting Password...' : 'Save New Password'}
          </Button>
        </form>
      {/if}
    {/if}
  </div>
</div>