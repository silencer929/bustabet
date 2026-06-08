<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Bell, Check, Trash2, CheckCircle2 } from 'lucide-svelte';

  // Svelte 5 page properties capturing loaded notification arrays
  let { data } = $props<{ data: { notifications: any[] } }>();

  let isSubmitting = $state(false);
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
    <div class="flex items-center gap-2">
      <Bell class="h-5 w-5 text-amber-500" />
      <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Notifications</h1>
    </div>

    <!-- Clear All CTA Form -->
    {#if data.notifications.some((n: any) => !n.read)}
      <form 
        action="?/clearAll" 
        method="POST" 
        use:enhance={() => {
          isSubmitting = true;
          return async ({ update }) => {
            isSubmitting = false;
            update();
          };
        }}
      >
        <Button 
          type="submit" 
          variant="outline" 
          disabled={isSubmitting}
          class="h-9 border-border bg-background/40 text-xs font-bold text-muted-foreground hover:text-foreground rounded-lg gap-1.5"
        >
          <Trash2 class="h-4 w-4" />
          Mark All as Read
        </Button>
      </form>
    {/if}
  </div>

  {#if data.notifications.length === 0}
    <!-- Empty State -->
    <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
      <div class="rounded-full bg-background p-4 border border-border mb-4">
        <Bell class="h-8 w-8 text-neutral-600" />
      </div>
      <h2 class="text-lg font-black text-muted-foreground">All Clear</h2>
      <p class="text-xs text-neutral-600 mt-1 max-w-xs">You do not have any notification alerts in your account feed.</p>
    </div>
  {:else}
    <!-- Notifications List -->
    <div class="space-y-2.5">
      {#each data.notifications as notification}
        <div class="flex items-start justify-between border p-4 rounded-xl transition duration-150
          {notification.read 
            ? 'border-neutral-900 bg-background/10 text-muted-foreground' 
            : 'border-border bg-background/40 text-foreground'}"
        >
          <div class="flex items-start gap-3 max-w-[85%]">
            <div class="rounded-lg p-2 border shrink-0 mt-0.5
              {notification.read 
                ? 'border-border bg-background text-neutral-600' 
                : 'border-amber-500/20 bg-amber-500/10 text-amber-500'}"
            >
              <CheckCircle2 class="h-4 w-4" />
            </div>
            
            <div class="space-y-1">
              <div class="text-xs font-bold {notification.read ? 'text-muted-foreground' : 'text-neutral-100'}">
                {notification.title}
              </div>
              <p class="text-[11px] leading-relaxed text-neutral-500 font-semibold">{notification.message}</p>
              <span class="text-[9px] font-bold text-neutral-600 block pt-1">{formatGameTime(notification.createdAt)}</span>
            </div>
          </div>

          <!-- Individual Mark as Read Trigger -->
          {#if !notification.read}
            <form 
              action="?/markRead" 
              method="POST" 
              use:enhance={() => {
                isSubmitting = true;
                return async ({ update }) => {
                  isSubmitting = false;
                  update();
                };
              }}
            >
              <input type="hidden" name="id" value={notification.id} />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                disabled={isSubmitting}
                class="text-neutral-500 hover:text-amber-500 h-8 w-8 rounded-lg"
                title="Mark as Read"
              >
                <Check class="h-4 w-4" />
              </Button>
            </form>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>