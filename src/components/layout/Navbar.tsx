import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileSpreadsheet, ArrowRight, Sparkles } from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';
import { formatINR } from '../../utils/formatters';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totals } = useQuoteStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', href: 'collections' },
    { name: 'Manufacturing', href: 'manufacturing' },
    { name: 'Our capabilities', href: 'capabilities' },
    { name: 'Quote Studio', href: 'quote-studio' },
    { name: 'Contact', href: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F4F0E8]/95 backdrop-blur-md shadow-sm border-b border-[#D9D5CE]/80 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Mark / Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            {/* Architectural Thread Monogram */}
            <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center text-[#F4F0E8] shadow-md group-hover:bg-[#C66B4E] transition-colors duration-300">
              <svg
                className="w-5 h-5 text-[#F4F0E8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
                <path d="M6 14h6" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#171717] block leading-none">
                Plum &amp; Thread
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#747C66] uppercase block mt-1">
                Tiruppur · Atelier &amp; Mills
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#171717]/80">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="hover:text-[#C66B4E] transition-colors duration-200 cursor-pointer relative py-1"
              >
                {link.name}
                {link.href === 'quote-studio' && totals.itemCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[#C66B4E] text-[10px] font-mono font-bold text-white">
                    {totals.itemCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action: Build a Quote CTA */}
          <div className="flex items-center gap-3">
            {/* Desktop Quote Studio Pill Indicator */}
            {totals.itemCount > 0 && (
              <button
                onClick={() => handleLinkClick('quote-studio')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EBE8E1] border border-[#D9D5CE] hover:border-[#C66B4E] text-xs font-mono text-[#171717] transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#C66B4E] animate-pulse" />
                <span>{totals.totalQuantity} pcs</span>
                <span className="text-[#747C66]">|</span>
                <span className="font-semibold">{formatINR(totals.grandTotal, false)}</span>
              </button>
            )}

            <button
              onClick={() => handleLinkClick('quote-studio')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] text-[#F4F0E8] text-sm font-semibold tracking-wide hover:bg-[#C66B4E] transition-all duration-200 shadow-sm cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Build a quote</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#EBE8E1] border border-[#D9D5CE] text-[#171717] hover:text-[#C66B4E] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-30 bg-[#F4F0E8] border-b border-[#D9D5CE] shadow-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#747C66]">
                Navigation Menu
              </span>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className="flex items-center justify-between text-left text-lg font-serif text-[#171717] hover:text-[#C66B4E] py-2 border-b border-[#D9D5CE]/50 transition-colors"
                  >
                    <span>{link.name}</span>
                    {link.href === 'quote-studio' && totals.itemCount > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#C66B4E] text-xs font-mono text-white">
                        {totals.itemCount} items
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#747C66]" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => handleLinkClick('quote-studio')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#171717] text-[#F4F0E8] text-sm font-semibold tracking-wide hover:bg-[#C66B4E] transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Build your quote</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
