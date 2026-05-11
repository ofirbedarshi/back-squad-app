interface HitPenetrationSelectOption {
  label: string
  value: string
}

interface HitPenetrationSelectProps {
  label: string
  value: string | number
  options: HitPenetrationSelectOption[]
  onChange: (value: string) => void
}

function HitPenetrationSelect({ label, value, options, onChange }: HitPenetrationSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <select
        className="w-full py-3.5 px-4 rounded-2xl border border-neutral-200 bg-neutral-50 text-base text-neutral-800 outline-none shadow-sm focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default HitPenetrationSelect
