import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../hooks/useSuppressNativeTextSelection'
import type { MissChecklist } from '../domain/missChecklist.types'

interface MissChecklistCardProps {
  item: MissChecklist
  onClick: () => void
  onLongPress: () => void
}

function MissChecklistCard({ item, onClick, onLongPress }: MissChecklistCardProps) {
  const { values } = item
  const targetType = typeof values.targetType === 'string' ? values.targetType : ''
  const createdDate = new Date(item.createdAt).toLocaleDateString('he-IL')
  const createdTime = new Date(item.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })

  const { className: shakeClass, ...longPressProps } = useLongPressWithShake(onLongPress, onClick)
  const rootRef = useSuppressNativeTextSelection<HTMLDivElement>()

  return (
    <div
      ref={rootRef}
      className={`interactive-no-copy bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation select-none ${shakeClass}`}
      role="button"
      {...longPressProps}
    >
      <span className="font-bold text-neutral-800 text-base">
        {targetType ? `סוג מטרה: ${targetType}` : 'צ\'קליסט החטאה'}
      </span>
      <span className="text-sm text-neutral-500">
        {createdDate} | {createdTime}
      </span>
    </div>
  )
}

export default MissChecklistCard
