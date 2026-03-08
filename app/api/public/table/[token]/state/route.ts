import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { calculateTotals } from '@/lib/totals';

export async function GET(_: Request, { params }: { params: { token: string } }) {
  const table = await prisma.table.findUnique({ where: { token: params.token }, include: { orders: { include: { items: true } }, payments: true } });
  if (!table) return NextResponse.json({ error: 'Mesa não encontrada' }, { status: 404 });
  const total = calculateTotals(table.orders.flatMap((o) => o.items.map((i) => ({ qty: i.qty, unitPriceCents: i.unitPriceCents, vatRate: i.vatRate })))).total;
  return NextResponse.json({ table, orders: table.orders, payments: table.payments, total });
}
