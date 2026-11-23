import React from 'react';
import { Trash2, Plus, Minus, Tag, Palette } from 'lucide-react';
import type { QuoteItem } from '../../types/quote';
import type { ColorOption, BrandingOption } from '../../types/product';
import { formatINR, formatPercent } from '../../utils/formatters';

interface QuoteItemRowProps {
  item: QuoteItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onUpdateConfig: (id: string, partial: any) => void;
  onRemove: (id: string) => void;
}

export const QuoteItemRow: React.FC<QuoteItemRowProps> = ({
  item,
  onUpdateQuantity,
  onUpdateConfig,
  onRemove,
}) => {
  const { product, configuration, quantity } = item;

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = product.availableColors.find((c) => c.name === e.target.value);
    if (found) {
      onUpdateConfig(item.id, { color: found });
    }
  };

  const handleBrandingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = product.availableBranding.find((b) => b.id === e.target.value);
    if (found) {
      onUpdateConfig(item.id, { branding: found });
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateConfig(item.id, { size: e.target.value });
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      onUpdateQuantity(item.id, val);
    } else if (e.target.value === '') {
      onUpdateQuantity(item.id, 1);
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] hover:border-[#C66B4E]/60 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Thumbnail & Garment Info */}
        <div className="flex items-start gap-3.5">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover shrink-0 border border-[#D9D5CE]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#171717] text-[#F4F0E8] text-[10px] font-mono font-semibold">
                GST {formatPercent(item.gstRate)}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#747C66]">
                HSN {product.hsnCode}
              </span>
            </div>

            <h4 className="mt-1 font-serif text-lg sm:text-xl text-[#171717] font-semibold">
              {product.name}
            </h4>

            {/* Quick Pricing Formula: Unit Price x Qty */}
            <div className="mt-1 flex items-baseline gap-2 text-xs font-mono">
              <span className="text-[#171717] font-bold">{formatINR(item.unitPrice)}</span>
              <span className="text-[#747C66]">&times; {quantity} units</span>
              <span className="text-[#747C66]">=</span>
              <span className="text-[#171717] font-bold">{formatINR(item.taxableSubtotal)}</span>
            </div>

            {/* Individual Item GST Amount Display */}
            <div className="text-[11px] font-mono text-[#747C66] mt-0.5">
              Item GST ({item.gstRate}%): <span className="text-[#C66B4E] font-medium">{formatINR(item.gstAmount)}</span>
            </div>
          </div>
        </div>

        {/* Right: Line Total & Remove Action */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1">
          <div className="text-right">
            <span className="block text-[10px] font-mono uppercase text-[#747C66]">
              Line Total (incl. GST)
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">
              {formatINR(item.totalAmount)}
            </span>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="p-1.5 rounded-lg text-[#747C66] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Remove item from quote"
            aria-label={`Remove ${product.name} from quote`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* In-Line Configuration Controls Bar */}
      <div className="mt-4 pt-3 border-t border-[#D9D5CE]/70 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        {/* Size Dropdown */}
        <div>
          <label className="block text-[10px] uppercase text-[#747C66] mb-1">Size</label>
          <select
            value={configuration.size}
            onChange={handleSizeChange}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] focus:outline-none focus:border-[#C66B4E] cursor-pointer"
          >
            {product.availableSizes.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
        </div>

        {/* Color Dropdown */}
        <div>
          <label className="block text-[10px] uppercase text-[#747C66] mb-1">Colorway</label>
          <select
            value={configuration.color.name}
            onChange={handleColorChange}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] focus:outline-none focus:border-[#C66B4E] cursor-pointer"
          >
            {product.availableColors.map((clr) => (
              <option key={clr.name} value={clr.name}>
                {clr.name}
              </option>
            ))}
          </select>
        </div>

        {/* Branding Dropdown */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] uppercase text-[#747C66] mb-1">Branding</label>
          <select
            value={configuration.branding.id}
            onChange={handleBrandingChange}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] focus:outline-none focus:border-[#C66B4E] cursor-pointer truncate"
          >
            {product.availableBranding.map((br) => (
              <option key={br.id} value={br.id}>
                {br.name} {br.additionalPrice > 0 ? `(+₹${br.additionalPrice})` : '(Blank)'}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Stepper (Prevents negative quantities) */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] uppercase text-[#747C66] mb-1">Quantity</label>
          <div className="flex items-center rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, quantity - 10))}
              className="px-2 py-1.5 text-[#171717] hover:bg-[#D9D5CE] transition-colors cursor-pointer"
              title="Decrease by 10"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityInput}
              className="w-full text-center font-mono font-bold text-xs py-1.5 bg-transparent border-x border-[#D9D5CE] focus:outline-none"
            />
            <button
              onClick={() => onUpdateQuantity(item.id, quantity + 10)}
              className="px-2 py-1.5 text-[#171717] hover:bg-[#D9D5CE] transition-colors cursor-pointer"
              title="Increase by 10"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
