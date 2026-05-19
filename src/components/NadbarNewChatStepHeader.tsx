import NadbarChatStepHeaderLayout from './NadbarChatStepHeaderLayout'
import NadbarLinksToolbar from './NadbarLinksToolbar'
import type { NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

interface NadbarNewChatStepHeaderProps {
  nadbarType: NadbarType
  pointerId?: string
  targetId?: string
  positionId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
}

function NadbarNewChatStepHeader({
  nadbarType,
  pointerId,
  targetId,
  positionId,
  onLinksChange,
  onSave,
}: NadbarNewChatStepHeaderProps) {
  return (
    <NadbarChatStepHeaderLayout title={`הוסף · ${getNadbarTypeLabel(nadbarType)}`} onSave={onSave}>
      <NadbarLinksToolbar
        pointerId={pointerId}
        targetId={targetId}
        positionId={positionId}
        onLinksChange={onLinksChange}
      />
    </NadbarChatStepHeaderLayout>
  )
}

export default NadbarNewChatStepHeader
