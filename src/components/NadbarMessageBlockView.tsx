import { useMemo } from 'react'
import { NadbarBlockChatProvider } from './NadbarBlockChatContext'
import NadbarBlockFooterActions from './NadbarBlockFooterActions'
import NadbarMeMessageBubble from './NadbarMeMessageBubble'
import NadbarMessageBlockFrame from './NadbarMessageBlockFrame'
import NadbarMessageBubble from './NadbarMessageBubble'
import type { NadbarMessageBlock, NadbarMessageUserVars } from '../domain/nadbar.types'
import { filterVisibleNadbarMessages } from '../utils/nadbarMessageFill'

interface NadbarMessageBlockViewProps {
  block: NadbarMessageBlock
  blockIndex: number
  blockMessageVars: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarMessageBlockView({
  block,
  blockIndex,
  blockMessageVars,
  onUserVarChange,
}: NadbarMessageBlockViewProps) {
  const visibleMessages = useMemo(
    () => filterVisibleNadbarMessages(block.messages, blockMessageVars),
    [block.messages, blockMessageVars],
  )

  const blockContextValue = useMemo(
    () => ({ messageVars: blockMessageVars, onUserVarChange }),
    [blockMessageVars, onUserVarChange],
  )

  return (
    <NadbarBlockChatProvider value={blockContextValue}>
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
    </NadbarBlockChatProvider>
  )
}

export default NadbarMessageBlockView
