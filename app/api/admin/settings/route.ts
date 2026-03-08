import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { requireBackoffice } from '@/lib/api-auth';

export async function POST(req: NextRequest) {
  const unauthorized = await requireBackoffice(); if (unauthorized) return unauthorized;
  const fd = await req.formData();
  await prisma.settings.upsert({
    where: { id: 'singleton' },
    update: { restaurantName: String(fd.get('restaurantName')), mbwayNumber: String(fd.get('mbwayNumber')), multibancoEntity: String(fd.get('multibancoEntity')) },
    create: { id: 'singleton', restaurantName: String(fd.get('restaurantName')), mbwayNumber: String(fd.get('mbwayNumber')), multibancoEntity: String(fd.get('multibancoEntity')) }
  });
  return NextResponse.redirect(new URL('/admin/settings', req.url));
}
