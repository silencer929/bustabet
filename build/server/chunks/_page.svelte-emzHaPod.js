import { a5 as store_get, a6 as escape_html, a7 as unsubscribe_stores, V as derived } from './dev-CaPlrGUY.js';
import { p as page } from './stores-Dd-I0j7h.js';
import './client-D13NV19g.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-Hg6bLl4F.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/auth/register/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let isSubmitting = false;
		const referralQuery = derived(() => store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("ref") || "");
		$$renderer.push(`<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8"><div class="w-full max-w-lg rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black tracking-tight text-neutral-100">Create Your Account</h2> <p class="text-xs text-neutral-500 font-semibold">Join Busta Bet to access premium decimal odds</p></div> <form method="POST" class="space-y-4">`);
		if (store_get($$store_subs ??= {}, "$page", page).form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
			Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$page", page).form.error)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="email" class="text-xs font-bold text-muted-foreground">Email Address</label> `);
		Input($$renderer, {
			id: "email",
			name: "email",
			type: "email",
			required: true,
			placeholder: "name@example.com",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="username" class="text-xs font-bold text-muted-foreground">Username</label> `);
		Input($$renderer, {
			id: "username",
			name: "username",
			type: "text",
			required: true,
			placeholder: "username",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10"
		});
		$$renderer.push(`<!----></div></div> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="fullName" class="text-xs font-bold text-muted-foreground">Full Name</label> `);
		Input($$renderer, {
			id: "fullName",
			name: "fullName",
			type: "text",
			required: true,
			placeholder: "John Doe",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="password" class="text-xs font-bold text-muted-foreground">Password</label> `);
		Input($$renderer, {
			id: "password",
			name: "password",
			type: "password",
			required: true,
			placeholder: "••••••••",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10"
		});
		$$renderer.push(`<!----></div></div> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="phone" class="text-xs font-bold text-muted-foreground">Phone Number (E.164)</label> `);
		Input($$renderer, {
			id: "phone",
			name: "phone",
			type: "tel",
			required: true,
			placeholder: "+254712345678",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="country" class="text-xs font-bold text-muted-foreground">Country</label> `);
		Input($$renderer, {
			id: "country",
			name: "country",
			type: "text",
			required: true,
			placeholder: "Kenya",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10"
		});
		$$renderer.push(`<!----></div></div> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="currency" class="text-xs font-bold text-muted-foreground">Preferred Currency</label> <select id="currency" name="currency" required="" class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-amber-500 focus:outline-none">`);
		$$renderer.option({ value: "KES" }, ($$renderer) => {
			$$renderer.push(`KES (Kenyan Shilling)`);
		});
		$$renderer.option({ value: "NGN" }, ($$renderer) => {
			$$renderer.push(`NGN (Nigerian Naira)`);
		});
		$$renderer.option({ value: "GHS" }, ($$renderer) => {
			$$renderer.push(`GHS (Ghanaian Cedi)`);
		});
		$$renderer.option({ value: "TZS" }, ($$renderer) => {
			$$renderer.push(`TZS (Tanzanian Shilling)`);
		});
		$$renderer.option({ value: "UGX" }, ($$renderer) => {
			$$renderer.push(`UGX (Ugandan Shilling)`);
		});
		$$renderer.option({ value: "ZAR" }, ($$renderer) => {
			$$renderer.push(`ZAR (South African Rand)`);
		});
		$$renderer.option({ value: "USD" }, ($$renderer) => {
			$$renderer.push(`USD (US Dollar)`);
		});
		$$renderer.push(`</select></div> <div class="space-y-1.5 relative"><label for="referralCode" class="text-xs font-bold text-muted-foreground">Referral Code (Optional)</label> `);
		Input($$renderer, {
			id: "referralCode",
			name: "referralCode",
			type: "text",
			value: referralQuery(),
			placeholder: "CHAMP-XXXXXX",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10 pr-16"
		});
		$$renderer.push(`<!----> `);
		if (referralQuery()) {
			$$renderer.push("<!--[0-->");
			Badge($$renderer, {
				class: "absolute right-2.5 top-8 bg-amber-500 text-neutral-950 text-[9px] font-black h-5 py-0",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Active`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html("Register")}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form> <div class="text-center border-t border-border/80 pt-4 text-xs font-semibold text-neutral-500">Already have an account? <a href="/auth/login" class="text-amber-500 hover:text-amber-400 transition ml-1">Log In</a></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-emzHaPod.js.map
