import { prisma } from '@/lib/prisma';

export default async function AdminUsers() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  return <main className="p-4"><h1 className="text-2xl font-bold">Utilizadores</h1>
    <form action="/api/admin/users" method="post" className="mt-3 grid max-w-2xl gap-2 md:grid-cols-4">
      <input name="name" className="rounded border p-2" placeholder="Nome"/><input name="email" className="rounded border p-2" placeholder="Email"/>
      <input name="password" className="rounded border p-2" placeholder="Password"/><select name="role" className="rounded border p-2"><option>STAFF</option><option>ADMIN</option></select>
      <button className="rounded bg-black px-3 py-2 text-white md:col-span-4">Criar utilizador</button>
    </form>
    {users.map((u) => <p key={u.id} className="mt-2 rounded border bg-white p-2">{u.name} - {u.email} - {u.role} - {u.active ? 'ativo' : 'inativo'}</p>)}
  </main>;
}
