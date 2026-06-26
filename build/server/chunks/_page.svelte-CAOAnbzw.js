import { a6 as escape_html } from './dev-CaPlrGUY.js';
import './client-Bgo3BmUK.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { C as Circle_question_mark } from './circle-question-mark-BkPuALat.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import './internal2-ChqLRu9P.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';

//#region src/routes/support/new/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		let isSubmitting = false;
		$$renderer.push(`<div class="space-y-6"><a href="/support" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">`);
		Chevron_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span>Back to Support</span></a> <div class="flex items-center justify-center min-h-[calc(100vh-16rem)]"><div class="w-full max-w-lg rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">`);
		Circle_question_mark($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> Open Support Ticket</h2> <p class="text-xs text-neutral-500 font-semibold">Submit a new request to our administrative and technical staff</p></div> <form method="POST" class="space-y-4">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
			Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="space-y-1.5"><label for="subject" class="text-xs font-bold text-muted-foreground">Subject</label> `);
		Input($$renderer, {
			id: "subject",
			name: "subject",
			type: "text",
			required: true,
			placeholder: "Deposit not reflecting in account",
			class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-bold text-foreground"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="message" class="text-xs font-bold text-muted-foreground">Detailed Message</label> <textarea id="message" name="message" required="" rows="6" placeholder="Describe your technical or transaction issue here in detail..." class="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-amber-500 focus:outline-none"></textarea></div> `);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html("Open Ticket")}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CAOAnbzw.js.map
