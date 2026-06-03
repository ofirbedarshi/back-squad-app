import NadbarChatStepHeaderLayout from './NadbarChatStepHeaderLayout'
import NadbarGlobalTargetToolbar from './NadbarGlobalTargetToolbar'
import NadbarLinksToolbar from './NadbarLinksToolbar'
import { nadbarRequiresEntityLinks } from '../domain/nadbar'
import type { NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

interface NadbarNewChatStepHeaderProps {
  nadbarType: NadbarType
  pointerId?: string
  targetId?: string
  positionId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
  showGlobalTargetLoad?: boolean
  loadedTargetId?: string
  onLoadTarget?: (target: Target) => void
  onClearLoadedTarget?: () => void
}

function NadbarNewChatStepHeader({
  nadbarType,
  pointerId,
  targetId,
  positionId,
  onLinksChange,
  onSave,
  showGlobalTargetLoad,
  loadedTargetId,
  onLoadTarget,
  onClearLoadedTarget,
}: NadbarNewChatStepHeaderProps) {
  return (
    <NadbarChatStepHeaderLayout title={`הוסף · ${getNadbarTypeLabel(nadbarType)}`} onSave={onSave}>
      {nadbarRequiresEntityLinks(nadbarType) ? (
        <NadbarLinksToolbar
          pointerId={pointerId}
          targetId={targetId}
          positionId={positionId}
          onLinksChange={onLinksChange}
        />
      ) : null}
      {showGlobalTargetLoad && onLoadTarget && onClearLoadedTarget ? (
        <NadbarGlobalTargetToolbar
          targetId={loadedTargetId}
          onSelect={onLoadTarget}
          onClear={onClearLoadedTarget}
        />
      ) : null}
    </NadbarChatStepHeaderLayout>
  )
}

export default NadbarNewChatStepHeader
