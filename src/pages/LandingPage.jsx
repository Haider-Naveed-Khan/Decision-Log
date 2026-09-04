import Brand from '../components/Brand'
import { ArrowRight, ArrowUpRight, Check } from '../components/Icons'
import { navigate } from '../utils/navigation'

function DemoLink({ className = '', children }) {
  return (
    <a
      className={className}
      href="/demo"
      onClick={(event) => {
        event.preventDefault()
        navigate('/demo')
      }}
    >
      {children}
    </a>
  )
}

function SectionLabel({ children }) {
  return <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#64729a]">{children}</div>
}

function ProductPreview() {
  const decisions = [
    ['Launch free trial without a card', 'Growth · Sep 02', true],
    ['Build mobile web before native', 'Product · Aug 28', true],
    ['Replace weekly progress digests', 'Operations · Aug 11', false],
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-lavender/70 bg-white shadow-[0_24px_70px_rgba(68,76,105,0.14)]">
      <div className="flex h-14 items-center justify-between border-b border-mist px-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="h-4 w-4 rounded-full border border-ink bg-[linear-gradient(90deg,#8294C4_50%,transparent_50%)]" />
          Northstar / Product
        </div>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-[7px] text-white">MK</span>
      </div>

      <div className="grid min-h-[350px] grid-cols-[44%_56%] md:grid-cols-[130px_220px_1fr]">
        <aside className="hidden border-r border-mist bg-mist/40 p-4 md:block">
          <span className="font-mono text-[7px] tracking-[0.12em] text-slate-500">DECISIONS</span>
          <div className="mt-3 space-y-1 text-[9px]">
            <div className="flex justify-between rounded bg-lavender/40 px-2 py-2 font-semibold"><span>All decisions</span><span>12</span></div>
            <div className="flex justify-between px-2 py-2 text-slate-500"><span>Active</span><span>9</span></div>
            <div className="flex justify-between px-2 py-2 text-slate-500"><span>Superseded</span><span>3</span></div>
          </div>
        </aside>

        <div className="border-r border-mist">
          <div className="flex h-12 items-center justify-between border-b border-mist px-3 font-mono text-[7px] tracking-wider text-slate-500">
            <span>RECENT</span><span className="text-base text-ink">+</span>
          </div>
          {decisions.map(([title, meta, active], index) => (
            <div className={`grid min-h-[82px] grid-cols-[7px_1fr] gap-2 border-b border-mist px-3 py-4 ${index === 0 ? 'border-l-2 border-l-periwinkle bg-peach/45' : ''}`} key={title}>
              <span className={`mt-1 h-1.5 w-1.5 rounded-full ${active ? 'bg-periwinkle' : 'bg-slate-400'}`} />
              <div>
                <strong className="block text-[9px] font-semibold leading-4">{title}</strong>
                <small className="mt-2 block font-mono text-[6px] uppercase tracking-wide text-slate-400">{meta}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          <span className="inline-flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-wider text-[#64729a]">
            <span className="h-1.5 w-1.5 rounded-full bg-periwinkle" /> Active
          </span>
          <h3 className="mt-5 font-display text-xl leading-5 tracking-tight sm:text-2xl">Launch free trial without a card</h3>
          <div className="my-5 h-0.5 w-7 bg-periwinkle" />
          <span className="font-mono text-[7px] tracking-wider text-slate-400">THE DECISION</span>
          <p className="mt-2 text-[9px] leading-4">Let new workspaces start a 14-day trial without entering payment details.</p>
          <span className="mt-5 block font-mono text-[7px] tracking-wider text-slate-400">WHY WE CHOSE THIS</span>
          <p className="mt-2 text-[9px] leading-4 text-slate-500">We need a cleaner activation signal while the onboarding flow improves.</p>
        </div>
      </div>
    </div>
  )
}

const clarityItems = [
  ['01', 'The decision', 'A plain-language record of the call the team made.'],
  ['02', 'The reasoning', 'The evidence, constraints, and tradeoffs behind it.'],
  ['03', 'The date', 'The moment the direction became clear.'],
  ['04', 'The status', 'A quick signal showing whether it still guides the work.'],
]

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <header className="mx-auto flex h-[72px] max-w-7xl items-center justify-between border-b border-lavender/60 px-5 lg:px-8">
        <a href="#top" aria-label="Decision Log home"><Brand /></a>
        <nav className="hidden items-center gap-8 text-xs text-slate-600 sm:flex" aria-label="Main navigation">
          <a className="transition hover:text-ink" href="#product">Product</a>
          <a className="transition hover:text-ink" href="#how-it-works">How it works</a>
        </nav>
        <DemoLink className="inline-flex items-center gap-2 text-xs font-semibold hover:text-[#52658f]">
          Try Demo <ArrowUpRight size={15} />
        </DemoLink>
      </header>

      <main id="top">
        <section className="bg-peach/45">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-24">
            <div className="max-w-xl">
              <SectionLabel><span className="mr-2 inline-block h-2 w-2 rounded-full bg-periwinkle" />A home for important calls</SectionLabel>
              <h1 className="mt-6 max-w-[620px] font-display text-[48px] font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                Keep the reason behind every decision.
              </h1>
              <p className="mt-6 max-w-lg text-[16px] leading-7 text-slate-600">
                Decision Log keeps what your team decided, why it mattered, and whether it still stands—all in one clear record.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <DemoLink className="inline-flex min-h-12 items-center justify-center gap-4 rounded-md bg-ink px-5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#52658f]">
                  Try the live demo <ArrowRight size={17} />
                </DemoLink>
                <a className="text-xs font-medium text-slate-600 hover:text-ink" href="#how-it-works">See how it works ↓</a>
              </div>
              <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-500">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-periwinkle text-[#52658f]"><Check size={12} /></span>
                No signup. Start with a real workspace.
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex justify-between px-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#64729a]">
                <span>Workspace / Live view</span><span>01</span>
              </div>
              <ProductPreview />
            </div>
          </div>
        </section>

        <section className="border-y border-lavender/60 bg-mist/55">
          <div className="mx-auto grid max-w-7xl gap-3 px-5 py-7 text-center font-display text-xl text-slate-600 sm:grid-cols-3 sm:gap-0 lg:px-8 lg:text-2xl">
            <p>Plans change.</p>
            <p className="sm:border-x sm:border-lavender">People move on.</p>
            <p className="font-medium text-[#52658f]">The reasoning should not.</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-28" id="product">
          <div>
            <SectionLabel>01 / The problem</SectionLabel>
            <h2 className="mt-5 max-w-md font-display text-[40px] leading-[1.05] tracking-[-0.035em] sm:text-5xl">The answer survives. The context rarely does.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Important decisions disappear into calls, chat threads, and people’s memories. Months later, the same debate begins again.</p>
          </div>

          <div className="rounded-xl border border-lavender/70 bg-peach/50 p-5 sm:p-8">
            {[
              ['“Let’s use annual contracts for enterprise.”', 'Today · #pricing', 'bg-white'],
              ['“Was this about procurement or forecasting?”', '4 months later · #pricing', 'ml-auto bg-white/80 text-slate-600'],
              ['“Does anyone remember who made this call?”', '8 months later · #general', 'sm:ml-12 bg-white/50 text-slate-500 opacity-70'],
            ].map(([message, meta, style]) => (
              <div className={`mt-3 max-w-lg rounded-lg border border-mist p-4 first:mt-0 ${style}`} key={message}>
                <strong className="text-sm font-medium">{message}</strong>
                <span className="mt-2 block font-mono text-[8px] uppercase tracking-wider text-slate-400">{meta}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-ink py-20 text-white lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionLabel>02 / What stays clear</SectionLabel>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <h2 className="max-w-md font-display text-[40px] leading-none tracking-[-0.035em] sm:text-5xl">Four things. Always together.</h2>
                <p className="mt-5 max-w-sm text-sm leading-6 text-mist/75">Enough structure to preserve context. Not so much process that the team stops writing things down.</p>
              </div>
              <div className="border-t border-lavender/35">
                {clarityItems.map(([number, title, description]) => (
                  <div className="grid gap-2 border-b border-lavender/35 py-5 sm:grid-cols-[45px_0.7fr_1fr] sm:items-start" key={title}>
                    <span className="font-mono text-[9px] text-lavender">{number}</span>
                    <h3 className="font-display text-2xl">{title}</h3>
                    <p className="text-xs leading-6 text-mist/70">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" id="how-it-works">
          <SectionLabel>03 / How it works</SectionLabel>
          <h2 className="mt-5 max-w-xl font-display text-[40px] leading-none tracking-[-0.035em] sm:text-5xl">Write it once. Move forward together.</h2>
          <div className="mt-12 grid border-y border-lavender/70 md:grid-cols-3">
            {[
              ['01', 'Record the call', 'Capture the outcome while the tradeoffs are still fresh.'],
              ['02', 'Share the context', 'Give everyone the same clear explanation of what moved the decision.'],
              ['03', 'Keep it current', 'Supersede old calls without erasing the path that got you here.'],
            ].map(([number, title, description], index) => (
              <article className={`py-7 md:min-h-64 md:px-7 md:py-8 ${index > 0 ? 'border-t border-lavender/70 md:border-l md:border-t-0' : ''}`} key={title}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-periwinkle font-mono text-[9px] text-white">{number}</span>
                <h3 className="mt-12 font-display text-2xl">{title}</h3>
                <p className="mt-2 max-w-xs text-xs leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-peach">
          <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 py-20 md:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
            <div>
              <SectionLabel>Make the next call count</SectionLabel>
              <h2 className="mt-5 font-display text-[48px] leading-none tracking-[-0.04em] sm:text-6xl">Decide. Record. Move.</h2>
            </div>
            <div>
              <p className="mb-6 text-sm leading-6 text-slate-600">Your decisions already shape the work. Give their reasoning somewhere to live.</p>
              <DemoLink className="inline-flex min-h-12 w-full items-center justify-between rounded-md bg-ink px-5 text-xs font-semibold text-white transition hover:bg-[#52658f] sm:w-56">
                Open the demo <ArrowUpRight size={17} />
              </DemoLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-lavender/60 bg-canvas">
        <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" aria-label="Decision Log home"><Brand compact /></a>
          <p className="hidden font-mono text-[8px] uppercase tracking-wider text-slate-400 sm:block">Clear decisions. Better momentum.</p>
          <DemoLink className="text-xs text-slate-600 hover:text-ink">Open demo</DemoLink>
        </div>
      </footer>
    </div>
  )
}
