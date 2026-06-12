import { a2 as ensure_array_like, a6 as escape_html, a1 as stringify, $ as attr_class } from './dev-CaPlrGUY.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { A as Arrow_down_left } from './arrow-down-left-BmCe1wM1.js';
import { A as Arrow_up_right } from './arrow-up-right-B4fjdnXV.js';
import { H as History } from './history-B7FIAMSl.js';
import { W as Wallet } from './wallet-CAywWlao.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import './index-Bai2VLr5.js';

//#region src/routes/wallet/history/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const getStatusClass = (status) => {
			switch (status) {
				case "COMPLETED": return "bg-emerald-950/40 text-emerald-400 border-emerald-800/80";
				case "PENDING": return "bg-amber-950/40 text-amber-400 border-amber-800/80";
				default: return "bg-red-950/40 text-red-400 border-red-800/80";
			}
		};
		$$renderer.push(`<div class="space-y-6"><a href="/wallet" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">`);
		History($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span>Back to Wallet Dashboard</span></a> <div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
		Wallet($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Transaction Ledger</h1></div> `);
		if (data.transactions.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-24 border border-dashed border-border rounded-lg">No transactions recorded in your ledger history</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="overflow-x-auto rounded-xl border border-border bg-background/20"><table class="w-full border-collapse text-left text-xs text-muted-foreground"><thead class="border-b border-border bg-background/60 font-bold uppercase tracking-wider text-neutral-500 text-[10px]"><tr><th class="px-4 py-3">Type</th><th class="px-4 py-3">Reference Code</th><th class="px-4 py-3">Date &amp; Time</th><th class="px-4 py-3">Status</th><th class="px-4 py-3 text-right">Amount</th></tr></thead><tbody class="divide-y divide-neutral-800 font-medium"><!--[-->`);
			const each_array = ensure_array_like(data.transactions);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tx = each_array[$$index];
				$$renderer.push(`<tr class="hover:bg-background/10 transition duration-150"><td class="whitespace-nowrap px-4 py-4"><div class="flex items-center gap-2 text-foreground">`);
				if (tx.type === "DEPOSIT" || tx.type === "PAYOUT") {
					$$renderer.push("<!--[0-->");
					Arrow_down_left($$renderer, { class: "h-4 w-4 text-emerald-500" });
				} else {
					$$renderer.push("<!--[-1-->");
					Arrow_up_right($$renderer, { class: "h-4 w-4 text-red-500" });
				}
				$$renderer.push(`<!--]--> <span>${escape_html(tx.type)}</span></div></td><td class="whitespace-nowrap px-4 py-4 font-mono font-bold tracking-tight text-neutral-300">${escape_html(tx.reference)}</td><td class="whitespace-nowrap px-4 py-4 text-muted-foreground">${escape_html(formatGameTime(tx.createdAt))}</td><td class="whitespace-nowrap px-4 py-4">`);
				Badge($$renderer, {
					class: `border text-[9px] font-bold px-2 py-0.5 rounded ${stringify(getStatusClass(tx.status))}`,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(tx.status)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></td><td${attr_class(`whitespace-nowrap px-4 py-4 text-right font-black ${tx.type === "DEPOSIT" || tx.type === "PAYOUT" ? "text-emerald-500" : "text-red-500"}`)}>${escape_html(tx.type === "DEPOSIT" || tx.type === "PAYOUT" ? "+" : "-")}${escape_html(formatCurrency(tx.amount, tx.currency))}</td></tr>`);
			}
			$$renderer.push(`<!--]--></tbody></table></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CkgTI2cE.js.map
