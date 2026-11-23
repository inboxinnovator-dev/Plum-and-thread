import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { QuoteItem, ClientDetails, QuoteTotals } from '../types/quote';
import { formatINR, formatDate } from './formatters';

interface GeneratePdfOptions {
  quoteNumber: string;
  items: QuoteItem[];
  totals: QuoteTotals;
  client: ClientDetails;
}

export function generateQuotePdf({
  quoteNumber,
  items,
  totals,
  client,
}: GeneratePdfOptions): void {
  // Create PDF instance (A4 format, millimeters)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  let cursorY = margin;

  // Palette constants
  const colorInk = [23, 23, 23] as [number, number, number];
  const colorCream = [244, 240, 232] as [number, number, number];
  const colorTerracotta = [198, 107, 78] as [number, number, number];
  const colorOlive = [116, 124, 102] as [number, number, number];
  const colorGrey = [140, 140, 140] as [number, number, number];
  const colorBorder = [220, 216, 208] as [number, number, number];

  // Header Background Bar (Subtle luxury tint)
  doc.setFillColor(...colorCream);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Top Terracotta Accent Stripe
  doc.setFillColor(...colorTerracotta);
  doc.rect(0, 0, pageWidth, 2.5, 'F');

  // Company Brand Mark
  cursorY = 16;
  doc.setTextColor(...colorInk);
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.text('PLUM & THREAD', margin, cursorY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colorOlive);
  doc.text('ATELIER & MILLS · TIRUPPUR, INDIA · PIN 641604', margin, cursorY + 5.5);
  doc.text('ESTIMATED PRODUCTION QUOTATION / BILL OF MATERIALS', margin, cursorY + 9.5);

  // Quote Metadata (Right aligned)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...colorInk);
  doc.text(`QUOTE NO: ${quoteNumber}`, pageWidth - margin, cursorY, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colorGrey);
  const today = formatDate();
  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + 30);
  const validUntil = formatDate(validUntilDate.toISOString());

  doc.text(`Date Issued: ${today}`, pageWidth - margin, cursorY + 5, { align: 'right' });
  doc.text(`Valid Through: ${validUntil} (30 Days)`, pageWidth - margin, cursorY + 9, { align: 'right' });

  // Divider Line
  cursorY = 46;
  doc.setDrawColor(...colorBorder);
  doc.setLineWidth(0.4);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);

  // Client Details & Factory Information Block
  cursorY = 53;
  const colWidth = (pageWidth - margin * 2) / 2;

  // Left Column: Client Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorTerracotta);
  doc.text('PREPARED FOR (CLIENT):', margin, cursorY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...colorInk);
  doc.text(client.companyName || client.name || 'Valued Brand Client', margin, cursorY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  const clientNameStr = client.name ? `Attn: ${client.name}` : '';
  const clientContactStr = [client.email, client.phone].filter(Boolean).join('  |  ');
  const clientLocationStr = [client.city, client.country].filter(Boolean).join(', ');

  let offset = 10;
  if (clientNameStr) {
    doc.text(clientNameStr, margin, cursorY + offset);
    offset += 4.5;
  }
  if (clientContactStr) {
    doc.text(clientContactStr, margin, cursorY + offset);
    offset += 4.5;
  }
  if (clientLocationStr) {
    doc.text(clientLocationStr, margin, cursorY + offset);
    offset += 4.5;
  }

  // Right Column: Manufacturer Specifications
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorOlive);
  doc.text('MANUFACTURING FACILITY:', margin + colWidth, cursorY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Plum & Thread Textile Hub Ltd.', margin + colWidth, cursorY + 5.5);
  doc.text('Survey No. 48/2, Textile Industrial Park, Tiruppur, TN', margin + colWidth, cursorY + 10);
  doc.text('GSTIN: 33AAECP1245Q1ZB | IEC: 0311094821', margin + colWidth, cursorY + 14.5);
  doc.text('Lead Time: 14-21 Business Days from approval', margin + colWidth, cursorY + 19);

  // Table of Products
  cursorY = cursorY + 28;

  const tableHead = [
    [
      'ITEM / SPECIFICATION',
      'DETAILS (SIZE / COLOR / BRANDING)',
      'HSN',
      'QTY',
      'UNIT (INR)',
      'SUBTOTAL',
      'GST %',
      'TOTAL (INR)',
    ],
  ];

  const tableBody = items.map((item) => {
    const details = [
      `Size: ${item.configuration.size}`,
      `Color: ${item.configuration.color.name}`,
      `Custom: ${item.configuration.branding.name}`,
    ].join('\n');

    return [
      item.product.name,
      details,
      item.product.hsnCode || '6109',
      item.quantity.toString(),
      formatINR(item.unitPrice, false),
      formatINR(item.taxableSubtotal, false),
      `${item.gstRate}%`,
      formatINR(item.totalAmount, false),
    ];
  });

  autoTable(doc, {
    startY: cursorY,
    head: tableHead,
    body: tableBody,
    theme: 'plain',
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: [30, 30, 30],
      lineColor: colorBorder,
      lineWidth: 0.2,
      font: 'helvetica',
    },
    headStyles: {
      fillColor: colorInk,
      textColor: [244, 240, 232],
      fontStyle: 'bold',
      fontSize: 7.5,
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: 38, fontStyle: 'bold' },
      1: { cellWidth: 50, fontSize: 7.5 },
      2: { cellWidth: 16, halign: 'center' },
      3: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 18, halign: 'right' },
      5: { cellWidth: 20, halign: 'right' },
      6: { cellWidth: 12, halign: 'center' },
      7: { cellWidth: 22, halign: 'right', fontStyle: 'bold' },
    },
    alternateRowStyles: {
      fillColor: [250, 248, 244],
    },
  });

  // Calculate position after table
  // @ts-expect-error jspdf-autotable augmentation
  const finalY = doc.lastAutoTable.finalY + 8;
  cursorY = finalY;

  // Check if we need to add a new page or have room for totals & disclaimers
  if (cursorY + 65 > pageHeight) {
    doc.addPage();
    cursorY = margin;
  }

  // Summary Totals Box (Right aligned)
  const summaryBoxWidth = 85;
  const summaryBoxX = pageWidth - margin - summaryBoxWidth;

  doc.setFillColor(...colorCream);
  doc.roundedRect(summaryBoxX, cursorY, summaryBoxWidth, 42, 2, 2, 'F');
  doc.setDrawColor(...colorBorder);
  doc.setLineWidth(0.3);
  doc.roundedRect(summaryBoxX, cursorY, summaryBoxWidth, 42, 2, 2, 'D');

  let sumY = cursorY + 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Total Units:', summaryBoxX + 6, sumY);
  doc.text(`${totals.totalQuantity} Units`, summaryBoxX + summaryBoxWidth - 6, sumY, { align: 'right' });

  sumY += 5.5;
  doc.text('Taxable Subtotal:', summaryBoxX + 6, sumY);
  doc.text(formatINR(totals.subtotal), summaryBoxX + summaryBoxWidth - 6, sumY, { align: 'right' });

  sumY += 5.5;
  doc.text('Total GST (5%, 12%, 18%):', summaryBoxX + 6, sumY);
  doc.text(formatINR(totals.totalGst), summaryBoxX + summaryBoxWidth - 6, sumY, { align: 'right' });

  sumY += 5;
  doc.setDrawColor(...colorTerracotta);
  doc.line(summaryBoxX + 6, sumY, summaryBoxX + summaryBoxWidth - 6, sumY);

  sumY += 6.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...colorTerracotta);
  doc.text('ESTIMATED TOTAL:', summaryBoxX + 6, sumY);
  doc.text(formatINR(totals.grandTotal), summaryBoxX + summaryBoxWidth - 6, sumY, { align: 'right' });

  sumY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...colorGrey);
  doc.text('(Inclusive of all statutory GST & packaging)', summaryBoxX + 6, sumY);

  // Left Column Notes / Terms
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...colorInk);
  doc.text('PRODUCTION TERMS & DISCLAIMERS:', margin, cursorY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(90, 90, 90);
  const terms = [
    '1. This document is an estimated manufacturing quotation based on requested specs.',
    '2. Sampling: Physical counter-sample dispatched in 5-7 business days upon tech pack receipt.',
    '3. Production lead time: 14-21 business days following pre-production sample sign-off.',
    '4. Packaging includes individual recyclable polybags, master carton packing, and barcoded labels.',
    '5. Freight / shipping charges are calculated separately at actuals based on delivery destination.',
  ];
  terms.forEach((t, idx) => {
    doc.text(t, margin, cursorY + 11 + idx * 4.2);
  });

  // Footer bar
  doc.setDrawColor(...colorBorder);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...colorGrey);
  doc.text(
    'Plum & Thread Atelier — Tiruppur, Tamil Nadu · production@plumandthread.com · +91 (421) 224-8900',
    margin,
    pageHeight - 9
  );
  doc.text('Generated via Plum & Thread Quote Studio', pageWidth - margin, pageHeight - 9, { align: 'right' });

  // Save the document
  const fileName = `Plum-and-Thread-Quotation-${quoteNumber}.pdf`;
  doc.save(fileName);
}
