import NadbarMessageBubble from './NadbarMessageBubble'
import { NadbarMessageResourcesProvider } from '../context/NadbarMessageResourcesContext'
import type { NadbarLinks, NadbarMessage } from '../domain/nadbar.types'

interface NadbarChatViewProps {
  messages: NadbarMessage[]
  links?: NadbarLinks
}

function NadbarChatView({ messages, links }: NadbarChatViewProps) {
  return (
    <NadbarMessageResourcesProvider links={links}>
      <div
        className="flex flex-col gap-2 p-4 bg-[#e5ddd5] min-h-full"
        role="log"
        aria-label="שיחת נדבר"
      >
        {messages.map((message, index) => (
          <NadbarMessageBubble key={`${message.source}-${index}`} message={message} />
        ))}
      </div>
    </NadbarMessageResourcesProvider>
  )
}

export default NadbarChatView
