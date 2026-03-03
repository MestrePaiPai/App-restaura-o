'use client';

import { useEffect, useMemo, useState } from 'react';
import { euros } from '@/lib/utils';

type MenuItem = { id: string; name: string; description: string; priceCents: number; vatRate: number; category: { name: string } };

export default function TablePage({ params }: { params: { token: string } }) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [state, setState] = useState<any>(null);
  const [q, setQ] = useState('');
  const [cart, setCart] = useState<Record<string, { qty: number; notes?: string }>>({});

  const load = async () => {
    const [m, s] = await Promise.all([
      fetch(`/api/public/table/${params.token}/menu`).then((r) => r.json()),
      fetch(`/api/public/table/${params.token}/state`).then((r) => r.json())
    ]);
    setMenu(m.items ?? []);
    setState(s);
  };

  useEffect(() => { load(); const t = setInterval(load, 4000); return () => clearInterval(t); }, [params.token]);

  const filtered = useMemo(() => menu.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())), [menu, q]);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: { qty: (c[id]?.qty ?? 0) + 1, notes: c[id]?.notes } }));
  const total = filtered.reduce((acc, i) => acc + (cart[i.id]?.qty ?? 0) * i.priceCents, 0) + menu.filter(i=>!filtered.includes(i)).reduce((acc,i)=>acc + (cart[i.id]?.qty ?? 0)*i.priceCents,0);

  async function submitOrder() {
    const items = Object.entries(cart).filter(([, v]) => v.qty > 0).map(([menuItemId, v]) => ({ menuItemId, qty: v.qty, notes: v.notes }));
    if (!items.length) return;
    await fetch(`/api/public/table/${params.token}/orders`, { method: 'POST', body: JSON.stringify({ items }) });
    setCart({});
    await load();
  }

  async function requestPayment(method: string) {
    await fetch(`/api/public/table/${params.token}/payments`, { method: 'POST', body: JSON.stringify({ method }) });
    await load();
  }

  return <main className="mx-auto max-w-md p-4 pb-28">
    <h1 className="text-xl font-bold">Mesa {state?.table?.number ?? '...'}</h1>
    <input className="mt-3 w-full rounded border p-2" placeholder="Pesquisar..." value={q} onChange={(e) => setQ(e.target.value)} />
    <div className="mt-3 space-y-2">
      {filtered.map((item) => <div key={item.id} className="rounded border bg-white p-3">
        <p className="font-semibold">{item.name}</p><p className="text-sm text-slate-600">{item.description}</p>
        <p className="text-sm">{euros(item.priceCents)} (IVA {item.vatRate}%)</p>
        <button onClick={() => add(item.id)} className="mt-2 rounded bg-black px-2 py-1 text-white">Adicionar</button>
      </div>)}
    </div>
    <div className="mt-4 rounded border bg-white p-3">
      <p className="font-semibold">Pedidos</p>
      {state?.orders?.map((o: any) => <p key={o.id} className="text-sm">#{o.id.slice(-6)} - {o.status}</p>)}
      <p className="mt-2 text-sm">Conta atual: <b>{euros(state?.total ?? 0)}</b></p>
      <div className="mt-2 flex gap-2">
        <button className="rounded border px-2 py-1" onClick={() => requestPayment('CASH')}>Pedir conta (Dinheiro)</button>
        <button className="rounded border px-2 py-1" onClick={() => requestPayment('MBWAY')}>MBWay</button>
        <button className="rounded border px-2 py-1" onClick={() => requestPayment('MULTIBANCO')}>Multibanco</button>
      </div>
    </div>
    <button onClick={submitOrder} className="fixed bottom-4 left-4 right-4 rounded bg-emerald-600 p-3 text-white">Enviar pedido ({euros(total)})</button>
  </main>;
}
