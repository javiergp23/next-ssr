import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
        <h1 className="text-6xl font-bold">Welcome to </h1>
        <h2 className="text-center font-bold">Project Api Next</h2>
        <section className="flex flex-col gap-4 sm:flex-row">
          <Link href='/login' className="rounded-full bg-black px-8 py-4 text-white mr-4 cursor-pointer transition-transform duration-300 hover:scale-105">Login</Link>
          <Link href='/register' className="rounded-full bg-black px-8 py-4 text-white mr-4 cursor-pointer transition-transform duration-300 hover:scale-105">Register</Link>
        </section>
      </main>
    </div>
  );
}
