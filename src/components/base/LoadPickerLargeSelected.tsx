import type { ReactNode } from 'react'

interface LoadPickerLargeSelectedProps {
  displayName: string
  badge?: ReactNode
  onReplace: () => void
  onClear: () => void
}

/** Selected entity on one row (nadbar links step section cards). */
function LoadPickerLargeSelected({ displayName, badge, onReplace, onClear }: LoadPickerLargeSelectedProps) {
  return (
    <div className="contents">
      <span className="min-w-0 flex-1 truncate text-sm font-bold text-neutral-800">{displayName}</span>
      {badge ? <span className="shrink-0">{badge}</span> : null}
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={onReplace}
          className="min-h-10 rounded-lg bg-blue-600 px-2.5 py-2 text-xs font-semibold text-white active:bg-blue-700 touch-manipulation"
        >
          החלף
        </button>
        <button
          type="button"
          onClick={onClear}
          className="min-h-10 rounded-lg bg-blue-50 px-2.5 py-2 text-xs font-semibold text-blue-600 active:bg-blue-100 touch-manipulation"
        >
          נקה
        </button>
      </div>
    </div>
  )
}

export default LoadPickerLargeSelected
