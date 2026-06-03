import NadbarChatStepHeaderLayout from './NadbarChatStepHeaderLayout'
import NadbarGlobalTargetToolbar from './NadbarGlobalTargetToolbar'
import NadbarLinksToolbar from './NadbarLinksToolbar'
import { nadbarRequiresEntityLinks } from '../domain/nadbar'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { getNadbarCardTitle } from '../utils/nadbarDisplay'

interface NadbarEditScreenHeaderProps {
  draftNadbar: Nadbar
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
  showGlobalTargetLoad?: boolean
  loadedTargetId?: string
  onLoadTarget?: (target: Target) => void
  onClearLoadedTarget?: () => void
}

function NadbarEditScreenHeader({
  draftNadbar,
  onLinksChange,
  onSave,
  showGlobalTargetLoad,
  loadedTargetId,
  onLoadTarget,
  onClearLoadedTarget,
}: NadbarEditScreenHeaderProps) {
  return (
    <NadbarChatStepHeaderLayout title={getNadbarCardTitle(draftNadbar)} onSave={onSave}>
      {nadbarRequiresEntityLinks(draftNadbar.type) ? (
        <NadbarLinksToolbar
          replaceMode
          pointerId={draftNadbar.links?.pointerId}
          targetId={draftNadbar.links?.targetId}
          positionId={draftNadbar.links?.positionId}
          onLinksChange={onLinksChange}
        />
      ) : null}
      {showGlobalTargetLoad && onLoadTarget && onClearLoadedTarget ? (
        <NadbarGlobalTargetToolbar
          replaceMode
          targetId={loadedTargetId}
          onSelect={onLoadTarget}
          onClear={onClearLoadedTarget}
        />
      ) : null}
    </NadbarChatStepHeaderLayout>
  )
}

export default NadbarEditScreenHeader
