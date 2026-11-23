import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles, Filter, X, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { Product, ProductCategory } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { useQuoteStore } from '../../store/quoteStore';

interface ProductCatalogueProps {
  onOpenQuoteStudio: () => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({ onOpenQuoteStudio }) => {
  const { addItem } = useQuoteStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories: ProductCategory[] = [
    'All',
    'T-Shirts',
    'Outerwear',
    'Bottoms',
    'Headwear & Accessories',
    'Kids',
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // Search match (name, tagline, description, GSM, or composition)
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.specs.composition.toLowerCase().includes(q) ||
        product.specs.gsm.toString().includes(q);

      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleQuickAdd = (product: Product) => {
    // Quick adds 50 units with standard configuration
    addItem(
      product,
      {
        size: product.availableSizes[0] || 'M',
        color: product.availableColors[0],
        branding: product.availableBranding[0], // Blank / plain
      },
      50
    );
  };

  return (
    <section id="collections" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8] border-b border-[#D9D5CE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D9D5CE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-[#C66B4E]" />
              STANDARD PRODUCTION CATALOGUE
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Curated Silhouettes.{' '}
              <span className="italic font-light text-[#C66B4E]">Tailored Specifications.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#171717]/70 max-w-md font-normal leading-relaxed">
            Every garment is manufactured to order in our Tiruppur facilities with certified knit structures, pure cotton ring-spun yarns, and transparent GST classifications.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#171717] text-[#F4F0E8] shadow-sm font-semibold'
                    : 'bg-[#EBE8E1] text-[#171717]/75 hover:bg-[#D9D5CE] hover:text-[#171717]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#747C66] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search styles, GSM, knit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-[#EBE8E1] border border-[#D9D5CE] text-[#171717] placeholder:text-[#747C66] focus:outline-none focus:border-[#C66B4E] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#747C66] hover:text-[#171717]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono text-[#171717]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#747C66]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-mono focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Count Indicator */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#747C66]">
          <span>
            Showing {filteredProducts.length} of {PRODUCTS.length} production models
          </span>
          {searchQuery && (
            <span>
              Search results for "{searchQuery}"
            </span>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setActiveModalProduct(p)}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="mt-12 p-12 rounded-2xl bg-[#EBE8E1]/60 border border-dashed border-[#D9D5CE] text-center max-w-lg mx-auto">
            <Filter className="w-8 h-8 text-[#747C66] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#171717]">No matching apparel found</h3>
            <p className="mt-1 text-xs text-[#171717]/70">
              We couldn't find any styles matching "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#171717] text-[#F4F0E8] text-xs font-semibold hover:bg-[#C66B4E] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Detail & Configurator Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onOpenQuoteStudio={onOpenQuoteStudio}
      />
    </section>
  );
};
