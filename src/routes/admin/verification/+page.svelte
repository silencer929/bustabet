<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatGameTime } from '$lib/utils/datetime';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { ShieldCheck, FileText, Check, X, Eye } from 'lucide-svelte';

  // Svelte 5 page properties capturing loaded compliance tables
  let { data } = $props<{ data: { documents: any[] } }>();

  // Filter to compute the queue of pending document uploads awaiting review
  const pendingDocs = $derived(
    data.documents.filter((doc: any) => doc.status === 'PENDING')
  );

  let isSubmitting = $state(false);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80';
      case 'PENDING': return 'bg-amber-950/40 text-amber-400 border-amber-800/80';
      default: return 'bg-red-950/40 text-red-400 border-red-800/80';
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <ShieldCheck class="h-5 w-5 text-red-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">KYC Verification Audit</h1>
  </div>

  <!-- Section: KYC Document Queue -->
  <div class="space-y-3">
    <h2 class="text-xs font-black tracking-widest text-red-400 uppercase flex items-center gap-1.5">
      <span>Pending Document Queue</span>
      {#if pendingDocs.length > 0}
        <span class="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white">{pendingDocs.length}</span>
      {/if}
    </h2>

    {#if pendingDocs.length === 0}
      <div class="text-center text-xs font-semibold text-neutral-600 py-12 border border-dashed border-neutral-800 rounded-lg bg-neutral-900/10">
        All verification files audited! No pending documents awaiting review.
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each pendingDocs as doc}
          <div class="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 flex flex-col justify-between gap-4">
            <div class="space-y-3">
              <!-- Card Header -->
              <div class="flex justify-between items-start">
                <div>
                  <div class="text-xs font-bold text-neutral-200">{doc.documentType.replace('_', ' ')}</div>
                  <div class="text-[10px] text-neutral-500 mt-1">Player: {doc.profile.username} &bull; Submitted {formatGameTime(doc.submittedAt)}</div>
                </div>
                <!-- File Download Preview Shortcut -->
                <a href={doc.fileUrl} target="_blank" class="rounded bg-neutral-950 p-2 border border-neutral-800 text-neutral-500 hover:text-white transition">
                  <Eye class="h-4 w-4" />
                </a>
              </div>

              <!-- Inline Document Preview Image container -->
              <div class="rounded-lg overflow-hidden border border-neutral-800/80 bg-black/40 h-40 flex items-center justify-center relative">
                {#if doc.fileUrl.endsWith('.pdf')}
                  <div class="text-center text-xs text-neutral-500 flex flex-col items-center gap-2">
                    <FileText class="h-8 w-8 text-neutral-600" />
                    <span>PDF Document (Click preview icon to view)</span>
                  </div>
                {:else}
                  <img src={doc.fileUrl} alt="Compliance Upload" class="w-full h-full object-cover" />
                {/if}
              </div>
            </div>

            <!-- Audit Actions Row -->
            <div class="flex items-center gap-2 border-t border-neutral-800/60 pt-3">
              <!-- Approve Form -->
              <form 
                action="?/approve" 
                method="POST" 
                use:enhance={() => {
                  isSubmitting = true;
                  return async ({ update }) => {
                    isSubmitting = false;
                    update();
                  };
                }}
                class="flex-1"
              >
                <input type="hidden" name="id" value={doc.id} />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-9 rounded-lg text-xs gap-1.5"
                >
                  <Check class="h-4 w-4" />
                  Approve
                </Button>
              </form>

              <!-- Reject Form -->
              <form 
                action="?/reject" 
                method="POST" 
                use:enhance={() => {
                  isSubmitting = true;
                  return async ({ update }) => {
                    isSubmitting = false;
                    update();
                  };
                }}
                class="flex-1"
              >
                <input type="hidden" name="id" value={doc.id} />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  variant="outline"
                  class="w-full border-neutral-800 bg-neutral-950 text-neutral-200 hover:bg-neutral-900 hover:text-red-400 font-bold h-9 rounded-lg text-xs gap-1.5"
                >
                  <X class="h-4 w-4" />
                  Reject
                </Button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Section: Global Historical Compliance Audit Logs -->
  <div class="space-y-3">
    <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Global Audit History</h3>

    <div class="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/20">
      <table class="w-full border-collapse text-left text-xs text-neutral-400">
        <thead class="border-b border-neutral-800 bg-neutral-900/60 font-bold uppercase tracking-wider text-neutral-500 text-[10px]">
          <tr>
            <th class="px-4 py-3">Player</th>
            <th class="px-4 py-3">Document Type</th>
            <th class="px-4 py-3">Submitted At</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-right">Verification File</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-800 font-medium">
          {#each data.documents as doc}
            <tr class="hover:bg-neutral-900/10 transition duration-150">
              <td class="whitespace-nowrap px-4 py-4 text-neutral-200 font-bold">{doc.profile.username}</td>
              <td class="whitespace-nowrap px-4 py-4 font-bold">{doc.documentType.replace('_', ' ')}</td>
              <td class="whitespace-nowrap px-4 py-4 text-neutral-400">{formatGameTime(doc.submittedAt)}</td>
              <td class="whitespace-nowrap px-4 py-4">
                <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded {getStatusClass(doc.status)}">
                  {doc.status}
                </Badge>
              </td>
              <td class="whitespace-nowrap px-4 py-4 text-right">
                <a href={doc.fileUrl} target="_blank" class="text-amber-500 hover:text-amber-400 transition font-bold text-xs flex items-center justify-end gap-1">
                  <FileText class="h-3.5 w-3.5" />
                  <span>Download File</span>
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>