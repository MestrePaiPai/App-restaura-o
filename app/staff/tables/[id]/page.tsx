import { prisma } from '@/lib/prisma';
import { euros } from '@/lib/utils';
import { calculateTotals } from '@/lib/totals';

export default async function StaffTable({ params }: { params: { id: string } }) {
  const table = await prisma.table.findUnique({ where: { id: params.id }, include: { orders: { include: { items: true } }, payments: true } });
  if (!table) return <main className="p-4">Mesa não encontrada</main>;
  const total = calculateTotals(table.orders.flatMap((o) => o.items.map((i) => ({ qty: i.qty, unitPriceCents: i.unitPriceCents, vatRate: i.vatRate })))).total;
  return <main className="p-4"><h1 className="text-xl font-bold">Mesa {table.number}</h1><p>Total: {euros(total)}</p></main>;
}
