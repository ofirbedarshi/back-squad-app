import IndicatorLoadButton from './IndicatorLoadButton'
import PositionLoadButton from './PositionLoadButton'
import TargetLoadButton from './TargetLoadButton'
import type { NadbarLinksUpdate } from '../domain/nadbar.types'

interface NadbarLinksToolbarProps {
  pointerId?: string
  targetId?: string
  positionId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
  replaceMode?: boolean
}

function NadbarLinksToolbar({
  pointerId,
  targetId,
  positionId,
  onLinksChange,
  replaceMode = false,
}: NadbarLinksToolbarProps) {
  const indicatorLoadLabel = replaceMode ? 'החלף מציין' : 'טען מציין'
  const targetLoadLabel = replaceMode ? 'החלף מטרה' : 'טען מטרה'
  const positionLoadLabel = replaceMode ? 'החלף עמדה' : 'טען עמדה'

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
      <PositionLoadButton
        compact
        loadLabel={positionLoadLabel}
        positionId={positionId}
        onSelect={(position) => onLinksChange({ positionId: position.id })}
        onClear={() => onLinksChange({ positionId: null })}
      />
    </div>
  )
}

export default NadbarLinksToolbar
