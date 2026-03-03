import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  if (!checkRateLimit(req.headers.get('x-forwarded-for') ?? 'anon')) return NextResponse.json({ error: 'rate limited' }, { status: 429 });
  const table = await prisma.table.findUnique({ where: { token: params.token } });
  if (!table || table.status === 'CLOSED') return NextResponse.json({ error: 'Mesa inválida/fechada' }, { status: 404 });
  const items = await prisma.menuItem.findMany({ where: { active: true, category: { active: true } }, include: { category: true }, orderBy: { name: 'asc' } });
  return NextResponse.json({ items });
}
