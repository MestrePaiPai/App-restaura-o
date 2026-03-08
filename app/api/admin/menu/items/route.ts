import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { requireBackoffice } from '@/lib/api-auth';

export async function POST(req: NextRequest) {
  const unauthorized = await requireBackoffice(); if (unauthorized) return unauthorized;
  const fd = await req.formData();
  await prisma.menuItem.create({ data: { categoryId: String(fd.get('categoryId')), name: String(fd.get('name')), description: String(fd.get('description')), priceCents: Number(fd.get('priceCents')), vatRate: Number(fd.get('vatRate')), active: true } });
  return NextResponse.redirect(new URL('/admin/menu', req.url));
}
