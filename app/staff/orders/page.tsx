import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function StaffOrders() {
  const orders = await prisma.order.findMany({ include: { table: true, items: true }, orderBy: { createdAt: 'asc' }, take: 100 });
  return <main className="p-4">
    <h1 className="text-2xl font-bold">Staff - Pedidos</h1>
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {orders.map((o) => <div key={o.id} className="rounded border bg-white p-3">
        <p className="font-semibold">Mesa {o.table.number} · {o.status}</p>
        <p>{o.items.length} itens</p>
        <form action={`/api/staff/orders/${o.id}`} method="post" className="mt-2 flex gap-2">
          <input name="status" defaultValue="PREPARING" className="rounded border px-2"/>
          <button className="rounded bg-black px-2 py-1 text-white">Atualizar</button>
        </form>
      </div>)}
    </div>
  </main>;
}
