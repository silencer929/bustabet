<script lang="ts">
  import { ShieldAlert, ShieldCheck } from 'lucide-svelte';

  const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-neutral-800/80 bg-neutral-950 px-6 py-12 text-neutral-400 pb-24 md:pb-12">
  <div class="mx-auto max-w-7xl space-y-8">
    <!-- Brand and Description -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div class="space-y-4">
        <span class="text-base font-black tracking-wider text-white">
          Busta<span class="text-amber-500">BET</span>
        </span>
        <p class="text-xs leading-relaxed text-neutral-500">
          Busta BET is a fast, secure betting platform designed to offer competitive odds across premier global sports leagues with instant payouts via mobile money, PayPal, and cryptocurrencies.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="space-y-3">
        <h4 class="text-xs font-black tracking-widest text-neutral-300 uppercase">Information</h4>
        <ul class="space-y-2 text-xs font-semibold">
          <li><a href="/promotions" class="hover:text-amber-500 transition">Promotions & Bonuses</a></li>
          <li><a href="/vip" class="hover:text-amber-500 transition">VIP Loyalty Rewards</a></li>
          <li><a href="/referrals" class="hover:text-amber-500 transition">Referral Commissions</a></li>
          <li><a href="/support" class="hover:text-amber-500 transition">Customer Help Center</a></li>
        </ul>
      </div>

      <!-- Compliance and Security -->
      <div class="space-y-3">
        <h4 class="text-xs font-black tracking-widest text-neutral-300 uppercase">Security & Licensing</h4>
        <div class="space-y-3 text-xs leading-relaxed text-neutral-500">
          <div class="flex items-start gap-2.5">
            <ShieldCheck class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Fully licensed and regulated under regional sports betting frameworks. All user data is encrypted.</span>
          </div>
          <div class="flex items-start gap-2.5">
            <ShieldAlert class="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <span class="text-neutral-400">Strictly 18+. Responsible gaming is highly encouraged. Gambling can be addictive.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Supported payment gateways -->
    <div class="border-t border-neutral-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-4 text-xs font-bold text-neutral-600">
        <span class="uppercase tracking-widest">Supported Gateways:</span>
        <span class="hover:text-neutral-400 transition">M-PESA</span>
        <span class="hover:text-neutral-400 transition">PAYPAL</span>
        <span class="hover:text-neutral-400 transition">USDT / BTC</span>
      </div>

      <div class="text-[10px] font-bold text-neutral-600 tracking-wider">
        &copy; {currentYear} Busta BET. All rights reserved.
      </div>
    </div>
  </div>
</footer>