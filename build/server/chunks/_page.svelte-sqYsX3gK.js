import { a6 as escape_html, a2 as ensure_array_like } from './dev-CaPlrGUY.js';
import { M as MatchCard } from './MatchCard-BqDzXJMj.js';
import { T as Trophy } from './trophy-sfIAIiBq.js';
import './Icon-Bxs3Ke_h.js';
import './datetime-B0KKqfXg.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import './badge-Cl7OJJ39.js';
import './index-Bai2VLr5.js';
import './OddsButton-B9GEUuBT.js';
import './betslip.svelte-sLcrOGhD.js';

//#region src/routes/sportsbook/[sport]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
		Trophy($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">${escape_html(data.sportTitle)}</h1></div> `);
		if (data.games.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center"><div class="rounded-full bg-background p-4 border border-border mb-4">`);
			Trophy($$renderer, { class: "h-8 w-8 text-neutral-600" });
			$$renderer.push(`<!----></div> <h2 class="text-lg font-black text-muted-foreground">NO GAMES</h2> <p class="text-xs text-neutral-600 mt-1 max-w-xs">There are no active or upcoming fixtures listed for ${escape_html(data.sportTitle)} at the moment.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid grid-cols-1 gap-4 lg:grid-cols-2"><!--[-->`);
			const each_array = ensure_array_like(data.games);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let game = each_array[$$index];
				MatchCard($$renderer, { game });
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-sqYsX3gK.js.map
