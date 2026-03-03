'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return <main className="mx-auto mt-20 max-w-sm rounded bg-white p-6 shadow">
    <h1 className="text-xl font-bold">Login Backoffice</h1>
    <input className="mt-3 w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
    <input className="mt-2 w-full rounded border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
    <button className="mt-3 w-full rounded bg-black p-2 text-white" onClick={() => signIn('credentials', { email, password, callbackUrl: '/staff/orders' })}>Entrar</button>
  </main>;
}
