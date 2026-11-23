import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Sparkles, Sliders, ArrowUpRight } from 'lucide-react';
import { WHY_PLUM_THREAD } from '../../data/whyUs';

interface WhyPlumThreadProps {
  onOpenQuoteStudio: () => void;
}

export const WhyPlumThread: React.FC<WhyPlumThreadProps> = ({ onOpenQuoteStudio }) => {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8] border-b border-[#D9D5CE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D9D5CE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
              <Shield className="w-3.5 h-3.5 text-[#C66B4E]" />
              THE PLUM &amp; THREAD STANDARD
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Why Brands Build{' '}
              <span className="italic font-light text-[#C66B4E]">With Plum &amp; Thread.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#171717]/70 max-w-md font-normal leading-relaxed">
            We operate with radical pricing transparency, rigorous technical tolerance, and an integrated embellishment atelier—leaving nothing to chance.
          </p>
        </div>

        {/* 6 Value Propositions Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_PLUM_THREAD.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] hover:border-[#C66B4E] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D9D5CE]">
                  <span className="text-xs font-mono font-bold text-[#C66B4E]">
                    {prop.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F4F0E8] border border-[#D9D5CE] text-[10px] font-mono text-[#747C66] uppercase">
                    {prop.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl text-[#171717] group-hover:text-[#C66B4E] transition-colors">
                  {prop.title}
                </h3>
                <h4 className="mt-1 text-xs font-mono text-[#747C66]">
                  {prop.subtitle}
                </h4>

                <p className="mt-3.5 text-xs sm:text-sm text-[#171717]/75 leading-relaxed">
                  {prop.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9D5CE]/60 flex items-center justify-between text-xs font-mono text-[#747C66]">
                <span>Tiruppur Quality Verified</span>
                <Check className="w-4 h-4 text-[#C66B4E]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-[#171717] text-[#F4F0E8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light">
              Ready to verify unit economics for your collection?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#D9D5CE]/80 font-mono">
              Build your customized bill of materials in our Quote Studio with real-time statutory GST.
            </p>
          </div>
          <button
            onClick={onOpenQuoteStudio}
            className="px-6 py-3.5 rounded-xl bg-[#C66B4E] hover:bg-[#A9553B] text-[#F4F0E8] text-xs font-semibold tracking-wider uppercase font-mono transition-colors shrink-0 cursor-pointer"
          >
            Launch Quote Studio
          </button>
        </div>
      </div>
    </section>
  );
};
