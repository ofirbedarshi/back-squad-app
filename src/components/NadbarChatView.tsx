import { useMemo } from 'react'
import { NadbarChatProvider } from './NadbarChatContext'
import NadbarMessageBlockView from './NadbarMessageBlockView'
import type { NadbarLinks, NadbarMessageBlock, NadbarMessageUserVars, NadbarUserVarFields } from '../domain/nadbar.types'
import { useEntityLinkResources } from '../hooks/useEntityLinkResources'

interface NadbarChatViewProps {
  messageBlocks: NadbarMessageBlock[]
  links?: NadbarLinks
  messageVars?: NadbarMessageUserVars
  userVarFields?: NadbarUserVarFields
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarChatView({
  messageBlocks,
  links,
  messageVars = {},
  userVarFields,
  onUserVarChange,
}: NadbarChatViewProps) {
  const resources = useEntityLinkResources(links)

  const chatContextValue = useMemo(
    () => ({
      messageVars,
      userVarFields,
      resources,
      onUserVarChange,
    }),
    [messageVars, userVarFields, resources, onUserVarChange],
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
