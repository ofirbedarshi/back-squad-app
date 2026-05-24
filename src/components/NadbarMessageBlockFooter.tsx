import NadbarBlockFooterActions from './NadbarBlockFooterActions'
import { useNadbarChatContext } from './NadbarChatContext'

interface NadbarMessageBlockFooterProps {
  blockIndex: number
}

function NadbarMessageBlockFooter({ blockIndex }: NadbarMessageBlockFooterProps) {
  const { blockFooterActions, onBlockFooterAction } = useNadbarChatContext()
  const actions = blockFooterActions?.[blockIndex]

  if (!actions?.length || !onBlockFooterAction) {
    return null
  }

  return <NadbarBlockFooterActions actions={actions} onAction={onBlockFooterAction} />
}

export default NadbarMessageBlockFooter
