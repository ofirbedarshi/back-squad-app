interface ToggleOption {
  label: string
  value: string
}

interface SegmentedToggleProps {
  options: ToggleOption[]
  value?: string
  onChange: (value: string) => void
  /** When true, tapping active segment clears value (empty string). */
  allowDeselect?: boolean
}

function SegmentedToggle({
  options,
  value,
  onChange,
  allowDeselect = false,
}: SegmentedToggleProps) {
  const selectedValue = value?.trim() ? value : undefined

  function handleOptionClick(optionValue: string): void {
    if (allowDeselect && selectedValue !== undefined && optionValue === selectedValue) {
      onChange('')
      return
    }
    onChange(optionValue)
  }

  return (
    <div className="flex w-full rounded-2xl border border-neutral-200 bg-neutral-100 p-1 gap-1">
      {options.map((option) => {
        const isActive = selectedValue !== undefined && option.value === selectedValue
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionClick(option.value)}
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
