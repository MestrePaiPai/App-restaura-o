import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { requireBackoffice } from '@/lib/api-auth';

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireBackoffice(); if (unauthorized) return unauthorized;
  const payment = await prisma.paymentIntent.update({ where: { id: params.id }, data: { status: 'CONFIRMED', confirmedAt: new Date() }, include: { table: { include: { orders: { include: { items: true } }, payments: true } } } });
  const total = payment.table.orders.flatMap((o) => o.items).reduce((a, i) => a + i.qty * i.unitPriceCents, 0);
  const paid = payment.table.payments.filter((p) => p.status === 'CONFIRMED').reduce((a, p) => a + p.amountCents, 0);
  if (paid >= total) await prisma.table.update({ where: { id: payment.tableId }, data: { status: 'CLOSED', closedAt: new Date() } });
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request, ctx: { params: { id: string } }) { return PATCH(req, ctx); }
