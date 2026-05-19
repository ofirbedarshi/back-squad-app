import type { ReactNode } from 'react'

interface LoadPickerLargeSelectedProps {
  displayName: string
  badge?: ReactNode
  onReplace: () => void
  onClear: () => void
}

function LoadPickerLargeSelected({ displayName, badge, onReplace, onClear }: LoadPickerLargeSelectedProps) {
  return (
    <div className="w-full flex flex-col items-center gap-3 py-2">
      <div className="flex items-center justify-center gap-2 flex-wrap px-2">
        <span className="text-lg font-bold text-neutral-800 text-center">{displayName}</span>
        {badge}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onReplace}
          className="text-sm font-semibold text-blue-600 active:opacity-70 touch-manipulation"
        >
          החלף
        </button>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-semibold text-neutral-500 active:opacity-70 touch-manipulation"
        >
          נקה
        </button>
      </div>
    </div>
  )
}

export default LoadPickerLargeSelected
