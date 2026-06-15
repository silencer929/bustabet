import { a6 as escape_html } from './dev-CaPlrGUY.js';
import './client-DQzrWsgp.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { K as Key_round } from './key-round-DpBMRo95.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import './internal2-B5zu9-sk.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/profile/security/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		let isSubmitting = false;
		$$renderer.push(`<div class="space-y-6 max-w-lg mx-auto"><a href="/profile" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">`);
		Chevron_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span>Back to Profile</span></a> <div class="rounded-2xl border border-border bg-background/60 p-6 space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black text-neutral-100 flex items-center justify-center gap-2">`);
		Key_round($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> Change Password</h2> <p class="text-xs text-neutral-500 font-semibold">Update your account credentials to keep your profile secure</p></div> <form method="POST" class="space-y-4">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
			Shield_alert($$renderer, { class: "h-4 w-4 shrink-0" });
			$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold">`);
			Circle_check($$renderer, { class: "h-4 w-4 shrink-0" });
			$$renderer.push(`<!----> <span>${escape_html(form.message)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="space-y-1.5"><label for="currentPassword" class="text-xs font-bold text-muted-foreground">Current Password</label> `);
		Input($$renderer, {
			id: "currentPassword",
			name: "currentPassword",
			type: "password",
			required: true,
			placeholder: "••••••••",
			disabled: isSubmitting,
			class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="newPassword" class="text-xs font-bold text-muted-foreground">New Password</label> `);
		Input($$renderer, {
			id: "newPassword",
			name: "newPassword",
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
			class: "w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html("Save Password")}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bfp9u7hL.js.map
