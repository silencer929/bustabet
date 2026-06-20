import { a6 as escape_html, a2 as ensure_array_like, a0 as attr, a1 as stringify, V as derived, ab as spread_props, ac as sanitize_props, ad as slot } from './dev-CaPlrGUY.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import { O as OddsButton } from './OddsButton-B9GEUuBT.js';

//#region node_modules/lucide-svelte/dist/icons/clock.svelte
function Clock($$renderer, $$props) {
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
		{ name: "clock" },
		sanitize_props($$props),
		{
			/**
			* @component @name Clock
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgNnY2bDQgMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/clock
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
			}], ["path", { "d": "M12 6v6l4 2" }]],
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
//#region src/lib/components/sportsbook/MatchCard.svelte
function MatchCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { game, activeMarket = "h2h" } = $$props;
		const filteredMarkets = derived(() => game.markets.filter((m) => m.marketName === activeMarket && m.active));
		const isLive = derived(() => game.status === "LIVE");
		const remainingTime = derived(() => {
			const diffMs = new Date(game.startTime).getTime() - (/* @__PURE__ */ new Date()).getTime();
			if (diffMs <= 0) return "Live";
			const diffMins = Math.floor(diffMs / 6e4);
			return `${Math.floor(diffMins / 1440)}d ${Math.floor(diffMins % 1440 / 60)}h`;
		});
		const formattedDate = derived(() => {
			return new Date(game.startTime).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		});
		const extraMarketsCount = derived(() => new Set(game.markets.filter((m) => m.marketName !== "h2h").map((m) => m.marketName)).size);
		$$renderer.push(`<div class="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-neutral-400 dark:hover:border-neutral-700 flex flex-col justify-between h-56 min-w-[280px]"><div class="flex items-start justify-between w-full"><span class="text-[10px] font-black tracking-wider text-muted-foreground uppercase">${escape_html(game.league)}</span> <div class="flex flex-col items-end text-right space-y-0.5">`);
		if (isLive()) {
			$$renderer.push("<!--[0-->");
			Badge($$renderer, {
				class: "bg-red-600 hover:bg-red-600 animate-pulse text-[8px] font-black px-1.5 py-0.5 tracking-wider rounded text-white",
				children: ($$renderer) => {
					$$renderer.push(`<!---->LIVE`);
				},
				$$slots: { default: true }
			});
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="flex items-center gap-1 text-[11px] font-bold text-foreground">`);
			Clock($$renderer, { class: "h-3 w-3 text-muted-foreground" });
			$$renderer.push(`<!----> <span>${escape_html(remainingTime())}</span></div> <span class="text-[9px] font-bold text-muted-foreground">${escape_html(formattedDate())}</span>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="space-y-1 my-2"><div class="text-sm font-bold text-foreground">${escape_html(game.homeTeam)}</div> <div class="text-sm font-bold text-foreground">${escape_html(game.awayTeam)}</div></div> <div class="flex items-end justify-between w-full border-t border-border pt-3"><div class="flex items-center gap-1.5">`);
		if (filteredMarkets().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(filteredMarkets());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let market = each_array[$$index];
				OddsButton($$renderer, {
					gameId: game.id,
					marketId: market.id,
					homeTeam: game.homeTeam,
					awayTeam: game.awayTeam,
					marketName: market.marketName,
					selection: market.selection,
					odds: Number(market.odds)
				});
			}
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span class="text-xs font-semibold text-muted-foreground">Markets suspended</span>`);
		}
		$$renderer.push(`<!--]--></div> <a${attr("href", `/sportsbook/match/${stringify(game.id)}`)} class="text-[11px] font-bold text-foreground hover:text-primary transition shrink-0">+${escape_html(extraMarketsCount() > 0 ? extraMarketsCount() + 12 : 28)} markets</a></div></div>`);
	});
}

export { MatchCard as M };
//# sourceMappingURL=MatchCard-B0_HqAw9.js.map
