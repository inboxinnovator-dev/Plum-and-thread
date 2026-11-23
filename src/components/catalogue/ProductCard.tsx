import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus, Eye, ArrowUpRight } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatINR, formatPercent } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickAdd,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col rounded-2xl bg-[#EBE8E1]/50 border border-[#D9D5CE] overflow-hidden hover:border-[#C66B4E] hover:shadow-xl hover:shadow-[#171717]/5 transition-all duration-300"
    >
      {/* Image Container with Badges & Hover Overlay */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#D9D5CE]/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Gradient Veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* GST Badge (Always clearly visible as required) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          <span className="px-2.5 py-1 rounded-md bg-[#171717] text-[#F4F0E8] text-[11px] font-mono font-semibold tracking-wide shadow-sm">
            GST {formatPercent(product.gstRate)}
          </span>
          {product.featured && (
            <span className="px-2 py-0.5 rounded-md bg-[#C66B4E] text-[#F4F0E8] text-[10px] font-mono tracking-wider uppercase">
              Featured
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-md bg-[#F4F0E8]/90 backdrop-blur-sm border border-[#D9D5CE] text-[10px] font-mono uppercase tracking-wider text-[#747C66]">
            {product.category}
          </span>
        </div>

        {/* Quick Action Buttons on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onOpenDetails(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F4F0E8] hover:bg-[#C66B4E] text-[#171717] hover:text-[#F4F0E8] text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Customize &amp; Specs</span>
          </button>
          <button
            onClick={() => onQuickAdd(product)}
            className="p-2.5 rounded-xl bg-[#171717] hover:bg-[#C66B4E] text-[#F4F0E8] text-xs font-semibold shadow-md transition-colors cursor-pointer"
            title="Quick add 50 pcs (standard size M)"
            aria-label={`Quick add ${product.name}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-[#F4F0E8]/80">
        <div>
          {/* Tagline / GSM Specification */}
          <span className="block text-[11px] font-mono text-[#747C66] line-clamp-1">
            {product.tagline}
          </span>

          {/* Product Name */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="mt-1 font-serif text-xl sm:text-2xl font-normal text-[#171717] group-hover:text-[#C66B4E] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-[#171717]/70 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing, Colors & Add CTA */}
        <div className="mt-4 pt-3 border-t border-[#D9D5CE]/70 flex items-end justify-between">
          <div>
            <span className="block text-[10px] font-mono text-[#747C66] uppercase">
              Base Price (excl. GST)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-semibold text-[#171717]">
                {formatINR(product.basePrice, false)}
              </span>
              <span className="text-[11px] font-mono text-[#747C66]">/ pc</span>
            </div>
          </div>

          {/* Color preview swatches */}
          <div className="flex items-center -space-x-1.5">
            {product.availableColors.slice(0, 4).map((c, idx) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border border-white shadow-xs shrink-0"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.availableColors.length > 4 && (
              <span className="w-4 h-4 rounded-full bg-[#EBE8E1] border border-white text-[9px] font-mono flex items-center justify-center text-[#747C66]">
                +{product.availableColors.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
