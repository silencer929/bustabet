import { V as derived } from './dev-CaPlrGUY.js';

//#region src/lib/stores/betslip.svelte.ts
var BetSlipStore = class {
	selections = [];
	stake = 0;
	#count = derived(() => this.selections.length);
	get count() {
		return this.#count();
	}
	set count($$value) {
		return this.#count($$value);
	}
	#totalOdds = derived(() => this.selections.length > 0 ? Number(this.selections.reduce((acc, curr) => acc + curr.odds, 0).toFixed(2)) : 0);
	get totalOdds() {
		return this.#totalOdds();
	}
	set totalOdds($$value) {
		return this.#totalOdds($$value);
	}
	#potentialWin = derived(() => this.selections.length > 0 && this.stake > 0 ? Number((this.stake * this.totalOdds).toFixed(2)) : 0);
	get potentialWin() {
		return this.#potentialWin();
	}
	set potentialWin($$value) {
		return this.#potentialWin($$value);
	}
	addSelection(selection) {
		const filtered = this.selections.filter((s) => !(s.gameId === selection.gameId && s.marketName === selection.marketName));
		this.selections = [...filtered, selection];
	}
	removeSelection(gameId, marketName) {
		this.selections = this.selections.filter((s) => !(s.gameId === gameId && s.marketName === marketName));
	}
	setStake(amount) {
		this.stake = amount;
	}
	clear() {
		this.selections = [];
		this.stake = 0;
	}
};
var betslip = new BetSlipStore();

export { betslip as b };
//# sourceMappingURL=betslip.svelte-vgv1pvag.js.map
