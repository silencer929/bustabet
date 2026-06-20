import { a6 as escape_html, a2 as ensure_array_like, a0 as attr, a1 as stringify, $ as attr_class, V as derived } from './dev-CaPlrGUY.js';
import './client-BhUH6O_6.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { A as Arrow_down_left } from './arrow-down-left-BmCe1wM1.js';
import { A as Arrow_right_left } from './arrow-right-left-cFu5tdGd.js';
import { A as Arrow_up_right } from './arrow-up-right-B4fjdnXV.js';
import { C as Check } from './check-CZbLEyBV.js';
import { X } from './x-B7X57umf.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-CvNL9e3L.js';
import './index-DBqjc0Yf.js';
import './Icon-Bxs3Ke_h.js';
import './index-Bai2VLr5.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/admin/transactions/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const pendingWithdrawals = derived(() => data.transactions.filter((tx) => tx.type === "WITHDRAWAL" && tx.status === "PENDING"));
		let isSubmitting = false;
		const getStatusClass = (status) => {
			switch (status) {
				case "COMPLETED": return "bg-emerald-950/40 text-emerald-400 border-emerald-800/80";
				case "PENDING": return "bg-amber-950/40 text-amber-400 border-amber-800/80";
				default: return "bg-red-950/40 text-red-400 border-red-800/80";
			}
		};
		$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
		Arrow_right_left($$renderer, { class: "h-5 w-5 text-red-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Transaction Overseer</h1></div> <div class="space-y-3"><h2 class="text-xs font-black tracking-widest text-red-400 uppercase flex items-center gap-1.5"><span>Pending Withdrawal Queue</span> `);
		if (pendingWithdrawals().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-foreground">${escape_html(pendingWithdrawals().length)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></h2> `);
		if (pendingWithdrawals().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-12 border border-dashed border-border rounded-lg bg-background/10">All payouts clear! No pending withdrawals awaiting approval.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-2"><!--[-->`);
			const each_array = ensure_array_like(pendingWithdrawals());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tx = each_array[$$index];
				$$renderer.push(`<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-border bg-background/40 p-4 rounded-xl gap-4"><div><div class="text-xs font-bold text-foreground">Withdrawal Request: ${escape_html(tx.profile.username)}</div> <div class="text-[10px] text-neutral-500 mt-1">Ref: ${escape_html(tx.reference)} • Requested ${escape_html(formatGameTime(tx.createdAt))}</div> <div class="text-xs font-black text-red-500 mt-1">${escape_html(formatCurrency(tx.amount, tx.currency))}</div></div> <div class="flex items-center gap-2 w-full sm:w-auto"><form action="?/approve" method="POST" class="flex-1 sm:flex-none"><input type="hidden" name="id"${attr("value", tx.id)}/> `);
				Button($$renderer, {
					type: "submit",
					disabled: isSubmitting,
					class: "w-full bg-emerald-600 hover:bg-emerald-500 text-foreground font-bold h-9 px-4 rounded-lg text-xs gap-1.5",
					children: ($$renderer) => {
						Check($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> Approve`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form> <form action="?/reject" method="POST" class="flex-1 sm:flex-none"><input type="hidden" name="id"${attr("value", tx.id)}/> `);
				Button($$renderer, {
					type: "submit",
					disabled: isSubmitting,
					variant: "outline",
					class: "w-full border-border bg-background text-foreground hover:bg-background hover:text-red-400 font-bold h-9 px-4 rounded-lg text-xs gap-1.5",
					children: ($$renderer) => {
						X($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> Reject`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="space-y-3"><h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Global Audit Ledger</h3> <div class="overflow-x-auto rounded-xl border border-border bg-background/20"><table class="w-full border-collapse text-left text-xs text-muted-foreground"><thead class="border-b border-border bg-background/60 font-bold uppercase tracking-wider text-neutral-500 text-[10px]"><tr><th class="px-4 py-3">Player</th><th class="px-4 py-3">Type</th><th class="px-4 py-3">Reference Code</th><th class="px-4 py-3">Date</th><th class="px-4 py-3">Status</th><th class="px-4 py-3 text-right">Amount</th></tr></thead><tbody class="divide-y divide-neutral-800 font-medium"><!--[-->`);
		const each_array_1 = ensure_array_like(data.transactions);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let tx = each_array_1[$$index_1];
			$$renderer.push(`<tr class="hover:bg-background/10 transition duration-150"><td class="whitespace-nowrap px-4 py-4 text-foreground font-bold">${escape_html(tx.profile.username)}</td><td class="whitespace-nowrap px-4 py-4"><div class="flex items-center gap-2">`);
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
		$$renderer.push(`<!--]--></tbody></table></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D2JNXLSJ.js.map
