import NadbarChatStepHeaderLayout from './NadbarChatStepHeaderLayout'
import NadbarLinksToolbar from './NadbarLinksToolbar'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { getNadbarCardTitle } from '../utils/nadbarDisplay'

interface NadbarEditScreenHeaderProps {
  draftNadbar: Nadbar
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
}

function NadbarEditScreenHeader({ draftNadbar, onLinksChange, onSave }: NadbarEditScreenHeaderProps) {
  return (
    <NadbarChatStepHeaderLayout title={getNadbarCardTitle(draftNadbar)} onSave={onSave}>
      <NadbarLinksToolbar
        replaceMode
        pointerId={draftNadbar.links?.pointerId}
        targetId={draftNadbar.links?.targetId}
        positionId={draftNadbar.links?.positionId}
        onLinksChange={onLinksChange}
      />
    </NadbarChatStepHeaderLayout>
  )
}

export default NadbarEditScreenHeader
