interface StepperProps {
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
}

function Stepper({ value, min, max, step = 1, unit, onChange }: StepperProps) {
  const canDecrement = value > min
  const canIncrement = value < max

  return (
    <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-2xl px-2 py-2 shadow-sm">
      <button
        type="button"
        disabled={!canDecrement}
        onClick={() => canDecrement && onChange(value - step)}
        className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl font-bold text-blue-600 disabled:text-neutral-300 active:bg-blue-50 touch-manipulation select-none transition-colors"
        aria-label="הקטן ערך"
      >
        −
      </button>

      <span className="text-xl font-bold text-neutral-800 min-w-[3rem] text-center">
        {value}
        {unit ? <span className="text-sm font-medium text-neutral-500 mr-1">{unit}</span> : null}
      </span>

      <button
        type="button"
        disabled={!canIncrement}
        onClick={() => canIncrement && onChange(value + step)}
        className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl font-bold text-blue-600 disabled:text-neutral-300 active:bg-blue-50 touch-manipulation select-none transition-colors"
        aria-label="הגדל ערך"
      >
        +
      </button>
    </div>
  )
}

export default Stepper
