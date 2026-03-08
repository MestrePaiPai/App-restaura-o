import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { requireBackoffice } from '@/lib/api-auth';

export async function POST(req: NextRequest) {
  const unauthorized = await requireBackoffice(); if (unauthorized) return unauthorized;
  const fd = await req.formData();
  const name = String(fd.get('name') ?? '').trim();
  if (!name) return NextResponse.json({ error: 'Nome obrigatório' }, { status: 400 });
  await prisma.menuCategory.create({ data: { name } });
  return NextResponse.redirect(new URL('/admin/menu', req.url));
}
