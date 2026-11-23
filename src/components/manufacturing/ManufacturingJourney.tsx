import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Layers, 
  Scissors, 
  Cpu, 
  ShieldCheck, 
  Package, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { MANUFACTURING_STAGES } from '../../data/manufacturing';

export const ManufacturingJourney: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const currentStage = MANUFACTURING_STAGES.find((s) => s.id === activeStageId) || MANUFACTURING_STAGES[0];

  const stageIcons = [
    Layers,       // 1. Fabric Sourcing
    Scissors,     // 2. Cutting
    Cpu,          // 3. Stitching
    ShieldCheck,  // 4. Quality Control
    Package,      // 5. Packaging
    Truck,        // 6. Dispatch
  ];

  return (
    <section id="manufacturing" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8] border-b border-[#D9D5CE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D9D5CE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C66B4E]" />
              PRODUCTION TIMELINE
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Fabric to Fulfillment.{' '}
              <span className="italic font-light text-[#C66B4E]">The Six Stages.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#171717]/70 max-w-md font-normal leading-relaxed">
            Trace the disciplined journey of raw fiber as it transforms into master-stitched apparel inside our Tiruppur facilities.
          </p>
        </div>

        {/* Horizontal Interactive Stage Stepper */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pb-6 border-b border-[#D9D5CE]">
          {MANUFACTURING_STAGES.map((stage, idx) => {
            const Icon = stageIcons[idx] || Layers;
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#171717] text-[#F4F0E8] shadow-lg shadow-[#171717]/10 -translate-y-1'
                    : 'bg-[#EBE8E1]/60 text-[#171717] hover:bg-[#EBE8E1] hover:border-[#C66B4E]'
                } border ${isActive ? 'border-[#171717]' : 'border-[#D9D5CE]'}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#C66B4E]' : 'text-[#747C66]'}`}>
                    {stage.stageNumber}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C66B4E]' : 'text-[#747C66]'}`} />
                </div>
                <div className="mt-3">
                  <span className="text-xs sm:text-sm font-semibold block leading-tight">
                    {stage.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Deep-Dive Card */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] p-6 sm:p-10 shadow-sm"
            >
              {/* Left Column: Stage Storytelling & Technical Benchmarks */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C66B4E] uppercase tracking-wider mb-2">
                    <span>STAGE {currentStage.stageNumber} OF 06</span>
                    <span>&bull;</span>
                    <span>TIRUPPUR ATELIER</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#171717]">
                    {currentStage.name}
                  </h3>

                  <p className="mt-2 text-base font-medium text-[#747C66]">
                    {currentStage.lead}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-[#171717]/80 leading-relaxed">
                    {currentStage.description}
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-[#D9D5CE]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#747C66] block mb-2">
                    Key Technical Highlights:
                  </span>
                  {currentStage.technicalHighlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717]">
                      <CheckCircle2 className="w-4 h-4 text-[#C66B4E] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Machinery & Quality Audit Spec Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D9D5CE] text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE]">
                    <span className="text-[10px] uppercase text-[#747C66] block">Equipment Class</span>
                    <span className="font-semibold text-[#171717] mt-0.5 block">
                      {currentStage.equipment}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE]">
                    <span className="text-[10px] uppercase text-[#747C66] block">Quality Audit Benchmark</span>
                    <span className="font-semibold text-[#C66B4E] mt-0.5 block">
                      {currentStage.qualityCheck}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Res Editorial Photography */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-xl overflow-hidden border border-[#D9D5CE] shadow-lg">
                  <img
                    src={currentStage.image}
                    alt={currentStage.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/60 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#F4F0E8] flex items-center justify-between">
                    <span>STAGE 0{currentStage.id} &middot; WORKFLOW</span>
                    <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md">
                      TIRUPPUR FACILITY
                    </span>
                  </div>
                </div>

                {/* Quick Next Stage Pill */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStageId((prev) => (prev > 1 ? prev - 1 : 6))}
                    className="text-xs font-mono text-[#747C66] hover:text-[#171717] cursor-pointer"
                  >
                    &larr; Previous Stage
                  </button>
                  <button
                    onClick={() => setActiveStageId((prev) => (prev < 6 ? prev + 1 : 1))}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#C66B4E] hover:underline cursor-pointer"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
