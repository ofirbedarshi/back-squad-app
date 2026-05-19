import type { NadbarMessage } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'
import { fillNadbarMessageContent } from '../utils/nadbarMessageFill'

interface NadbarMessageBubbleProps {
  message: NadbarMessage
  resources: NadbarMessageResources
}

function NadbarMessageBubble({ message, resources }: NadbarMessageBubbleProps) {
  const displayContent = fillNadbarMessageContent(message.content, resources)

  return (
    <div className="flex w-full justify-end">
      <div
        className="max-w-[80%] rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2 text-sm leading-relaxed text-neutral-900 shadow-sm whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />
    </div>
  )
}

export default NadbarMessageBubble
