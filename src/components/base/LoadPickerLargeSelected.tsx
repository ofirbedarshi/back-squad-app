import type { ReactNode } from 'react'

interface LoadPickerLargeSelectedProps {
  displayName: string
  badge?: ReactNode
  onReplace: () => void
  onClear: () => void
}

function LoadPickerLargeSelected({ displayName, badge, onReplace, onClear }: LoadPickerLargeSelectedProps) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-3.5">
      <p className="mb-2 text-xs font-semibold text-neutral-500">הישות שנבחרה</p>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-2xl font-bold tracking-tight text-neutral-800">{displayName}</span>
        {badge}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReplace}
          className="h-10 flex-1 rounded-xl bg-blue-600 text-sm font-semibold text-white active:bg-blue-700 touch-manipulation"
        >
          החלף
        </button>
        <button
          type="button"
          onClick={onClear}
          className="h-10 flex-1 rounded-xl bg-blue-50 text-sm font-semibold text-blue-600 active:bg-blue-100 touch-manipulation"
        >
          נקה
        </button>
      </div>
    </div>
  )
}

export default LoadPickerLargeSelected
