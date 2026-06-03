import NadbarChatView from './NadbarChatView'
import NadbarNewChatStepHeader from './NadbarNewChatStepHeader'
import type { Nadbar, NadbarBlockFooterAction, NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'

interface NadbarNewChatStepProps {
  nadbarType: NadbarType
  draftNadbar: Nadbar
  onUserVarChange: (blockIndex: number, varName: string, value: string) => void
  onNotesChange: (value: string) => void
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
  onBlockFooterAction?: (blockIndex: number, action: NadbarBlockFooterAction) => void
  showGlobalTargetLoad?: boolean
  loadedTargetId?: string
  onLoadTarget?: (target: Target) => void
  onClearLoadedTarget?: () => void
  onBlockAddObstacle?: (blockIndex: number) => void
}

function NadbarNewChatStep({
  nadbarType,
  draftNadbar,
  onUserVarChange,
  onNotesChange,
  onLinksChange,
  onSave,
  onBlockFooterAction,
  showGlobalTargetLoad,
  loadedTargetId,
  onLoadTarget,
  onClearLoadedTarget,
  onBlockAddObstacle,
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
        showGlobalTargetLoad={showGlobalTargetLoad}
        loadedTargetId={loadedTargetId}
        onLoadTarget={onLoadTarget}
        onClearLoadedTarget={onClearLoadedTarget}
      />

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView
          nadbarType={nadbarType}
          messageBlocks={draftNadbar.messageBlocks}
          links={draftNadbar.links}
          blockMessageVars={draftNadbar.blockMessageVars}
          notes={draftNadbar.notes ?? ''}
          onNotesChange={onNotesChange}
          onUserVarChange={onUserVarChange}
          onBlockFooterAction={onBlockFooterAction}
          onBlockAddObstacle={onBlockAddObstacle}
        />
      </div>
    </div>
  )
}

export default NadbarNewChatStep
