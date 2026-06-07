<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { formatGameTime } from '$lib/utils/datetime';
  import { FileUp, ChevronLeft, ShieldCheck, ShieldAlert, FileText, CheckCircle2 } from 'lucide-svelte';

  let { data, form } = $props<{
    data: { documents: any[] };
    form: { error?: string; success?: boolean; message?: string } | null;
  }>();

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
  <!-- Back button -->
  <a href="/profile" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition">
    <ChevronLeft class="h-4 w-4" />
    <span>Back to Profile</span>
  </a>

  <!-- Layout Container -->
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <!-- KYC File Upload Card -->
    <div class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-6">
      <div class="space-y-1.5">
        <h2 class="text-base font-black text-neutral-100 flex items-center gap-2">
          <FileUp class="h-5 w-5 text-amber-500" />
          Identity Verification (KYC)
        </h2>
        <p class="text-xs text-neutral-500 font-semibold">Upload compliance documents to remove withdrawal limits</p>
      </div>

      <!-- SvelteKit file binary Action Form -->
      <form 
        method="POST" 
        enctype="multipart/form-data"
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
        {#if form?.success}
          <div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold">
            <CheckCircle2 class="h-4 w-4 shrink-0 mt-0.5" />
            <span>{form.message}</span>
          </div>
        {/if}

        <!-- Selector -->
        <div class="space-y-1.5">
          <label for="documentType" class="text-xs font-bold text-neutral-400">Document Type</label>
          <select id="documentType" name="documentType" required class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-amber-500 focus:outline-none">
            <option value="NATIONAL_ID">National ID Card</option>
            <option value="PASSPORT">International Passport</option>
            <option value="DRIVING_LICENSE">Driving License</option>
          </select>
        </div>

        <!-- Binary File input -->
        <div class="space-y-1.5">
          <label for="file" class="text-xs font-bold text-neutral-400">Select Document File (JPG, PNG, PDF)</label>
          <input id="file" name="file" type="file" required accept="image/*,application/pdf" class="flex w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-400 file:border-0 file:bg-transparent file:text-xs file:font-black file:text-amber-500 focus:outline-none" />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition"
        >
          {isSubmitting ? 'Uploading...' : 'Submit Document'}
        </Button>
      </form>
    </div>

    <!-- Verification History List -->
    <div class="space-y-3">
      <h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Uploaded History</h3>

      {#if data.documents.length === 0}
        <div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-neutral-800 rounded-lg">
          No verification documents submitted yet
        </div>
      {:else}
        <div class="space-y-2">
          {#each data.documents as doc}
            <div class="flex items-center justify-between border border-neutral-800 bg-neutral-900/40 p-4 rounded-xl">
              <div class="flex items-center gap-3">
                <div class="rounded-lg bg-neutral-900 p-2.5 border border-neutral-800 text-neutral-400">
                  <FileText class="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <div class="text-xs font-bold text-neutral-200">{doc.documentType.replace('_', ' ')}</div>
                  <div class="text-[10px] text-neutral-500 mt-1">Submitted {formatGameTime(doc.submittedAt)}</div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <Badge class="border text-[9px] font-bold px-2 py-0.5 rounded {getStatusClass(doc.status)}">
                  {doc.status}
                </Badge>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>