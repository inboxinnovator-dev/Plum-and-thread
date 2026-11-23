# Plum & Thread — Fabric to Fulfillment
### High-Precision Apparel Manufacturing Atelier &middot; Tiruppur, India
**Superlabs Frontend Developer Hiring Challenge Submission**

---

## 1. Project Overview

**Plum & Thread** is a distinctive, premium digital web application designed for a modern apparel manufacturing company based in the knitwear capital of **Tiruppur, Tamil Nadu, India** (coordinates `11°06'N 77°20'E`). 

Rejecting the sea of generic AI-generated templates, cookie-cutter e-commerce shops, and dashboard clones, this application is crafted as an **editorial digital manufacturing experience**. It unifies architectural fashion editorial elegance, industrial textile engineering precision, and creative 3D technology.

- **Zero Backend Dependency**: Built entirely client-side without databases, Supabase, Firebase, or external authentication. All quotation states, client drafts, and calculation models are computed deterministically in memory and persisted in browser `LocalStorage`.
- **Pure Arithmetic Calculation Engine**: Completely separates mathematical calculation functions from presentation components, implementing exact Indian Goods and Services Tax (GST) statutory rates (5%, 12%, 18%) and floating-point safe arithmetic.
- **Client-Side PDF Generation**: Generates official, print-ready, high-resolution factory quotation and Bill of Materials (BOM) documents directly in the browser via `jsPDF` and `jspdf-autotable`.

---

## 2. Creative Direction & Brand Identity

- **Concept**: *Fabric to Fulfillment* — bridging the gap between bespoke atelier craftsmanship and high-volume industrial knitting lines.
- **Color Palette**:
  - **Cream** (`#F4F0E8`): Natural, unbleached organic cotton backdrop.
  - **Ink** (`#171717`): Deep architectural typography and high contrast structure.
  - **Terracotta** (`#C66B4E`): Traditional Indian clay dye vats, raw brick mills, and accent warmth.
  - **Muted Olive** (`#747C66`): Plant-based botanical dyes and technical precision accents.
  - **Warm Grey** (`#D9D5CE`): Fine linen yarn calipers, subtle mill grids, and dividers.
- **Typography**:
  - Editorial Serifs: *Cormorant Garamond* & *Playfair Display* for headlines.
  - Modern Sans-Serif: *Plus Jakarta Sans* for UI, labels, and specs.
  - Monospace: *JetBrains Mono* for technical metrics, HSN codes, and GSM figures.
- **Aesthetic Principles**:
  - Asymmetric editorial layouts with blueprint grid guidelines.
  - No generic gradient cards or overused frosted glass.
  - Transparent demonstration labels on all illustrative metrics and case studies.

---

## 3. Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19 & TypeScript** | Component composition with strict type safety |
| **Vite 8** | High-speed ESM build system with Rolldown chunk optimization |
| **Tailwind CSS v4** | Modern CSS architecture using `@theme` and zero-runtime styles |
| **Three.js & React Three Fiber** | 3D kinetic textile ribbon sculpture with procedural micro-weave |
| **@react-three/drei** | Studio lighting, float physics, contact shadows, and orbit controls |
| **Framer Motion** | Accessible page transitions, modal choreography, and accordion springs |
| **Zustand** | Centralized, reactive quote state management |
| **LocalStorage API** | Automated persistence, draft snapshots, and local data wiping |
| **jsPDF & jspdf-autotable** | Zero-server, client-side PDF quote compiling and formatting |
| **Lucide React** | Clean, minimalist icon system |
| **Canvas Confetti** | Subtle celebratory micro-interaction on quote completion |

---

## 4. Key Sections & Architecture

### 1. Hero Section & Interactive 3D Textile Sculpture
- **Headline**: *"Made for ideas that deserve to be worn."*
- **Supporting Copy**: *"From fabric to finished apparel, we bring your next collection to life."*
- **3D Sculpture**: A kinetic, woven parametric mobius ribbon rendered via React Three Fiber.
  - Procedural micro-weave normal map generated dynamically in memory on an HTML5 canvas.
  - Interactive cursor tracking that tilts and rotates the sculpture smoothly with inertia.
  - Three-point studio lighting (warm key light, terracotta rim light, and soft olive fill).
  - **Resilience & Fallback**: Automatically detects WebGL support and `prefers-reduced-motion`. If WebGL is unavailable or reduced motion is active, seamlessly degrades to an art-directed CSS-tilted card with zero visual breakage.

### 2. Manufacturing Credibility
- Editorial breakdown of apparel production, custom in-house branding, bulk order scalability, quality inspection protocols (AQL 2.5), and CAD-to-cut workflows.
- Interactive specification sheets for knit gauges, yarn compositions, and machinery.
- Explicitly labeled demonstration metrics to preserve credibility.

### 3. Product Catalogue (The 8 Mandatory Products)
Includes all eight products with exact assessment prices and statutory GST rates:
1. **Round-neck T-shirt** — ₹165 — 5% GST (180 GSM Single Jersey, Combed Compact Cotton)
2. **Polo T-shirt** — ₹235 — 5% GST (220 GSM Honeycomb Micro-Pique Knit)
3. **Hoodie** — ₹480 — 5% GST (360 GSM Heavyweight French Terry / Loop-Knit Fleece)
4. **Track pant** — ₹320 — 5% GST (280 GSM Interlock Knit / Ergonomic Tapered Fit)
5. **Padded jacket** — ₹2,850 — 18% GST (Micro-Ripstop Poly Shell / 200 GSM Baffle Insulation)
6. **Logo cap** — ₹95 — 12% GST (Structured 6-Panel Heavy Twill / Brass Buckle)
7. **Kids romper** — ₹140 — 5% GST (190 GSM GOTS Certified Organic Cotton / Nickel-Free Snaps)
8. **Shorts** — ₹150 — 5% GST (240 GSM Combed Cotton Loopback Terry / 7-inch Inseam)

Features:
- Category filtering (`All`, `T-Shirts`, `Outerwear`, `Bottoms`, `Headwear & Accessories`, `Kids`).
- Real-time search across product names, taglines, GSM, and fiber composition.
- Sort by Featured, Price (Low to High), and Price (High to Low).
- Quick Add action and full Product Detail Modal trigger.
- Empty states with one-click filter resets.

### 4. Interactive Product Configurator (Modal & Studio)
- Size selector (XS through 3XL, and infant sizing for babywear).
- Color selector with rich swatches (Ink Black, Natural Cream, Terracotta, Muted Olive, etc.).
- Transparent branding add-ons with illustrative pricing:
  - *Plain / Blank* (+₹0)
  - *Screen Print (Eco Water-Based)* (+₹25/pc)
  - *High-Density 3D Rubber Print* (+₹40/pc)
  - *Tajima Precision Embroidery* (+₹35/pc)
  - *Woven Damask Neck Label + Care* (+₹12/pc)
  - *Full Custom Merch Package* (+₹55/pc)
- Live quantity controls with instant calculation feedback and quick presets (25, 50, 100, 250, 500).
- Pure mathematical calculation of unit price, taxable subtotal, and GST.

### 5. Quote Studio & Workspace
- **Desktop Split-Screen**: Left panel houses configured item rows with on-the-fly dropdowns, quantity adjusters (preventing negative values), client metadata form, and local draft manager; right panel houses the live quotation summary card.
- **Mobile Responsive Drawer/Tabs**: Switches seamlessly between Items, Totals, and Client Info tabs.
- **Calculation Separation**: `src/utils/calculations.ts` provides floating-point safe mathematical functions with `Math.round((val + Number.EPSILON) * 100) / 100`.
- **Statutory GST Slabs**: Grouped breakdowns across 5%, 12%, and 18% slabs.
- **Draft Management**: Save named local snapshots, restore historical drafts, or wipe storage.

### 6. Client-Side Quotation PDF Generation
- Compiles an editorial A4 document via `jsPDF` and `jspdf-autotable`.
- Displays factory coordinates, client contact info, unique quote ID (`PT-2025-XXXX`), validity window, itemized HSN codes, quantity, unit price, taxable subtotal, GST rates, total GST, grand total, and factory disclaimers.

### 7. Interactive 6-Stage Manufacturing Journey
Visual and technical timeline of the manufacturing process:
1. *Fabric Sourcing & Yarn Spin*
2. *CAD Modeling & Laser Cutting*
3. *Artisanal & Industrial Stitching*
4. *Stringent Quality Control (AQL 2.5)*
5. *Finishing & Eco Packaging*
6. *Global Dispatch & Logistics*

### 8. Why Plum & Thread Standards
Six editorial value pillars detailing bespoke apparel architecture, agile batching, category breadth, in-house embellishment, and ethical zero liquid discharge (ZLD) partnerships.

### 9. Client Scenarios & Case Studies
Three clearly labeled demonstration case studies detailing actual manufacturing challenges, technical solutions, and production outcomes.

### 10. FAQ Accordion
Fully accessible accordion with keyboard navigation answering all six mandatory questions:
- How does the quote calculator work?
- How is GST calculated?
- Can I customize products?
- Can I download a quotation?
- Is the quote a confirmed order?
- How can I contact the manufacturer?

### 11. Contact Form
Frontend form with real-time field validation (name, company, email format, phone digits, minimum message length). Includes a validated local staging preview, generated inquiry reference (`INQ-TIR-XXXX`), and a direct `mailto:` bridge referencing the active quote number.

---

## 5. Project Folder Structure

```
c:/Users/LENOVO/Desktop/PT/
├── public/
│   ├── favicon.svg             # Monogram needle & thread SVG brand mark
├── src/
│   ├── components/
│   │   ├── catalogue/
│   │   │   ├── ProductCard.tsx         # Responsive product display card
│   │   │   ├── ProductCatalogue.tsx    # Filterable grid, search, and sort
│   │   │   └── ProductModal.tsx        # Interactive configurator modal
│   │   ├── common/
│   │   │   └── ToastContainer.tsx      # Accessible toast notifications
│   │   ├── hero/
│   │   │   ├── Hero.tsx                # Hero section with typography & CTAs
│   │   │   ├── Hero3D.tsx              # React Three Fiber kinetic sculpture
│   │   │   └── HeroFallback.tsx        # Accessible CSS-tilted fallback card
│   │   ├── layout/
│   │   │   ├── Footer.tsx              # Mill coordinates, links, compliance
│   │   │   └── Navbar.tsx              # Sticky nav with live quote pill
│   │   ├── manufacturing/
│   │   │   ├── ManufacturingCredibility.tsx # 4-pillar capability deep dive
│   │   │   ├── ManufacturingJourney.tsx     # 6-stage interactive timeline
│   │   │   └── WhyPlumThread.tsx            # Value propositions grid
│   │   ├── quote/
│   │   │   ├── QuoteClientForm.tsx     # Client details for PDF/quotes
│   │   │   ├── QuoteDraftsManager.tsx  # LocalStorage snapshot manager
│   │   │   ├── QuoteItemRow.tsx        # Editable in-line quote item
│   │   │   ├── QuoteStudio.tsx         # Split-screen quote workspace
│   │   │   └── QuoteSummary.tsx        # Live totals & PDF export
│   │   └── sections/
│   │       ├── ContactSection.tsx      # Validated form with mailto bridge
│   │       ├── FaqAccordion.tsx        # Accessible 6-question accordion
│   │       └── Testimonials.tsx        # Demonstration case scenarios
│   ├── data/
│   │   ├── faq.ts                      # FAQ questions & answers
│   │   ├── manufacturing.ts            # Stages and capability specs
│   │   ├── products.ts                 # 8 products, swatches, branding add-ons
│   │   ├── testimonials.ts             # 3 detailed case studies
│   │   └── whyUs.ts                    # 6 company standards
│   ├── store/
│   │   └── quoteStore.ts               # Zustand store with LocalStorage sync
│   ├── types/
│   │   ├── product.ts                  # TypeScript product & spec models
│   │   └── quote.ts                    # Quote items, drafts, totals
│   ├── utils/
│   │   ├── calculations.ts             # Pure math calculation engine
│   │   ├── formatters.ts               # INR currency, percent, dates
│   │   └── pdfGenerator.ts             # jsPDF factory quotation compiler
│   ├── App.tsx                         # Master page coordinator
│   ├── index.css                       # Tailwind v4 theme & custom utilities
│   └── main.tsx                        # React 19 entry point
├── tests/
│   └── calculations.test.mjs           # Unit test suite verifying all math
├── package.json
├── tsconfig.json
├── vite.config.ts                      # Rolldown chunking & Tailwind v4
└── README.md
```

---

## 6. Setup & Installation Instructions

### Prerequisites
- **Node.js**: v18.0.0 or newer (Tested on Node.js v24 LTS)
- **NPM**: v9.0.0 or newer (or pnpm / yarn)

### 1. Clone or Open Workspace
```bash
cd c:/Users/LENOVO/Desktop/PT
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Run the Arithmetic & Calculation Test Suite
```bash
npm test
```
This runs the deterministic test suite verifying:
- Exact base prices and GST rates for all 8 required products.
- Line-item calculations with custom branding add-on prices.
- Multi-slab GST aggregation across 5%, 12%, and 18%.
- Safe clamping of negative or zero quantities.

### 5. Build for Production
```bash
npm run build
```
Generates an optimized, chunk-split production bundle inside the `dist/` directory.

### 6. Preview Production Build
```bash
npm run preview
```

---

## 7. Deployment Instructions

This application is 100% static and requires no server runtime or database, making it suitable for deployment to any edge CDN.

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Set build command to `npm run build` and output directory to `dist`.

### Netlify
1. Create a `netlify.toml` or connect your repository in Netlify dashboard.
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. In `vite.config.ts`, set `base: './'`.
2. Run `npm run build`.
3. Deploy the `dist` folder to your `gh-pages` branch.

---

## 8. Technical Decisions & Tradeoffs

1. **Zustand over Context API / Redux**:
   - *Decision*: Zustand was chosen for quote state because it offers zero-boilerplate, predictable selector subscriptions (preventing unnecessary re-renders of the 3D scene or catalogue grid when quantities update), and clean integration with browser storage.
2. **Pure Mathematical Engine Separation**:
   - *Decision*: Rather than computing taxes and subtotals inside React components, all formulas reside in `src/utils/calculations.ts`. This allows automated unit testing without mounting DOM components, ensures zero floating-point rounding errors via `Number.EPSILON`, and makes the business logic easy to audit during code review.
3. **Procedural Three.js Textures vs. External Heavy Assets**:
   - *Decision*: Instead of bundling heavy external 3D models (`.glb` / `.gltf`) or megabyte-sized photographic normal textures that cause slow mobile network loads, the 3D sculpture generates its normal weave pattern programmatically on a 128x128 in-memory canvas. This keeps the initial bundle lightweight and renders instantaneously.
4. **Resilient WebGL Fallback Architecture**:
   - *Decision*: 3D canvases can crash on low-powered mobile devices or when hardware acceleration is disabled. The application checks for WebGL availability on mount and monitors `prefers-reduced-motion`. If either condition is met or if a WebGL context creation error occurs, `<HeroFallback />` gracefully takes over with an editorial card featuring CSS-based mouse tilt.
5. **Tailwind CSS v4 with Custom Theme Variables**:
   - *Decision*: Tailwind v4 was selected for its native `@theme` integration with Vite, compiling directly without requiring legacy PostCSS configuration files while enforcing the exact `#F4F0E8`, `#171717`, `#C66B4E`, `#747C66`, and `#D9D5CE` brand palette.

---

## 9. AI Usage Disclosure

In compliance with challenge guidelines:
- **Design Conception & Drafting**: Modern generative AI was used to draft initial editorial layout ideas, assist in sourcing coherent color harmonies, and formulate realistic textile technical parameters (such as knit yarn counts and ASTM/AQL quality benchmarks).
- **Code Authoring & Refinement**: AI-assisted development tools were used to scaffold boilerplate components, format repetitive mock data structures, and draft TypeScript interfaces.
- **Human Curation & Verification**: Every mathematical calculation function, GST tax slab allocation, Zustand store action, PDF layout coordinate, responsive layout breakpoint, and Three.js shader parameter was reviewed, verified, tested, and fine-tuned for performance, accessibility, and zero-defect execution.

---

*Engineered with precision for the Superlabs Frontend Challenge &middot; Plum & Thread (Tiruppur, India).*
