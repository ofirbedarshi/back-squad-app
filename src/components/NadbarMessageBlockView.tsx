import NadbarMeMessageBubble from './NadbarMeMessageBubble'
import NadbarMessageBlockFrame from './NadbarMessageBlockFrame'
import NadbarMessageBubble from './NadbarMessageBubble'
import type { NadbarMessageBlock } from '../domain/nadbar.types'

interface NadbarMessageBlockViewProps {
  block: NadbarMessageBlock
  blockIndex: number
}

function NadbarMessageBlockView({ block, blockIndex }: NadbarMessageBlockViewProps) {
  return (
    <NadbarMessageBlockFrame>
      {block.messages.map((message, messageIndex) =>
        message.source === 'Me' ? (
          <NadbarMeMessageBubble
            key={`block-${blockIndex}-me-${messageIndex}`}
            message={message}
            messages={block.messages}
            messageIndex={messageIndex}
          />
        ) : (
          <NadbarMessageBubble
            key={`block-${blockIndex}-they-${messageIndex}`}
            message={message}
            messages={block.messages}
            messageIndex={messageIndex}
          />
        ),
      )}
    </NadbarMessageBlockFrame>
  )
}

export default NadbarMessageBlockView
