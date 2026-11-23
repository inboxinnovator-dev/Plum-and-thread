export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Quotation & Pricing' | 'Customization' | 'Production & Orders';
}

export const FAQS: FaqItem[] = [
  {
    id: 'quote-calculator',
    question: 'How does the quote calculator work?',
    category: 'Quotation & Pricing',
    answer: 'The Quote Studio is a real-time mathematical calculation engine that computes your production costs dynamically. As you select garment styles, configure sizes, choose fabric colors, specify quantities, and add custom branding treatments (such as screen printing or embroidery), the calculator computes taxable unit prices, line-item subtotals, applicable GST by tax slab, and the grand total with zero latency. Everything updates in live client-side memory without needing a server call.',
  },
  {
    id: 'gst-calculation',
    question: 'How is GST calculated?',
    category: 'Quotation & Pricing',
    answer: 'Under Indian Goods and Services Tax (GST) regulations for apparel and textiles, different product classifications carry specific statutory tax slabs. In our catalogue: standard apparel items (Round-neck tees, Polos, Hoodies, Track pants, Rompers, and Shorts) are taxed at 5% GST; Logo caps and structured headwear are classified at 12% GST; and technical Padded jackets are taxed at 18% GST. The quote calculator computes GST for each item based on its statutory rate and displays both the per-slab breakdown and the overall cumulative GST.',
  },
  {
    id: 'customization',
    question: 'Can I customize products?',
    category: 'Customization',
    answer: 'Yes, extensively. Beyond choosing sizes (XS through 3XL) and curated colorways, you can choose from a range of high-precision branding treatments: eco-friendly water-based screen printing, 3D high-density rubber puff print, multi-head Tajima embroidery, custom damask woven neck labels, and full retail merch packaging. In real commercial production, you can also supply custom Pantone color codes and custom tech pack measurements.',
  },
  {
    id: 'download-quotation',
    question: 'Can I download a quotation?',
    category: 'Quotation & Pricing',
    answer: 'Yes. The Quote Studio features an instant, client-side PDF generation engine powered by jsPDF. With a single click on "Generate Official PDF", the application compiles your configured items, detailed size/color/branding selections, itemized unit prices, HSN codes, GST breakdown, customer information, and factory terms into a crisp, editorial-grade quotation document ready to share with your finance team or leadership.',
  },
  {
    id: 'confirmed-order',
    question: 'Is the quote a confirmed order?',
    category: 'Production & Orders',
    answer: 'No. The generated document is an official estimated quotation and preliminary bill of materials (BOM). Actual production commences once your tech pack and vector artwork files are reviewed by our production team, a formal proforma invoice is acknowledged, and a physical pre-production counter-sample is approved by your brand.',
  },
  {
    id: 'contact-manufacturer',
    question: 'How can I contact the manufacturer?',
    category: 'Production & Orders',
    answer: 'You can reach Plum & Thread through our interactive Contact section on this page, or directly via email at production@plumandthread.com. Our primary manufacturing facility and sampling atelier are located at Textile Industrial Park, Tiruppur, Tamil Nadu 641604, India. For active inquiries with a generated quote number, referencing your quote ID (e.g., PT-2025-XXXX) will allow our technical merchandisers to instantly review your configuration.',
  },
];
