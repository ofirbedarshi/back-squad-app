type StepperProps =
  | {
      value: number
      values: readonly number[]
      unit?: string
      onChange: (value: number) => void
    }
  | {
      value: number
      min: number
      max: number
      step?: number
      unit?: string
      onChange: (value: number) => void
    }

function Stepper(props: StepperProps) {
  const { value, unit, onChange } = props

  const canDecrement =
    'values' in props
      ? props.values.indexOf(value) > 0
      : value > props.min
  const canIncrement =
    'values' in props
      ? props.values.indexOf(value) < props.values.length - 1
      : value < props.max

  const decrement = () => {
    if ('values' in props) {
      const index = props.values.indexOf(value)
      if (index > 0) onChange(props.values[index - 1])
      return
    }
    if (value > props.min) onChange(value - (props.step ?? 1))
  }

  const increment = () => {
    if ('values' in props) {
      const index = props.values.indexOf(value)
      if (index >= 0 && index < props.values.length - 1) onChange(props.values[index + 1])
      return
    }
    if (value < props.max) onChange(value + (props.step ?? 1))
  }

  return (
    <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-2xl px-2 py-2 shadow-sm">
      <button
        type="button"
        disabled={!canDecrement}
        onClick={() => canDecrement && decrement()}
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
        onClick={() => canIncrement && increment()}
        className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl font-bold text-blue-600 disabled:text-neutral-300 active:bg-blue-50 touch-manipulation select-none transition-colors"
        aria-label="הגדל ערך"
      >
        +
      </button>
    </div>
  )
}

export default Stepper
