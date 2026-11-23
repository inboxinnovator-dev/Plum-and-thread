import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scissors, 
  Sparkles, 
  Layers, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  BarChart3,
  Sliders,
  Cpu
} from 'lucide-react';
import { MANUFACTURING_PILLARS } from '../../data/manufacturing';

interface ManufacturingCredibilityProps {
  onOpenJourney: () => void;
  onOpenQuoteStudio: () => void;
}

export const ManufacturingCredibility: React.FC<ManufacturingCredibilityProps> = ({
  onOpenJourney,
  onOpenQuoteStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'apparel' | 'branding' | 'bulk' | 'quality' | 'workflow'>('apparel');

  const capabilities = [
    {
      id: 'apparel',
      icon: Layers,
      title: 'Apparel Production',
      subtitle: 'Circular Knits & Specialized Fabric Formulations',
      description: 'Engineered in the knits capital of India. We process single jersey (160–220 GSM), heavy loopback French terry (300–400 GSM), micro-pique, interlock 4-way stretch, and technical woven ripstop shells with specialized bio-wash, carbon finish, and silicone softening treatments.',
      specs: [
        { label: 'Gauge Range', value: '24 to 32 Gauge Knits' },
        { label: 'Fiber Types', value: 'Long-Staple Combed Cotton, GOTS Organic, Bamboo, Polyfil' },
        { label: 'Treatment', value: 'Bio-wash, Anti-pilling, Low-temp Reactive Dye' },
        { label: 'Tolerances', value: 'Shrinkage < 3%, Torque < 2%' },
      ],
      tag: 'Raw Fabric to Finished Garment',
    },
    {
      id: 'branding',
      icon: Sparkles,
      title: 'Custom In-House Branding',
      subtitle: 'Zero-feel Screen Prints, High-Density Rubber & Tajima Embroidery',
      description: 'Eliminate subcontracted embellishers. Our on-site branding facilities deliver automatic 12-color water-based screen printing, 3D silicone puff prints, Tajima micro-needle embroidery up to 15 colors, high-definition 50D damask woven neck labels, and FSC-certified swing ticketing.',
      specs: [
        { label: 'Print Technologies', value: 'Water-based, Plastisol, Discharge, High-Density 3D' },
        { label: 'Embroidery Heads', value: 'Multi-head Tajima with Madeira Polyneon Threads' },
        { label: 'Labels & Badges', value: 'Woven Damask, Satin, Die-cut Silicone, Metal Grommets' },
        { label: 'Wash Durability', value: 'Certified 50+ Home Laundering Cycles' },
      ],
      tag: 'Integrated Embellishment',
    },
    {
      id: 'bulk',
      icon: BarChart3,
      title: 'Bulk Order Scaling & Agility',
      subtitle: 'From 50-Unit Pilot Drops to 150,000+ Units Commercial Fleet',
      description: 'Designed for both high-growth indie brands and global corporate operations. We operate agile modular stitching cells capable of executing limited boutique sampling as well as synchronized multi-line industrial production schedules.',
      specs: [
        { label: 'Sample Run MOQ', value: 'From 25 to 50 Units per Style / Color' },
        { label: 'Demonstration Throughput', value: '150,000+ Finished Units Monthly Capacity*' },
        { label: 'Lead Times', value: '10–14 Days Sampling &middot; 21–28 Days Bulk Dispatch' },
        { label: 'Logistics Options', value: 'Direct Air Freight & Sea Palletization from Tiruppur' },
      ],
      tag: 'Elastic Scale',
    },
    {
      id: 'quality',
      icon: ShieldCheck,
      title: 'AQL 2.5 Quality Assurance',
      subtitle: '4-Point Fabric Inspection, Seam Tensile Tests & Metal Detection',
      description: 'Zero tolerance for substandard manufacturing. Every roll of incoming yarn undergoes automated 4-point grading. During assembly, garments encounter inline seam SPI verification, dimensional shrinkage washing cycles, and end-of-line conveyorized needle detection.',
      specs: [
        { label: 'Audit Standard', value: 'International AQL 2.5 Major / Minor Threshold' },
        { label: 'Dimensional Check', value: 'Calibrated Wash Test for Shrinkage & Torque' },
        { label: 'Colorfastness', value: 'Crockmeter Wet & Dry Friction Grade 4+' },
        { label: 'Safety Sweep', value: 'Hashima High-Sensitivity Multi-Zone Needle Scan' },
      ],
      tag: 'Certified Compliance',
    },
    {
      id: 'workflow',
      icon: Cpu,
      title: 'Synchronized Workflow',
      subtitle: 'CAD Nesting, Spreading, Stitching, Finishing & Packaging',
      description: 'A completely integrated digital-to-physical pipeline. Tech packs and pattern grading files link directly into automated spreading tables and oscillating CNC cutting systems, keeping fabric waste below 4% and guaranteeing seam symmetry.',
      specs: [
        { label: 'Pattern Software', value: 'Lectra / Gerber CAD Digital Pattern Grading' },
        { label: 'Cutting Equipment', value: 'Automated Tension-Free Spreading & CNC Knife' },
        { label: 'Finishing Process', value: 'Veit Industrial Steam Form & Tunnel Press' },
        { label: 'Packaging', value: '100% Biodegradable Polybags & Master Export Cartons' },
      ],
      tag: 'Digital-to-Physical Precision',
    },
  ];

  const currentCapability = capabilities.find((c) => c.id === activeTab) || capabilities[0];

  return (
    <section id="capabilities" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8] border-b border-[#D9D5CE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D9D5CE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
              <Scissors className="w-3.5 h-3.5 text-[#C66B4E]" />
              ENGINEERING CREDIBILITY
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Industrial Precision.{' '}
              <span className="italic font-light text-[#C66B4E]">Master Craft.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#171717]/70 max-w-md font-normal leading-relaxed">
            Plum &amp; Thread bridges the gap between high-end fashion ateliers and industrial textile manufacturing scale. Explore our core technical pillars below.
          </p>
        </div>

        {/* 4 Pillars Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-b border-[#D9D5CE]">
          {MANUFACTURING_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] flex flex-col justify-between hover:border-[#C66B4E] transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#747C66]">
                  {pillar.metricLabel}
                </span>
                <div className="mt-2 text-3xl sm:text-4xl font-serif text-[#171717] font-semibold">
                  {pillar.metric}
                </div>
                <h3 className="mt-2 text-base font-semibold text-[#171717]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs text-[#171717]/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Explicit Mandatory Demonstration Disclaimer */}
              <div className="mt-4 pt-3 border-t border-[#D9D5CE]/80 text-[10px] font-mono text-[#747C66] italic">
                * {pillar.demonstrationNote}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Capability Deep-Dive Tabs */}
        <div className="mt-12">
          {/* Tab Selection Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              const isActive = activeTab === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(cap.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#171717] text-[#F4F0E8] shadow-md'
                      : 'bg-[#EBE8E1] text-[#171717]/70 hover:bg-[#D9D5CE] hover:text-[#171717]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C66B4E]' : 'text-[#747C66]'}`} />
                  <span>{cap.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Capability Panel */}
          <motion.div
            key={currentCapability.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 sm:p-10 rounded-2xl bg-[#EBE8E1]/80 border border-[#D9D5CE] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F4F0E8] border border-[#D9D5CE] text-[11px] font-mono text-[#C66B4E] uppercase tracking-wider mb-4">
                {currentCapability.tag}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
                {currentCapability.title}
              </h3>
              <p className="mt-1 text-sm font-mono text-[#747C66]">
                {currentCapability.subtitle}
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#171717]/80 leading-relaxed">
                {currentCapability.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenJourney}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#C66B4E] underline underline-offset-4 cursor-pointer"
                >
                  <span>Explore full 6-stage manufacturing journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Specification Sheet */}
            <div className="lg:col-span-5 bg-[#F4F0E8] rounded-xl p-6 border border-[#D9D5CE] shadow-sm">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#747C66] pb-3 border-b border-[#D9D5CE]">
                Technical Specification Sheet
              </h4>
              <div className="mt-4 space-y-3.5">
                {currentCapability.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 pb-2 border-b border-[#D9D5CE]/50 last:border-none">
                    <span className="font-mono text-[#747C66]">{spec.label}</span>
                    <span className="font-medium text-[#171717] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9D5CE] flex items-center justify-between">
                <span className="text-[11px] text-[#747C66]">Ready to configure this capability?</span>
                <button
                  onClick={onOpenQuoteStudio}
                  className="px-3.5 py-1.5 rounded-lg bg-[#C66B4E] text-[#F4F0E8] text-xs font-semibold hover:bg-[#A9553B] transition-colors cursor-pointer"
                >
                  Quote in Studio
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
