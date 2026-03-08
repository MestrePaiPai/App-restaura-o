export type CalcItem = { qty: number; unitPriceCents: number; vatRate: number };

export function calculateTotals(items: CalcItem[]) {
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.unitPriceCents, 0);
  const vatBreakdown = items.reduce<Record<number, number>>((acc, item) => {
    const vatBase = item.qty * item.unitPriceCents;
    const vatAmount = Math.round((vatBase * item.vatRate) / (100 + item.vatRate));
    acc[item.vatRate] = (acc[item.vatRate] ?? 0) + vatAmount;
    return acc;
  }, {});
  return { subtotal, vatBreakdown, total: subtotal };
}
