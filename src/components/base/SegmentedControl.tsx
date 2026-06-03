export interface SegmentedControlOption<T extends string> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string> {
  value: T
  options: readonly SegmentedControlOption<T>[]
  onChange: (value: T) => void
  ariaLabel: string
}

function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex rounded-xl border border-neutral-200 bg-neutral-100 p-1 gap-1"
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={[
              'flex-1 rounded-lg py-2.5 text-sm font-semibold touch-manipulation transition-colors',
              selected
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 active:bg-neutral-200/80',
            ].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedControl
