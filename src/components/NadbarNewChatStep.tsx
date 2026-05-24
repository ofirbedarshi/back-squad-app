import NadbarChatView from './NadbarChatView'
import NadbarNewChatStepHeader from './NadbarNewChatStepHeader'
import type { Nadbar, NadbarBlockFooterAction, NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'

interface NadbarNewChatStepProps {
  nadbarType: NadbarType
  draftNadbar: Nadbar
  onUserVarChange: (blockIndex: number, varName: string, value: string) => void
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
  onBlockFooterAction?: (blockIndex: number, action: NadbarBlockFooterAction) => void
  blockLoadedTargetIds?: Record<number, string | undefined>
  onBlockLoadTarget?: (blockIndex: number, target: Target) => void
  onBlockClearLoadedTarget?: (blockIndex: number) => void
  onBlockAddObstacle?: (blockIndex: number) => void
}

function NadbarNewChatStep({
  nadbarType,
  draftNadbar,
  onUserVarChange,
  onLinksChange,
  onSave,
  onBlockFooterAction,
  blockLoadedTargetIds,
  onBlockLoadTarget,
  onBlockClearLoadedTarget,
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
      />

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView
          nadbarType={nadbarType}
          messageBlocks={draftNadbar.messageBlocks}
          links={draftNadbar.links}
          blockMessageVars={draftNadbar.blockMessageVars}
          onUserVarChange={onUserVarChange}
          onBlockFooterAction={onBlockFooterAction}
          blockLoadedTargetIds={blockLoadedTargetIds}
          onBlockLoadTarget={onBlockLoadTarget}
          onBlockClearLoadedTarget={onBlockClearLoadedTarget}
          onBlockAddObstacle={onBlockAddObstacle}
        />
      </div>
    </div>
  )
}

export default NadbarNewChatStep
