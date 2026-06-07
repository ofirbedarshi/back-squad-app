import type { ReactNode } from 'react'

interface LoadPickerChipProps {
  displayName: string
  onClear: () => void
  /** Opens picker to replace selection (chip name becomes tappable). */
  onReplace?: () => void
  /** Toolbar-sized chip (nadbar chat toolbar). */
  dense?: boolean
  clearAriaLabel: string
  badge?: ReactNode
}

function LoadPickerChip({
  displayName,
  onClear,
  onReplace,
  dense = false,
  clearAriaLabel,
  badge,
}: LoadPickerChipProps) {
  const chipGap = dense ? 'gap-0.5' : 'gap-1.5'
  const chipMaxW = dense ? 'max-w-[72px]' : 'max-w-[140px]'

  return (
    <div className={`flex items-center shrink-0 ${chipGap}`}>
      {onReplace ? (
        <button
          type="button"
          onClick={onReplace}
          className={`text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5 truncate ${chipMaxW} touch-manipulation active:bg-blue-100`}
        >
          {displayName}
        </button>
      ) : (
        <span
          className={`text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5 truncate ${chipMaxW}`}
        >
          {displayName}
        </span>
      )}
      {badge ? <span className="shrink-0">{badge}</span> : null}
      <button
        type="button"
        onClick={onClear}
        className={`text-neutral-400 text-base leading-none active:text-neutral-600 touch-manipulation ${dense ? 'px-0.5' : 'px-1'}`}
        aria-label={clearAriaLabel}
      >
        ✕
      </button>
    </div>
  )
}

export default LoadPickerChip
