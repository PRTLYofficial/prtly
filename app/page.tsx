import Link from 'next/link'

export default function Page(){
  return (
    <main className=\"min-h-screen px-6 py-14 max-w-5xl mx-auto\">
      <header className=\"flex items-center justify-between\">
        <div className=\"flex items-center gap-3\">
          <div className=\"h-8 w-8 rounded-lg bg-[--c1]\" />
          <h1 className=\"font-black text-2xl\">PRTLY</h1>
        </div>
        <nav className=\"text-sm opacity-80\">
          <Link className=\"mr-4 hover:opacity-100\" href=\"/tools/quotes\">Quotes Tool</Link>
          <a className=\"hover:opacity-100\" href=\"https://vercel.com\" target=\"_blank\">Deploy</a>
        </nav>
      </header>

      <section className=\"mt-16\">
        <h2 className=\"text-4xl md:text-6xl font-black leading-tight\">
          Stop Deepfakes. <span className=\"text-[--c1]\">Prove</span> What’s Real.
        </h2>
        <p className=\"mt-4 text-lg opacity-80 max-w-2xl\">
          This starter includes Tailwind and a demo tool that turns quotes into neon Instagram images.
          Use it as the base for your influencer SaaS or presale site.
        </p>
        <div className=\"mt-8 flex gap-4\">
          <Link href=\"/tools/quotes\" className=\"btn-neon\">Try Quotes Tool</Link>
          <a href=\"https://github.com/PRTLYofficial\" className=\"px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5\">GitHub</a>
        </div>
      </section>
    </main>
  )
}
