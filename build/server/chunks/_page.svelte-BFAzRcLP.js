import { a2 as ensure_array_like, a1 as stringify, a6 as escape_html, ab as spread_props, ac as sanitize_props, ad as slot } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { T as Ticket } from './ticket-Rmcru2W5.js';
import { U as User_round } from './user-round-CEiw8tn8.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import './index-Bai2VLr5.js';

//#region node_modules/lucide-svelte/dist/icons/layers.svelte
function Layers($$renderer, $$props) {
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
		{ name: "layers" },
		sanitize_props($$props),
		{
			/**
			* @component @name Layers
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIuODMgMi4xOGEyIDIgMCAwIDAtMS42NiAwTDIuNiA2LjA4YTEgMSAwIDAgMCAwIDEuODNsOC41OCAzLjkxYTIgMiAwIDAgMCAxLjY2IDBsOC41OC0zLjlhMSAxIDAgMCAwIDAtMS44M3oiIC8+CiAgPHBhdGggZD0iTTIgMTJhMSAxIDAgMCAwIC41OC45MWw4LjYgMy45MWEyIDIgMCAwIDAgMS42NSAwbDguNTgtMy45QTEgMSAwIDAgMCAyMiAxMiIgLz4KICA8cGF0aCBkPSJNMiAxN2ExIDEgMCAwIDAgLjU4LjkxbDguNiAzLjkxYTIgMiAwIDAgMCAxLjY1IDBsOC41OC0zLjlBMSAxIDAgMCAwIDIyIDE3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/layers
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" }],
				["path", { "d": "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" }],
				["path", { "d": "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" }]
			],
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
//#region src/routes/profile/bets/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const getStatusClass = (status) => {
			switch (status) {
				case "WON": return "bg-emerald-950/40 text-emerald-400 border-emerald-800/80";
				case "PENDING": return "bg-amber-950/40 text-amber-400 border-amber-800/80";
				case "VOIDED": return "bg-blue-950/40 text-blue-400 border-blue-800/80";
				default: return "bg-red-950/40 text-red-400 border-red-800/80";
			}
		};
		$$renderer.push(`<div class="space-y-6"><a href="/profile" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white transition">`);
		Chevron_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span>Back to Profile</span></a> <div class="flex items-center gap-2 border-b border-neutral-800/80 pb-3">`);
		Ticket($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">My Placed Bets</h1></div> `);
		if (data.bets.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-neutral-800 rounded-lg">You have not placed any wagers yet. Go to the Sportsbook to make your first selection!</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array = ensure_array_like(data.bets);
			for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
				let bet = each_array[$$index_1];
				$$renderer.push(`<div class="rounded-xl border border-border bg-card p-5 flex flex-col justify-between gap-4"><div class="flex justify-between items-center border-b border-border/60 pb-3"><div class="flex items-center gap-2">`);
				if (bet.type === "COMBO") {
					$$renderer.push("<!--[0-->");
					Layers($$renderer, { class: "h-4 w-4 text-primary shrink-0" });
					$$renderer.push(`<!----> <span class="text-xs font-black text-neutral-200">COMBO / MULTIBET</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					User_round($$renderer, { class: "h-4 w-4 text-primary shrink-0" });
					$$renderer.push(`<!----> <span class="text-xs font-black text-neutral-200">SINGLE BET</span>`);
				}
				$$renderer.push(`<!--]--> `);
				Badge($$renderer, {
					class: `border text-[8px] font-bold px-1.5 py-0 rounded ${stringify(getStatusClass(bet.status))}`,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(bet.status)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> <span class="text-[9px] font-bold text-neutral-500">${escape_html(formatGameTime(bet.createdAt))}</span></div> <div class="space-y-2">`);
				if (bet.type === "COMBO") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="space-y-2"><!--[-->`);
					const each_array_1 = ensure_array_like(bet.selections);
					for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
						let selection = each_array_1[$$index];
						$$renderer.push(`<div class="pl-3 border-l-2 border-primary/40 space-y-0.5"><div class="text-xs font-bold text-neutral-300">${escape_html(selection.selection)}</div> <div class="text-[9px] text-neutral-500 font-semibold">${escape_html(selection.homeTeam)} vs ${escape_html(selection.awayTeam)} • Odds: ${escape_html(selection.odds.toFixed(2))}</div></div>`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="pl-3 border-l-2 border-primary/40 space-y-0.5"><div class="text-xs font-bold text-neutral-300">${escape_html(bet.market.selection)}</div> <div class="text-[9px] text-neutral-500 font-semibold">${escape_html(bet.game.homeTeam)} vs ${escape_html(bet.game.awayTeam)} • Odds: ${escape_html(bet.odds.toFixed(2))}</div></div>`);
				}
				$$renderer.push(`<!--]--></div> <div class="border-t border-border/60 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-bold text-neutral-400"><div class="flex gap-4"><span>Stake: <span class="text-foreground">${escape_html(formatCurrency(bet.stake, auth.user?.currency || "USD"))}</span></span> <span>Total Odds: <span class="text-primary">${escape_html(bet.odds.toFixed(2))}</span></span></div> <div><span>Potential Payout: <span class="text-emerald-500 font-black text-sm">${escape_html(formatCurrency(bet.potentialWin, auth.user?.currency || "USD"))}</span></span></div></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BFAzRcLP.js.map
