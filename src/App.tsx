import React, { useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { ManufacturingCredibility } from './components/manufacturing/ManufacturingCredibility';
import { ProductCatalogue } from './components/catalogue/ProductCatalogue';
import { QuoteStudio } from './components/quote/QuoteStudio';
import { ManufacturingJourney } from './components/manufacturing/ManufacturingJourney';
import { WhyPlumThread } from './components/manufacturing/WhyPlumThread';
import { Testimonials } from './components/sections/Testimonials';
import { FaqAccordion } from './components/sections/FaqAccordion';
import { ContactSection } from './components/sections/ContactSection';
import { ToastContainer } from './components/common/ToastContainer';

export function App() {
  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#171717] font-sans selection:bg-[#C66B4E] selection:text-white flex flex-col">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Top Fixed Header */}
      <Navbar onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCraft={() => scrollToSection('manufacturing')}
          onOpenQuoteStudio={() => scrollToSection('quote-studio')}
        />

        {/* Manufacturing Credibility & Capabilities */}
        <ManufacturingCredibility
          onOpenJourney={() => scrollToSection('manufacturing')}
          onOpenQuoteStudio={() => scrollToSection('quote-studio')}
        />

        {/* Product Catalogue & Detail Configurator */}
        <ProductCatalogue onOpenQuoteStudio={() => scrollToSection('quote-studio')} />

        {/* Interactive Quote Studio Workspace */}
        <QuoteStudio onScrollToCatalogue={() => scrollToSection('collections')} />

        {/* 6-Stage Manufacturing Journey Timeline */}
        <ManufacturingJourney />

        {/* Why Plum & Thread Standards */}
        <WhyPlumThread onOpenQuoteStudio={() => scrollToSection('quote-studio')} />

        {/* Client Demonstration Case Studies */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FaqAccordion />

        {/* Direct Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
