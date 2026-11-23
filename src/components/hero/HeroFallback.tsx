import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface HeroFallbackProps {
  reducedMotion?: boolean;
}

export const HeroFallback: React.FC<HeroFallbackProps> = ({ reducedMotion }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -12, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[560px] flex items-center justify-center p-4 transition-transform duration-300 ease-out"
      style={{
        perspective: '1000px',
      }}
    >
      {/* 3D-feel Card */}
      <div
        className="relative w-full max-w-lg aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden border border-[#D9D5CE] shadow-2xl bg-gradient-to-br from-[#171717] via-[#242424] to-[#121212] p-8 flex flex-col justify-between transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle cloth weave texture */}
        <div className="absolute inset-0 bg-textile-pattern opacity-10 pointer-events-none" />

        {/* Floating Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C66B4E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#747C66]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#F4F0E8] font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C66B4E] animate-pulse" />
            FABRIC ATELIER 2025
          </div>
          <span className="text-[11px] font-mono text-[#D9D5CE]/70 tracking-widest uppercase">
            11°06'N 77°20'E
          </span>
        </div>

        {/* Center Textile Graphic Motif */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Concentric subtle rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C66B4E]/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-3 rounded-full border border-[#747C66]/40" />
            
            {/* Sculptural silhouette icon */}
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#C66B4E] to-[#E28367] flex items-center justify-center shadow-lg shadow-[#C66B4E]/25 transform rotate-6 hover:rotate-12 transition-transform duration-500">
              <Layers className="w-12 h-12 text-[#F4F0E8]" />
            </div>
          </div>

          <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#F4F0E8] italic tracking-wide">
            Kinetic Woven Ribbon
          </h3>
          <p className="mt-1 text-xs text-[#D9D5CE]/80 font-mono">
            Long-Staple Indian Organic Knit &middot; 320 GSM
          </p>
        </div>

        {/* Bottom Details */}
        <div className="relative z-10 grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-left">
          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-[#D9D5CE]/60">
              Origin
            </span>
            <span className="text-xs font-medium text-[#F4F0E8]">Tiruppur, India</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] uppercase font-mono tracking-wider text-[#D9D5CE]/60">
              Standard
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#C66B4E]">
              <ShieldCheck className="w-3.5 h-3.5" /> GOTS &middot; AQL 2.5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
