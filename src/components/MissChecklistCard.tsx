import NoteDeleteIconButton from './NoteDeleteIconButton'
import type { MissChecklist } from '../domain/missChecklist.types'

interface MissChecklistCardProps {
  item: MissChecklist
  onClick?: () => void
  onRemove?: () => void
}

function MissChecklistCard({ item, onClick, onRemove }: MissChecklistCardProps) {
  const { values } = item
  const targetType = typeof values.targetType === 'string' ? values.targetType : ''
  const createdDate = new Date(item.createdAt).toLocaleDateString('he-IL')
  const createdTime = new Date(item.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex-1 flex flex-col gap-1 active:bg-neutral-50 transition-colors touch-manipulation select-none rounded-xl -m-1 p-1"
          onClick={onClick}
          role={onClick ? 'button' : undefined}
        >
          <span className="font-bold text-neutral-800 text-base">
            {targetType ? `סוג מטרה: ${targetType}` : 'צ\'קליסט החטאה'}
          </span>
          <span className="text-sm text-neutral-500">{createdDate} | {createdTime}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-start pt-0.5">
          {onRemove && <NoteDeleteIconButton onClick={onRemove} />}
        </div>
      </div>
    </div>
  )
}

export default MissChecklistCard
