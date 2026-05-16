interface ToggleOption {
  label: string
  value: string
}

interface SegmentedToggleProps {
  options: ToggleOption[]
  value?: string
  onChange: (value: string) => void
}

function SegmentedToggle({ options, value, onChange }: SegmentedToggleProps) {
  const selectedValue = value?.trim() ? value : undefined

  return (
    <div className="flex w-full rounded-2xl border border-neutral-200 bg-neutral-100 p-1 gap-1">
      {options.map((option) => {
        const isActive = selectedValue !== undefined && option.value === selectedValue
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              'flex-1 py-3 rounded-xl text-base font-semibold transition-all touch-manipulation select-none',
              isActive
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-neutral-500 active:bg-neutral-200',
            ].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedToggle
