import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileDown, 
  RotateCw, 
  Trash2, 
  RefreshCcw, 
  Receipt, 
  ShieldCheck, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';
import { generateQuotePdf } from '../../utils/pdfGenerator';
import { formatINR, formatPercent } from '../../utils/formatters';

interface QuoteSummaryProps {
  onScrollToCatalogue: () => void;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({ onScrollToCatalogue }) => {
  const {
    items,
    totals,
    quoteNumber,
    client,
    regenerateQuoteNumber,
    clearQuote,
    resetQuoteToSample,
    addToast,
  } = useQuoteStore();

  const [isExporting, setIsExporting] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleDownloadPdf = () => {
    if (items.length === 0) {
      addToast({
        type: 'error',
        title: 'Empty Quotation',
        description: 'Please add at least one garment before generating an official PDF.',
      });
      return;
    }

    setIsExporting(true);
    try {
      generateQuotePdf({
        quoteNumber,
        items,
        totals,
        client,
      });

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C66B4E', '#171717', '#747C66', '#DF8467', '#F4F0E8'],
      });

      addToast({
        type: 'success',
        title: 'Quotation PDF Downloaded',
        description: `Exported #${quoteNumber} with ${items.length} line items.`,
      });
    } catch (err) {
      console.error('PDF generation error:', err);
      addToast({
        type: 'error',
        title: 'PDF Generation Failed',
        description: 'An unexpected error occurred while compiling the PDF document.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopySummary = () => {
    if (items.length === 0) return;

    const summaryText = [
      `PLUM & THREAD — ESTIMATED QUOTATION #${quoteNumber}`,
      `Client: ${client.companyName || client.name || 'Valued Brand'}`,
      `Total Garments: ${totals.totalQuantity} Units across ${items.length} styles`,
      `----------------------------------------`,
      ...items.map(
        (i) =>
          `• ${i.product.name} (${i.configuration.size}, ${i.configuration.color.name}, ${i.configuration.branding.name}): ${i.quantity} pcs @ ${formatINR(i.unitPrice)} = ${formatINR(i.taxableSubtotal)} (+${i.gstRate}% GST)`
      ),
      `----------------------------------------`,
      `Taxable Subtotal: ${formatINR(totals.subtotal)}`,
      `Total GST: ${formatINR(totals.totalGst)}`,
      `Grand Total: ${formatINR(totals.grandTotal)}`,
      `Lead Time: 14-21 Business Days from approval`,
      `Tiruppur, India | production@plumandthread.com`,
    ].join('\n');

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);

    addToast({
      type: 'info',
      title: 'Quotation Text Copied',
      description: 'Formatted production summary copied to your clipboard.',
    });
  };

  return (
    <div className="sticky top-24 rounded-2xl bg-[#EBE8E1] border border-[#D9D5CE] shadow-lg overflow-hidden flex flex-col justify-between">
      {/* Card Header */}
      <div className="p-6 bg-[#171717] text-[#F4F0E8] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#D9D5CE]/80 uppercase block">
            ESTIMATED QUOTATION
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <h3 className="font-mono text-lg font-bold tracking-tight text-[#F4F0E8]">
              {quoteNumber}
            </h3>
            <button
              onClick={regenerateQuoteNumber}
              className="text-[#D9D5CE]/60 hover:text-[#C66B4E] transition-colors"
              title="Regenerate Quote ID"
              aria-label="Regenerate Quote ID"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="block text-[10px] font-mono text-[#D9D5CE]/70 uppercase">
            Units Count
          </span>
          <span className="font-mono text-sm font-bold text-[#C66B4E]">
            {totals.totalQuantity} pcs
          </span>
        </div>
      </div>

      {/* Main Calculation Content */}
      <div className="p-6 space-y-5">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#747C66]">Taxable Subtotal (Raw Goods &amp; Branding):</span>
          <span className="text-[#171717] font-semibold">{formatINR(totals.subtotal)}</span>
        </div>

        {/* GST Breakdown by Slab */}
        <div className="space-y-2 pt-3 border-t border-[#D9D5CE]/80">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#747C66]">
            <span>Statutory GST Slabs</span>
            <span>Tax Amount</span>
          </div>

          {totals.gstBreakdown.length === 0 ? (
            <div className="text-[11px] font-mono text-[#747C66] italic">
              No taxable items configured yet.
            </div>
          ) : (
            totals.gstBreakdown.map((slab) => (
              <div
                key={slab.rate}
                className="flex items-center justify-between text-xs font-mono py-1 px-2.5 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE]/60"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#171717]">GST {slab.rate}%</span>
                  <span className="text-[10px] text-[#747C66]">
                    (on {formatINR(slab.taxableAmount, false)})
                  </span>
                </div>
                <span className="font-medium text-[#C66B4E]">+{formatINR(slab.gstAmount)}</span>
              </div>
            ))
          )}

          <div className="flex items-center justify-between text-xs font-mono pt-1 text-[#747C66]">
            <span>Cumulative GST:</span>
            <span className="text-[#171717] font-semibold">{formatINR(totals.totalGst)}</span>
          </div>
        </div>

        {/* Grand Total Highlight */}
        <div className="pt-4 border-t-2 border-[#171717] flex items-end justify-between">
          <div>
            <span className="block text-[10px] font-mono uppercase text-[#747C66] tracking-wider">
              Grand Total (all inclusive)
            </span>
            <span className="text-[11px] font-mono text-[#747C66]">
              INR &middot; Tiruppur FOB Factory
            </span>
          </div>
          <div className="text-right">
            <span className="font-serif text-3xl font-bold text-[#171717] block leading-none">
              {formatINR(totals.grandTotal)}
            </span>
          </div>
        </div>

        {/* Production Notice */}
        <div className="p-3 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE] text-[11px] font-mono text-[#747C66] space-y-1">
          <div className="flex items-center gap-1.5 text-[#171717] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#747C66]" />
            <span>Manufacturing Estimate Guarantee</span>
          </div>
          <p className="leading-relaxed">
            Prices hold valid for 30 calendar days. Final dispatch freight invoiced separately based on destination port.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Primary Action: Download PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting || items.length === 0}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#171717] hover:bg-[#C66B4E] disabled:bg-[#D9D5CE] text-[#F4F0E8] disabled:text-[#747C66] text-sm font-semibold tracking-wide shadow-md transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            <FileDown className="w-4 h-4" />
            <span>{isExporting ? 'Generating PDF...' : 'Generate Official PDF'}</span>
          </button>

          {/* Secondary Action: Copy Text Summary */}
          <button
            onClick={handleCopySummary}
            disabled={items.length === 0}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-transparent border border-[#171717]/25 hover:border-[#171717] text-[#171717] text-xs font-mono font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Breakdown Text'}</span>
          </button>
        </div>

        {/* Workspace Management Bar (Reset / Clear) */}
        <div className="pt-3 border-t border-[#D9D5CE] flex items-center justify-between text-xs font-mono">
          <button
            onClick={resetQuoteToSample}
            className="text-[#747C66] hover:text-[#171717] hover:underline flex items-center gap-1 cursor-pointer"
            title="Reload default sample items"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={clearQuote}
            className="text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
            title="Remove all items from quote"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};
