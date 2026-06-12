import { a2 as ensure_array_like, a0 as attr, a1 as stringify, a6 as escape_html } from './dev-CaPlrGUY.js';
import { C as Chevron_right } from './chevron-right-B_iJr5sk.js';
import { C as Circle_question_mark } from './circle-question-mark-BkPuALat.js';
import { M as Message_square } from './message-square-DhTyB35p.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import './index-Bai2VLr5.js';

//#region src/routes/admin/support/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const getStatusClass = (status) => {
			switch (status) {
				case "OPEN": return "bg-emerald-950/40 text-emerald-400 border-emerald-800/80";
				case "RESOLVED": return "bg-blue-950/40 text-blue-400 border-blue-800/80";
				default: return "bg-background text-muted-foreground border-neutral-700";
			}
		};
		$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
		Circle_question_mark($$renderer, { class: "h-5 w-5 text-red-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Ticketing Board</h1></div> `);
		if (data.tickets.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-12 border border-dashed border-border rounded-lg bg-background/10">All clear! No player tickets registered in the database.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-3"><!--[-->`);
			const each_array = ensure_array_like(data.tickets);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let ticket = each_array[$$index];
				$$renderer.push(`<a${attr("href", `/admin/support/${stringify(ticket.id)}`)} class="flex items-center justify-between border border-border/80 bg-background/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"><div class="flex items-center gap-4"><div class="rounded-lg bg-background p-2.5 border border-border text-muted-foreground">`);
				Message_square($$renderer, { class: "h-4 w-4 text-red-500" });
				$$renderer.push(`<!----></div> <div><div class="text-xs font-bold text-foreground">${escape_html(ticket.subject)}</div> <div class="text-[10px] text-neutral-500 mt-1">Player: ${escape_html(ticket.profile.username)} • Ref: ${escape_html(ticket.id)} • Created ${escape_html(formatGameTime(ticket.createdAt))}</div></div></div> <div class="flex items-center gap-4">`);
				Badge($$renderer, {
					class: `border text-[9px] font-bold px-2.5 py-0.5 rounded ${stringify(getStatusClass(ticket.status))}`,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(ticket.status)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Chevron_right($$renderer, { class: "h-4 w-4 text-neutral-500" });
				$$renderer.push(`<!----></div></a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CSeAT-KM.js.map
