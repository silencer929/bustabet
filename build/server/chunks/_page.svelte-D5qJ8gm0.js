import { a6 as escape_html, a2 as ensure_array_like, $ as attr_class, a1 as stringify } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { A as Arrow_down_left } from './arrow-down-left-BmCe1wM1.js';
import { A as Arrow_up_right } from './arrow-up-right-B4fjdnXV.js';
import { H as History } from './history-B7FIAMSl.js';
import { W as Wallet } from './wallet-CAywWlao.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/wallet/+page.svelte
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
		$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
		Wallet($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Wallet Dashboard</h1></div> <div class="rounded-2xl border border-border bg-background/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"><div class="space-y-1.5"><span class="text-xs font-bold text-neutral-500 uppercase tracking-widest">Available Balance</span> <div class="text-3xl font-black text-neutral-100 tracking-tight">${escape_html(formatCurrency(data.balance, auth.user?.currency || "USD"))}</div></div> <div class="flex items-center gap-2.5 w-full sm:w-auto"><a href="/wallet/deposit" class="flex-1 sm:flex-none">`);
		Button($$renderer, {
			class: "w-full h-10 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg gap-1.5",
			children: ($$renderer) => {
				Arrow_down_left($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----> Deposit`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></a> <a href="/wallet/withdraw" class="flex-1 sm:flex-none">`);
		Button($$renderer, {
			variant: "outline",
			class: "w-full h-10 border-border bg-background text-foreground hover:bg-background font-bold rounded-lg gap-1.5",
			children: ($$renderer) => {
				Arrow_up_right($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----> Withdraw`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></a></div></div> <div class="space-y-3"><div class="flex items-center justify-between"><h2 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Recent Transactions</h2> <a href="/wallet/history" class="text-[10px] font-bold text-amber-500 hover:text-amber-400 transition flex items-center gap-1">`);
		History($$renderer, { class: "h-3.5 w-3.5" });
		$$renderer.push(`<!----> Full History</a></div> `);
		if (data.transactions.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-12 border border-dashed border-border rounded-lg">No transactions logged yet</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-2"><!--[-->`);
			const each_array = ensure_array_like(data.transactions);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tx = each_array[$$index];
				$$renderer.push(`<div class="flex items-center justify-between border border-border bg-background/20 p-3.5 rounded-xl"><div class="flex items-center gap-3"><div class="rounded-lg bg-background p-2 border border-border text-muted-foreground">`);
				if (tx.type === "DEPOSIT" || tx.type === "PAYOUT") {
					$$renderer.push("<!--[0-->");
					Arrow_down_left($$renderer, { class: "h-4 w-4 text-emerald-500" });
				} else {
					$$renderer.push("<!--[-1-->");
					Arrow_up_right($$renderer, { class: "h-4 w-4 text-red-500" });
				}
				$$renderer.push(`<!--]--></div> <div><div class="text-xs font-bold text-foreground">${escape_html(tx.type)}</div> <div class="text-[10px] text-neutral-500 mt-0.5">${escape_html(tx.reference)} • ${escape_html(formatGameTime(tx.createdAt))}</div></div></div> <div class="flex items-center gap-4"><span${attr_class(`text-xs font-black ${tx.type === "DEPOSIT" || tx.type === "PAYOUT" ? "text-emerald-500" : "text-red-500"}`)}>${escape_html(tx.type === "DEPOSIT" || tx.type === "PAYOUT" ? "+" : "-")}${escape_html(formatCurrency(tx.amount, tx.currency))}</span> `);
				Badge($$renderer, {
					class: `border text-[9px] font-bold px-2 py-0.5 rounded ${stringify(getStatusClass(tx.status))}`,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(tx.status)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D5qJ8gm0.js.map
