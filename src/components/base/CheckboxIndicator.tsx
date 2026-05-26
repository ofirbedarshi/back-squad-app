interface CheckboxIndicatorProps {
  checked: boolean
}

function CheckboxIndicator({ checked }: CheckboxIndicatorProps) {
  return (
    <span
      className={[
        'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0',
        checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-neutral-300',
      ].join(' ')}
    >
      {checked && (
        <svg viewBox="0 0 12 10" fill="none" className="w-3.5 h-3.5">
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
  )
}

export default CheckboxIndicator
