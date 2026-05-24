import NadbarMessageSegmentContent from './NadbarMessageSegmentContent'
import type { NadbarMessage } from '../domain/nadbar.types'

interface NadbarMeMessageBubbleProps {
  message: NadbarMessage
  messages: readonly NadbarMessage[]
  messageIndex: number
}

function NadbarMeMessageBubble({ message, messages, messageIndex }: NadbarMeMessageBubbleProps) {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-emerald-100 px-3 py-2 text-sm leading-relaxed text-neutral-900 shadow-sm">
        <NadbarMessageSegmentContent
          content={message.content}
          messages={messages}
          messageIndex={messageIndex}
        />
      </div>
    </div>
  )
}

export default NadbarMeMessageBubble
