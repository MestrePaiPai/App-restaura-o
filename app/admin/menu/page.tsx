import { prisma } from '@/lib/prisma';
import { euros } from '@/lib/utils';

export default async function AdminMenu() {
  const categories = await prisma.menuCategory.findMany({ include: { items: true }, orderBy: { sortOrder: 'asc' } });
  return <main className="p-4">
    <h1 className="text-2xl font-bold">Admin - Menu</h1>
    <form action="/api/admin/menu/categories" method="post" className="mt-3 flex gap-2"><input name="name" className="rounded border p-2" placeholder="Nova categoria"/><button className="rounded bg-black px-3 text-white">Criar</button></form>
    {categories.map((c) => <div key={c.id} className="mt-4 rounded border bg-white p-3">
      <p className="font-semibold">{c.name}</p>
      {c.items.map((i) => <p key={i.id}>{i.name} - {euros(i.priceCents)} - IVA {i.vatRate}%</p>)}
      <form action="/api/admin/menu/items" method="post" className="mt-2 grid gap-2 md:grid-cols-5">
        <input type="hidden" name="categoryId" value={c.id}/><input name="name" placeholder="Item" className="rounded border p-2"/>
        <input name="description" placeholder="Descrição" className="rounded border p-2"/><input name="priceCents" placeholder="Preço cêntimos" className="rounded border p-2"/>
        <input name="vatRate" placeholder="IVA" className="rounded border p-2"/><button className="rounded bg-emerald-700 px-3 py-2 text-white">Adicionar</button>
      </form>
    </div>)}
  </main>;
}
