import IndicatorLoadButton from './IndicatorLoadButton'
import TargetLoadButton from './TargetLoadButton'
import type { NadbarLinksUpdate } from '../domain/nadbar.types'

interface NadbarLinksToolbarProps {
  pointerId?: string
  targetId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
  replaceMode?: boolean
}

function NadbarLinksToolbar({ pointerId, targetId, onLinksChange, replaceMode = false }: NadbarLinksToolbarProps) {
  const indicatorLoadLabel = replaceMode ? 'החלף מציין' : 'טען מציין'
  const targetLoadLabel = replaceMode ? 'החלף מטרה' : 'טען מטרה'

  return (
    <div className="flex items-center gap-1 shrink-0">
      <IndicatorLoadButton
        compact
        loadLabel={indicatorLoadLabel}
        indicatorId={pointerId}
        onSelect={(indicator) => onLinksChange({ pointerId: indicator.id })}
        onClear={() => onLinksChange({ pointerId: null })}
      />
      <TargetLoadButton
        compact
        loadLabel={targetLoadLabel}
        targetId={targetId}
        onSelect={(target) => onLinksChange({ targetId: target.id })}
        onClear={() => onLinksChange({ targetId: null })}
      />
    </div>
  )
}

export default NadbarLinksToolbar
