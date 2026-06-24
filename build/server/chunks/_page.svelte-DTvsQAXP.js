import { a0 as attr, a1 as stringify, a6 as escape_html, a2 as ensure_array_like, V as derived } from './dev-CaPlrGUY.js';
import './client-Bnt6NtiU.js';
import { C as Calendar } from './calendar-DYAJrNdf.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { T as Trophy } from './trophy-sfIAIiBq.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import './badge-Cl7OJJ39.js';
import './internal2-BuUgca6n.js';
import './index-DBqjc0Yf.js';
import './Icon-Bxs3Ke_h.js';
import './index-Bai2VLr5.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/admin/games/[id]/settle/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let settleMarketCategory = "h2h";
		const activeSettleSelections = derived(() => data.game.markets.filter((m) => m.marketName === settleMarketCategory));
		$$renderer.push(`<div class="space-y-6 max-w-xl mx-auto"><a${attr("href", `/admin/games/${stringify(data.game.id)}`)} class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white transition">`);
		Chevron_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span>Back to Odds Editor</span></a> <div class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-center space-y-4"><span class="text-[10px] font-black tracking-widest text-neutral-500 uppercase">${escape_html(data.game.league)}</span> <div class="flex items-center justify-between max-w-xs mx-auto"><span class="text-sm font-black text-neutral-200">${escape_html(data.game.homeTeam)}</span> <span class="text-xs font-black tracking-widest text-red-500 uppercase px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full">VS</span> <span class="text-sm font-black text-neutral-200">${escape_html(data.game.awayTeam)}</span></div> <div class="text-[10px] font-bold text-neutral-500 flex items-center justify-center gap-1">`);
		Calendar($$renderer, { class: "h-3.5 w-3.5" });
		$$renderer.push(`<!----> <span>Kickoff ${escape_html(formatGameTime(data.game.startTime))}</span></div></div> <div class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-6"><div class="space-y-1.5"><h2 class="text-base font-black text-neutral-100 flex items-center gap-2">`);
		Trophy($$renderer, { class: "h-5 w-5 text-emerald-500" });
		$$renderer.push(`<!----> Settle Match &amp; Pay Winners</h2> <p class="text-xs text-muted-foreground font-semibold">Select the winning option to close wagers, suspend markets, and credit user wallets instantly.</p></div> <form method="POST" action="?/settleMarketManually" class="space-y-4 border-t border-neutral-800 pt-4">`);
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
		$$renderer.push(`<!--]--> <div class="space-y-1.5"><label for="marketName" class="text-xs font-bold text-neutral-400">Market to Settle</label> `);
		$$renderer.select({
			id: "marketName",
			value: settleMarketCategory,
			name: "marketName",
			class: "flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-emerald-500 focus:outline-none"
		}, ($$renderer) => {
			$$renderer.option({ value: "h2h" }, ($$renderer) => {
				$$renderer.push(`Match Result (h2h)`);
			});
			$$renderer.option({ value: "double_chance" }, ($$renderer) => {
				$$renderer.push(`Double Chance`);
			});
			$$renderer.option({ value: "draw_no_bet" }, ($$renderer) => {
				$$renderer.push(`Draw No Bet`);
			});
			$$renderer.option({ value: "totals" }, ($$renderer) => {
				$$renderer.push(`Over / Under Goals`);
			});
			$$renderer.option({ value: "btts" }, ($$renderer) => {
				$$renderer.push(`Both Teams to Score`);
			});
		});
		$$renderer.push(`</div> <div class="space-y-1.5"><label for="winningSelection" class="text-xs font-bold text-neutral-400">Winning Selection Outcome</label> `);
		if (activeSettleSelections().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<select id="winningSelection" name="winningSelection" required="" class="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-emerald-500 focus:outline-none"><!--[-->`);
			const each_array = ensure_array_like(activeSettleSelections());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let market = each_array[$$index];
				$$renderer.option({ value: market.selection }, ($$renderer) => {
					$$renderer.push(`${escape_html(market.selection)} (Odds: ${escape_html(market.odds.toFixed(2))})`);
				});
			}
			$$renderer.push(`<!--]--></select>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="text-center text-xs text-neutral-600 py-3 border border-dashed border-neutral-800 rounded-lg bg-neutral-950/20">No active lines found under this market category.</div>`);
		}
		$$renderer.push(`<!--]--></div> `);
		Button($$renderer, {
			type: "submit",
			disabled: activeSettleSelections().length === 0,
			class: "w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-xs cursor-pointer disabled:bg-neutral-800",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html("Settle Market & Disburse Payouts")}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DTvsQAXP.js.map
