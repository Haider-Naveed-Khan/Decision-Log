export default function Brand({ compact = false }) {
  return (
    <span className={`inline-flex items-center font-semibold tracking-[-0.02em] ${compact ? 'gap-2 text-[13px]' : 'gap-2.5 text-[15px]'}`}>
      <span className="relative inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] border-current" aria-hidden="true">
        <span className="absolute h-1.5 w-1.5 -translate-x-[3px] rounded-full bg-current" />
        <span className="absolute h-1.5 w-1.5 translate-x-[3px] rounded-full bg-current" />
      </span>
      <span>Decision Log</span>
    </span>
  )
}
