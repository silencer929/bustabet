<script lang="ts">
  import { enhance } from '$app/forms';
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { ChevronLeft, Send, ShieldCheck, ShieldAlert } from 'lucide-svelte';

  let { data, form } = $props<{
    data: { conversation: any };
    form: { error?: string } | null;
  }>();

  let isSubmitting = $state(false);
  let replyText = $state('');

  // Svelte 5 status classes derived reactive state
  const isClosed = $derived(data.conversation.status === 'CLOSED');
</script>

<div class="space-y-6 max-w-4xl mx-auto">
  <!-- Back Button & Header Metadata -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
    <div class="space-y-1">
      <a href="/support" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition mb-1">
        <ChevronLeft class="h-4 w-4" />
        <span>Back to Tickets</span>
      </a>
      <h1 class="text-sm font-bold text-neutral-100">{data.conversation.subject}</h1>
    </div>

    <div class="flex items-center gap-3">
      <span class="text-[10px] font-bold text-neutral-500 tracking-wider">Ref: {data.conversation.id}</span>
      <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded
        {data.conversation.status === 'CLOSED' ? 'bg-neutral-800 text-neutral-400 border-neutral-700' : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80'}"
      >
        {data.conversation.status}
      </Badge>
    </div>
  </div>

  <!-- Messages Chat Stream -->
  <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
    {#each data.conversation.messages as message}
      {@const isMe = message.senderId === auth.user?.id}
      <div class="flex w-full {isMe ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%] rounded-2xl p-4 space-y-1.5 border
          {isMe 
            ? 'bg-neutral-900 border-neutral-800 text-neutral-200 rounded-tr-none' 
            : 'bg-neutral-950 border-amber-500/20 text-neutral-300 rounded-tl-none'}"
        >
          <!-- Sender details -->
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black tracking-wide {isMe ? 'text-neutral-400' : 'text-amber-500'}">
              {isMe ? 'You' : message.sender.username}
            </span>
            {#if !isMe && message.sender.role === 'ADMIN'}
              <Badge class="bg-red-950/40 text-red-400 border border-red-800/80 text-[8px] font-black px-1 py-0 h-4">Staff</Badge>
            {/if}
          </div>

          <p class="text-xs leading-relaxed font-semibold break-words whitespace-pre-wrap">{message.message}</p>
          <span class="text-[9px] font-semibold text-neutral-600 block text-right pt-0.5">{formatGameTime(message.createdAt)}</span>
        </div>
      </div>
    {/each}
  </div>

  <!-- Reply Input Panel (Visible only if the ticket remains open) -->
  {#if isClosed}
    <div class="rounded-xl bg-neutral-950 border border-neutral-800/80 p-4 text-center text-xs font-semibold text-neutral-500">
      This support ticket has been closed. If you require further assistance, please open a new ticket.
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
          placeholder="Type your reply here..." 
          class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-11 font-medium text-neutral-200" 
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || replyText.trim().length === 0}
          class="h-11 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg gap-1.5 shadow-md disabled:bg-neutral-800"
        >
          <Send class="h-4 w-4" />
          <span class="hidden sm:inline">Send</span>
        </Button>
      </div>
    </form>
  {/if}
</div>