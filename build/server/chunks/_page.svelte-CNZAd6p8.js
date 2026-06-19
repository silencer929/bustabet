import { a6 as escape_html, V as derived } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import './client-BoiIEGkd.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { A as Arrow_up_right } from './arrow-up-right-B4fjdnXV.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import './internal2-BO6BJIyN.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/wallet/withdraw/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		let inputAmount = null;
		const exceedsBalance = derived(() => inputAmount !== null && inputAmount > data.balance);
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="space-y-6"><a href="/wallet" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">`);
			Arrow_up_right($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----> <span>Back to Wallet</span></a> <div class="flex items-center justify-center min-h-[calc(100vh-16rem)]"><div class="w-full max-w-md rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">`);
			Arrow_up_right($$renderer, { class: "h-5 w-5 text-amber-500" });
			$$renderer.push(`<!----> Request Withdrawal</h2> <p class="text-xs text-neutral-500 font-semibold">Withdraw funds from your active wallet ledger</p></div> `);
			if (form?.success) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3"><div class="flex justify-center">`);
				Circle_check($$renderer, { class: "h-8 w-8 text-green-500 animate-bounce" });
				$$renderer.push(`<!----></div> <p class="text-xs text-green-400 font-bold leading-relaxed">${escape_html(form.message)}</p> <div class="pt-2"><a href="/wallet">`);
				Button($$renderer, {
					class: "h-10 w-full bg-amber-500 text-neutral-950 font-black rounded-lg",
					children: ($$renderer) => {
						$$renderer.push(`<!---->View Wallet Dashboard`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></a></div></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<form method="POST" class="space-y-4">`);
				if (form?.error) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
					Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
					$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="rounded-lg bg-background border border-border/80 px-4 py-2.5 flex justify-between items-center text-xs font-bold"><span class="text-neutral-500">Available Balance</span> <span class="text-foreground">${escape_html(formatCurrency(data.balance, auth.user?.currency || "USD"))}</span></div> <div class="space-y-1.5"><label for="amount" class="text-xs font-bold text-muted-foreground">Withdrawal Amount</label> <div class="relative">`);
				Input($$renderer, {
					id: "amount",
					name: "amount",
					type: "number",
					required: true,
					placeholder: "500",
					disabled: isSubmitting,
					class: "bg-background border-border focus:border-amber-500 text-xs h-10 pr-12 font-bold text-foreground",
					get value() {
						return inputAmount;
					},
					set value($$value) {
						inputAmount = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <span class="absolute right-3 top-2.5 text-xs font-bold text-neutral-500">${escape_html(auth.user?.currency || "KES")}</span></div> `);
				if (exceedsBalance()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-[10px] text-red-400 font-bold block">Entered amount exceeds your available balance limit</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="space-y-1.5"><label for="destination" class="text-xs font-bold text-muted-foreground">Destination Number / Account</label> `);
				Input($$renderer, {
					id: "destination",
					name: "destination",
					type: "text",
					required: true,
					value: auth.user?.phone || "",
					placeholder: "+254712345678",
					disabled: isSubmitting,
					class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground"
				});
				$$renderer.push(`<!----> <span class="text-[10px] text-neutral-500 block">Payouts are sent to this registered telephone or account number</span></div> `);
				Button($$renderer, {
					type: "submit",
					disabled: exceedsBalance() || inputAmount === null || inputAmount <= 0,
					class: "w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500",
					children: ($$renderer) => {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`Request Withdrawal`);
						$$renderer.push(`<!--]-->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form>`);
			}
			$$renderer.push(`<!--]--></div></div></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CNZAd6p8.js.map
