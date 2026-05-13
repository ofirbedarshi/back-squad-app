import type { MetricFilter } from '../utils/search.types'

interface MetricFilterRowProps {
  label: string
  value: MetricFilter
  onChange: (v: MetricFilter) => void
}

// DOM order: עד → טווח → מדויק; dir="rtl" renders right-to-left so עד appears on the right, מדויק on the left
const modeOptions = [
  { label: 'עד', value: 'max' },
  { label: 'טווח', value: 'range' },
  { label: 'מדויק', value: 'exact' },
] as const

function MetricFilterRow({ label, value, onChange }: MetricFilterRowProps) {
  return (
    <div className="flex flex-col gap-1.5" dir="rtl">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-xs font-semibold text-neutral-500">{label}</span>
        <div className="flex flex-1 items-center justify-between">
          {modeOptions.map((option) => {
            const isActive = value.mode === option.value
            return (
              <label
                key={option.value}
                className={[
                  'flex items-center gap-1 text-xs font-semibold cursor-pointer select-none',
                  isActive ? 'text-blue-600' : 'text-neutral-400 active:text-neutral-600',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name={`${label}-metric-filter-mode`}
                  checked={isActive}
                  onChange={() => onChange({ ...value, mode: option.value })}
                  className="w-3 h-3 accent-blue-500 cursor-pointer"
                />
                {option.label}
              </label>
            )
          })}
        </div>
      </div>

      {value.mode === 'range' ? (
        <div className="flex gap-2 items-center" dir="rtl">
          <input
            type="number"
            value={value.min}
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            placeholder="מינימום"
            min={0}
            className="flex-1 min-w-0 py-2 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-800 text-right placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 transition-colors"
            dir="rtl"
          />
          <span className="text-neutral-400 text-sm shrink-0">—</span>
          <input
            type="number"
            value={value.max}
            onChange={(e) => onChange({ ...value, max: e.target.value })}
            placeholder="מקסימום"
            min={0}
            className="flex-1 min-w-0 py-2 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-800 text-right placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 transition-colors"
            dir="rtl"
          />
        </div>
      ) : value.mode === 'max' ? (
        <input
          type="number"
          value={value.max}
          onChange={(e) => onChange({ ...value, max: e.target.value })}
          placeholder="מקסימום"
          min={0}
          className="w-full py-2 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-800 text-right placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 transition-colors"
          dir="rtl"
        />
      ) : (
        <input
          type="number"
          value={value.exact}
          onChange={(e) => onChange({ ...value, exact: e.target.value })}
          placeholder="ערך מדויק"
          min={0}
          className="w-full py-2 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-800 text-right placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 transition-colors"
          dir="rtl"
        />
      )}
    </div>
  )
}

export default MetricFilterRow
