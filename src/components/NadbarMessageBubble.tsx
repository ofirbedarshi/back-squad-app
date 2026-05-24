import NadbarMessageSegmentContent from './NadbarMessageSegmentContent'
import type { NadbarMessage } from '../domain/nadbar.types'

interface NadbarMessageBubbleProps {
  message: NadbarMessage
  messages: readonly NadbarMessage[]
  messageIndex: number
}

function NadbarMessageBubble({ message, messages, messageIndex }: NadbarMessageBubbleProps) {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2 text-sm leading-relaxed text-neutral-900 shadow-sm">
        <NadbarMessageSegmentContent
          content={message.content}
          messages={messages}
          messageIndex={messageIndex}
        />
      </div>
    </div>
  )
}

export default NadbarMessageBubble
