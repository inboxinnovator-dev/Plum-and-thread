import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sliders, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types/product';
import { QuoteItemRow } from './QuoteItemRow';
import { QuoteSummary } from './QuoteSummary';
import { QuoteClientForm } from './QuoteClientForm';
import { QuoteDraftsManager } from './QuoteDraftsManager';

interface QuoteStudioProps {
  onScrollToCatalogue: () => void;
}

export const QuoteStudio: React.FC<QuoteStudioProps> = ({ onScrollToCatalogue }) => {
  const {
    items,
    totals,
    client,
    addItem,
    updateItemQuantity,
    updateItemConfig,
    removeItem,
    updateClientDetails,
  } = useQuoteStore();

  const [activeTabMobile, setActiveTabMobile] = useState<'items' | 'summary' | 'client'>('items');
  const [quickAddModal, setQuickAddModal] = useState(false);

  const handleQuickAddProduct = (product: Product) => {
    addItem(
      product,
      {
        size: product.availableSizes[0] || 'M',
        color: product.availableColors[0],
        branding: product.availableBranding[0],
      },
      50
    );
    setQuickAddModal(false);
  };

  return (
    <section id="quote-studio" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8] border-b border-[#D9D5CE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D9D5CE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#C66B4E]" />
              INTERACTIVE QUOTATION ENGINE
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Quote Studio.{' '}
              <span className="italic font-light text-[#C66B4E]">Live Manufacturing Costs.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuickAddModal(!quickAddModal)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171717] text-[#F4F0E8] text-xs font-semibold hover:bg-[#C66B4E] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Style</span>
            </button>
            <button
              onClick={onScrollToCatalogue}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#EBE8E1] border border-[#D9D5CE] text-[#171717] text-xs font-semibold hover:bg-[#D9D5CE] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#747C66]" />
              <span>Browse Catalogue</span>
            </button>
          </div>
        </div>

        {/* Quick Style Picker Drawer / Dropdown */}
        <AnimatePresence>
          {quickAddModal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 rounded-2xl bg-[#EBE8E1] border border-[#D9D5CE] overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D9D5CE]">
                <h4 className="font-serif text-lg text-[#171717] font-semibold">
                  Quick Add Apparel Style (50 pcs batch)
                </h4>
                <button
                  onClick={() => setQuickAddModal(false)}
                  className="text-xs font-mono text-[#747C66] hover:text-[#171717]"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleQuickAddProduct(prod)}
                    className="p-3 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE] hover:border-[#C66B4E] text-left transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono text-[#747C66] block">
                      GST {prod.gstRate}% &middot; {prod.category}
                    </span>
                    <span className="font-serif text-base font-semibold text-[#171717] group-hover:text-[#C66B4E] block mt-0.5">
                      {prod.name}
                    </span>
                    <span className="text-xs font-mono text-[#171717] font-bold block mt-1">
                      ₹{prod.basePrice}/pc
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden mt-6 flex items-center p-1 rounded-xl bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono">
          <button
            onClick={() => setActiveTabMobile('items')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              activeTabMobile === 'items'
                ? 'bg-[#171717] text-[#F4F0E8] shadow-xs'
                : 'text-[#171717]/70'
            }`}
          >
            Items ({items.length})
          </button>
          <button
            onClick={() => setActiveTabMobile('summary')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              activeTabMobile === 'summary'
                ? 'bg-[#171717] text-[#F4F0E8] shadow-xs'
                : 'text-[#171717]/70'
            }`}
          >
            Totals (₹{totals.grandTotal.toLocaleString('en-IN')})
          </button>
          <button
            onClick={() => setActiveTabMobile('client')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              activeTabMobile === 'client'
                ? 'bg-[#171717] text-[#F4F0E8] shadow-xs'
                : 'text-[#171717]/70'
            }`}
          >
            Client Info
          </button>
        </div>

        {/* Split Screen Workspace: Left (Discovery & Config) & Right (Live Summary) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Item Rows, Client Metadata, Drafts */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              activeTabMobile === 'summary' ? 'hidden lg:block' : ''
            }`}
          >
            {/* If Client Info tab is active on mobile, show only that */}
            {activeTabMobile === 'client' ? (
              <QuoteClientForm client={client} onChange={updateClientDetails} />
            ) : (
              <>
                {/* Active Items Section Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#D9D5CE]">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#747C66]">
                    Configured Garment Lines ({items.length})
                  </span>
                  <span className="text-xs font-mono text-[#747C66]">
                    Total Units: <strong className="text-[#171717]">{totals.totalQuantity}</strong>
                  </span>
                </div>

                {/* List of Configured Items */}
                {items.length > 0 ? (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <QuoteItemRow
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateItemQuantity}
                        onUpdateConfig={updateItemConfig}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="p-12 rounded-2xl bg-[#EBE8E1]/50 border border-dashed border-[#D9D5CE] text-center">
                    <ShoppingBag className="w-10 h-10 text-[#747C66] mx-auto mb-3 opacity-60" />
                    <h3 className="font-serif text-2xl text-[#171717]">
                      Your Quote Workspace is Empty
                    </h3>
                    <p className="mt-1.5 text-xs text-[#171717]/70 max-w-sm mx-auto leading-relaxed">
                      Select styles from our curated catalogue above or use the quick add button to start configuring a custom production run.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={onScrollToCatalogue}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] text-[#F4F0E8] text-xs font-semibold hover:bg-[#C66B4E] transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Explore Catalogue</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Client Metadata Form (Always visible on desktop) */}
                <div className="hidden lg:block pt-4">
                  <QuoteClientForm client={client} onChange={updateClientDetails} />
                </div>

                {/* LocalStorage Drafts Manager */}
                <div className="pt-2">
                  <QuoteDraftsManager />
                </div>
              </>
            )}
          </div>

          {/* Right Column: Live Quotation Summary */}
          <div
            className={`lg:col-span-5 ${
              activeTabMobile === 'items' || activeTabMobile === 'client' ? 'hidden lg:block' : ''
            }`}
          >
            <QuoteSummary onScrollToCatalogue={onScrollToCatalogue} />
          </div>
        </div>
      </div>
    </section>
  );
};
