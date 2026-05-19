import NadbarMessageBubble from './NadbarMessageBubble'
import type { NadbarMessage } from '../domain/nadbar.types'

interface NadbarChatViewProps {
  messages: NadbarMessage[]
}

function NadbarChatView({ messages }: NadbarChatViewProps) {
  return (
    <div
      className="flex flex-col gap-2 p-4 bg-[#e5ddd5] min-h-full"
      role="log"
      aria-label="שיחת נדבר"
    >
      {messages.map((message, index) => (
        <NadbarMessageBubble key={`${message.source}-${index}`} message={message} />
      ))}
    </div>
  )
}

export default NadbarChatView
