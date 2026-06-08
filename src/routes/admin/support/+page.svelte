<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { HelpCircle, ChevronRight, MessageSquare } from 'lucide-svelte';

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
  <div class="flex items-center gap-2 border-b border-border/80 pb-3">
    <HelpCircle class="h-5 w-5 text-red-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Ticketing Board</h1>
  </div>

  {#if data.tickets.length === 0}
    <!-- Empty State -->
    <div class="text-center text-xs font-semibold text-neutral-600 py-12 border border-dashed border-border rounded-lg bg-background/10">
      All clear! No player tickets registered in the database.
    </div>
  {:else}
    <!-- Tickets List -->
    <div class="space-y-3">
      {#each data.tickets as ticket}
        <a 
          href="/admin/support/{ticket.id}" 
          class="flex items-center justify-between border border-border/80 bg-background/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"
        >
          <div class="flex items-center gap-4">
            <div class="rounded-lg bg-background p-2.5 border border-border text-muted-foreground">
              <MessageSquare class="h-4 w-4 text-red-500" />
            </div>
            <div>
              <div class="text-xs font-bold text-foreground">{ticket.subject}</div>
              <div class="text-[10px] text-neutral-500 mt-1">Player: {ticket.profile.username} &bull; Ref: {ticket.id} &bull; Created {formatGameTime(ticket.createdAt)}</div>
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