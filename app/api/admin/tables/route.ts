import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { requireBackoffice } from '@/lib/api-auth';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  const unauthorized = await requireBackoffice(); if (unauthorized) return unauthorized;
  const fd = await req.formData();
  await prisma.table.create({ data: { number: String(fd.get('number')), token: nanoid(32), status: 'OPEN' } });
  return NextResponse.redirect(new URL('/admin/tables', req.url));
}
