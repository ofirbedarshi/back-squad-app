import { useEffect, type ReactNode } from 'react'
import CheckboxIndicator from './CheckboxIndicator'

interface CheckboxWithFieldsProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  /** When true and checked is false, component calls onChange(true). */
  allInputsFilled: boolean
  highlightBorder?: boolean
  children: ReactNode
}

function CheckboxWithFields({
  label,
  checked,
  onChange,
  allInputsFilled,
  highlightBorder = false,
  children,
}: CheckboxWithFieldsProps) {
  useEffect(() => {
    if (allInputsFilled && !checked) {
      onChange(true)
    }
  }, [allInputsFilled, checked, onChange])

  return (
    <div
      className={`w-full rounded-2xl border ${
        highlightBorder
          ? 'border-red-400 bg-red-50'
          : 'border-neutral-200 bg-neutral-50'
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="w-full flex items-center gap-3 py-3.5 px-4 touch-manipulation select-none active:bg-neutral-100 transition-colors rounded-t-2xl"
      >
        <CheckboxIndicator checked={checked} />
        <span className="text-base text-neutral-800 text-right">{label}</span>
      </button>
      <div className="flex flex-col gap-3 pr-4 pl-12 pb-3">{children}</div>
    </div>
  )
}

export default CheckboxWithFields
