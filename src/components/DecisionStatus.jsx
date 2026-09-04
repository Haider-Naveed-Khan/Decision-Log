export default function DecisionStatus({ value, compact = false }) {
  const isActive = value === 'active'

  return (
    <span data-testid="decision-status" className={`inline-flex items-center gap-2 font-mono uppercase tracking-[0.05em] ${
      isActive ? 'text-[#52658f]' : 'text-slate-500'
    } ${compact ? 'rounded-full bg-mist/60 px-2 py-1 text-[7px]' : 'text-[9px]'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-periwinkle' : 'bg-slate-400'}`} />
      {isActive ? 'Active' : 'Superseded'}
    </span>
  )
}
