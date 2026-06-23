import type { BetSlipSelection } from '$lib/types/bet';

class BetSlipStore {
  // Array of active selections currently in the betslip
  selections = $state<BetSlipSelection[]>([]);

  // Active stake amount set on the betslip
  stake = $state<number>(0);

  // Computes the total count of active selections
  count = $derived(this.selections.length);

  // CORRECTED: Computes overall odds by SUMMING (adding) the active odds together (e.g., 4.29 + 3.30 + 4.91 = 12.50)
  totalOdds = $derived(
    this.selections.length > 0
      ? Number(this.selections.reduce((acc, curr) => acc + curr.odds, 0).toFixed(2))
      : 0
  );

  // Computes the potential win payout based on the summed overall odds multiplied by the stake
  potentialWin = $derived(
    this.selections.length > 0 && this.stake > 0
      ? Number((this.stake * this.totalOdds).toFixed(2))
      : 0
  );

  // Adds a selection, replacing only existing selections for the identical market on the same game
  addSelection(selection: BetSlipSelection) {
    const filtered = this.selections.filter(
      (s) => !(s.gameId === selection.gameId && s.marketName === selection.marketName)
    );
    
    // Reassignment (= [...]) forces Svelte 5 to trigger reactive rendering instantly
    this.selections = [...filtered, selection];
  }

  // Removes a specific selection from the slip by its compound game ID and market category name
  removeSelection(gameId: string, marketName: string) {
    // Reassignment forces Svelte 5 to trigger reactive rendering instantly
    this.selections = this.selections.filter(
      (s) => !(s.gameId === gameId && s.marketName === marketName)
    );
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