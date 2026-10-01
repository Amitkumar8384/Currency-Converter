function Home({ onStart }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-blue-500/10 text-xl text-blue-400">
            ⇄
          </div>

          <span className="text-lg font-bold">
            Currency<span className="text-blue-400">Flow</span>
          </span>
        </div>

        <button
          onClick={onStart}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
        >
          Open Converter
        </button>

      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 text-center">

        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-blue-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live Exchange Rates
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Convert currencies
            <br />

            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              in seconds.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            A simple and fast currency converter powered by
            live exchange rates.
          </p>

          <button
            onClick={onStart}
            className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-bold shadow-xl shadow-blue-600/20 transition hover:-translate-y-1"
          >
            Start Converting →
          </button>

        </div>

      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">

        <div className="grid gap-5 md:grid-cols-3">

          {/* Card 1 */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-xl">
              ⚡
            </div>

            <h2 className="text-lg font-bold">
              Live Rates
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Get up-to-date exchange rates for your conversions.
            </p>

          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-xl">
              🌍
            </div>

            <h2 className="text-lg font-bold">
              Global Currencies
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Search and select currencies from around the world.
            </p>

          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-xl">
              🔄
            </div>

            <h2 className="text-lg font-bold">
              Quick Swap
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Switch between currencies instantly with one click.
            </p>

          </div>

        </div>

      </section>

      {/* Simple CTA */}
      <section className="border-t border-white/10 px-6 py-16 text-center">

        <h2 className="text-3xl font-bold">
          Ready to convert?
        </h2>

        <button
          onClick={onStart}
          className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Open Converter
        </button>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6 text-center">
        <p className="text-xs text-slate-600">
          CurrencyFlow • Built with React & Tailwind CSS
        </p>
      </footer>

    </main>
  );
}

export default Home;