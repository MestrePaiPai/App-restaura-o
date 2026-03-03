import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Restaurante Demo</h1>
      <div className="mt-4 flex gap-3">
        <Link href="/login" className="rounded bg-black px-4 py-2 text-white">Backoffice</Link>
      </div>
    </main>
  );
}
