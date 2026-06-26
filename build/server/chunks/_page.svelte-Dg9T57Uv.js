import { a2 as ensure_array_like, $ as attr_class, a6 as escape_html, a0 as attr } from './dev-CaPlrGUY.js';
import './client-Bgo3BmUK.js';
import { B as Bell } from './bell-Dw-NPsQW.js';
import { C as Check } from './check-CZbLEyBV.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { T as Trash_2 } from './trash-2-BUMxecEK.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import './internal2-ChqLRu9P.js';
import './index-DBqjc0Yf.js';
import './Icon-Bxs3Ke_h.js';
import './index-Bai2VLr5.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/notifications/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let isSubmitting = false;
		$$renderer.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4"><div class="flex items-center gap-2">`);
		Bell($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Notifications</h1></div> `);
		if (data.notifications.some((n) => !n.read)) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form action="?/clearAll" method="POST">`);
			Button($$renderer, {
				type: "submit",
				variant: "outline",
				disabled: isSubmitting,
				class: "h-9 border-border bg-background/40 text-xs font-bold text-muted-foreground hover:text-foreground rounded-lg gap-1.5",
				children: ($$renderer) => {
					Trash_2($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Mark All as Read`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (data.notifications.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center"><div class="rounded-full bg-background p-4 border border-border mb-4">`);
			Bell($$renderer, { class: "h-8 w-8 text-neutral-600" });
			$$renderer.push(`<!----></div> <h2 class="text-lg font-black text-muted-foreground">All Clear</h2> <p class="text-xs text-neutral-600 mt-1 max-w-xs">You do not have any notification alerts in your account feed.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-2.5"><!--[-->`);
			const each_array = ensure_array_like(data.notifications);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let notification = each_array[$$index];
				$$renderer.push(`<div${attr_class(`flex items-start justify-between border p-4 rounded-xl transition duration-150 ${notification.read ? "border-neutral-900 bg-background/10 text-muted-foreground" : "border-border bg-background/40 text-foreground"}`)}><div class="flex items-start gap-3 max-w-[85%]"><div${attr_class(`rounded-lg p-2 border shrink-0 mt-0.5 ${notification.read ? "border-border bg-background text-neutral-600" : "border-amber-500/20 bg-amber-500/10 text-amber-500"}`)}>`);
				Circle_check($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----></div> <div class="space-y-1"><div${attr_class(`text-xs font-bold ${notification.read ? "text-muted-foreground" : "text-neutral-100"}`)}>${escape_html(notification.title)}</div> <p class="text-[11px] leading-relaxed text-neutral-500 font-semibold">${escape_html(notification.message)}</p> <span class="text-[9px] font-bold text-neutral-600 block pt-1">${escape_html(formatGameTime(notification.createdAt))}</span></div></div> `);
				if (!notification.read) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<form action="?/markRead" method="POST"><input type="hidden" name="id"${attr("value", notification.id)}/> `);
					Button($$renderer, {
						type: "submit",
						variant: "ghost",
						size: "icon",
						disabled: isSubmitting,
						class: "text-neutral-500 hover:text-amber-500 h-8 w-8 rounded-lg",
						title: "Mark as Read",
						children: ($$renderer) => {
							Check($$renderer, { class: "h-4 w-4" });
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></form>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dg9T57Uv.js.map
