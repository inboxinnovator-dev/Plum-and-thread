export type ProductCategory = 
  | 'All'
  | 'T-Shirts'
  | 'Outerwear'
  | 'Bottoms'
  | 'Headwear & Accessories'
  | 'Kids';

export interface ColorOption {
  name: string;
  hex: string;
  pantone?: string;
}

export interface BrandingOption {
  id: string;
  name: string;
  description: string;
  additionalPrice: number; // in INR per unit
  moqRecommendation?: number;
}

export interface ProductSpec {
  fabric: string;
  gsm: number;
  composition: string;
  yarnCount: string;
  knittingType: string;
  shrinkageTolerance: string;
  dyeingMethod: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  basePrice: number; // in INR
  gstRate: number; // e.g. 5 for 5%, 12 for 12%, 18 for 18%
  hsnCode: string;
  tagline: string;
  description: string;
  leadTimeDays: string;
  minOrderQuantity: number;
  featured: boolean;
  image: string;
  gallery: string[];
  availableSizes: string[];
  availableColors: ColorOption[];
  availableBranding: BrandingOption[];
  specs: ProductSpec;
}
