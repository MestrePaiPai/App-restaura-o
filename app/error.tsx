'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto mt-10 max-w-2xl rounded border border-rose-200 bg-rose-50 p-6 text-rose-900">
      <h1 className="text-xl font-bold">Ocorreu um erro na aplicação</h1>
      <p className="mt-2 text-sm">{error.message}</p>
      <div className="mt-4 rounded bg-white p-3 text-sm">
        <p className="font-semibold">Passos recomendados</p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>Execute <code>npm install</code></li>
          <li>Execute <code>npm run prisma:generate</code></li>
          <li>Execute <code>npx prisma migrate dev --name init</code></li>
          <li>Execute <code>npm run prisma:seed</code></li>
          <li>Reinicie com <code>npm run dev</code></li>
        </ol>
      </div>
      <button onClick={reset} className="mt-4 rounded bg-black px-4 py-2 text-white">Tentar novamente</button>
    </main>
  );
}
