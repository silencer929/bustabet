import { a2 as ensure_array_like, a0 as attr, a6 as escape_html } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import './client-Bgo3BmUK.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Chevron_right } from './chevron-right-B_iJr5sk.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { U as User } from './user-lk2iYgH7.js';
import { B as Button } from './button-Dgrh7fPh.js';
import './badge-Cl7OJJ39.js';
import './internal2-ChqLRu9P.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/profile/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		let isSubmitting = false;
		const subNav = [
			{
				name: "Security & Password",
				path: "/profile/security"
			},
			{
				name: "My bets",
				path: "/profile/bets"
			},
			{
				name: "Identity Verification (KYC)",
				path: "/profile/verification"
			}
		];
		$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
		User($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">My Account</h1></div> <div class="grid grid-cols-1 gap-6 md:grid-cols-3"><div class="space-y-2"><!--[-->`);
		const each_array = ensure_array_like(subNav);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<a${attr("href", item.path)} class="flex h-11 items-center justify-between rounded-lg border border-border bg-background/40 px-4 text-xs font-bold text-muted-foreground hover:border-neutral-700 hover:text-foreground transition"><span>${escape_html(item.name)}</span> `);
			Chevron_right($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----></a>`);
		}
		$$renderer.push(`<!--]--></div> <div class="md:col-span-2 rounded-2xl border border-border bg-background/60 p-6 space-y-6"><div class="space-y-1"><h2 class="text-base font-black text-neutral-100">Personal Details</h2> <p class="text-xs text-neutral-500 font-semibold">Modify your public full name and mobile number</p></div> <form method="POST" class="space-y-4">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
			Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold">`);
			Circle_check($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.message)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="email" class="text-xs font-bold text-neutral-500">Email Address (Locked)</label> `);
		Input($$renderer, {
			id: "email",
			type: "email",
			disabled: true,
			value: auth.user?.email,
			class: "bg-background border-border text-xs h-10 font-bold text-neutral-600"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="username" class="text-xs font-bold text-neutral-500">Username (Locked)</label> `);
		Input($$renderer, {
			id: "username",
			type: "text",
			disabled: true,
			value: auth.user?.username,
			class: "bg-background border-border text-xs h-10 font-bold text-neutral-600"
		});
		$$renderer.push(`<!----></div></div> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="fullName" class="text-xs font-bold text-muted-foreground">Full Name</label> `);
		Input($$renderer, {
			id: "fullName",
			name: "fullName",
			type: "text",
			required: true,
			value: auth.user?.fullName || "",
			placeholder: "John Doe",
			disabled: isSubmitting,
			class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="phone" class="text-xs font-bold text-muted-foreground">Phone Number (E.164)</label> `);
		Input($$renderer, {
			id: "phone",
			name: "phone",
			type: "tel",
			required: true,
			value: auth.user?.phone || "",
			placeholder: "+254712345678",
			disabled: isSubmitting,
			class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground"
		});
		$$renderer.push(`<!----></div></div> <div class="flex justify-end pt-2">`);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full sm:w-auto h-11 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html("Save Changes")}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></form></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BxBzJxrF.js.map
