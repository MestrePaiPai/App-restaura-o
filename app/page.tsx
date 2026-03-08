import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">Restaurante Demo</h1>
      <p className="mt-2 text-slate-600">
        Bem-vindo! Esta app tem 2 áreas: <b>Cliente (mesa QR)</b> e <b>Backoffice (staff/admin)</b>.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-xl font-semibold">1) Área Cliente</h2>
          <p className="mt-2 text-sm text-slate-600">
            Para entrar como cliente use um URL de mesa com token: <code>/t/&lt;token&gt;</code>.
          </p>
          <p className="mt-2 rounded border border-amber-200 bg-amber-50 p-2 text-sm text-amber-700">
            Dica: obtenha tokens em <b>Admin → Mesas</b> (depois do login e seed da base de dados).
          </p>
        </section>

        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-xl font-semibold">2) Backoffice</h2>
          <p className="mt-2 text-sm text-slate-600">
            Staff/Admin fazem login para gerir pedidos, pagamentos, menu, mesas e utilizadores.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/login" className="rounded bg-black px-4 py-2 text-sm text-white">Entrar</Link>
            <Link href="/staff/orders" className="rounded border px-4 py-2 text-sm">Pedidos</Link>
            <Link href="/admin/menu" className="rounded border px-4 py-2 text-sm">Admin Menu</Link>
          </div>
          <div className="mt-4 rounded border bg-slate-50 p-3 text-sm">
            <p><b>Credenciais demo</b></p>
            <p>Admin: admin@rest.local / Admin123!</p>
            <p>Staff: staff@rest.local / Staff123!</p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <p className="font-semibold">Nota sobre PWA no terminal</p>
        <p className="mt-1">
          A mensagem <code>[PWA] PWA support is disabled</code> é normal em <b>modo dev</b>.
          Em produção (<code>npm run build && npm run start</code>) a PWA fica ativa.
        </p>
      </section>
    </main>
  );
}
