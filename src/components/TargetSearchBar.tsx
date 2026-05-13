import { useState } from 'react'
import SearchInput from './base/SearchInput'
import MetricFilterRow from './MetricFilterRow'
import type { TargetAdvancedFilter } from '../utils/targetSearch.types'

interface TargetSearchBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  advancedFilter: TargetAdvancedFilter
  onAdvancedFilterChange: (filter: TargetAdvancedFilter) => void
}

function TargetSearchBar({
  searchQuery,
  onSearchQueryChange,
  advancedFilter,
  onAdvancedFilterChange,
}: TargetSearchBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="flex flex-col gap-1" dir="rtl">
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
        <span className={`inline-block transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {showAdvanced && (
        <div className="bg-white rounded-xl border border-neutral-200 p-3 flex flex-col gap-3" dir="rtl">
          <MetricFilterRow
            label="טווח (מטרים)"
            value={advancedFilter.range}
            onChange={(range) => onAdvancedFilterChange({ ...advancedFilter, range })}
          />
          <div className="border-t border-neutral-100" />
          <MetricFilterRow
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
