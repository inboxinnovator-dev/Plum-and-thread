export interface CaseScenario {
  id: string;
  clientType: string;
  clientName: string;
  location: string;
  projectScope: string;
  unitsProduced: string;
  challenge: string;
  solution: string;
  result: string;
  quoteExcerpt: string;
  authorTitle: string;
  tags: string[];
}

export const CASE_SCENARIOS: CaseScenario[] = [
  {
    id: 'case-1',
    clientType: 'Illustrative Scenario — D2C Streetwear Label',
    clientName: 'Atelier Kinesis',
    location: 'Bangalore, India',
    projectScope: 'Custom 380 GSM Heavyweight Hoodies & Pigment Dyed Tees',
    unitsProduced: '1,200 Units across 3 Drops',
    challenge: 'Needed a custom dropped-shoulder silhouette with heavyweight loop-knit fleece that held structural drape without shrinking or twisting post-wash.',
    solution: 'Engineered a bespoke 3-thread French terry yarn ratio with pre-shrunk enzyme bio-washing and 4-needle flatlock construction.',
    result: 'Zero dimensional distortion post-wash; initial release sold out within 48 hours with zero return requests due to fit issues.',
    quoteExcerpt: 'The fabric weight, needle density, and custom dyed ribbed collar gave our collection the exact sculptural drape we had spent 14 months searching for.',
    authorTitle: 'Creative Director (Demonstration Profile)',
    tags: ['Streetwear', 'Heavyweight Fleece', 'Custom Dyeing'],
  },
  {
    id: 'case-2',
    clientType: 'Illustrative Scenario — Enterprise Merchandise & Uniforms',
    clientName: 'Verve Technologies',
    location: 'Gurugram & Singapore',
    projectScope: 'Engineered Honeycomb Pique Polos & Weatherproof Padded Jackets',
    unitsProduced: '4,500 Units for Global Summit',
    challenge: 'Required unified Pantone color consistency across completely different fabric types (knitted pique polos vs. synthetic nylon ripstop jackets).',
    solution: 'Used digital spectrophotometer formulation to match corporate navy across both substrate groups, with Tajima micro-embroidery logos.',
    result: '100% on-time global fulfillment across 4 logistics hubs, meeting strict corporate compliance and zero visual color deviations.',
    quoteExcerpt: 'Matching corporate color tones across both cotton pique and technical outerwear jackets is notoriously difficult. Plum & Thread executed it flawlessly.',
    authorTitle: 'Head of Global Brand Experience (Demonstration Profile)',
    tags: ['Corporate Fleet', 'Polo & Outerwear', 'Multi-Hub Dispatch'],
  },
  {
    id: 'case-3',
    clientType: 'Illustrative Scenario — Organic Kids Lifestyle Brand',
    clientName: 'Little Nectar Organic',
    location: 'Mumbai, India',
    projectScope: 'GOTS-Certified Baby Rompers & Toddler Interlock Sets',
    unitsProduced: '2,800 Units Seasonal Launch',
    challenge: 'Ultra-strict hypoallergenic standards: zero synthetic chemical residues, nickel-free snap buttons, and completely non-abrasive interior flat seams.',
    solution: 'Utilized 100% long-staple organic cotton interlock knit, water-based baby-safe prints, and inverted seam construction around sensitive necklines.',
    result: 'Earned 100% GOTS compliance certification and zero skin irritation reports across rigorous dermatological trial batches.',
    quoteExcerpt: 'Finding a manufacturing partner in Tiruppur who treats babywear safety with the same scientific rigor as medical-grade textiles transformed our brand.',
    authorTitle: 'Founder & Head of Product (Demonstration Profile)',
    tags: ['Organic Babywear', 'GOTS Certified', 'Nickel-Free Snaps'],
  },
];
