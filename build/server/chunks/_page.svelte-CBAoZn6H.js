import { a2 as ensure_array_like, a6 as escape_html, a1 as stringify } from './dev-CaPlrGUY.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { T as Ticket } from './ticket-Rmcru2W5.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import './index-Bai2VLr5.js';

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
			$$renderer.push(`<div class="space-y-3"><!--[-->`);
			const each_array = ensure_array_like(data.bets);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let bet = each_array[$$index];
				$$renderer.push(`<div class="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div class="space-y-1.5"><div class="flex items-center gap-2"><span class="text-xs font-black text-foreground">${escape_html(bet.game.homeTeam)} vs ${escape_html(bet.game.awayTeam)}</span> `);
				Badge($$renderer, {
					class: `border text-[8px] font-bold px-2 py-0.5 rounded ${stringify(getStatusClass(bet.status))}`,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(bet.status)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> <div class="text-[10px] text-neutral-500 font-semibold">Selection: <span class="text-primary font-black">${escape_html(bet.market.selection)}</span> • 
              Odds: <span class="text-foreground">${escape_html(bet.odds.toFixed(2))}</span> • 
              Placed ${escape_html(formatGameTime(bet.createdAt))}</div> <div class="text-xs font-bold text-neutral-400">Stake: ${escape_html(formatCurrency(bet.stake, auth.user?.currency || "USD"))} • 
              Payout: <span class="text-emerald-500 font-black">${escape_html(formatCurrency(bet.potentialWin, auth.user?.currency || "USD"))}</span></div></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CBAoZn6H.js.map
