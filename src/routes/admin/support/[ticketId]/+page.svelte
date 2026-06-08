<script lang="ts">
  import { enhance } from '$app/forms';
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { ChevronLeft, Send, ShieldAlert, Lock } from 'lucide-svelte';

  let { data, form } = $props<{
    data: { conversation: any };
    form: { error?: string } | null;
  }>();

  let isSubmitting = $state(false);
  let replyText = $state('');

  const isClosed = $derived(data.conversation.status === 'CLOSED');
</script>

<div class="space-y-6 max-w-4xl mx-auto">
  <!-- Back button & Header Metadata -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
    <div class="space-y-1">
      <a href="/admin/support" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-foreground transition mb-1">
        <ChevronLeft class="h-4 w-4" />
        <span>Back to Tickets</span>
      </a>
      <h1 class="text-sm font-bold text-neutral-100">{data.conversation.subject}</h1>
    </div>

    <div class="flex items-center gap-3">
      <span class="text-[10px] font-bold text-neutral-500">Ref: {data.conversation.id}</span>
      <Badge class="border text-[9px] font-bold px-2.5 py-0.5 rounded
        {data.conversation.status === 'CLOSED' ? 'bg-background text-muted-foreground border-neutral-700' : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80'}"
      >
        {data.conversation.status}
      </Badge>

      <!-- Close Ticket Trigger Form -->
      {#if !isClosed}
        <form 
          action="?/closeTicket" 
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
            disabled={isSubmitting}
            variant="outline" 
            class="h-8 text-[9px] font-black border-red-800/80 bg-red-950/10 text-red-400 hover:bg-red-600 hover:text-foreground px-2.5 gap-1 rounded-lg"
          >
            <Lock class="h-3 w-3" />
            Close Ticket
          </Button>
        </form>
      {/if}
    </div>
  </div>

  <!-- Messages Chat Stream (Admins view: Administrative replies render on the right) -->
  <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
    {#each data.conversation.messages as message}
      {@const isAdmin = message.senderId === auth.user?.id}
      <div class="flex w-full {isAdmin ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%] rounded-2xl p-4 space-y-1.5 border
          {isAdmin 
            ? 'bg-background border-border text-foreground rounded-tr-none' 
            : 'bg-background border-red-500/20 text-neutral-300 rounded-tl-none'}"
        >
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black tracking-wide {isAdmin ? 'text-red-400' : 'text-muted-foreground'}">
              {isAdmin ? 'You (Staff)' : message.sender.username}
            </span>
          </div>

          <p class="text-xs leading-relaxed font-semibold break-words whitespace-pre-wrap">{message.message}</p>
          <span class="text-[9px] font-semibold text-neutral-600 block text-right pt-0.5">{formatGameTime(message.createdAt)}</span>
        </div>
      </div>
    {/each}
  </div>

  <!-- Reply Input Panel -->
  {#if isClosed}
    <div class="rounded-xl bg-background border border-border/80 p-4 text-center text-xs font-semibold text-neutral-500">
      This support ticket conversation has been completed and closed.
    </div>
  {:else}
    <form 
      method="POST" 
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          isSubmitting = false;
          replyText = '';
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

      <div class="flex gap-2">
        <Input 
          type="text" 
          name="message" 
          required 
          bind:value={replyText}
          disabled={isSubmitting}
          placeholder="Type your official administrative reply here..." 
          class="bg-background border-border focus:border-amber-500 text-xs h-11 font-medium text-foreground" 
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || replyText.trim().length === 0}
          class="h-11 px-5 bg-red-600 hover:bg-red-500 text-foreground font-black rounded-lg gap-1.5 shadow-md disabled:bg-background"
        >
          <Send class="h-4 w-4" />
          <span class="hidden sm:inline">Reply</span>
        </Button>
      </div>
    </form>
  {/if}
</div>