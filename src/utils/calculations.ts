import type { QuoteItem, QuoteTotals } from '../types/quote';
import type { Product, BrandingOption } from '../types/product';

/**
 * Rounds a monetary figure to 2 decimal places with floating-point safety.
 */
export function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates the effective unit price for a product with the chosen branding customization.
 */
export function calculateUnitPrice(product: Product, branding: BrandingOption): number {
  return roundCurrency(product.basePrice + (branding.additionalPrice || 0));
}

/**
 * Calculates line-item totals for a given product, branding, quantity, and GST rate.
 */
export function calculateLineItem(
  product: Product,
  branding: BrandingOption,
  quantity: number
): {
  unitPrice: number;
  taxableSubtotal: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
} {
  const safeQty = Math.max(1, Math.floor(quantity));
  const unitPrice = calculateUnitPrice(product, branding);
  const taxableSubtotal = roundCurrency(unitPrice * safeQty);
  const gstRate = product.gstRate;
  const gstAmount = roundCurrency(taxableSubtotal * (gstRate / 100));
  const totalAmount = roundCurrency(taxableSubtotal + gstAmount);

  return {
    unitPrice,
    taxableSubtotal,
    gstRate,
    gstAmount,
    totalAmount,
  };
}

/**
 * Calculates aggregate totals across all quote line items.
 * Computes subtotal, GST per tax slab (5%, 12%, 18%), total GST, and grand total.
 */
export function calculateQuoteTotals(items: QuoteItem[]): QuoteTotals {
  let totalQuantity = 0;
  let subtotal = 0;
  let totalGst = 0;

  // Group by GST tax rate
  const gstMap = new Map<number, { taxableAmount: number; gstAmount: number }>();

  for (const item of items) {
    const qty = Math.max(1, Math.floor(item.quantity));
    totalQuantity += qty;
    
    // Ensure item calculations are accurate
    const lineSubtotal = roundCurrency(item.unitPrice * qty);
    const lineGst = roundCurrency(lineSubtotal * (item.gstRate / 100));
    
    subtotal = roundCurrency(subtotal + lineSubtotal);
    totalGst = roundCurrency(totalGst + lineGst);

    const currentSlab = gstMap.get(item.gstRate) || { taxableAmount: 0, gstAmount: 0 };
    currentSlab.taxableAmount = roundCurrency(currentSlab.taxableAmount + lineSubtotal);
    currentSlab.gstAmount = roundCurrency(currentSlab.gstAmount + lineGst);
    gstMap.set(item.gstRate, currentSlab);
  }

  const grandTotal = roundCurrency(subtotal + totalGst);

  const gstBreakdown = Array.from(gstMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([rate, amounts]) => ({
      rate,
      taxableAmount: amounts.taxableAmount,
      gstAmount: amounts.gstAmount,
    }));

  return {
    itemCount: items.length,
    totalQuantity,
    subtotal,
    gstBreakdown,
    totalGst,
    grandTotal,
  };
}

/**
 * Generates an official, sequential-looking quotation reference code.
 * Example: PT-2025-8421
 */
export function generateQuoteNumber(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PT-${year}-${randomSuffix}`;
}
