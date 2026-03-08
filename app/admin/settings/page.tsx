import { prisma } from '@/lib/prisma';

export default async function AdminSettings() {
  const s = await prisma.settings.upsert({ where: { id: 'singleton' }, update: {}, create: { id: 'singleton' } });
  return <main className="p-4"><h1 className="text-2xl font-bold">Configurações</h1>
    <form action="/api/admin/settings" method="post" className="mt-3 grid max-w-xl gap-2">
      <input name="restaurantName" defaultValue={s.restaurantName} className="rounded border p-2"/>
      <input name="mbwayNumber" defaultValue={s.mbwayNumber} className="rounded border p-2"/>
      <input name="multibancoEntity" defaultValue={s.multibancoEntity} className="rounded border p-2"/>
      <button className="rounded bg-black px-3 py-2 text-white">Guardar</button>
    </form>
  </main>;
}
