import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { orderSchema } from '@/lib/validation';

export async function POST(req: Request, { params }: { params: { token: string } }) {
  const table = await prisma.table.findUnique({ where: { token: params.token } });
  if (!table || table.status === 'CLOSED') return NextResponse.json({ error: 'Mesa indisponível' }, { status: 400 });
  const parsed = orderSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: parsed.data.items.map((i) => i.menuItemId) }, active: true } });
  const itemMap = new Map(menuItems.map((m) => [m.id, m]));

  const order = await prisma.order.create({
    data: {
      tableId: table.id,
      items: {
        create: parsed.data.items.map((i) => {
          const m = itemMap.get(i.menuItemId);
          if (!m) throw new Error('Menu item inválido');
          return { menuItemId: m.id, qty: i.qty, notes: i.notes, unitPriceCents: m.priceCents, vatRate: m.vatRate };
        })
      }
    }
  });
  return NextResponse.json({ ok: true, orderId: order.id });
}
