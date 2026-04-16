import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-slate-900">
          PrivateAI Studio
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/portfolio" className="hover:text-slate-900">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-slate-900">
            Contact
          </Link>
        </nav>
      </header>

      <section className="mt-16 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">Private LLM Engineering</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Deploy secure AI products that drive measurable business outcomes
        </h1>
        <p className="mt-4 text-lg text-slate-700">
          We help growth-focused teams launch private AI systems that reduce manual workload,
          increase conversion, and protect sensitive data.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/portfolio"
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Explore Portfolio
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Book Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}
