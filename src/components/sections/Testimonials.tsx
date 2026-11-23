import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Sparkles, Building2, MapPin, CheckCircle2 } from 'lucide-react';
import { CASE_SCENARIOS } from '../../data/testimonials';

export const Testimonials: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const activeCase = CASE_SCENARIOS[activeCaseIndex];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8] border-b border-[#D9D5CE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D9D5CE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
              <Quote className="w-3.5 h-3.5 text-[#C66B4E]" />
              CLIENT SCENARIOS &amp; CASE STUDIES
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Production in Practice.{' '}
              <span className="italic font-light text-[#C66B4E]">Client Journeys.</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-md bg-[#EBE8E1] border border-[#D9D5CE] text-[10px] font-mono text-[#747C66] uppercase">
              Demonstration Client Profiles &amp; Scenarios
            </span>
          </div>
        </div>

        {/* Case Switcher Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {CASE_SCENARIOS.map((scenario, idx) => (
            <button
              key={scenario.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCaseIndex === idx
                  ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
                  : 'bg-[#EBE8E1] text-[#171717]/70 hover:bg-[#D9D5CE] hover:text-[#171717]'
              }`}
            >
              <span>{scenario.clientName}</span>
              <span className="ml-2 text-[10px] font-mono opacity-70">
                ({scenario.unitsProduced})
              </span>
            </button>
          ))}
        </div>

        {/* Active Scenario Card */}
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-6 sm:p-10 rounded-2xl bg-[#EBE8E1]/80 border border-[#D9D5CE] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Scope, Challenge, Solution & Result */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#747C66] mb-2">
                <span className="px-2 py-0.5 rounded bg-[#F4F0E8] text-[#C66B4E] font-medium">
                  {activeCase.clientType}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#747C66]" />
                  {activeCase.location}
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#171717]">
                {activeCase.clientName}
              </h3>
              <p className="mt-1 text-xs font-mono text-[#747C66]">
                Scope: {activeCase.projectScope}
              </p>
            </div>

            {/* Challenge & Solution Breakdown */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE]">
                <strong className="text-[11px] font-mono uppercase tracking-wider text-[#C66B4E] block mb-1">
                  Manufacturing Challenge:
                </strong>
                <p className="text-[#171717]/80 leading-relaxed">{activeCase.challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE]">
                <strong className="text-[11px] font-mono uppercase tracking-wider text-[#747C66] block mb-1">
                  Plum &amp; Thread Solution:
                </strong>
                <p className="text-[#171717]/80 leading-relaxed">{activeCase.solution}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#171717] text-[#F4F0E8]">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#C66B4E] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Outcome:</span>
                </div>
                <p className="text-[#D9D5CE] leading-relaxed">{activeCase.result}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {activeCase.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#F4F0E8] border border-[#D9D5CE] text-[10px] font-mono text-[#747C66]"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Quote Callout Box */}
          <div className="lg:col-span-5 bg-[#F4F0E8] rounded-xl p-8 border border-[#D9D5CE] shadow-sm flex flex-col justify-between h-full">
            <Quote className="w-10 h-10 text-[#C66B4E]/30 mb-4" />
            <blockquote className="font-serif text-xl sm:text-2xl text-[#171717] italic leading-relaxed">
              "{activeCase.quoteExcerpt}"
            </blockquote>

            <div className="mt-8 pt-4 border-t border-[#D9D5CE]">
              <span className="block font-semibold text-sm text-[#171717]">
                {activeCase.authorTitle}
              </span>
              <span className="block text-xs font-mono text-[#747C66]">
                {activeCase.clientName} &middot; Verified Demonstration Case
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
