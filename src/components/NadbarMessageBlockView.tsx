import NadbarMeMessageBubble from './NadbarMeMessageBubble'
import NadbarMessageBlockFrame from './NadbarMessageBlockFrame'
import NadbarMessageBubble from './NadbarMessageBubble'
import type { NadbarMessageBlock, NadbarMessageUserVars } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

interface NadbarMessageBlockViewProps {
  block: NadbarMessageBlock
  blockIndex: number
  resources: NadbarMessageResources
  messageVars: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarMessageBlockView({
  block,
  blockIndex,
  resources,
  messageVars,
  onUserVarChange,
}: NadbarMessageBlockViewProps) {
  return (
    <NadbarMessageBlockFrame>
      {block.messages.map((message, messageIndex) =>
        message.source === 'Me' ? (
          <NadbarMeMessageBubble
            key={`block-${blockIndex}-me-${messageIndex}`}
            message={message}
            messages={block.messages}
            messageIndex={messageIndex}
            resources={resources}
            messageVars={messageVars}
            onUserVarChange={onUserVarChange}
          />
        ) : (
          <NadbarMessageBubble
            key={`block-${blockIndex}-they-${messageIndex}`}
            message={message}
            messages={block.messages}
            messageIndex={messageIndex}
            resources={resources}
            messageVars={messageVars}
            onUserVarChange={onUserVarChange}
          />
        ),
      )}
    </NadbarMessageBlockFrame>
  )
}

export default NadbarMessageBlockView
