import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data/faq';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8] border-b border-[#D9D5CE]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C66B4E]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
            Clear Answers.{' '}
            <span className="italic font-light text-[#C66B4E]">Zero Ambiguity.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#171717]/70 max-w-xl mx-auto">
            Everything you need to know about our quote calculator, statutory GST slabs, custom embellishment, and manufacturing terms.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EBE8E1] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F4F0E8] text-[#747C66] shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#171717] font-semibold">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C66B4E] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#171717]/80 leading-relaxed border-t border-[#D9D5CE]/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
