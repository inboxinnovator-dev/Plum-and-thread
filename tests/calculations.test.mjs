import { calculateLineItem, calculateQuoteTotals, roundCurrency, calculateUnitPrice } from '../src/utils/calculations.ts';
import { PRODUCTS, STANDARD_BRANDING_OPTIONS } from '../src/data/products.ts';

console.log('--- RUNNING PLUM & THREAD ARITHMETIC VERIFICATION SUITE ---');

// Test 1: Verify exact product prices and GST rates from prompt
const expectedProducts = [
  { name: 'Round-neck T-shirt', basePrice: 165, gstRate: 5 },
  { name: 'Polo T-shirt', basePrice: 235, gstRate: 5 },
  { name: 'Hoodie', basePrice: 480, gstRate: 5 },
  { name: 'Track pant', basePrice: 320, gstRate: 5 },
  { name: 'Padded jacket', basePrice: 2850, gstRate: 18 },
  { name: 'Logo cap', basePrice: 95, gstRate: 12 },
  { name: 'Kids romper', basePrice: 140, gstRate: 5 },
  { name: 'Shorts', basePrice: 150, gstRate: 5 },
];

let failures = 0;

expectedProducts.forEach((expected) => {
  const found = PRODUCTS.find((p) => p.name.toLowerCase() === expected.name.toLowerCase());
  if (!found) {
    console.error(`FAIL: Product "${expected.name}" not found in catalogue!`);
    failures++;
  } else {
    if (found.basePrice !== expected.basePrice) {
      console.error(`FAIL: Product "${expected.name}" expected basePrice ₹${expected.basePrice}, got ₹${found.basePrice}`);
      failures++;
    }
    if (found.gstRate !== expected.gstRate) {
      console.error(`FAIL: Product "${expected.name}" expected GST ${expected.gstRate}%, got ${found.gstRate}%`);
      failures++;
    }
  }
});

if (failures === 0) {
  console.log('✓ Test 1 Passed: All 8 required products have exact base prices and statutory GST rates.');
}

// Test 2: Line item arithmetic with custom branding add-on
const roundTee = PRODUCTS.find((p) => p.name === 'Round-neck T-shirt');
const screenPrint = STANDARD_BRANDING_OPTIONS.find((b) => b.id === 'screen-print'); // +₹25

const line1 = calculateLineItem(roundTee, screenPrint, 100);
if (
  line1.unitPrice === 190 &&
  line1.taxableSubtotal === 19000 &&
  line1.gstAmount === 950 &&
  line1.totalAmount === 19950
) {
  console.log('✓ Test 2 Passed: Line calculation matches exact mathematical requirements.');
} else {
  console.error('FAIL: Test 2 failed!');
  failures++;
}

// Test 3: Multi-tax slab aggregate calculation
const cap = PRODUCTS.find((p) => p.name === 'Logo cap'); // 95, 12% GST
const blank = STANDARD_BRANDING_OPTIONS.find((b) => b.id === 'blank'); // +0
const lineCap = calculateLineItem(cap, blank, 100);

const jacket = PRODUCTS.find((p) => p.name === 'Padded jacket'); // 2850, 18% GST
const lineJacket = calculateLineItem(jacket, blank, 20);

const mockItems = [
  {
    id: '1',
    product: roundTee,
    configuration: { size: 'M', color: { name: 'Black', hex: '#000' }, branding: screenPrint },
    quantity: 100,
    unitPrice: line1.unitPrice,
    taxableSubtotal: line1.taxableSubtotal,
    gstRate: line1.gstRate,
    gstAmount: line1.gstAmount,
    totalAmount: line1.totalAmount,
  },
  {
    id: '2',
    product: cap,
    configuration: { size: 'One Size', color: { name: 'Black', hex: '#000' }, branding: blank },
    quantity: 100,
    unitPrice: lineCap.unitPrice,
    taxableSubtotal: lineCap.taxableSubtotal,
    gstRate: lineCap.gstRate,
    gstAmount: lineCap.gstAmount,
    totalAmount: lineCap.totalAmount,
  },
  {
    id: '3',
    product: jacket,
    configuration: { size: 'L', color: { name: 'Black', hex: '#000' }, branding: blank },
    quantity: 20,
    unitPrice: lineJacket.unitPrice,
    taxableSubtotal: lineJacket.taxableSubtotal,
    gstRate: lineJacket.gstRate,
    gstAmount: lineJacket.gstAmount,
    totalAmount: lineJacket.totalAmount,
  },
];

const totals = calculateQuoteTotals(mockItems);
if (
  totals.subtotal === 85500 &&
  totals.totalGst === 12350 &&
  totals.grandTotal === 97850 &&
  totals.totalQuantity === 220 &&
  totals.gstBreakdown.length === 3
) {
  console.log('✓ Test 3 Passed: Multi-slab aggregate calculation accurate across 5%, 12%, and 18% slabs.');
} else {
  console.error('FAIL: Test 3 failed!');
  failures++;
}

// Test 4: Edge case: negative or 0 quantity prevention
const edgeLine = calculateLineItem(roundTee, blank, -5);
if (edgeLine.taxableSubtotal === 165 && edgeLine.gstAmount === 8.25) {
  console.log('✓ Test 4 Passed: Negative quantity automatically clamped safely to minimum 1 unit.');
} else {
  console.error('FAIL: Test 4 failed!');
  failures++;
}

if (failures > 0) {
  process.exit(1);
} else {
  console.log('====================================================');
  console.log('ALL TESTS PASSED SUCCESSFULLY (0 FAILURES)');
  console.log('====================================================');
}
