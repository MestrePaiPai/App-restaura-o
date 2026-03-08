import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { requireBackoffice } from '@/lib/api-auth';
import { z } from 'zod';

const schema = z.object({ status: z.enum(['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'SERVED', 'CANCELLED']) });

async function parseStatus(req: NextRequest) {
  const ct = req.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) return schema.safeParse(await req.json());
  const fd = await req.formData();
  return schema.safeParse({ status: fd.get('status') });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireBackoffice(); if (unauthorized) return unauthorized;
  const parsed = await parseStatus(req);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const order = await prisma.order.update({ where: { id: params.id }, data: { status: parsed.data.status } });
  return NextResponse.json(order);
}

export async function POST(req: NextRequest, ctx: { params: { id: string } }) { return PATCH(req, ctx); }
