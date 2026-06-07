<script lang="ts">
  import { enhance } from '$app/forms';
  import { auth } from '$lib/stores/auth.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { User, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-svelte';

  let { form } = $props<{ form: { error?: string; success?: boolean; message?: string } | null }>();

  let isSubmitting = $state(false);

  const subNav = [
    { name: 'Security & Password', path: '/profile/security' },
    { name: 'Identity Verification (KYC)', path: '/profile/verification' }
  ];
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
    <User class="h-5 w-5 text-amber-500" />
    <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">My Account</h1>
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <!-- Sub Nav links -->
    <div class="space-y-2">
      {#each subNav as item}
        <a 
          href={item.path} 
          class="flex h-11 items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 text-xs font-bold text-neutral-400 hover:border-neutral-700 hover:text-white transition"
        >
          <span>{item.name}</span>
          <ChevronRight class="h-4 w-4" />
        </a>
      {/each}
    </div>

    <!-- Update Form Container -->
    <div class="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-6">
      <div class="space-y-1">
        <h2 class="text-base font-black text-neutral-100">Personal Details</h2>
        <p class="text-xs text-neutral-500 font-semibold">Modify your public full name and mobile number</p>
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

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- Email display read only -->
          <div class="space-y-1.5">
            <label for="email" class="text-xs font-bold text-neutral-500">Email Address (Locked)</label>
            <Input id="email" type="email" disabled value={auth.user?.email} class="bg-neutral-950 border-neutral-800 text-xs h-10 font-bold text-neutral-600" />
          </div>

          <!-- Username display read only -->
          <div class="space-y-1.5">
            <label for="username" class="text-xs font-bold text-neutral-500">Username (Locked)</label>
            <Input id="username" type="text" disabled value={auth.user?.username} class="bg-neutral-950 border-neutral-800 text-xs h-10 font-bold text-neutral-600" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- Full Name -->
          <div class="space-y-1.5">
            <label for="fullName" class="text-xs font-bold text-neutral-400">Full Name</label>
            <Input id="fullName" name="fullName" type="text" required value={auth.user?.fullName || ''} placeholder="John Doe" disabled={isSubmitting} class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10 font-bold text-neutral-200" />
          </div>

          <!-- Phone number -->
          <div class="space-y-1.5">
            <label for="phone" class="text-xs font-bold text-neutral-400">Phone Number (E.164)</label>
            <Input id="phone" name="phone" type="tel" required value={auth.user?.phone || ''} placeholder="+254712345678" disabled={isSubmitting} class="bg-neutral-950 border-neutral-800 focus:border-amber-500 text-xs h-10 font-bold text-neutral-200" />
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            class="w-full sm:w-auto h-11 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition"
          >
            {isSubmitting ? 'Updating...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  </div>
</div>