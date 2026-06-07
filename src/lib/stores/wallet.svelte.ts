class WalletStore {
  // Active player wallet balance
  balance = $state<number>(0);

  // Active transaction currency code
  currency = $state<string>('USD');

  // Overwrites the balance and currency states simultaneously
  setWallet(balance: number, currency: string) {
    this.balance = balance;
    this.currency = currency;
  }

  // Deducts a placed bet stake immediately from the local display
  deductStake(amount: number) {
    this.balance = Number((this.balance - amount).toFixed(2));
  }

  // Adds a processed transaction or payout amount to the local balance
  addFunds(amount: number) {
    this.balance = Number((this.balance + amount).toFixed(2));
  }

  // Resets the state values to default upon user logout
  reset() {
    this.balance = 0;
    this.currency = 'USD';
  }
}

export const wallet = new WalletStore();