import { a6 as escape_html, a2 as ensure_array_like, a1 as stringify, a0 as attr, V as derived, ab as spread_props, ac as sanitize_props, ad as slot } from './dev-CaPlrGUY.js';
import './client-l_RRY9BB.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { C as Check } from './check-CZbLEyBV.js';
import { S as Search } from './search-BoMM9cGn.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { T as Ticket } from './ticket-Rmcru2W5.js';
import { X } from './x-B7X57umf.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-Dt6tmOqv.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region node_modules/lucide-svelte/dist/icons/ban.svelte
function Ban($$renderer, $$props) {
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
		{ name: "ban" },
		sanitize_props($$props),
		{
			/**
			* @component @name Ban
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNNC45MjkgNC45MjkgMTkuMDcgMTkuMDcxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/ban
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}], ["path", { "d": "M4.929 4.929 19.07 19.071" }]],
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
//#region src/routes/admin/bets/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		let searchQuery = "";
		let selectedStatus = "all";
		const filteredBets = derived(() => data.bets.filter((bet) => {
			return (bet.profile.username.toLowerCase().includes(searchQuery.toLowerCase()) || bet.game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || bet.game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())) && true;
		}));
		const getStatusClass = (status) => {
			switch (status) {
				case "WON": return "bg-emerald-950/40 text-emerald-400 border-emerald-800/80";
				case "PENDING": return "bg-amber-950/40 text-amber-400 border-amber-800/80";
				case "VOIDED": return "bg-blue-950/40 text-blue-400 border-blue-800/80";
				default: return "bg-red-950/40 text-red-400 border-red-800/80";
			}
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
			Ticket($$renderer, { class: "h-5 w-5 text-red-500" });
			$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Wagers Overwatch</h1></div> `);
			if (form?.error) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold max-w-lg">`);
				Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
				$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="rounded-xl border border-border bg-background/20 p-4 flex flex-col sm:flex-row items-center gap-3"><div class="relative w-full sm:flex-1">`);
			Search($$renderer, { class: "absolute left-3 top-3 h-4 w-4 text-neutral-500" });
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				type: "text",
				placeholder: "Search by player or team matchups...",
				class: "h-10 w-full pl-9 bg-background border-border focus:border-red-500 text-xs font-semibold text-foreground",
				get value() {
					return searchQuery;
				},
				set value($$value) {
					searchQuery = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> `);
			$$renderer.select({
				value: selectedStatus,
				class: "flex h-10 w-full sm:w-40 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
			}, ($$renderer) => {
				$$renderer.option({ value: "all" }, ($$renderer) => {
					$$renderer.push(`All Wagers`);
				});
				$$renderer.option({ value: "PENDING" }, ($$renderer) => {
					$$renderer.push(`Pending`);
				});
				$$renderer.option({ value: "WON" }, ($$renderer) => {
					$$renderer.push(`Won`);
				});
				$$renderer.option({ value: "LOST" }, ($$renderer) => {
					$$renderer.push(`Lost`);
				});
				$$renderer.option({ value: "VOIDED" }, ($$renderer) => {
					$$renderer.push(`Voided`);
				});
			});
			$$renderer.push(`</div> <div class="space-y-3"><div class="flex items-center justify-between"><h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Bets Registry</h3> <span class="text-[10px] font-bold text-neutral-600">Showing ${escape_html(filteredBets().length)} of ${escape_html(data.bets.length)} wagers</span></div> `);
			if (filteredBets().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">No registered wagers match your active search filters.</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="space-y-3"><!--[-->`);
				const each_array = ensure_array_like(filteredBets());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let bet = each_array[$$index];
					$$renderer.push(`<div class="rounded-xl border border-border bg-background/40 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"><div class="space-y-1.5 flex-1"><div class="flex items-center gap-2"><span class="text-xs font-black text-foreground">${escape_html(bet.game.homeTeam)} vs ${escape_html(bet.game.awayTeam)}</span> `);
					Badge($$renderer, {
						class: `border text-[8px] font-bold px-1.5 py-0 rounded ${stringify(getStatusClass(bet.status))}`,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(bet.status)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> <div class="text-[10px] text-neutral-500">Player: <span class="text-neutral-300 font-bold">${escape_html(bet.profile.username)}</span> • 
                Selection: <span class="text-amber-500 font-black">${escape_html(bet.market.selection)}</span> • 
                Odds: <span class="text-muted-foreground font-bold">${escape_html(bet.odds.toFixed(2))}</span> • 
                Placed ${escape_html(formatGameTime(bet.createdAt))}</div> <div class="text-xs font-bold text-muted-foreground">Stake: ${escape_html(formatCurrency(bet.stake, "USD"))} • 
                Potential Payout: <span class="text-emerald-500 font-black">${escape_html(formatCurrency(bet.potentialWin, "USD"))}</span></div></div> `);
					if (bet.status === "PENDING") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="flex items-center gap-2 border-t md:border-t-0 border-border/60 pt-3 md:pt-0"><form action="?/settleWon" method="POST"><input type="hidden" name="id"${attr("value", bet.id)}/> `);
						Button($$renderer, {
							type: "submit",
							disabled: isSubmitting,
							class: "bg-emerald-600 hover:bg-emerald-500 text-foreground font-bold h-9 px-3 rounded-lg text-xs gap-1.5",
							title: "Settle as Won",
							children: ($$renderer) => {
								Check($$renderer, { class: "h-3.5 w-3.5" });
								$$renderer.push(`<!----> Won`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></form> <form action="?/settleLost" method="POST"><input type="hidden" name="id"${attr("value", bet.id)}/> `);
						Button($$renderer, {
							type: "submit",
							disabled: isSubmitting,
							variant: "outline",
							class: "border-border bg-background text-foreground hover:bg-background hover:text-red-400 font-bold h-9 px-3 rounded-lg text-xs gap-1.5",
							title: "Settle as Lost",
							children: ($$renderer) => {
								X($$renderer, { class: "h-3.5 w-3.5" });
								$$renderer.push(`<!----> Lost`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></form> <form action="?/voidBet" method="POST"><input type="hidden" name="id"${attr("value", bet.id)}/> `);
						Button($$renderer, {
							type: "submit",
							disabled: isSubmitting,
							variant: "outline",
							class: "border-border bg-background text-muted-foreground hover:text-neutral-300 font-bold h-9 px-3 rounded-lg text-xs gap-1.5",
							title: "Void & Refund Stake",
							children: ($$renderer) => {
								Ban($$renderer, { class: "h-3.5 w-3.5 text-red-500" });
								$$renderer.push(`<!----> Void`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></form></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
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
//# sourceMappingURL=_page.svelte-lcl0Vph_.js.map
