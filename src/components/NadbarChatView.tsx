import { useMemo } from 'react'
import { NadbarChatProvider } from './NadbarChatContext'
import NadbarMessageBlockView from './NadbarMessageBlockView'
import NadbarNotesField from './NadbarNotesField'
import type {
  NadbarBlockFooterAction,
  NadbarLinks,
  NadbarMessageBlock,
  NadbarMessageUserVars,
  NadbarType,
} from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { useEntityLinkResources } from '../hooks/useEntityLinkResources'
import { getNadbarChatTemplateUseCase } from '../useCases/getNadbarChatTemplate'

interface NadbarChatViewProps {
  nadbarType: NadbarType
  messageBlocks: NadbarMessageBlock[]
  links?: NadbarLinks
  blockMessageVars?: NadbarMessageUserVars[]
  notes?: string
  onNotesChange: (value: string) => void
  onUserVarChange: (blockIndex: number, varName: string, value: string) => void
  onBlockFooterAction?: (blockIndex: number, action: NadbarBlockFooterAction) => void
  blockLoadedTargetIds?: Record<number, string | undefined>
  onBlockLoadTarget?: (blockIndex: number, target: Target) => void
  onBlockClearLoadedTarget?: (blockIndex: number) => void
  onBlockAddObstacle?: (blockIndex: number) => void
}

function NadbarChatView({
  nadbarType,
  messageBlocks,
  links,
  blockMessageVars = [],
  notes = '',
  onNotesChange,
  onUserVarChange,
  onBlockFooterAction,
  blockLoadedTargetIds,
  onBlockLoadTarget,
  onBlockClearLoadedTarget,
  onBlockAddObstacle,
}: NadbarChatViewProps) {
  const resources = useEntityLinkResources(links)
  const chatTemplate = useMemo(() => getNadbarChatTemplateUseCase(nadbarType), [nadbarType])

  const chatContextValue = useMemo(
    () => ({
      userVarFields: chatTemplate.userVarFields,
      resources,
      blockFooterActions: chatTemplate.blockFooterActions,
      onBlockFooterAction,
      blockLoadedTargetIds,
      onBlockLoadTarget,
      onBlockClearLoadedTarget,
      onBlockAddObstacle,
    }),
    [chatTemplate, resources, onBlockFooterAction, blockLoadedTargetIds, onBlockLoadTarget, onBlockClearLoadedTarget, onBlockAddObstacle],
  )

  return (
    <NadbarChatProvider value={chatContextValue}>
      <div
        className="flex flex-col gap-4 p-4 bg-[#e5ddd5] min-h-full"
        role="log"
        aria-label="שיחת נדבר"
      >
        {messageBlocks.map((block, blockIndex) => (
          <NadbarMessageBlockView
            key={`block-${blockIndex}`}
            block={block}
            blockIndex={blockIndex}
            blockMessageVars={blockMessageVars[blockIndex] ?? {}}
            onUserVarChange={(varName, value) => onUserVarChange(blockIndex, varName, value)}
          />
        ))}
        <NadbarNotesField value={notes} onChange={onNotesChange} />
      </div>
    </NadbarChatProvider>
  )
}

export default NadbarChatView
