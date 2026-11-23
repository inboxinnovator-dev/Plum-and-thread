import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Compass, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { Hero3D } from './Hero3D';

interface HeroProps {
  onExploreCraft: () => void;
  onOpenQuoteStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCraft, onOpenQuoteStudio }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 lg:pt-36 lg:pb-16 px-4 sm:px-6 lg:px-12 border-b border-[#D9D5CE] overflow-hidden blueprint-grid">
      {/* Editorial Textile Weave Ambient Background */}
      <div className="absolute inset-0 bg-textile-pattern pointer-events-none" />

      {/* Top Heritage & Geolocation Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D9D5CE]/60 text-xs font-mono tracking-wider text-[#747C66]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C66B4E] animate-pulse" />
          <span className="text-[#171717] font-semibold">TIRUPPUR TEXTILE CORRIDOR</span>
          <span className="hidden sm:inline text-[#D9D5CE]">|</span>
          <span className="hidden sm:inline">11°06'N 77°20'E · INDIA</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-[#171717]/80">
            <ShieldCheck className="w-3.5 h-3.5 text-[#747C66]" />
            OEKO-TEX® · GOTS COMPLIANT
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded bg-[#C66B4E]/10 text-[#C66B4E] font-medium">
            AQL 2.5 INSPECTION
          </span>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
        {/* Left Column: Bold Editorial Typography & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#171717] w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#C66B4E]" />
            PLUM &amp; THREAD · FABRIC TO FULFILLMENT
          </div>

          {/* Exact Required Headline: "Made for ideas that deserve to be worn." */}
          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-tight text-[#171717]">
            Made for ideas that{' '}
            <span className="italic font-light text-[#C66B4E] font-serif">
              deserve to be worn.
            </span>
          </h1>

          {/* Exact Required Supporting Copy: "From fabric to finished apparel, we bring your next collection to life." */}
          <p className="mt-6 text-lg sm:text-xl text-[#171717]/75 max-w-xl font-normal leading-relaxed">
            From fabric to finished apparel, we bring your next collection to life.
            Precision knits, master dyeing, CAD cutting, and in-house branding straight from Tiruppur’s textile heartland.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenQuoteStudio}
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#171717] text-[#F4F0E8] text-sm font-semibold tracking-wide hover:bg-[#C66B4E] transition-all duration-300 shadow-lg shadow-[#171717]/10 hover:shadow-[#C66B4E]/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Build your quote</span>
              <FileSpreadsheet className="w-4 h-4 transition-transform group-hover:rotate-6" />
            </button>

            <button
              onClick={onExploreCraft}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-transparent border border-[#171717]/30 hover:border-[#171717] text-[#171717] text-sm font-semibold tracking-wide hover:bg-[#171717]/5 transition-all duration-200 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#747C66]" />
              <span>Explore our craft</span>
              <ArrowUpRight className="w-4 h-4 text-[#747C66] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Editorial Technical Stamp Footnote */}
          <div className="mt-10 pt-6 border-t border-[#D9D5CE]/60 grid grid-cols-3 gap-4 max-w-lg text-left">
            <div>
              <span className="block text-2xl font-serif text-[#171717]">180–360</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#747C66]">
                GSM Knits
              </span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-[#171717]">5% – 18%</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#747C66]">
                Transparent GST
              </span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-[#171717]">14 Days</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#747C66]">
                Sampling Lead
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Kinetic Sculpture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          <Hero3D />
        </motion.div>
      </div>

      {/* Bottom Ticker / Philosophy Bar */}
      <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between text-xs text-[#747C66] font-mono border-t border-[#D9D5CE]/60">
        <div>
          <span>SPECIFICATION · FABRIC WEIGHT · SEAM CALIPER · COLORFASTNESS</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span>ZERO LIQUID DISCHARGE PARTNERSHIP</span>
          <span>•</span>
          <span>NO MINIMUM TRAPPING</span>
        </div>
      </div>
    </section>
  );
};
