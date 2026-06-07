import type { Decimal } from '@prisma/client/runtime/library';

// Converts decimal odds to American formatting
export function decimalToAmerican(odds: number | Decimal): number {
  const dec = typeof odds === 'number' ? odds : Number(odds);
  if (dec >= 2.0) {
    return Math.round((dec - 1) * 100);
  } else {
    return Math.round(-100 / (dec - 1));
  }
}

// Converts American formatting to decimal odds
export function americanToDecimal(americanOdds: number): number {
  if (americanOdds > 0) {
    return Number(((americanOdds / 100) + 1).toFixed(2));
  } else {
    return Number(((100 / Math.abs(americanOdds)) + 1).toFixed(2));
  }
}

// Calculates potential payout based on stake and decimal odds
export function calculatePotentialWin(stake: number, odds: number): number {
  if (stake <= 0 || odds <= 0) return 0;
  return Number((stake * odds).toFixed(2));
}