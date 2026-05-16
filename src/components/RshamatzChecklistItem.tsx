interface RshamatzChecklistItemProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function RshamatzChecklistItem({ label, checked, onChange }: RshamatzChecklistItemProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-center gap-3 py-1.5 touch-manipulation select-none"
    >
      <span
        className={[
          'w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors',
          checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-neutral-400',
        ].join(' ')}
        aria-hidden
      >
        {checked && (
          <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
            <path
              d="M1 5l3.5 3.5L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="flex-1 text-base text-neutral-800 text-right">{label}</span>
    </button>
  )
}

export default RshamatzChecklistItem
