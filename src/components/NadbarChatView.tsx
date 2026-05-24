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
import { useEntityLinkResources } from '../hooks/useEntityLinkResources'
import { getNadbarChatTemplateUseCase } from '../useCases/getNadbarChatTemplate'

interface NadbarChatViewProps {
  nadbarType: NadbarType
  messageBlocks: NadbarMessageBlock[]
  links?: NadbarLinks
  messageVars?: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
  onBlockFooterAction?: (action: NadbarBlockFooterAction) => void
}

function NadbarChatView({
  nadbarType,
  messageBlocks,
  links,
  messageVars = {},
  onUserVarChange,
  onBlockFooterAction,
}: NadbarChatViewProps) {
  const resources = useEntityLinkResources(links)
  const chatTemplate = useMemo(() => getNadbarChatTemplateUseCase(nadbarType), [nadbarType])

  const chatContextValue = useMemo(
    () => ({
      messageVars,
      userVarFields: chatTemplate.userVarFields,
      resources,
      onUserVarChange,
      blockFooterActions: chatTemplate.blockFooterActions,
      onBlockFooterAction,
    }),
    [messageVars, chatTemplate, resources, onUserVarChange, onBlockFooterAction],
  )

  return (
    <NadbarChatProvider value={chatContextValue}>
      <div
        className="flex flex-col gap-4 p-4 bg-[#e5ddd5] min-h-full"
        role="log"
        aria-label="שיחת נדבר"
      >
        {messageBlocks.map((block, blockIndex) => (
          <NadbarMessageBlockView key={`block-${blockIndex}`} block={block} blockIndex={blockIndex} />
        ))}
      </div>
    </NadbarChatProvider>
  )
}

export default NadbarChatView
