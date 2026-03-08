import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { requireBackoffice } from '@/lib/api-auth';

export async function POST(req: NextRequest) {
  const unauthorized = await requireBackoffice(); if (unauthorized) return unauthorized;
  const fd = await req.formData();
  await prisma.user.create({ data: { name: String(fd.get('name')), email: String(fd.get('email')), passwordHash: await bcrypt.hash(String(fd.get('password')), 10), role: String(fd.get('role')) as any, active: true } });
  return NextResponse.redirect(new URL('/admin/users', req.url));
}
