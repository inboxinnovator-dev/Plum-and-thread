import type { ColorOption, BrandingOption, Product } from './product';

export interface QuoteItemConfiguration {
  size: string;
  color: ColorOption;
  branding: BrandingOption;
  customNotes?: string;
}

export interface QuoteItem {
  id: string; // unique uuid or deterministic hash based on product + config
  product: Product;
  configuration: QuoteItemConfiguration;
  quantity: number;
  unitPrice: number; // basePrice + branding.additionalPrice
  taxableSubtotal: number; // unitPrice * quantity
  gstRate: number; // percentage, e.g. 5, 12, 18
  gstAmount: number; // taxableSubtotal * (gstRate / 100)
  totalAmount: number; // taxableSubtotal + gstAmount
}

export interface ClientDetails {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  additionalNotes?: string;
}

export interface QuoteTotals {
  itemCount: number;
  totalQuantity: number;
  subtotal: number; // Taxable value
  gstBreakdown: {
    rate: number;
    taxableAmount: number;
    gstAmount: number;
  }[];
  totalGst: number;
  grandTotal: number;
}

export interface QuoteDraft {
  id: string;
  quoteNumber: string;
  createdAt: string;
  updatedAt: string;
  client: ClientDetails;
  items: QuoteItem[];
  totals: QuoteTotals;
}
