import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { paymentSchema } from '@/lib/validation';
import { calculateTotals } from '@/lib/totals';
import { makeMbReference } from '@/lib/qr';

export async function POST(req: Request, { params }: { params: { token: string } }) {
  const table = await prisma.table.findUnique({ where: { token: params.token }, include: { orders: { include: { items: true } } } });
  if (!table) return NextResponse.json({ error: 'Mesa inválida' }, { status: 404 });
  const parsed = paymentSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const amountCents = calculateTotals(table.orders.flatMap((o) => o.items.map((i) => ({ qty: i.qty, unitPriceCents: i.unitPriceCents, vatRate: i.vatRate })))).total;
  const payment = await prisma.paymentIntent.create({ data: { tableId: table.id, method: parsed.data.method, customerPhone: parsed.data.customerPhone, amountCents, status: 'PENDING', reference: parsed.data.method === 'MULTIBANCO' ? makeMbReference() : null } });
  return NextResponse.json({ ok: true, payment });
}
