interface ToggleOption {
  label: string
  value: string
}

interface MultiSelectSegmentedToggleProps {
  options: ToggleOption[]
  value?: string[]
  onChange: (value: string[]) => void
}

function MultiSelectSegmentedToggle({ options, value = [], onChange }: MultiSelectSegmentedToggleProps) {
  const selected = new Set(value)

  function handleOptionClick(optionValue: string): void {
    const next = new Set(selected)
    if (next.has(optionValue)) {
      next.delete(optionValue)
    } else {
      next.add(optionValue)
    }
    const ordered = options.map((opt) => opt.value).filter((v) => next.has(v))
    onChange(ordered)
  }

  return (
    <div className="flex w-full rounded-2xl border border-neutral-200 bg-neutral-100 p-1 gap-1">
      {options.map((option) => {
        const isActive = selected.has(option.value)
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionClick(option.value)}
            className={[
              'flex-1 rounded-xl py-3 text-base font-semibold transition-all touch-manipulation select-none',
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

export default MultiSelectSegmentedToggle
