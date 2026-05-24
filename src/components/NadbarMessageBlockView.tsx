import { useMemo } from 'react'
import { useNadbarChatContext } from './NadbarChatContext'
import NadbarBlockFooterActions from './NadbarBlockFooterActions'
import NadbarMeMessageBubble from './NadbarMeMessageBubble'
import NadbarMessageBlockFrame from './NadbarMessageBlockFrame'
import NadbarMessageBubble from './NadbarMessageBubble'
import type { NadbarMessageBlock } from '../domain/nadbar.types'
import { filterVisibleNadbarMessages } from '../utils/nadbarMessageFill'

interface NadbarMessageBlockViewProps {
  block: NadbarMessageBlock
  blockIndex: number
}

function NadbarMessageBlockView({ block, blockIndex }: NadbarMessageBlockViewProps) {
  const { messageVars } = useNadbarChatContext()
  const visibleMessages = useMemo(
    () => filterVisibleNadbarMessages(block.messages, messageVars),
    [block.messages, messageVars],
  )

  return (
    <NadbarMessageBlockFrame>
      {visibleMessages.map((message, messageIndex) =>
        message.source === 'Me' ? (
          <NadbarMeMessageBubble
            key={`block-${blockIndex}-me-${messageIndex}`}
            message={message}
            messages={visibleMessages}
            messageIndex={messageIndex}
          />
        ) : (
          <NadbarMessageBubble
            key={`block-${blockIndex}-they-${messageIndex}`}
            message={message}
            messages={visibleMessages}
            messageIndex={messageIndex}
          />
        ),
      )}
      <NadbarBlockFooterActions blockIndex={blockIndex} />
    </NadbarMessageBlockFrame>
  )
}

export default NadbarMessageBlockView
