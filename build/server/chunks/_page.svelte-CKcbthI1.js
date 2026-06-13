import { a6 as escape_html, a2 as ensure_array_like, a0 as attr, a1 as stringify, ab as spread_props, ac as sanitize_props, ad as slot, V as derived } from './dev-CaPlrGUY.js';
import './client-I8PFJmzX.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { C as Chevron_right } from './chevron-right-B_iJr5sk.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { S as Search } from './search-BoMM9cGn.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { T as Tv } from './tv-DfW4MwCL.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-ClpOWON4.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region node_modules/lucide-svelte/dist/icons/plus.svelte
function Plus($$renderer, $$props) {
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
		{ name: "plus" },
		sanitize_props($$props),
		{
			/**
			* @component @name Plus
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJNMTIgNXYxNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/plus
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]],
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
//#region src/routes/admin/games/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		let isAddOpen = false;
		let searchQuery = "";
		let selectedSport = "all";
		let selectedStatus = "all";
		const filteredGames = derived(() => data.games.filter((game) => {
			return (game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) || game.league.toLowerCase().includes(searchQuery.toLowerCase())) && true;
		}));
		const getStatusClass = (status) => {
			switch (status) {
				case "LIVE": return "bg-red-950/40 text-red-400 border-red-800/80";
				case "UPCOMING": return "bg-amber-950/40 text-amber-400 border-amber-800/80";
				default: return "bg-background text-muted-foreground border-neutral-700";
			}
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4"><div class="flex items-center gap-2">`);
			Tv($$renderer, { class: "h-5 w-5 text-red-500" });
			$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">Fixtures Directory</h1></div> `);
			Button($$renderer, {
				onclick: () => isAddOpen = !isAddOpen,
				class: "h-10 bg-red-600 text-foreground font-bold rounded-lg gap-1.5 shadow-md hover:bg-red-500",
				children: ($$renderer) => {
					Plus($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Manually Add Game`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> `);
			if (isAddOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-2xl border border-border bg-background/40 p-6 space-y-4 max-w-2xl"><div class="space-y-1"><h2 class="text-sm font-black text-neutral-100 uppercase tracking-wider">Register New Match</h2> <p class="text-xs text-neutral-500 font-semibold">Enter details below to create a custom manual sports fixture</p></div> <form method="POST" action="?/createGame" class="space-y-4">`);
				if (form?.error) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
					Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
					$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (form?.success) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold">`);
					Circle_check($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
					$$renderer.push(`<!----> <span>${escape_html(form.message)}</span></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="sport" class="text-xs font-bold text-muted-foreground">Sport Category</label> <select id="sport" name="sport" required="" class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-red-500 focus:outline-none">`);
				$$renderer.option({ value: "soccer_english_premier_league" }, ($$renderer) => {
					$$renderer.push(`Premier League Football`);
				});
				$$renderer.option({ value: "basketball_nba" }, ($$renderer) => {
					$$renderer.push(`NBA Basketball`);
				});
				$$renderer.option({ value: "tennis_atp_singles" }, ($$renderer) => {
					$$renderer.push(`Tennis ATP`);
				});
				$$renderer.option({ value: "americanfootball_nfl" }, ($$renderer) => {
					$$renderer.push(`NFL Football`);
				});
				$$renderer.push(`</select></div> <div class="space-y-1.5"><label for="league" class="text-xs font-bold text-muted-foreground">League / Tournament</label> `);
				Input($$renderer, {
					id: "league",
					name: "league",
					type: "text",
					required: true,
					placeholder: "La Liga",
					class: "bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground"
				});
				$$renderer.push(`<!----></div></div> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5"><label for="homeTeam" class="text-xs font-bold text-muted-foreground">Home Team</label> `);
				Input($$renderer, {
					id: "homeTeam",
					name: "homeTeam",
					type: "text",
					required: true,
					placeholder: "Barcelona",
					class: "bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground"
				});
				$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="awayTeam" class="text-xs font-bold text-muted-foreground">Away Team</label> `);
				Input($$renderer, {
					id: "awayTeam",
					name: "awayTeam",
					type: "text",
					required: true,
					placeholder: "Real Madrid",
					class: "bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground"
				});
				$$renderer.push(`<!----></div></div> <div class="space-y-1.5"><label for="startTime" class="text-xs font-bold text-muted-foreground">Kickoff Date &amp; Time</label> `);
				Input($$renderer, {
					id: "startTime",
					name: "startTime",
					type: "datetime-local",
					required: true,
					class: "bg-background border-border focus:border-red-500 text-xs h-10 font-bold text-foreground"
				});
				$$renderer.push(`<!----></div> <div class="flex justify-end pt-2">`);
				Button($$renderer, {
					type: "submit",
					disabled: isSubmitting,
					class: "h-11 px-6 bg-red-600 hover:bg-red-500 text-foreground font-black rounded-lg shadow-md transition",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html("Register Game")}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div></form></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="rounded-xl border border-border bg-background/20 p-4 flex flex-col md:flex-row items-center gap-3"><div class="relative w-full md:flex-1">`);
			Search($$renderer, { class: "absolute left-3 top-3 h-4 w-4 text-neutral-500" });
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				type: "text",
				placeholder: "Search by team or league...",
				class: "h-10 w-full pl-9 bg-background border-border focus:border-red-500 text-xs font-semibold text-foreground",
				get value() {
					return searchQuery;
				},
				set value($$value) {
					searchQuery = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <div class="flex items-center gap-3 w-full md:w-auto shrink-0">`);
			$$renderer.select({
				value: selectedSport,
				class: "flex h-10 w-full md:w-44 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
			}, ($$renderer) => {
				$$renderer.option({ value: "all" }, ($$renderer) => {
					$$renderer.push(`All Sports`);
				});
				$$renderer.option({ value: "soccer_english_premier_league" }, ($$renderer) => {
					$$renderer.push(`Premier League`);
				});
				$$renderer.option({ value: "basketball_nba" }, ($$renderer) => {
					$$renderer.push(`NBA`);
				});
				$$renderer.option({ value: "tennis_atp_singles" }, ($$renderer) => {
					$$renderer.push(`Tennis ATP`);
				});
				$$renderer.option({ value: "americanfootball_nfl" }, ($$renderer) => {
					$$renderer.push(`NFL`);
				});
			});
			$$renderer.push(` `);
			$$renderer.select({
				value: selectedStatus,
				class: "flex h-10 w-full md:w-36 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
			}, ($$renderer) => {
				$$renderer.option({ value: "all" }, ($$renderer) => {
					$$renderer.push(`All Statuses`);
				});
				$$renderer.option({ value: "UPCOMING" }, ($$renderer) => {
					$$renderer.push(`Upcoming`);
				});
				$$renderer.option({ value: "LIVE" }, ($$renderer) => {
					$$renderer.push(`Live`);
				});
				$$renderer.option({ value: "COMPLETED" }, ($$renderer) => {
					$$renderer.push(`Completed`);
				});
			});
			$$renderer.push(`</div></div> <div class="space-y-3"><div class="flex items-center justify-between"><h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Fixtures Matches</h3> <span class="text-[10px] font-bold text-neutral-600">Showing ${escape_html(filteredGames().length)} of ${escape_html(data.games.length)} entries</span></div> `);
			if (filteredGames().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">No matches match the active search or filter configuration.</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="space-y-2"><!--[-->`);
				const each_array = ensure_array_like(filteredGames());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let game = each_array[$$index];
					$$renderer.push(`<a${attr("href", `/admin/games/${stringify(game.id)}`)} class="flex items-center justify-between border border-border/80 bg-background/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"><div class="flex items-center gap-4"><div class="rounded-lg bg-background p-2.5 border border-border text-muted-foreground">`);
					Tv($$renderer, { class: "h-4 w-4 text-red-500" });
					$$renderer.push(`<!----></div> <div><div class="text-xs font-bold text-foreground">${escape_html(game.homeTeam)} vs ${escape_html(game.awayTeam)}</div> <div class="text-[10px] text-neutral-500 mt-1">${escape_html(game.league)} • Ref: ${escape_html(game.id)} • Kickoff ${escape_html(formatGameTime(game.startTime))}</div></div></div> <div class="flex items-center gap-4">`);
					Badge($$renderer, {
						class: `border text-[9px] font-bold px-2.5 py-0.5 rounded ${stringify(getStatusClass(game.status))}`,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(game.status)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Chevron_right($$renderer, { class: "h-4 w-4 text-neutral-500" });
					$$renderer.push(`<!----></div></a>`);
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
//# sourceMappingURL=_page.svelte-CKcbthI1.js.map
