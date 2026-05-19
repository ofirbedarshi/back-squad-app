import NadbarChatView from './NadbarChatView'
import NadbarNewChatStepHeader from './NadbarNewChatStepHeader'
import NadbarNewStepBadge from './NadbarNewStepBadge'
import type { Nadbar, NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'

interface NadbarNewChatStepProps {
  nadbarType: NadbarType
  draftNadbar: Nadbar
  onUserVarChange: (varName: string, value: string) => void
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
}

function NadbarNewChatStep({
  nadbarType,
  draftNadbar,
  onUserVarChange,
  onLinksChange,
  onSave,
}: NadbarNewChatStepProps) {
  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <NadbarNewChatStepHeader
        nadbarType={nadbarType}
        pointerId={draftNadbar.links?.pointerId}
        targetId={draftNadbar.links?.targetId}
        positionId={draftNadbar.links?.positionId}
        onLinksChange={onLinksChange}
        onSave={onSave}
      />

      <NadbarNewStepBadge stepNumber={2} totalSteps={2} />

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView
          messages={draftNadbar.messages}
          links={draftNadbar.links}
          messageVars={draftNadbar.messageVars}
          onUserVarChange={onUserVarChange}
        />
      </div>
    </div>
  )
}

export default NadbarNewChatStep
