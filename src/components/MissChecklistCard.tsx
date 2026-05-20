import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { MissChecklist } from '../domain/missChecklist.types'
import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../hooks/useSuppressNativeTextSelection'

interface MissChecklistCardProps {
  item: MissChecklist
  onClick: () => void
  onLongPress: () => void
}

function MissChecklistCard({ item, onClick, onLongPress }: MissChecklistCardProps) {
  const { values } = item
  const targetType = typeof values.targetType === 'string' ? values.targetType : ''

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
        <span className="font-bold text-neutral-800 text-base flex-1 min-w-0">
          {targetType ? `סוג מטרה: ${targetType}` : 'צ\'קליסט החטאה'}
        </span>
        <div className="flex flex-col items-end shrink-0 self-start pt-0.5 gap-0.5">
          <span className="text-xs text-neutral-400">עודכן לאחרונה</span>
          <span className="text-xs text-neutral-400 tabular-nums">{formatUpdatedAt(item.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default MissChecklistCard
