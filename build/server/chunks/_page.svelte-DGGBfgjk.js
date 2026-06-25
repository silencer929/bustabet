import { a6 as escape_html, V as derived } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import './client-DEbwqaIh.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { A as Arrow_down_left } from './arrow-down-left-BmCe1wM1.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import './internal2-CJLebosf.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/wallet/deposit/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		let inputAmount = null;
		const isBelowMinimum = derived(() => inputAmount !== null && inputAmount < data.minDeposit);
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="space-y-6"><a href="/wallet" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition">`);
			Arrow_down_left($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----> <span>Back to Wallet</span></a> <div class="flex items-center justify-center min-h-[calc(100vh-16rem)]"><div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl backdrop-blur-md space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black tracking-tight text-foreground flex items-center justify-center gap-2">`);
			Arrow_down_left($$renderer, { class: "h-5 w-5 text-primary" });
			$$renderer.push(`<!----> Deposit Funds</h2> <p class="text-xs text-muted-foreground font-semibold">Initiate an instant Safaricom M-Pesa STK push deposit</p></div> `);
			if (form?.success) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3"><div class="flex justify-center">`);
				Circle_check($$renderer, { class: "h-8 w-8 text-green-500 animate-bounce" });
				$$renderer.push(`<!----></div> <p class="text-xs text-green-400 font-bold leading-relaxed">${escape_html(form.message)}</p> <p class="text-[10px] text-neutral-500">Please enter your M-Pesa PIN on your phone to authorize. Your balance will update instantly upon confirmation.</p> <div class="pt-2"><a href="/wallet">`);
				Button($$renderer, {
					class: "h-10 w-full bg-primary text-primary-foreground font-black rounded-lg",
					children: ($$renderer) => {
						$$renderer.push(`<!---->View Wallet Balance`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></a></div></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<form method="POST" class="space-y-4">`);
				if (form?.error) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold leading-normal">`);
					Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
					$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="space-y-1.5"><label for="amount" class="text-xs font-bold text-neutral-400">Amount to Deposit</label> <div class="relative">`);
				Input($$renderer, {
					id: "amount",
					name: "amount",
					type: "number",
					required: true,
					placeholder: "500",
					disabled: isSubmitting,
					class: "bg-background border-border focus:border-primary text-xs h-10 pr-12 font-bold text-foreground",
					get value() {
						return inputAmount;
					},
					set value($$value) {
						inputAmount = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <span class="absolute right-3 top-2.5 text-xs font-bold text-neutral-500">${escape_html(auth.user?.currency || "KES")}</span></div> <div class="flex justify-between items-center text-[10px] font-bold mt-1"><span class="text-neutral-500">Minimum Deposit: ${escape_html(formatCurrency(data.minDeposit, auth.user?.currency || "KES"))}</span> `);
				if (isBelowMinimum()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-red-400">Amount is below the minimum limit</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div> <div class="space-y-1.5"><label for="phone" class="text-xs font-bold text-neutral-400">M-Pesa Mobile Number</label> `);
				Input($$renderer, {
					id: "phone",
					name: "phone",
					type: "tel",
					required: true,
					value: auth.user?.phone || "",
					placeholder: "+254712345678",
					disabled: isSubmitting,
					class: "bg-background border-border focus:border-primary text-xs h-10 font-bold text-foreground"
				});
				$$renderer.push(`<!----> <span class="text-[10px] text-neutral-500 block font-semibold">Please enter in international E.164 format (+254...)</span></div> `);
				Button($$renderer, {
					type: "submit",
					disabled: isBelowMinimum() || inputAmount === null || inputAmount <= 0,
					class: "w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-lg shadow-md transition disabled:bg-neutral-800 disabled:text-neutral-500",
					children: ($$renderer) => {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`Request STK Push`);
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
//# sourceMappingURL=_page.svelte-DGGBfgjk.js.map
