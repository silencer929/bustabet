import { a0 as attr, a1 as stringify, a6 as escape_html, a2 as ensure_array_like, V as derived } from './dev-CaPlrGUY.js';
import './client-DmFcKt47.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Calendar } from './calendar-DYAJrNdf.js';
import { C as Check } from './check-CZbLEyBV.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { T as Trophy } from './trophy-sfIAIiBq.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-CM4y4kIo.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/admin/games/[id]/settle/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		const h2hMarkets = derived(() => data.game.markets.filter((m) => m.marketName === "h2h"));
		const doubleChanceMarkets = derived(() => data.game.markets.filter((m) => m.marketName === "double_chance"));
		const drawNoBetMarkets = derived(() => data.game.markets.filter((m) => m.marketName === "draw_no_bet"));
		const totalsMarkets = derived(() => data.game.markets.filter((m) => m.marketName === "totals" || m.marketName === "over_under"));
		const bttsMarkets = derived(() => data.game.markets.filter((m) => m.marketName === "btts"));
		const csMarkets = derived(() => data.game.markets.filter((m) => m.marketName === "correct_score"));
		const wtnMarkets = derived(() => data.game.markets.filter((m) => m.marketName === "win_to_nil"));
		const activeMarketGroups = derived(() => [
			{
				key: "h2h",
				name: "Match Result (h2h)",
				items: h2hMarkets()
			},
			{
				key: "double_chance",
				name: "Double Chance",
				items: doubleChanceMarkets()
			},
			{
				key: "draw_no_bet",
				name: "Draw No Bet",
				items: drawNoBetMarkets()
			},
			{
				key: "totals",
				name: "Over / Under Goals",
				items: totalsMarkets()
			},
			{
				key: "btts",
				name: "Both Teams to Score (BTTS)",
				items: bttsMarkets()
			},
			{
				key: "correct_score",
				name: "Correct Scores",
				items: csMarkets()
			},
			{
				key: "win_to_nil",
				name: "Win to Nil",
				items: wtnMarkets()
			}
		].filter((group) => group.items.length > 0));
		$$renderer.push(`<div class="space-y-6 max-w-4xl mx-auto pb-12"><div class="flex items-center justify-between border-b border-border pb-4"><a${attr("href", `/admin/games/${stringify(data.game.id)}`)} class="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition">`);
		Chevron_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span>Back to Odds Editor</span></a> <div class="flex items-center gap-3"><span class="text-[10px] font-bold text-muted-foreground">Ref: ${escape_html(data.game.id)}</span> `);
		Badge($$renderer, {
			class: `border text-[9px] font-bold px-2.5 py-0.5 rounded
        ${data.game.status === "COMPLETED" ? "bg-muted/80 text-muted-foreground border-border" : "bg-emerald-950/40 text-emerald-400 border-emerald-800/80"}`,
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html(data.game.status)}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div> <div class="rounded-2xl border border-border bg-card p-6 text-center space-y-4"><span class="text-[10px] font-black tracking-widest text-muted-foreground uppercase">${escape_html(data.game.league)}</span> <div class="flex items-center justify-between max-w-xs mx-auto"><span class="text-sm sm:text-base font-black text-foreground">${escape_html(data.game.homeTeam)}</span> `);
		if (data.game.homeScore !== null) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="text-sm sm:text-base font-black text-primary px-2.5 py-1 bg-muted/60 border border-border rounded-lg shadow-sm">${escape_html(data.game.homeScore ?? 0)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span class="text-xs font-black tracking-widest text-primary uppercase px-3 py-1 bg-background border border-border rounded-full shrink-0 shadow-sm">VS</span> <span class="text-sm sm:text-base font-black text-foreground">${escape_html(data.game.awayTeam)}</span> `);
		if (data.game.awayScore !== null) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="text-sm sm:text-base font-black text-primary px-2.5 py-1 bg-muted/60 border border-border rounded-lg shadow-sm">${escape_html(data.game.awayScore ?? 0)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="text-[10px] font-bold text-muted-foreground flex items-center justify-center gap-1">`);
		Calendar($$renderer, { class: "h-3.5 w-3.5" });
		$$renderer.push(`<!----> <span>Kickoff ${escape_html(formatGameTime(data.game.startTime))}</span></div></div> `);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold leading-normal">`);
			Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold leading-normal">`);
			Circle_check($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.message)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm"><div class="space-y-1.5"><h2 class="text-sm font-black text-foreground flex items-center gap-2 uppercase tracking-wide">`);
		Trophy($$renderer, { class: "h-4 w-4 text-primary" });
		$$renderer.push(`<!----> Automated Score-Based Settlement</h2> <p class="text-xs text-muted-foreground font-semibold leading-relaxed">Enter match scorelines. Updating with completed status automatically evaluates outcomes, settles all wagers (Single &amp; Combo), and credits player wallets instantly.</p></div> <form method="POST" action="?/settleWithScores" class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4 animate-fade-in"><div class="space-y-1.5"><label for="homeScore" class="text-xs font-bold text-neutral-400">${escape_html(data.game.homeTeam)} Score</label> `);
		Input($$renderer, {
			id: "homeScore",
			name: "homeScore",
			type: "number",
			min: "0",
			required: true,
			disabled: isSubmitting,
			placeholder: "2",
			class: "bg-background border-border focus:border-primary text-xs h-10 font-bold text-foreground"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><label for="awayScore" class="text-xs font-bold text-neutral-400">${escape_html(data.game.awayTeam)} Score</label> `);
		Input($$renderer, {
			id: "awayScore",
			name: "awayScore",
			type: "number",
			min: "0",
			required: true,
			disabled: isSubmitting,
			placeholder: "1",
			class: "bg-background border-border focus:border-primary text-xs h-10 font-bold text-foreground"
		});
		$$renderer.push(`<!----></div> <div class="sm:col-span-2 space-y-1.5"><label for="targetStatus" class="text-xs font-bold text-neutral-400">Match Status Update</label> <select id="targetStatus" name="targetStatus" required="" class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-neutral-400 focus:border-primary focus:outline-none">`);
		$$renderer.option({ value: "LIVE" }, ($$renderer) => {
			$$renderer.push(`LIVE (Halftime / In-Play Score Update — Keeps Wagers Pending)`);
		});
		$$renderer.option({ value: "COMPLETED" }, ($$renderer) => {
			$$renderer.push(`COMPLETED (Full-Time Result — Automatically Settles and Pays Out All Wagers)`);
		});
		$$renderer.push(`</select></div> <div class="sm:col-span-2 pt-2">`);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-lg text-xs cursor-pointer",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html("Submit Score & Status Update")}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></form></div> <div class="space-y-4"><div class="text-xs font-black tracking-widest text-muted-foreground uppercase">Manual Outlines Overrides</div> `);
		if (activeMarketGroups().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg bg-muted/10">No active market lines exist for this match.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(activeMarketGroups());
			for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
				let group = each_array[$$index_2];
				$$renderer.push(`<div class="rounded-2xl border border-border bg-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition duration-150"><div class="flex-1 space-y-3"><div class="space-y-1"><h3 class="text-xs font-black text-foreground uppercase tracking-wider">${escape_html(group.name)}</h3> <p class="text-[10px] text-muted-foreground font-semibold uppercase">Pending selection options</p></div> <div class="flex flex-wrap gap-2"><!--[-->`);
				const each_array_1 = ensure_array_like(group.items);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let option = each_array_1[$$index];
					$$renderer.push(`<div class="rounded-lg border border-border bg-background px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-foreground"><span class="opacity-60">${escape_html(option.selection)}:</span> <span class="text-primary font-black">${escape_html(option.odds.toFixed(2))}</span></div>`);
				}
				$$renderer.push(`<!--]--></div></div> <div class="w-full md:w-64 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0 md:pl-6 shrink-0"><form method="POST" action="?/settleMarketManually" class="space-y-3"><input type="hidden" name="marketName"${attr("value", group.key)}/> <div class="space-y-1"><label${attr("for", `winningSelection-${stringify(group.key)}`)} class="text-[10px] font-black tracking-wider text-muted-foreground uppercase">Select Winner</label> <select${attr("id", `winningSelection-${stringify(group.key)}`)} name="winningSelection" required="" class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-none"><!--[-->`);
				const each_array_2 = ensure_array_like(group.items);
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let option = each_array_2[$$index_1];
					$$renderer.option({ value: option.selection }, ($$renderer) => {
						$$renderer.push(`${escape_html(option.selection)}`);
					});
				}
				$$renderer.push(`<!--]--></select></div> `);
				Button($$renderer, {
					type: "submit",
					disabled: isSubmitting,
					class: "w-full h-9 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-xs gap-1.5 cursor-pointer disabled:bg-neutral-800",
					children: ($$renderer) => {
						Check($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> Settle ${escape_html(group.name.split(" ")[0])}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form></div></div>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-0eSUoHBX.js.map
