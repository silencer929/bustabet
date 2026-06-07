import type { BetSlipSelection } from '$lib/types/bet';

class BetSlipStore {
  // Array of active selections currently in the betslip
  selections = $state<BetSlipSelection[]>([]);

  // Active stake amount set on the betslip
  stake = $state<number>(0);

  // Computes the total count of active selections
  count = $derived(this.selections.length);

  // Computes overall accumulative parlay odds (multiplying nested selection odds)
  totalOdds = $derived(
    this.selections.length > 0
      ? Number(this.selections.reduce((acc, curr) => acc * curr.odds, 1).toFixed(2))
      : 0
  );

  // Computes the potential win payout based on the active stake and overall odds
  potentialWin = $derived(
    this.selections.length > 0 && this.stake > 0
      ? Number((this.stake * this.totalOdds).toFixed(2))
      : 0
  );

  // Adds a selection to the betslip, replacing any existing selection for the same game
  addSelection(selection: BetSlipSelection) {
    const filtered = this.selections.filter((s) => s.gameId !== selection.gameId);
    
    // Reassignment (= [...]) forces Svelte 5 to trigger reactive rendering instantly
    this.selections = [...filtered, selection];
  }

  // Removes a selection from the slip by its associated game ID
  removeSelection(gameId: string) {
    // Reassignment forces Svelte 5 to trigger reactive rendering instantly
    this.selections = this.selections.filter((s) => s.gameId !== gameId);
  }

  // Updates the active stake amount
  setStake(amount: number) {
    this.stake = amount;
  }

  // Empties all active selections and resets stake values
  clear() {
    this.selections = []; // Reassignment forces Svelte 5 to trigger reactive rendering instantly
    this.stake = 0;
  }
}

export const betslip = new BetSlipStore();