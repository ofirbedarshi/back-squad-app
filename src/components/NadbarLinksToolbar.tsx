import IndicatorLoadButton from './IndicatorLoadButton'
import TargetLoadButton from './TargetLoadButton'
import type { NadbarLinksUpdate } from '../domain/nadbar.types'

interface NadbarLinksToolbarProps {
  pointerId?: string
  targetId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
}

function NadbarLinksToolbar({ pointerId, targetId, onLinksChange }: NadbarLinksToolbarProps) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <IndicatorLoadButton
        compact
        indicatorId={pointerId}
        onSelect={(indicator) => onLinksChange({ pointerId: indicator.id })}
        onClear={() => onLinksChange({ pointerId: null })}
      />
      <TargetLoadButton
        compact
        targetId={targetId}
        onSelect={(target) => onLinksChange({ targetId: target.id })}
        onClear={() => onLinksChange({ targetId: null })}
      />
    </div>
  )
}

export default NadbarLinksToolbar
