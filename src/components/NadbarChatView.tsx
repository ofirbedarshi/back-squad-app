import { useMemo } from 'react'
import { NadbarChatProvider } from './NadbarChatContext'
import NadbarMessageBlockView from './NadbarMessageBlockView'
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
  onUserVarChange: (blockIndex: number, varName: string, value: string) => void
  onBlockFooterAction?: (blockIndex: number, action: NadbarBlockFooterAction) => void
  blockLoadedTargetIds?: Record<number, string | undefined>
  onBlockLoadTarget?: (blockIndex: number, target: Target) => void
  onBlockClearLoadedTarget?: (blockIndex: number) => void
}

function NadbarChatView({
  nadbarType,
  messageBlocks,
  links,
  blockMessageVars = [],
  onUserVarChange,
  onBlockFooterAction,
  blockLoadedTargetIds,
  onBlockLoadTarget,
  onBlockClearLoadedTarget,
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
    }),
    [chatTemplate, resources, onBlockFooterAction, blockLoadedTargetIds, onBlockLoadTarget, onBlockClearLoadedTarget],
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
      </div>
    </NadbarChatProvider>
  )
}

export default NadbarChatView
