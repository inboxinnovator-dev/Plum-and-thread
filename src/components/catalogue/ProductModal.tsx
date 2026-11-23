import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Scissors, 
  Plus, 
  Minus, 
  FileSpreadsheet, 
  HelpCircle,
  Layers
} from 'lucide-react';
import type { Product, ColorOption, BrandingOption } from '../../types/product';
import { useQuoteStore } from '../../store/quoteStore';
import { calculateLineItem } from '../../utils/calculations';
import { formatINR, formatPercent } from '../../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenQuoteStudio: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenQuoteStudio,
}) => {
  if (!product) return null;

  const { addItem } = useQuoteStore();

  // Configurator state
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.availableColors[0]);
  const [selectedBranding, setSelectedBranding] = useState<BrandingOption>(product.availableBranding[0]);
  const [quantity, setQuantity] = useState<number>(50); // Default to standard batch of 50
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<'config' | 'specs'>('config');

  // Reset state when product changes
  useEffect(() => {
    setSelectedSize(product.availableSizes[0] || 'M');
    setSelectedColor(product.availableColors[0]);
    setSelectedBranding(product.availableBranding[0]);
    setQuantity(50);
    setActiveImage(product.image);
    setActiveTab('config');
  }, [product]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Real-time calculation using pure calculations engine
  const calculation = calculateLineItem(product, selectedBranding, quantity);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleManualQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQuantity(val);
    } else if (e.target.value === '') {
      setQuantity(1);
    }
  };

  const handleAddToQuote = () => {
    addItem(
      product,
      {
        size: selectedSize,
        color: selectedColor,
        branding: selectedBranding,
      },
      quantity
    );
    onClose();
  };

  const quickPresets = [25, 50, 100, 250, 500];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#171717]/80 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#F4F0E8] rounded-2xl border border-[#D9D5CE] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9D5CE] bg-[#EBE8E1]/80">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#171717] text-[#F4F0E8] text-xs font-mono font-semibold">
                GST {formatPercent(product.gstRate)}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#747C66]">
                HSN {product.hsnCode} &middot; {product.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#171717]/60 hover:text-[#171717] hover:bg-[#D9D5CE]/50 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body (2-Column Scrollable Workspace) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
            {/* Left Column: Imagery & Visual Preview */}
            <div className="lg:col-span-5 p-6 bg-[#EBE8E1]/40 border-r border-[#D9D5CE] flex flex-col justify-between">
              <div>
                {/* Main Image with dynamic color tone overlay simulation */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#D9D5CE]/50 border border-[#D9D5CE] shadow-inner">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                  />
                  {/* Subtle Selected Color Swatch Badge in Corner */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#171717]/85 backdrop-blur-md text-[#F4F0E8] text-xs font-mono">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span>{selectedColor.name}</span>
                  </div>
                </div>

                {/* Thumbnail switcher if gallery exists */}
                {product.gallery.length > 1 && (
                  <div className="mt-3 flex items-center gap-2">
                    {product.gallery.map((imgUrl, gIdx) => (
                      <button
                        key={gIdx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImage === imgUrl ? 'border-[#C66B4E] scale-95' : 'border-[#D9D5CE] opacity-70'
                        }`}
                      >
                        <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Manufacturing Quick Notes */}
              <div className="mt-6 pt-4 border-t border-[#D9D5CE] space-y-2 text-xs font-mono text-[#747C66]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C66B4E]" />
                  <span>Lead Time: {product.leadTimeDays}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#747C66]" />
                  <span>Standard MOQ: {product.minOrderQuantity} units (Sampling available)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Configurator & Specs */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Title & Price */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-xs font-mono text-[#747C66]">
                      {product.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-mono text-[#747C66] uppercase">
                      Effective Unit Price
                    </span>
                    <span className="font-serif text-2xl font-semibold text-[#171717]">
                      {formatINR(calculation.unitPrice)}
                    </span>
                  </div>
                </div>

                {/* Tabs: Configurator vs Tech Specs */}
                <div className="mt-6 flex items-center gap-4 border-b border-[#D9D5CE] pb-2 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('config')}
                    className={`pb-2 -mb-2 border-b-2 font-semibold transition-colors cursor-pointer ${
                      activeTab === 'config'
                        ? 'border-[#C66B4E] text-[#171717]'
                        : 'border-transparent text-[#747C66] hover:text-[#171717]'
                    }`}
                  >
                    1. PRODUCT CONFIGURATION
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 -mb-2 border-b-2 font-semibold transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'border-[#C66B4E] text-[#171717]'
                        : 'border-transparent text-[#747C66] hover:text-[#171717]'
                    }`}
                  >
                    2. TECHNICAL SPEC SHEET
                  </button>
                </div>

                {activeTab === 'config' ? (
                  <div className="mt-6 space-y-6">
                    {/* Size Selector */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-[#747C66] uppercase tracking-wider">
                          Select Size
                        </span>
                        <span className="font-mono text-[#171717] font-medium">{selectedSize}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.availableSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                              selectedSize === size
                                ? 'bg-[#171717] text-[#F4F0E8] font-bold shadow-xs'
                                : 'bg-[#EBE8E1] text-[#171717] hover:bg-[#D9D5CE]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Swatches */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-[#747C66] uppercase tracking-wider">
                          Select Fabric Colorway
                        </span>
                        <span className="font-mono text-[#171717] font-medium">
                          {selectedColor.name} {selectedColor.pantone && `(${selectedColor.pantone})`}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {product.availableColors.map((color) => {
                          const isSelected = selectedColor.name === color.name;
                          return (
                            <button
                              key={color.name}
                              onClick={() => setSelectedColor(color)}
                              className={`relative w-8 h-8 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#C66B4E] scale-110 shadow-md ring-2 ring-[#C66B4E]/30'
                                  : 'border-[#D9D5CE] hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={`${color.name} - ${color.pantone || ''}`}
                            >
                              {isSelected && (
                                <Check
                                  className={`w-3.5 h-3.5 ${
                                    color.hex === '#F4F0E8' || color.hex === '#B8B5AD'
                                      ? 'text-[#171717]'
                                      : 'text-white'
                                  }`}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Branding Selection */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-[#747C66] uppercase tracking-wider">
                          Custom Branding &amp; Embellishment
                        </span>
                        <span className="text-[11px] font-mono text-[#C66B4E]">
                          {selectedBranding.additionalPrice > 0
                            ? `+${formatINR(selectedBranding.additionalPrice, false)}/pc`
                            : 'Included in base'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {product.availableBranding.map((brand) => {
                          const isSelected = selectedBranding.id === brand.id;
                          return (
                            <div
                              key={brand.id}
                              onClick={() => setSelectedBranding(brand)}
                              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-[#EBE8E1] border-[#C66B4E] shadow-xs'
                                  : 'bg-[#F4F0E8] border-[#D9D5CE] hover:border-[#747C66]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#171717]">
                                  {brand.name}
                                </span>
                                <span className="text-xs font-mono font-bold text-[#171717]">
                                  {brand.additionalPrice > 0
                                    ? `+${formatINR(brand.additionalPrice, false)}`
                                    : 'Free / Blank'}
                                </span>
                              </div>
                              <p className="mt-1 text-[11px] text-[#171717]/70 leading-relaxed">
                                {brand.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quantity Selector with Presets */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-[#747C66] uppercase tracking-wider">
                          Order Quantity (Units)
                        </span>
                        <span className="text-[11px] font-mono text-[#747C66]">
                          Minimum 1 unit
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#D9D5CE] rounded-xl bg-[#EBE8E1]/50 overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(-10)}
                            className="p-2.5 text-[#171717] hover:bg-[#D9D5CE] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleManualQuantity}
                            className="w-20 text-center font-mono font-bold text-sm bg-transparent border-x border-[#D9D5CE] py-2 focus:outline-none"
                          />
                          <button
                            onClick={() => handleQuantityChange(10)}
                            className="p-2.5 text-[#171717] hover:bg-[#D9D5CE] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {quickPresets.map((preset) => (
                            <button
                              key={preset}
                              onClick={() => setQuantity(preset)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                                quantity === preset
                                  ? 'bg-[#171717] text-[#F4F0E8] font-bold'
                                  : 'bg-[#EBE8E1] text-[#171717] hover:bg-[#D9D5CE]'
                              }`}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Technical Specs Sheet */
                  <div className="mt-6 space-y-3 bg-[#EBE8E1]/60 p-5 rounded-xl border border-[#D9D5CE]">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#747C66] pb-2 border-b border-[#D9D5CE]">
                      Full Mill Specification Sheet
                    </h4>
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row justify-between text-xs py-1.5 border-b border-[#D9D5CE]/50 last:border-none">
                        <span className="font-mono text-[#747C66] capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="font-medium text-[#171717] sm:text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Live Calculation & Add to Quote Button */}
              <div className="mt-8 pt-5 border-t border-[#D9D5CE] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-[#747C66]">Total ({quantity} pcs + {product.gstRate}% GST):</span>
                    <span className="font-serif text-2xl font-bold text-[#171717]">
                      {formatINR(calculation.totalAmount)}
                    </span>
                  </div>
                  <span className="block text-[11px] font-mono text-[#747C66]">
                    Subtotal: {formatINR(calculation.taxableSubtotal)} + GST: {formatINR(calculation.gstAmount)}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleAddToQuote}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#171717] hover:bg-[#C66B4E] text-[#F4F0E8] text-sm font-semibold tracking-wide shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Quote Studio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
