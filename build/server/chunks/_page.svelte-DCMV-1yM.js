import { a6 as escape_html, a2 as ensure_array_like, $ as attr_class, V as derived, ab as spread_props, ac as sanitize_props, ad as slot } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import './client-CWfkvNHE.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { S as Send } from './send-SE0_Khnu.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-Dp1Ug8Cc.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region node_modules/lucide-svelte/dist/icons/lock.svelte
function Lock($$renderer, $$props) {
	/**
	* @license lucide-svelte v1.0.1 - ISC
	*
	* ISC License
	*
	* Copyright (c) 2026 Lucide Icons and Contributors
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	* ---
	*
	* The following Lucide icons are derived from the Feather project:
	*
	* airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
	*
	* The MIT License (MIT) (for the icons listed above)
	*
	* Copyright (c) 2013-present Cole Bemis
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	*
	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	* SOFTWARE.
	*
	*/
	Icon($$renderer, spread_props([
		{ name: "lock" },
		sanitize_props($$props),
		{
			/**
			* @component @name Lock
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTEiIHg9IjMiIHk9IjExIiByeD0iMiIgcnk9IjIiIC8+CiAgPHBhdGggZD0iTTcgMTFWN2E1IDUgMCAwIDEgMTAgMHY0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/lock
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["rect", {
				"width": "18",
				"height": "11",
				"x": "3",
				"y": "11",
				"rx": "2",
				"ry": "2"
			}], ["path", { "d": "M7 11V7a5 5 0 0 1 10 0v4" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {});
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region src/routes/admin/support/[ticketId]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		let replyText = "";
		const isClosed = derived(() => data.conversation.status === "CLOSED");
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="space-y-6 max-w-4xl mx-auto"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4"><div class="space-y-1"><a href="/admin/support" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-foreground transition mb-1">`);
			Chevron_left($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----> <span>Back to Tickets</span></a> <h1 class="text-sm font-bold text-neutral-100">${escape_html(data.conversation.subject)}</h1></div> <div class="flex items-center gap-3"><span class="text-[10px] font-bold text-neutral-500">Ref: ${escape_html(data.conversation.id)}</span> `);
			Badge($$renderer, {
				class: `border text-[9px] font-bold px-2.5 py-0.5 rounded
        ${data.conversation.status === "CLOSED" ? "bg-background text-muted-foreground border-neutral-700" : "bg-emerald-950/40 text-emerald-400 border-emerald-800/80"}`,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(data.conversation.status)}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			if (!isClosed()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<form action="?/closeTicket" method="POST">`);
				Button($$renderer, {
					type: "submit",
					disabled: isSubmitting,
					variant: "outline",
					class: "h-8 text-[9px] font-black border-red-800/80 bg-red-950/10 text-red-400 hover:bg-red-600 hover:text-foreground px-2.5 gap-1 rounded-lg",
					children: ($$renderer) => {
						Lock($$renderer, { class: "h-3 w-3" });
						$$renderer.push(`<!----> Close Ticket`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2"><!--[-->`);
			const each_array = ensure_array_like(data.conversation.messages);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let message = each_array[$$index];
				const isAdmin = message.senderId === auth.user?.id;
				$$renderer.push(`<div${attr_class(`flex w-full ${isAdmin ? "justify-end" : "justify-start"}`)}><div${attr_class(`max-w-[80%] rounded-2xl p-4 space-y-1.5 border ${isAdmin ? "bg-background border-border text-foreground rounded-tr-none" : "bg-background border-red-500/20 text-neutral-300 rounded-tl-none"}`)}><div class="flex items-center gap-2"><span${attr_class(`text-[10px] font-black tracking-wide ${isAdmin ? "text-red-400" : "text-muted-foreground"}`)}>${escape_html(isAdmin ? "You (Staff)" : message.sender.username)}</span></div> <p class="text-xs leading-relaxed font-semibold break-words whitespace-pre-wrap">${escape_html(message.message)}</p> <span class="text-[9px] font-semibold text-neutral-600 block text-right pt-0.5">${escape_html(formatGameTime(message.createdAt))}</span></div></div>`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (isClosed()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-xl bg-background border border-border/80 p-4 text-center text-xs font-semibold text-neutral-500">This support ticket conversation has been completed and closed.</div>`);
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
					placeholder: "Type your official administrative reply here...",
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
					class: "h-11 px-5 bg-red-600 hover:bg-red-500 text-foreground font-black rounded-lg gap-1.5 shadow-md disabled:bg-background",
					children: ($$renderer) => {
						Send($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> <span class="hidden sm:inline">Reply</span>`);
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
//# sourceMappingURL=_page.svelte-DCMV-1yM.js.map
