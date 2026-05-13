import { useState } from 'react'
import SearchInput from './base/SearchInput'
import type { RangeFilter } from '../utils/search.types'
import type { TargetAdvancedFilter } from '../utils/targetSearch.types'

interface TargetSearchBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  advancedFilter: TargetAdvancedFilter
  onAdvancedFilterChange: (filter: TargetAdvancedFilter) => void
}

function MinMaxRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: RangeFilter
  onChange: (v: RangeFilter) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-neutral-500">{label}</span>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={value.min}
          onChange={(e) => onChange({ ...value, min: e.target.value })}
          placeholder="מינימום"
          min={0}
          className="flex-1 py-2 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 transition-colors"
          dir="ltr"
        />
        <span className="text-neutral-400 text-sm shrink-0">—</span>
        <input
          type="number"
          value={value.max}
          onChange={(e) => onChange({ ...value, max: e.target.value })}
          placeholder="מקסימום"
          min={0}
          className="flex-1 py-2 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 transition-colors"
          dir="ltr"
        />
      </div>
    </div>
  )
}

function TargetSearchBar({
  searchQuery,
  onSearchQueryChange,
  advancedFilter,
  onAdvancedFilterChange,
}: TargetSearchBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      <SearchInput
        value={searchQuery}
        onChange={onSearchQueryChange}
        placeholder="חפש לפי שם, מזרח או צפון..."
      />

      <button
        type="button"
        onClick={() => setShowAdvanced((prev) => !prev)}
        className="self-end text-xs text-blue-500 flex items-center gap-0.5 px-1 py-0.5 active:opacity-60 transition-opacity touch-manipulation select-none"
      >
        חיפוש מתקדם
        <span
          className={`inline-block transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      {showAdvanced && (
        <div className="bg-white rounded-xl border border-neutral-200 p-3 flex flex-col gap-3">
          <MinMaxRow
            label="טווח (מטרים)"
            value={advancedFilter.range}
            onChange={(range) => onAdvancedFilterChange({ ...advancedFilter, range })}
          />
          <div className="border-t border-neutral-100" />
          <MinMaxRow
            label="אזימוט (מעלות)"
            value={advancedFilter.azimuth}
            onChange={(azimuth) => onAdvancedFilterChange({ ...advancedFilter, azimuth })}
          />
        </div>
      )}
    </div>
  )
}

export default TargetSearchBar
