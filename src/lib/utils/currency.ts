// Currency code to locale map for localization formatting
const CURRENCY_LOCALE_MAP: Record<string, { locale: string; symbol: string }> = {
  KES: { locale: 'en-KE', symbol: 'KSh' },
  NGN: { locale: 'en-NG', symbol: '₦' },
  GHS: { locale: 'en-GH', symbol: 'GH₵' },
  TZS: { locale: 'en-TZ', symbol: 'TSh' },
  UGX: { locale: 'en-UG', symbol: 'USh' },
  ZAR: { locale: 'en-ZA', symbol: 'R' },
  USD: { locale: 'en-US', symbol: '$' }
};

// Formats a numeric amount into localized currency styles
export function formatCurrency(amount: number | Decimal, currencyCode: string = 'USD'): string {
  const numericAmount = typeof amount === 'number' ? amount : Number(amount);
  const config = CURRENCY_LOCALE_MAP[currencyCode] || CURRENCY_LOCALE_MAP.USD;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
}