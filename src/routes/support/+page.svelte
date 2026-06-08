<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { HelpCircle, MessageSquarePlus, MessageSquare, ChevronRight } from 'lucide-svelte';

  let { data } = $props<{ data: { tickets: any[] } }>();

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80';
      case 'RESOLVED': return 'bg-blue-950/40 text-blue-400 border-blue-800/80';
      default: return 'bg-background text-muted-foreground border-neutral-700';
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
    <div class="flex items-center gap-2">
      <HelpCircle class="h-5 w-5 text-amber-500" />
      <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Customer Support</h1>
    </div>

    <a href="/support/new">
      <Button class="h-10 bg-amber-500 text-neutral-950 font-black rounded-lg gap-1.5 shadow-md">
        <MessageSquarePlus class="h-4 w-4" />
        New Support Ticket
      </Button>
    </a>
  </div>

  {#if data.tickets.length === 0}
    <!-- Empty State -->
    <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
      <div class="rounded-full bg-background p-4 border border-border mb-4">
        <HelpCircle class="h-8 w-8 text-neutral-600" />
      </div>
      <h2 class="text-lg font-black text-muted-foreground">No Tickets</h2>
      <p class="text-xs text-neutral-600 mt-1 max-w-xs">You do not have any open or resolved support tickets at the moment.</p>
    </div>
  {:else}
    <!-- Tickets List -->
    <div class="space-y-3">
      {#each data.tickets as ticket}
        <a 
          href="/support/{ticket.id}" 
          class="flex items-center justify-between border border-border/80 bg-background/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"
        >
          <div class="flex items-center gap-4">
            <div class="rounded-lg bg-background p-2.5 border border-border text-muted-foreground">
              <MessageSquare class="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <div class="text-xs font-bold text-foreground">{ticket.subject}</div>
              <div class="text-[10px] text-neutral-500 mt-1">Ticket Reference: {ticket.id} &bull; Created {formatGameTime(ticket.createdAt)}</div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <Badge class="border text-[9px] font-bold px-2.5 py-0.5 rounded {getStatusClass(ticket.status)}">
              {ticket.status}
            </Badge>
            <ChevronRight class="h-4 w-4 text-neutral-500" />
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>