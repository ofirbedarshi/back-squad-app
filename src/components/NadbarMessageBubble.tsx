import NadbarMessageSegmentContent from './NadbarMessageSegmentContent'
import type { NadbarMessage, NadbarMessageUserVars } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

interface NadbarMessageBubbleProps {
  message: NadbarMessage
  messages: readonly NadbarMessage[]
  messageIndex: number
  resources: NadbarMessageResources
  messageVars: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarMessageBubble({
  message,
  messages,
  messageIndex,
  resources,
  messageVars,
  onUserVarChange,
}: NadbarMessageBubbleProps) {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2 text-sm leading-relaxed text-neutral-900 shadow-sm">
        <NadbarMessageSegmentContent
          content={message.content}
          messages={messages}
          messageIndex={messageIndex}
          resources={resources}
          messageVars={messageVars}
          onUserVarChange={onUserVarChange}
        />
      </div>
    </div>
  )
}

export default NadbarMessageBubble
