import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Brand from '../components/Brand'
import DecisionFormModal from '../components/DecisionFormModal'
import DecisionStatus from '../components/DecisionStatus'
import { Back, Calendar, Check, ChevronRight, Close, Edit, Plus, Search } from '../components/Icons'
import { seedDecisions } from '../data/decisions'
import { formatDate } from '../utils/date'
import { navigate } from '../utils/navigation'

const filters = [
  ['all', 'All decisions'],
  ['active', 'Active'],
  ['superseded', 'Superseded'],
]

function DecisionDetail({ decision, mobileOpen, onClose, onEdit, onToggleStatus }) {
  if (!decision) return null

  return (
    <section
      className={`decision-detail min-w-0 flex-col bg-white lg:flex ${
        mobileOpen ? 'fixed inset-0 z-40 flex' : 'hidden'
      }`}
      aria-label="Selected decision details"
    >
      <div className="flex min-h-16 items-center justify-between border-b border-mist bg-canvas px-5 lg:hidden">
        <button className="inline-flex items-center gap-2 text-xs font-medium" type="button" onClick={onClose}>
          <Back size={17} /> All decisions
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-full border border-mist" type="button" onClick={onClose} aria-label="Close decision details">
          <Close />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:max-h-[530px] lg:px-10">
        <div className="flex items-center justify-between">
          <DecisionStatus value={decision.status} />
          <button className="inline-flex items-center gap-2 rounded-md border border-mist px-3 py-2 text-[11px] text-slate-600 transition hover:border-lavender hover:bg-mist/30" type="button" onClick={onEdit}>
            <Edit /> Edit
          </button>
        </div>

        <h2 className="mt-7 max-w-2xl font-display text-[34px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[42px]">
          {decision.title}
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-mist pb-6 font-mono text-[8px] uppercase tracking-wide text-slate-400">
          <span className="inline-flex items-center gap-2"><Calendar /> Decided {formatDate(decision.date)}</span>
          <span className="rounded-full bg-peach px-2.5 py-1 text-[#6b5b49]">{decision.area}</span>
        </div>

        <DetailSection label="The decision">
          <p className="font-display text-xl leading-8 text-ink">{decision.outcome}</p>
        </DetailSection>
        <DetailSection label="Why we chose this">
          <p className="text-[13px] leading-7 text-slate-600">{decision.rationale}</p>
        </DetailSection>

        {decision.status === 'superseded' && decision.supersededBy && (
          <div className="mt-6 rounded-lg border-l-2 border-periwinkle bg-mist/45 p-4">
            <span className="font-mono text-[8px] uppercase tracking-wider text-[#64729a]">What replaced it</span>
            <p className="mt-2 text-xs leading-6 text-slate-600">{decision.supersededBy}</p>
          </div>
        )}
      </div>

      <footer className="detail-footer flex min-h-24 items-center justify-between gap-4 border-t border-mist bg-mist/25 px-5 py-4 sm:px-8 lg:px-10">
        <div className="hidden sm:block">
          <strong className="block text-xs">{decision.status === 'active' ? 'Still guiding the team?' : 'Relevant again?'}</strong>
          <p className="mt-1 text-[10px] text-slate-500">Keep the log aligned with the team’s current direction.</p>
        </div>
        <button className="w-full rounded-md border border-lavender bg-white px-3 py-2.5 text-[10px] font-medium text-slate-600 transition hover:bg-mist/50 sm:w-auto" type="button" onClick={onToggleStatus}>
          {decision.status === 'active' ? 'Mark superseded' : 'Restore as active'}
        </button>
      </footer>
    </section>
  )
}

function DetailSection({ label, children }) {
  return (
    <div className="grid gap-3 border-b border-mist py-7 sm:grid-cols-[120px_1fr] sm:gap-6">
      <span className="pt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[#64729a]">{label}</span>
      {children}
    </div>
  )
}

export default function DemoPage() {
  const [decisions, setDecisions] = useState(seedDecisions)
  const [selectedId, setSelectedId] = useState(seedDecisions[0].id)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [formMode, setFormMode] = useState(null)
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const closeForm = useCallback(() => setFormMode(null), [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const counts = useMemo(() => ({
    all: decisions.length,
    active: decisions.filter((decision) => decision.status === 'active').length,
    superseded: decisions.filter((decision) => decision.status === 'superseded').length,
  }), [decisions])

  const filteredDecisions = useMemo(() => {
    const term = query.trim().toLowerCase()

    return decisions
      .filter((decision) => filter === 'all' || decision.status === filter)
      .filter((decision) => !term || [decision.title, decision.outcome, decision.rationale, decision.area]
        .some((value) => value.toLowerCase().includes(term)))
      .sort((first, second) => second.date.localeCompare(first.date))
  }, [decisions, filter, query])

  const selectedDecision = decisions.find((decision) => decision.id === selectedId) || decisions[0]

  const showToast = (message) => {
    window.clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = window.setTimeout(() => setToast(''), 3000)
  }

  const saveDecision = (values) => {
    if (formMode === 'new') {
      const newDecision = { ...values, id: `decision-${Date.now()}` }
      setDecisions((current) => [newDecision, ...current])
      setSelectedId(newDecision.id)
      setMobileDetailOpen(true)
      showToast('Decision added to the log')
    } else {
      setDecisions((current) => current.map((decision) => (
        decision.id === selectedDecision.id ? { ...values, id: decision.id } : decision
      )))
      showToast('Decision updated')
    }

    closeForm()
  }

  const toggleSelectedStatus = () => {
    const nextStatus = selectedDecision.status === 'active' ? 'superseded' : 'active'
    setDecisions((current) => current.map((decision) => (
      decision.id === selectedDecision.id
        ? { ...decision, status: nextStatus, supersededBy: nextStatus === 'active' ? '' : decision.supersededBy }
        : decision
    )))
    showToast(nextStatus === 'active' ? 'Decision restored to active' : 'Decision marked as superseded')
  }

  const resetView = () => {
    setFilter('all')
    setQuery('')
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <header className="grid h-16 grid-cols-[1fr_auto] items-center border-b border-mist bg-white px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-7">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault()
            navigate('/')
          }}
        >
          <Brand />
        </a>
        <div className="hidden items-center gap-3 text-xs font-medium sm:flex">
          <span className="text-slate-400">Workspace</span><i className="h-4 w-px bg-mist" />Northstar
        </div>
        <div className="flex items-center justify-self-end gap-3">
          <button className="hidden items-center gap-2 text-[11px] text-slate-500 hover:text-ink sm:inline-flex" type="button" onClick={() => navigate('/')}>
            <Back size={16} /> Back to site
          </button>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-[8px] text-white" aria-label="Demo profile">DL</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-4 py-9 sm:px-6 lg:py-12">
        <section className="mb-7 flex items-end justify-between gap-5">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#64729a]">Northstar / Product</span>
            <h1 className="mt-2 font-display text-[42px] font-medium leading-none tracking-[-0.035em]">Decisions</h1>
            <p className="mt-2 text-xs text-slate-500">The calls that shape what we build and how we move.</p>
          </div>
          <button className="new-decision-button inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-ink px-3.5 text-xs font-semibold text-white transition hover:bg-[#52658f]" type="button" onClick={() => setFormMode('new')} aria-label="New decision">
            <Plus size={17} /><span className="hidden sm:inline">New decision</span>
          </button>
        </section>

        <section className="grid min-h-[645px] overflow-hidden rounded-xl border border-lavender/70 bg-white shadow-[0_18px_55px_rgba(68,76,105,0.08)] lg:grid-cols-[180px_390px_minmax(0,1fr)]">
          <aside className="flex gap-1 overflow-x-auto border-b border-mist bg-mist/35 p-3 lg:block lg:border-b-0 lg:border-r lg:p-4" aria-label="Decision filters">
            <span className="mb-3 hidden px-2 font-mono text-[8px] uppercase tracking-wider text-slate-400 lg:block">View</span>
            {filters.map(([value, label]) => (
              <button
                className={`filter-button flex h-9 shrink-0 items-center justify-between gap-4 rounded-md px-3 text-[11px] transition lg:w-full ${
                  filter === value ? 'bg-white font-semibold text-ink shadow-sm' : 'text-slate-500 hover:bg-white/60 hover:text-ink'
                }`}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                key={value}
              >
                <span>{label}</span><span className="font-mono text-[8px] text-slate-400">{counts[value]}</span>
              </button>
            ))}
            <div className="mt-8 hidden border-t border-lavender/60 px-2 pt-4 lg:block">
              <span className="font-mono text-[7px] uppercase tracking-wider text-[#64729a]">Demo workspace</span>
              <p className="mt-2 text-[10px] leading-5 text-slate-500">Changes reset when you refresh.</p>
            </div>
          </aside>

          <section className="min-w-0 border-mist lg:border-r" aria-label="Decision list">
            <div className="flex h-14 items-center justify-between border-b border-mist px-4">
              <label className="flex min-w-0 flex-1 items-center gap-2 text-slate-400">
                <Search size={17} />
                <span className="sr-only">Search decisions</span>
                <input
                  className="w-full bg-transparent py-2 text-[11px] text-ink outline-none placeholder:text-slate-400"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search decisions"
                />
              </label>
              <span className="font-mono text-[7px] uppercase tracking-wider text-slate-400">{filteredDecisions.length} decisions</span>
            </div>

            <div className="max-h-[588px] overflow-y-auto">
              {filteredDecisions.length ? filteredDecisions.map((decision) => (
                <button
                  className={`decision-row grid min-h-[88px] w-full grid-cols-[8px_minmax(0,1fr)_auto_16px] items-center gap-2.5 border-b border-mist px-4 text-left transition hover:bg-peach/30 ${
                    selectedDecision?.id === decision.id ? 'border-l-2 border-l-periwinkle bg-peach/45' : ''
                  }`}
                  type="button"
                  onClick={() => {
                    setSelectedId(decision.id)
                    setMobileDetailOpen(true)
                  }}
                  aria-label={`Open decision: ${decision.title}`}
                  key={decision.id}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${decision.status === 'active' ? 'bg-periwinkle' : 'bg-slate-400'}`} />
                  <span className="min-w-0">
                    <strong className="block text-[12px] font-semibold leading-5">{decision.title}</strong>
                    <span className="mt-2 flex items-center gap-2 font-mono text-[7px] uppercase tracking-wide text-slate-400">
                      {decision.area}<i className="h-0.5 w-0.5 rounded-full bg-slate-400" />{formatDate(decision.date, true)}
                    </span>
                  </span>
                  <span className="hidden sm:inline-flex"><DecisionStatus value={decision.status} compact /></span>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
              )) : (
                <div className="px-6 py-24 text-center">
                  <span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-lavender font-mono text-slate-400">∅</span>
                  <h2 className="mt-4 font-display text-2xl">No decisions found</h2>
                  <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-slate-500">Try another term or return to the full decision log.</p>
                  <button className="mt-4 text-xs font-medium text-[#52658f] underline underline-offset-4" type="button" onClick={resetView}>Clear search and filters</button>
                </div>
              )}
            </div>
          </section>

          <DecisionDetail
            decision={selectedDecision}
            mobileOpen={mobileDetailOpen}
            onClose={() => setMobileDetailOpen(false)}
            onEdit={() => setFormMode('edit')}
            onToggleStatus={toggleSelectedStatus}
          />
        </section>
      </main>

      {formMode && (
        <DecisionFormModal
          decision={formMode === 'edit' ? selectedDecision : null}
          onClose={closeForm}
          onSave={saveDecision}
        />
      )}

      <div className={`fixed bottom-4 left-4 right-4 z-[60] flex min-h-11 items-center gap-2 rounded-md bg-ink px-4 text-xs text-white shadow-xl transition sm:left-auto sm:right-6 sm:w-auto ${toast ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`} role="status" aria-live="polite">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-lavender text-ink"><Check size={13} /></span>{toast}
      </div>
    </div>
  )
}
