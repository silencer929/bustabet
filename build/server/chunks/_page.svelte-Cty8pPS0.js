import { a2 as ensure_array_like, a6 as escape_html, ab as spread_props, ac as sanitize_props, ad as slot } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { C as Calendar } from './calendar-DYAJrNdf.js';
import { G as Gift } from './gift-MDqly1n4.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import './index-Bai2VLr5.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region node_modules/lucide-svelte/dist/icons/arrow-right.svelte
function Arrow_right($$renderer, $$props) {
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
		{ name: "arrow-right" },
		sanitize_props($$props),
		{
			/**
			* @component @name ArrowRight
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJtMTIgNSA3IDctNyA3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/arrow-right
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]],
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
//#region src/routes/promotions/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
		Gift($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Offers &amp; Promotions</h1></div> `);
		if (data.promotions.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center"><div class="rounded-full bg-background p-4 border border-border mb-4">`);
			Gift($$renderer, { class: "h-8 w-8 text-neutral-600" });
			$$renderer.push(`<!----></div> <h2 class="text-lg font-black text-muted-foreground">No Active Offers</h2> <p class="text-xs text-neutral-600 mt-1 max-w-xs">There are no active promotional campaigns running at the moment. Please check back soon!</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid grid-cols-1 gap-6 md:grid-cols-2"><!--[-->`);
			const each_array = ensure_array_like(data.promotions);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let promo = each_array[$$index];
				$$renderer.push(`<div class="rounded-2xl border border-border bg-background/40 overflow-hidden flex flex-col justify-between transition hover:border-neutral-700"><div class="p-6 space-y-4"><div class="flex items-center gap-2"><span class="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] font-black tracking-wider text-amber-500 uppercase">Active Offer</span> `);
				if (promo.bonusAmount > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-xs font-bold text-muted-foreground">Up to ${escape_html(formatCurrency(promo.bonusAmount, auth.user?.currency || "USD"))} Bonus</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <h2 class="text-lg font-black text-neutral-100 leading-snug">${escape_html(promo.title)}</h2> <p class="text-xs text-neutral-500 font-semibold leading-relaxed">${escape_html(promo.description || "No description available for this campaign.")}</p></div> <div class="border-t border-border/60 p-4 bg-background/40 flex items-center justify-between text-[10px] font-bold text-neutral-500"><div class="flex items-center gap-1.5">`);
				Calendar($$renderer, { class: "h-3.5 w-3.5 text-neutral-600" });
				$$renderer.push(`<!----> <span>Ends ${escape_html(formatGameTime(promo.endDate))}</span></div> <a href="/wallet/deposit">`);
				Button($$renderer, {
					variant: "ghost",
					class: "h-8 text-[10px] font-black text-amber-500 hover:text-amber-400 px-2 gap-1 rounded-lg",
					children: ($$renderer) => {
						$$renderer.push(`<span>Deposit &amp; Claim</span> `);
						Arrow_right($$renderer, { class: "h-3 w-3" });
						$$renderer.push(`<!---->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></a></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cty8pPS0.js.map
