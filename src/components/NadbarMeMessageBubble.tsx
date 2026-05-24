import NadbarMessageSegmentContent from './NadbarMessageSegmentContent'
import type { NadbarMessage, NadbarMessageUserVars, NadbarUserVarFields } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

interface NadbarMeMessageBubbleProps {
  message: NadbarMessage
  messages: readonly NadbarMessage[]
  messageIndex: number
  resources: NadbarMessageResources
  messageVars: NadbarMessageUserVars
  userVarFields?: NadbarUserVarFields
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarMeMessageBubble({
  message,
  messages,
  messageIndex,
  resources,
  messageVars,
  userVarFields,
  onUserVarChange,
}: NadbarMeMessageBubbleProps) {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-emerald-100 px-3 py-2 text-sm leading-relaxed text-neutral-900 shadow-sm">
        <NadbarMessageSegmentContent
          content={message.content}
          messages={messages}
          messageIndex={messageIndex}
          resources={resources}
          messageVars={messageVars}
          userVarFields={userVarFields}
          onUserVarChange={onUserVarChange}
        />
      </div>
    </div>
  )
}

export default NadbarMeMessageBubble
