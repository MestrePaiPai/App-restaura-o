import { prisma } from '@/lib/prisma';
import { euros } from '@/lib/utils';

export default async function StaffPayments() {
  const payments = await prisma.paymentIntent.findMany({ include: { table: true }, orderBy: { createdAt: 'desc' } });
  return <main className="p-4"><h1 className="text-2xl font-bold">Pagamentos</h1>
    {payments.map((p) => <div key={p.id} className="mt-2 rounded border bg-white p-3">
      <p>Mesa {p.table.number} · {p.method} · {p.status} · {euros(p.amountCents)}</p>
      {p.status === 'PENDING' && <form action={`/api/staff/payments/${p.id}/confirm`} method="post"><button className="mt-2 rounded bg-emerald-700 px-2 py-1 text-white">Confirmar</button></form>}
    </div>)}
  </main>;
}
