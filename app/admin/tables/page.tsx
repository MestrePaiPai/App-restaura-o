import { prisma } from '@/lib/prisma';

export default async function AdminTables() {
  const tables = await prisma.table.findMany({ orderBy: { number: 'asc' } });
  return <main className="p-4"><h1 className="text-2xl font-bold">Mesas</h1>
    <form action="/api/admin/tables" method="post" className="mt-3 flex gap-2"><input name="number" className="rounded border p-2" placeholder="Número"/><button className="rounded bg-black px-3 text-white">Criar mesa</button></form>
    <a href="/api/admin/tables/qrs" className="mt-2 inline-block rounded border px-3 py-2">Imprimir QRs</a>
    {tables.map((t) => <p key={t.id} className="mt-2 rounded border bg-white p-2">Mesa {t.number} - {t.status} - /t/{t.token.slice(0,8)}...</p>)}
  </main>;
}
