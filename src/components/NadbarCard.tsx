import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../hooks/useSuppressNativeTextSelection'
import type { Nadbar } from '../domain/nadbar.types'
import type { NadbarCardDetails } from '../utils/nadbarDisplay.types'
import { getNadbarCardTitle } from '../utils/nadbarDisplay'

interface NadbarCardProps {
  nadbar: Nadbar
  details: NadbarCardDetails
  onClick: () => void
  onLongPress: () => void
}

function NadbarCard({ nadbar, details, onClick, onLongPress }: NadbarCardProps) {
  const { className: shakeClass, ...longPressProps } = useLongPressWithShake(onLongPress, onClick)
  const rootRef = useSuppressNativeTextSelection<HTMLDivElement>()
  const { targetName, indicatorName, updatedAtLabel } = details

  return (
    <div
      ref={rootRef}
      className={`interactive-no-copy bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation ${shakeClass}`}
      role="button"
      {...longPressProps}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <span className="font-bold text-neutral-800 text-base">{getNadbarCardTitle(nadbar)}</span>
          <div className="text-sm text-neutral-500 flex flex-col gap-0.5">
            <span>מטרה: {targetName}</span>
            <span>מציין: {indicatorName}</span>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0 self-start pt-0.5 gap-0.5">
          <span className="text-xs text-neutral-400">עודכן לאחרונה</span>
          <span className="text-xs text-neutral-400 tabular-nums">{updatedAtLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default NadbarCard
