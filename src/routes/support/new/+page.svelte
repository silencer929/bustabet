<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { HelpCircle, ChevronLeft, ShieldAlert } from 'lucide-svelte';

  let { form } = $props<{ form: { error?: string } | null }>();

  let isSubmitting = $state(false);
</script>

<div class="space-y-6">
  <!-- Back Button -->
  <a href="/support" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Support</span>
  </a>

  <div class="flex items-center justify-center min-h-[calc(100vh-16rem)]">
    <div class="w-full max-w-lg rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6">
      <!-- Title Header -->
      <div class="text-center space-y-1.5">
        <h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">
          <HelpCircle class="h-5 w-5 text-amber-500" />
          Open Support Ticket
        </h2>
        <p class="text-xs text-neutral-500 font-semibold">Submit a new request to our administrative and technical staff</p>
      </div>

      <!-- SvelteKit Action Form -->
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

        <!-- Subject -->
        <div class="space-y-1.5">
          <label for="subject" class="text-xs font-bold text-muted-foreground">Subject</label>
          <Input id="subject" name="subject" type="text" required placeholder="Deposit not reflecting in account" class="bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground" />
        </div>

        <!-- Detailed Description -->
        <div class="space-y-1.5">
          <label for="message" class="text-xs font-bold text-muted-foreground">Detailed Message</label>
          <textarea id="message" name="message" required rows="6" placeholder="Describe your technical or transaction issue here in detail..." class="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-amber-500 focus:outline-none"></textarea>
        </div>

        <!-- Action Button -->
        <Button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500"
        >
          {isSubmitting ? 'Opening Ticket...' : 'Open Ticket'}
        </Button>
      </form>
    </div>
  </div>
</div>