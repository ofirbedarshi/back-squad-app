import { useNadbarMessageResourcesContext } from '../context/NadbarMessageResourcesContext'
import type { NadbarMessage } from '../domain/nadbar.types'
import { fillNadbarMessageContent } from '../utils/nadbarMessageFill'

interface NadbarMessageBubbleProps {
  message: NadbarMessage
}

function NadbarMessageBubble({ message }: NadbarMessageBubbleProps) {
  const resources = useNadbarMessageResourcesContext()
  const displayContent = fillNadbarMessageContent(message.content, resources)
  const isMe = message.source === 'Me'

  return (
    <div className={`flex w-full ${isMe ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words ${
          isMe
            ? 'bg-emerald-100 text-neutral-900 rounded-br-md'
            : 'bg-white text-neutral-900 border border-neutral-200 rounded-bl-md'
        }`}
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />
    </div>
  )
}

export default NadbarMessageBubble
