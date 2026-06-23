import { $ as attr_class, a6 as escape_html, V as derived } from './dev-CaPlrGUY.js';
import { b as betslip } from './betslip.svelte-vgv1pvag.js';

//#region src/lib/components/sportsbook/OddsButton.svelte
function OddsButton($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { gameId, marketId, homeTeam, awayTeam, marketName, selection, odds } = $$props;
		const isSelected = derived(() => betslip.selections.some((s) => s.gameId === gameId && s.marketName === marketName && s.selection === selection));
		const shortLabel = derived(() => {
			if (marketName === "h2h") {
				if (selection === homeTeam) return "1";
				if (selection === awayTeam) return "2";
				if (selection === "Draw" || selection.toUpperCase().includes("DRAW")) return "X";
			}
			return selection;
		});
		$$renderer.push(`<button${attr_class(`flex flex-col h-14 w-full sm:w-20 items-center justify-center p-1.5 transition-all duration-150 rounded-lg border border-border bg-neutral-100/40 dark:bg-neutral-900/40 text-foreground hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 ${isSelected() ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-black shadow-[0_0_12px_rgba(255,209,26,0.25)]" : ""}`)}><span class="text-[9px] font-bold opacity-60 uppercase tracking-wider text-center">${escape_html(shortLabel())}</span> <span class="text-sm font-black tracking-tight mt-0.5">${escape_html(odds.toFixed(2))}</span></button>`);
	});
}

export { OddsButton as O };
//# sourceMappingURL=OddsButton-Bn1XeDyp.js.map
