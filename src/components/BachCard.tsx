import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { Bach } from '../domain/bach.types'
import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../hooks/useSuppressNativeTextSelection'

interface BachCardProps {
  bach: Bach
  onClick: () => void
  onLongPress: () => void
}

function BachCard({ bach, onClick, onLongPress }: BachCardProps) {
  const { values } = bach
  const targetName = typeof values.targetName === 'string' ? values.targetName : ''
  const indicatorName = typeof values.indicatorName === 'string' ? values.indicatorName : ''
  const date = typeof values.date === 'string' ? values.date : ''
  const hour = typeof values.hour === 'string' ? values.hour : ''

  const { className: shakeClass, ...longPressProps } = useLongPressWithShake(onLongPress, onClick)
  const rootRef = useSuppressNativeTextSelection<HTMLDivElement>()

  return (
    <div
      ref={rootRef}
      className={`interactive-no-copy bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation select-none ${shakeClass}`}
      role="button"
      {...longPressProps}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <span className="font-bold text-neutral-800 text-base">
            {targetName ? `מטרה: ${targetName}` : 'ללא שם מטרה'}
          </span>
          <div className="text-sm text-neutral-500 flex flex-col gap-1">
            {indicatorName ? <span>מציין: {indicatorName}</span> : null}
            {date || hour ? (
              <span>{[date, hour].filter(Boolean).join(' | ')}</span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0 self-start pt-0.5 gap-0.5">
          <span className="text-xs text-neutral-400">עודכן לאחרונה</span>
          <span className="text-xs text-neutral-400 tabular-nums">{formatUpdatedAt(bach.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default BachCard
