export interface ManufacturingStage {
  id: number;
  stageNumber: string;
  name: string;
  lead: string;
  description: string;
  technicalHighlights: string[];
  equipment: string;
  qualityCheck: string;
  image: string;
}

export const MANUFACTURING_STAGES: ManufacturingStage[] = [
  {
    id: 1,
    stageNumber: '01',
    name: 'Fabric Sourcing & Yarn Spin',
    lead: 'Certified organic fibers & high-gauge knit precision',
    description: 'We source long-staple Indian combed cotton, GOTS-certified organic cotton, and specialized bamboo-modal blends directly from sustainable mills across Tamil Nadu. Yarns undergo ring-spinning and compact combing to eradicate fly fibers and maximize tensile longevity.',
    technicalHighlights: [
      'Raw fiber testing: micronaire, length, and tensile strength',
      'Circular knitting machines (24 to 32 gauge) for ultra-dense hand feel',
      'Pre-bleaching & low-temperature reactive dyeing with AZO-free pigments',
    ],
    equipment: 'Mayer & Cie Circular Knitting Units & Fongs Eco Dyeing Vessels',
    qualityCheck: 'Spectrophotometer color matching (Delta E < 0.5) & 4-Point Fabric Inspection',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    stageNumber: '02',
    name: 'CAD Modeling & Laser Cutting',
    lead: 'Computerized nesting to minimize textile scrap under 4%',
    description: 'Tech packs are imported into computerized pattern grading systems. Gerber automated spreading tables lay fabric plies with zero tension, allowing CNC oscillating knife and laser systems to cut complex profiles with sub-millimeter repeatability.',
    technicalHighlights: [
      'Digital grainline alignment prevents garment twisting during wear',
      'Automated vacuum hold-down table prevents ply shifting',
      'Barcoded bundle tagging traces every panel back to the source fabric roll',
    ],
    equipment: 'Gerber Paragon Multi-Ply Cutter & Lectra CAD Nesting Suite',
    qualityCheck: 'Random ply-to-pattern caliper measurement (tolerance +/- 1.0mm)',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    stageNumber: '03',
    name: 'Artisanal & Industrial Stitching',
    lead: 'Modular line assembly staffed by master machinists in Tiruppur',
    description: 'Panels progress through specialized assembly cells. We employ differential feeding, high-speed overlock, flatlock seamers for activewear, and twin-needle lockstitch machines. Seams are calibrated for exact stitch density (12-14 stitches per inch).',
    technicalHighlights: [
      'Flatlock 4-needle 6-thread joining for zero skin abrasion',
      'Lycra-reinforced collar setting prevents neck stretching',
      'Bar-tack reinforcement at high-stress split hems and pocket corners',
    ],
    equipment: 'Juki Industrial Lockstitch & Pegasus 4-Needle Flatlock Systems',
    qualityCheck: 'Inline seam tension checks & 12 SPI counter gauge verification',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    stageNumber: '04',
    name: 'Stringent Quality Control',
    lead: 'AQL 2.5 standard audit across 100% of finished garments',
    description: 'Every finished unit undergoes comprehensive physical and structural scrutiny. We evaluate dimensional stability post-wash, colorfastness against sweat and friction, seam pull strength, and perform a full needle-detection sweep before clearance.',
    technicalHighlights: [
      'Washing chamber test for dimensional shrinkage (< 3% threshold)',
      'Bursting strength & seam slippage resistance verification',
      'Conveyorized multi-aperture metal and needle detector scan',
    ],
    equipment: 'Hashima High-Sensitivity Needle Detector & James Heal Crockmeter',
    qualityCheck: '100% measurement audit against approved Tech Pack spec sheet',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    stageNumber: '05',
    name: 'Finishing & Eco Packaging',
    lead: 'Industrial steam tunnel pressing & customized presentation',
    description: 'Garments pass through tensioned steam forms to relax fibers and produce a pristine editorial finish. Custom woven brand tags, wash care labels, and FSC-certified kraft hangtags are affixed before individual wrapping in compostable cornstarch polybags.',
    technicalHighlights: [
      'Rotary steam pressing leaves no heat shine or seam compression marks',
      'FSC-certified recycled paper swing tickets & soy-ink barcoding',
      'Custom brand boxing with silica desiccants for transit humidity protection',
    ],
    equipment: 'Veit Industrial Steam Ironing Systems & Automated Polybag Baggers',
    qualityCheck: 'Barcode scan verification matching batch manifest SKU data',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    stageNumber: '06',
    name: 'Global Dispatch & Logistics',
    lead: 'Air & sea freight departures straight from Tiruppur to world ports',
    description: 'Cartons are palletized, moisture-wrapped, and dispatched with tamper-evident RFID seals. We coordinate customs documentation, COO certificates, and priority logistics with global carriers for seamless port-to-door delivery.',
    technicalHighlights: [
      'Direct customs clearance documentation (Certificate of Origin & Form A)',
      'Real-time shipment GPS tracking and multi-node status telemetry',
      'Split-shipment fulfillment directly to global warehouses or 3PL facilities',
    ],
    equipment: 'Automated Pallet Wrapping & RFID Warehouse Dispatch Gateway',
    qualityCheck: 'Gross weight verification & carton drop-test compliance check',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
  },
];

export const MANUFACTURING_PILLARS = [
  {
    title: 'Precision Knits & Wovens',
    metric: '180–380 GSM',
    metricLabel: 'Knit Range',
    description: 'Circular knit jersey, heavy loopback French terry, honeycomb pique, and technical nylon shells engineered for distinct silhouettes.',
    demonstrationNote: 'Sample yarn weights verified against standard textile gauges',
  },
  {
    title: 'Custom Brand Embellishment',
    metric: '6 Methods',
    metricLabel: 'Branding Suites',
    description: 'Automated 12-color screen printing carousels, Tajima embroidery heads, 3D high-density silicone prints, and custom damask woven labels.',
    demonstrationNote: 'Demonstration capability matrix based on modern mill infrastructure',
  },
  {
    title: 'Scalable Bulk Production',
    metric: '150,000+',
    metricLabel: 'Monthly Output Capacity',
    description: 'Modular production lines configured for agile small-batch sampling (from 25 units) to high-volume commercial runs without quality degradation.',
    demonstrationNote: 'Illustrative monthly throughput for multi-line mill demonstration',
  },
  {
    title: 'Zero Defect Quality Standard',
    metric: 'AQL 2.5',
    metricLabel: 'Defect Acceptance Limit',
    description: 'Dual-phase inline checks, 4-point fabric inspection, calibrated shrinkage testing, and mandatory conveyorized needle detection.',
    demonstrationNote: 'Standard international garment export quality protocol',
  },
];
