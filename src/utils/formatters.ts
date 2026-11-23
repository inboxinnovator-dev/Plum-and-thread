/**
 * Formats a number into Indian Rupee format (e.g. ₹1,25,000.00).
 */
export function formatINR(amount: number, showDecimals = true): string {
  if (isNaN(amount)) return '₹0.00';
  
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  };

  try {
    return new Intl.NumberFormat('en-IN', options).format(amount);
  } catch {
    return `₹${amount.toFixed(2)}`;
  }
}

/**
 * Formats a raw percentage (e.g., 5 -> "5%")
 */
export function formatPercent(rate: number): string {
  return `${rate}%`;
}

/**
 * Formats a date into an editorial, human-readable format.
 */
export function formatDate(dateString?: string): string {
  const d = dateString ? new Date(dateString) : new Date();
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
}
