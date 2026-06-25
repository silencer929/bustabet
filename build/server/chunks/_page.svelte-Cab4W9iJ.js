import { a6 as escape_html, a2 as ensure_array_like, $ as attr_class, V as derived } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import './client-l_RRY9BB.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { S as Send } from './send-SE0_Khnu.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-Dt6tmOqv.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/support/[ticketId]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		let replyText = "";
		const isClosed = derived(() => data.conversation.status === "CLOSED");
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="space-y-6 max-w-4xl mx-auto"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4"><div class="space-y-1"><a href="/support" class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition mb-1">`);
			Chevron_left($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----> <span>Back to Tickets</span></a> <h1 class="text-sm font-bold text-neutral-100">${escape_html(data.conversation.subject)}</h1></div> <div class="flex items-center gap-3"><span class="text-[10px] font-bold text-neutral-500 tracking-wider">Ref: ${escape_html(data.conversation.id)}</span> `);
			Badge($$renderer, {
				class: `border text-[9px] font-bold px-2 py-0.5 rounded
        ${data.conversation.status === "CLOSED" ? "bg-background text-muted-foreground border-neutral-700" : "bg-emerald-950/40 text-emerald-400 border-emerald-800/80"}`,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(data.conversation.status)}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div></div> <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2"><!--[-->`);
			const each_array = ensure_array_like(data.conversation.messages);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let message = each_array[$$index];
				const isMe = message.senderId === auth.user?.id;
				$$renderer.push(`<div${attr_class(`flex w-full ${isMe ? "justify-end" : "justify-start"}`)}><div${attr_class(`max-w-[80%] rounded-2xl p-4 space-y-1.5 border ${isMe ? "bg-background border-border text-foreground rounded-tr-none" : "bg-background border-amber-500/20 text-neutral-300 rounded-tl-none"}`)}><div class="flex items-center gap-2"><span${attr_class(`text-[10px] font-black tracking-wide ${isMe ? "text-muted-foreground" : "text-amber-500"}`)}>${escape_html(isMe ? "You" : message.sender.username)}</span> `);
				if (!isMe && message.sender.role === "ADMIN") {
					$$renderer.push("<!--[0-->");
					Badge($$renderer, {
						class: "bg-red-950/40 text-red-400 border border-red-800/80 text-[8px] font-black px-1 py-0 h-4",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Staff`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <p class="text-xs leading-relaxed font-semibold break-words whitespace-pre-wrap">${escape_html(message.message)}</p> <span class="text-[9px] font-semibold text-neutral-600 block text-right pt-0.5">${escape_html(formatGameTime(message.createdAt))}</span></div></div>`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (isClosed()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-xl bg-background border border-border/80 p-4 text-center text-xs font-semibold text-neutral-500">This support ticket has been closed. If you require further assistance, please open a new ticket.</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<form method="POST" class="space-y-4">`);
				if (form?.error) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
					Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
					$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="flex gap-2">`);
				Input($$renderer, {
					type: "text",
					name: "message",
					required: true,
					disabled: isSubmitting,
					placeholder: "Type your reply here...",
					class: "bg-background border-border focus:border-amber-500 text-xs h-11 font-medium text-foreground",
					get value() {
						return replyText;
					},
					set value($$value) {
						replyText = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Button($$renderer, {
					type: "submit",
					disabled: replyText.trim().length === 0,
					class: "h-11 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg gap-1.5 shadow-md disabled:bg-background",
					children: ($$renderer) => {
						Send($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> <span class="hidden sm:inline">Send</span>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div></form>`);
			}
			$$renderer.push(`<!--]--></div>`);
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
//# sourceMappingURL=_page.svelte-Cab4W9iJ.js.map
