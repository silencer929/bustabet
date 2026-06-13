import { a6 as escape_html, a0 as attr } from './dev-CaPlrGUY.js';
import './client-Dyk-VOtM.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { K as Key_round } from './key-round-DpBMRo95.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import './internal2-CGQ9d-pA.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/auth/reset-password/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		$$renderer.push(`<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8"><div class="w-full max-w-md rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">`);
		Key_round($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> New Password</h2> <p class="text-xs text-neutral-500 font-semibold">Enter and confirm your new secure password</p></div> `);
		if (!data.valid) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="rounded-lg bg-red-950/40 border border-red-800/80 p-4 text-center space-y-3"><div class="flex justify-center">`);
			Shield_alert($$renderer, { class: "h-8 w-8 text-red-500" });
			$$renderer.push(`<!----></div> <p class="text-xs text-red-400 font-bold leading-relaxed">${escape_html(data.error)}</p> <div class="pt-2"><a href="/auth/forgot-password">`);
			Button($$renderer, {
				class: "h-10 w-full bg-amber-500 text-neutral-950 font-black rounded-lg",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Request New Link`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></a></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (form?.success) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-lg bg-green-950/40 border border-green-800/80 p-4 text-center space-y-3"><div class="flex justify-center">`);
				Circle_check($$renderer, { class: "h-8 w-8 text-green-500 animate-bounce" });
				$$renderer.push(`<!----></div> <p class="text-xs text-green-400 font-bold leading-relaxed">${escape_html(form.message)}</p> <div class="pt-2"><a href="/auth/login">`);
				Button($$renderer, {
					class: "h-10 w-full bg-amber-500 text-neutral-950 font-black rounded-lg",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Proceed to Login`);
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
				$$renderer.push(`<!--]--> <input type="hidden" name="token"${attr("value", data.token)}/> <div class="space-y-1.5"><label for="password" class="text-xs font-bold text-muted-foreground">New Password</label> `);
				Input($$renderer, {
					id: "password",
					name: "password",
					type: "password",
					required: true,
					placeholder: "••••••••",
					disabled: isSubmitting,
					class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground"
				});
				$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="confirmPassword" class="text-xs font-bold text-muted-foreground">Confirm New Password</label> `);
				Input($$renderer, {
					id: "confirmPassword",
					name: "confirmPassword",
					type: "password",
					required: true,
					placeholder: "••••••••",
					disabled: isSubmitting,
					class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground"
				});
				$$renderer.push(`<!----></div> `);
				Button($$renderer, {
					type: "submit",
					disabled: isSubmitting,
					class: "w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html("Save New Password")}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D9u60iOy.js.map
