import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { qrDataUrl } from '@/lib/qr';

export async function GET(req: Request) {
  const host = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;
  const tables = await prisma.table.findMany({ orderBy: { number: 'asc' } });
  const rows = await Promise.all(tables.map(async (t) => `<div style='display:inline-block;margin:12px;text-align:center'><h3>Mesa ${t.number}</h3><img src='${await qrDataUrl(`${host}/t/${t.token}`)}' width='180' /></div>`));
  return new NextResponse(`<html><body>${rows.join('')}</body></html>`, { headers: { 'content-type': 'text/html' } });
}
