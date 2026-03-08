'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return <main className="mx-auto mt-16 max-w-sm rounded bg-white p-6 shadow">
    <h1 className="text-xl font-bold">Login Backoffice</h1>
    <p className="mt-1 text-sm text-slate-600">Use conta Staff ou Admin.</p>

    <input className="mt-3 w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
    <input className="mt-2 w-full rounded border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
    <button className="mt-3 w-full rounded bg-black p-2 text-white" onClick={() => signIn('credentials', { email, password, callbackUrl: '/staff/orders' })}>Entrar</button>

    <div className="mt-4 rounded border bg-slate-50 p-3 text-xs text-slate-700">
      <p><b>Demo:</b> admin@rest.local / Admin123!</p>
      <p><b>Demo:</b> staff@rest.local / Staff123!</p>
    </div>
  </main>;
}
