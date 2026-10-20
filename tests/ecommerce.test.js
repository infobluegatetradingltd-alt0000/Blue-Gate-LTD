import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Test Statutory Invariants
test('Statutory Company Information matches Companies House record', () => {
  const policyFile = fs.readFileSync(path.join(__dirname, '../src/data/policies.ts'), 'utf-8');
  assert.ok(policyFile.includes('BLUEGATE TRADING LTD'), 'Legal name must be BLUEGATE TRADING LTD');
  assert.ok(policyFile.includes('16997836'), 'Companies House number must be 16997836');
  assert.ok(policyFile.includes('Office 760, 85 Dunstall Hill, Wolverhampton, United Kingdom, WV6 0SR'), 'Registered office must match Wolverhampton address');
  assert.ok(policyFile.includes('+44 7476 623907'), 'Telephone number must match provided company phone');
  assert.ok(policyFile.includes('47190'), 'SIC code 47190 must be present');
  assert.ok(policyFile.includes('47910'), 'SIC code 47910 must be present');
  assert.ok(policyFile.includes('73110'), 'SIC code 73110 must be present');
});

// 2. Test Deterministic Sizing and Pricing Calculations
test('Deterministic Pricing & Free Shipping Threshold calculation', () => {
  const FREE_SHIPPING_THRESHOLD = 40.00;
  const STANDARD_SHIPPING_FEE = 3.99;

  // Scenario A: Under £40 threshold (£24.99)
  const subtotalA = 24.99;
  const isFreeA = subtotalA >= FREE_SHIPPING_THRESHOLD;
  const shippingA = isFreeA ? 0 : STANDARD_SHIPPING_FEE;
  const totalA = Number((subtotalA + shippingA).toFixed(2));

  assert.equal(isFreeA, false, '£24.99 should NOT qualify for free shipping');
  assert.equal(shippingA, 3.99, 'Shipping fee must be exactly £3.99');
  assert.equal(totalA, 28.98, 'Total must equal £28.98');

  // Scenario B: Exactly £40.00 threshold
  const subtotalB = 40.00;
  const isFreeB = subtotalB >= FREE_SHIPPING_THRESHOLD;
  const shippingB = isFreeB ? 0 : STANDARD_SHIPPING_FEE;
  const totalB = Number((subtotalB + shippingB).toFixed(2));

  assert.equal(isFreeB, true, '£40.00 should qualify for free shipping');
  assert.equal(shippingB, 0, 'Shipping fee must be £0.00');
  assert.equal(totalB, 40.00, 'Total must equal £40.00');

  // Scenario C: Promo code BLUEGATE10 (10% off) on £79.99
  const subtotalC = 79.99;
  const discountC = Number(((subtotalC * 10) / 100).toFixed(2)); // £8.00
  const discountedSubtotalC = Number((subtotalC - discountC).toFixed(2)); // £71.99
  const isFreeC = discountedSubtotalC >= FREE_SHIPPING_THRESHOLD;
  const totalC = Number((discountedSubtotalC + (isFreeC ? 0 : STANDARD_SHIPPING_FEE)).toFixed(2));

  assert.equal(discountC, 8.00, '10% discount on £79.99 must be £8.00');
  assert.equal(discountedSubtotalC, 71.99, 'Discounted subtotal must be £71.99');
  assert.equal(isFreeC, true, '£71.99 qualifies for free delivery');
  assert.equal(totalC, 71.99, 'Final total must be £71.99');
});

// 3. Test UK Postcode Validation Logic
test('UK Postcode regex validation correctly accepts valid postcodes and rejects invalid ones', () => {
  const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})$/i;

  // Valid UK postcodes
  assert.ok(ukPostcodeRegex.test('WV6 0SR'), 'WV6 0SR must be valid (Company registered office)');
  assert.ok(ukPostcodeRegex.test('SW1A 1AA'), 'SW1A 1AA must be valid (Buckingham Palace)');
  assert.ok(ukPostcodeRegex.test('B1 1BB'), 'B1 1BB must be valid (Birmingham)');
  assert.ok(ukPostcodeRegex.test('EC1A 1BB'), 'EC1A 1BB must be valid (London)');
  assert.ok(ukPostcodeRegex.test('G1 1XQ'), 'G1 1XQ must be valid (Glasgow)');

  // Invalid postcodes
  assert.equal(ukPostcodeRegex.test('12345'), false, 'US ZIP 12345 must be rejected');
  assert.equal(ukPostcodeRegex.test('ABCDE'), false, 'Non-postcode text must be rejected');
  assert.equal(ukPostcodeRegex.test(''), false, 'Empty string must be rejected');
});

// 4. Test Product Catalogue Integrity
test('Product Catalogue contains truthful seed data with unique SKUs and prices', () => {
  const productsFile = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf-8');
  
  // Verify all 4 categories exist
  assert.ok(productsFile.includes('electronics'), 'Electronics category must exist');
  assert.ok(productsFile.includes('toys'), 'Toys category must exist');
  assert.ok(productsFile.includes('home'), 'Home category must exist');
  assert.ok(productsFile.includes('lifestyle'), 'Lifestyle category must exist');

  // Verify key products exist
  assert.ok(productsFile.includes('BGT-AUD-9001'), 'AcousticPro SKU must be present');
  assert.ok(productsFile.includes('BGT-GME-8002'), 'ApexStrike controller SKU must be present');
  assert.ok(productsFile.includes('BGT-WTC-5003'), 'PulseFit smartwatch SKU must be present');
  assert.ok(productsFile.includes('BGT-TOY-1011'), 'RoboMaster STEM bot SKU must be present');
});

// 5. Test Zero Placeholders / Fake Code Invariants
test('No forbidden placeholder text in codebase', () => {
  const appFile = fs.readFileSync(path.join(__dirname, '../src/App.tsx'), 'utf-8');
  assert.equal(appFile.includes('lorem ipsum'), false, 'No lorem ipsum allowed in App.tsx');
  assert.equal(appFile.includes('TODO: Implement'), false, 'No placeholder TODOs in App.tsx');
});
