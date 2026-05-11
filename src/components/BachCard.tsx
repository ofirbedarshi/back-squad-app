import NoteDeleteIconButton from './NoteDeleteIconButton'
import type { Bach } from '../domain/bach.types'

interface BachCardProps {
  bach: Bach
  onClick?: () => void
  onRemove?: () => void
}

function BachCard({ bach, onClick, onRemove }: BachCardProps) {
  const { values } = bach
  const targetName = typeof values.targetName === 'string' ? values.targetName : ''
  const indicatorName = typeof values.indicatorName === 'string' ? values.indicatorName : ''
  const date = typeof values.date === 'string' ? values.date : ''
  const hour = typeof values.hour === 'string' ? values.hour : ''

  const createdDate = new Date(bach.createdAt).toLocaleDateString('he-IL')

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex-1 flex flex-col gap-1 active:bg-neutral-50 transition-colors touch-manipulation select-none rounded-xl -m-1 p-1"
          onClick={onClick}
          role={onClick ? 'button' : undefined}
        >
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
        <div className="flex items-center gap-2 shrink-0 self-start pt-0.5">
          <span className="text-xs text-neutral-400">{createdDate}</span>
          {onRemove && <NoteDeleteIconButton onClick={onRemove} />}
        </div>
      </div>
    </div>
  )
}

export default BachCard
