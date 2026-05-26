import CheckboxIndicator from './CheckboxIndicator'

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-center gap-3 py-3.5 px-4 rounded-2xl border border-neutral-200 bg-neutral-50 touch-manipulation select-none active:bg-neutral-100 transition-colors"
    >
      <CheckboxIndicator checked={checked} />
      <span className="text-base text-neutral-800 text-right">{label}</span>
    </button>
  )
}

export default Checkbox
