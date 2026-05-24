import NadbarMessageSegmentContent from './NadbarMessageSegmentContent'
import type { NadbarMessage, NadbarMessageUserVars } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

interface NadbarMeMessageBubbleProps {
  message: NadbarMessage
  resources: NadbarMessageResources
  messageVars: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarMeMessageBubble({
  message,
  resources,
  messageVars,
  onUserVarChange,
}: NadbarMeMessageBubbleProps) {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-emerald-100 px-3 py-2 text-sm leading-relaxed text-neutral-900 shadow-sm">
        <NadbarMessageSegmentContent
          content={message.content}
          resources={resources}
          messageVars={messageVars}
          onUserVarChange={onUserVarChange}
        />
      </div>
    </div>
  )
}

export default NadbarMeMessageBubble
