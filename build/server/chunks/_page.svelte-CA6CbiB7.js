import { a6 as escape_html } from './dev-CaPlrGUY.js';
import './client-D13NV19g.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { K as Key_round } from './key-round-DpBMRo95.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import './internal2-Hg6bLl4F.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/auth/forgot-password/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		let isSubmitting = false;
		$$renderer.push(`<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8"><div class="w-full max-w-md rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">`);
		Key_round($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> Reset Password</h2> <p class="text-xs text-neutral-500 font-semibold">Enter your email to receive a secure recovery link</p></div> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3"><div class="flex justify-center">`);
			Circle_check($$renderer, { class: "h-8 w-8 text-green-500 animate-bounce" });
			$$renderer.push(`<!----></div> <p class="text-xs text-green-400 font-bold leading-relaxed">${escape_html(form.message)}</p> <div class="pt-2"><a href="/auth/login">`);
			Button($$renderer, {
				variant: "outline",
				class: "h-9 w-full text-xs font-bold border-border bg-background text-foreground",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Return to Login`);
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
			$$renderer.push(`<!--]--> <div class="space-y-1.5"><label for="email" class="text-xs font-bold text-muted-foreground">Email Address</label> `);
			Input($$renderer, {
				id: "email",
				name: "email",
				type: "email",
				required: true,
				placeholder: "name@example.com",
				disabled: isSubmitting,
				class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground"
			});
			$$renderer.push(`<!----></div> `);
			Button($$renderer, {
				type: "submit",
				disabled: isSubmitting,
				class: "w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500",
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html("Send Recovery Link")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></form>`);
		}
		$$renderer.push(`<!--]--> `);
		if (!form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-center border-t border-border/80 pt-4 text-xs font-semibold text-neutral-500">Remember your credentials? <a href="/auth/login" class="text-amber-500 hover:text-amber-400 transition ml-1">Log In</a></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CA6CbiB7.js.map
