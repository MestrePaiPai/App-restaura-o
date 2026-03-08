import { describe, expect, it } from 'vitest';
import { calculateTotals } from '@/lib/totals';

describe('calculateTotals', () => {
  it('soma total e IVA', () => {
    const result = calculateTotals([
      { qty: 2, unitPriceCents: 1000, vatRate: 13 },
      { qty: 1, unitPriceCents: 500, vatRate: 23 }
    ]);
    expect(result.total).toBe(2500);
    expect(result.vatBreakdown[13]).toBeGreaterThan(0);
    expect(result.vatBreakdown[23]).toBeGreaterThan(0);
  });
});
