import NadbarMeMessageBubble from './NadbarMeMessageBubble'
import NadbarMessageBubble from './NadbarMessageBubble'
import type { NadbarLinks, NadbarMessage, NadbarMessageUserVars } from '../domain/nadbar.types'
import { useEntityLinkResources } from '../hooks/useEntityLinkResources'

interface NadbarChatViewProps {
  messages: NadbarMessage[]
  links?: NadbarLinks
  messageVars?: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarChatView({ messages, links, messageVars = {}, onUserVarChange }: NadbarChatViewProps) {
  const resources = useEntityLinkResources(links)

  return (
    <div
      className="flex flex-col gap-2 p-4 bg-[#e5ddd5] min-h-full"
      role="log"
      aria-label="שיחת נדבר"
    >
      {messages.map((message, index) =>
        message.source === 'Me' ? (
          <NadbarMeMessageBubble
            key={`${message.source}-${index}`}
            message={message}
            resources={resources}
            messageVars={messageVars}
            onUserVarChange={onUserVarChange}
          />
        ) : (
          <NadbarMessageBubble
            key={`${message.source}-${index}`}
            message={message}
            resources={resources}
          />
        ),
      )}
    </div>
  )
}

export default NadbarChatView
