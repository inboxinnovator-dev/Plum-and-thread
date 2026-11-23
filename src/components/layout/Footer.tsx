import React from 'react';
import { ArrowUp, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171717] text-[#F4F0E8] border-t border-[#2A2A2A] pt-16 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2A2A2A]">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C66B4E] flex items-center justify-center text-[#F4F0E8] font-serif font-bold text-lg">
                P&amp;T
              </div>
              <span className="font-serif text-2xl tracking-tight text-[#F4F0E8]">
                Plum &amp; Thread
              </span>
            </div>

            <p className="text-xs text-[#D9D5CE]/75 max-w-sm leading-relaxed font-normal">
              Precision apparel manufacturing from Tiruppur, India. Combining editorial textile design, master knitting, laser CAD cutting, and automated embellishment under one unified standard.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[#D9D5CE]/60 pt-2">
              <span>TIRUPPUR ATELIER &middot; 11°06'N 77°20'E</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-xs font-mono">
            <span className="text-[10px] uppercase tracking-widest text-[#C66B4E] block mb-2 font-bold">
              Site Navigation
            </span>
            <ul className="space-y-2">
              {['Collections', 'Manufacturing', 'Our capabilities', 'Quote Studio', 'Contact'].map((nav) => {
                const id = nav.toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={nav}>
                    <button
                      onClick={() => onNavigate(id)}
                      className="text-[#D9D5CE]/80 hover:text-[#C66B4E] transition-colors cursor-pointer"
                    >
                      {nav}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div className="lg:col-span-4 space-y-3 text-xs font-mono">
            <span className="text-[10px] uppercase tracking-widest text-[#C66B4E] block mb-2 font-bold">
              Compliance &amp; Certifications
            </span>
            <p className="text-[#D9D5CE]/75 text-[11px] leading-relaxed">
              Standard operating procedures aligned with GOTS (Global Organic Textile Standard), OEKO-TEX® Standard 100 Class I, and AQL 2.5 quality control audit frameworks.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#D9D5CE]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Liquid Discharge (ZLD) Facility</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D9D5CE]/60">
          <div>
            &copy; {new Date().getFullYear()} Plum &amp; Thread Apparel Manufacturing Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Client-side State &middot; LocalStorage Persisted</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#F4F0E8] hover:text-[#C66B4E] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
