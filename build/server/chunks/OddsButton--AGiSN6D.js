import { a6 as escape_html, V as derived } from './dev-CaPlrGUY.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { b as betslip } from './betslip.svelte-cgJUCMIb.js';

//#region src/lib/components/sportsbook/OddsButton.svelte
function OddsButton($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { gameId, marketId, homeTeam, awayTeam, marketName, selection, odds } = $$props;
		const isSelected = derived(() => betslip.selections.some((s) => s.gameId === gameId && s.marketId === marketId && s.selection === selection));
		const shortLabel = derived(() => {
			if (selection === homeTeam) return "1";
			if (selection === awayTeam) return "2";
			return "X";
		});
		function handleOddsClick() {
			if (isSelected()) betslip.removeSelection(gameId);
			else betslip.addSelection({
				gameId,
				marketId,
				homeTeam,
				awayTeam,
				marketName,
				selection,
				odds
			});
		}
		Button($$renderer, {
			variant: "outline",
			onclick: handleOddsClick,
			class: `flex flex-col h-14 w-16 items-center justify-center p-1.5 transition-all duration-150 rounded-lg border-border bg-muted/40 text-foreground hover:bg-muted/80
    ${isSelected() ? "bg-primary border-primary text-primary-foreground hover:bg-amber-400 dark:hover:bg-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]" : ""}`,
			children: ($$renderer) => {
				$$renderer.push(`<span class="text-[9px] font-bold opacity-60 uppercase">${escape_html(shortLabel())}</span> <span class="text-sm font-black tracking-tight mt-0.5">${escape_html(odds.toFixed(2))}</span>`);
			},
			$$slots: { default: true }
		});
	});
}

export { OddsButton as O };
//# sourceMappingURL=OddsButton--AGiSN6D.js.map
