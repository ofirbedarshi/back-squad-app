import NadbarChatView from './NadbarChatView'
import NadbarNewChatStepHeader from './NadbarNewChatStepHeader'
import type { Nadbar, NadbarBlockFooterAction, NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'

interface NadbarNewChatStepProps {
  nadbarType: NadbarType
  draftNadbar: Nadbar
  onUserVarChange: (varName: string, value: string) => void
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
  onBlockFooterAction?: (action: NadbarBlockFooterAction) => void
}

function NadbarNewChatStep({
  nadbarType,
  draftNadbar,
  onUserVarChange,
  onLinksChange,
  onSave,
  onBlockFooterAction,
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

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView
          nadbarType={nadbarType}
          messageBlocks={draftNadbar.messageBlocks}
          links={draftNadbar.links}
          messageVars={draftNadbar.messageVars}
          onUserVarChange={onUserVarChange}
          onBlockFooterAction={onBlockFooterAction}
        />
      </div>
    </div>
  )
}

export default NadbarNewChatStep
