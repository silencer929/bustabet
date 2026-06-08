<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { KeyRound, ChevronLeft, ShieldAlert, CheckCircle2 } from 'lucide-svelte';

  let { form } = $props<{ form: { error?: string; success?: boolean; message?: string } | null }>();

  let isSubmitting = $state(false);
</script>

<div class="space-y-6 max-w-lg mx-auto">
  <!-- Back button -->
  <a href="/profile" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Profile</span>
  </a>

  <div class="rounded-2xl border border-border bg-background/60 p-6 space-y-6">
    <div class="text-center space-y-1.5">
      <h2 class="text-2xl font-black text-neutral-100 flex items-center justify-center gap-2">
        <KeyRound class="h-5 w-5 text-amber-500" />
        Change Password
      </h2>
      <p class="text-xs text-neutral-500 font-semibold">Update your account credentials to keep your profile secure</p>
    </div>

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
          <ShieldAlert class="h-4 w-4 shrink-0" />
          <span>{form.error}</span>
        </div>
      {/if}
      {#if form?.success}
        <div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold">
          <CheckCircle2 class="h-4 w-4 shrink-0" />
          <span>{form.message}</span>
        </div>
      {/if}

      <div class="space-y-1.5">
        <label for="currentPassword" class="text-xs font-bold text-muted-foreground">Current Password</label>
        <Input id="currentPassword" name="currentPassword" type="password" required placeholder="••••••••" disabled={isSubmitting} class="bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground" />
      </div>

      <div class="space-y-1.5">
        <label for="newPassword" class="text-xs font-bold text-muted-foreground">New Password</label>
        <Input id="newPassword" name="newPassword" type="password" required placeholder="••••••••" disabled={isSubmitting} class="bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground" />
      </div>

      <div class="space-y-1.5">
        <label for="confirmPassword" class="text-xs font-bold text-muted-foreground">Confirm New Password</label>
        <Input id="confirmPassword" name="confirmPassword" type="password" required placeholder="••••••••" disabled={isSubmitting} class="bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground" />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition"
      >
        {isSubmitting ? 'Updating...' : 'Save Password'}
      </Button>
    </form>
  </div>
</div>