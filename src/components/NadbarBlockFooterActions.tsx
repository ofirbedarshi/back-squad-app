import NadbarCreateTargetFromVarsButton from './NadbarCreateTargetFromVarsButton'
import { useNadbarChatContext } from './NadbarChatContext'

interface NadbarBlockFooterActionsProps {
  blockIndex: number
}

function NadbarBlockFooterActions({ blockIndex }: NadbarBlockFooterActionsProps) {
  const { blockFooterActions, onBlockFooterAction } = useNadbarChatContext()
  const actions = blockFooterActions?.[blockIndex]

  if (!actions?.length || !onBlockFooterAction) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 pt-1">
      {actions.map((action) => {
        switch (action) {
          case 'createTargetFromVars':
            return (
              <NadbarCreateTargetFromVarsButton
                key={action}
                onClick={() => onBlockFooterAction(blockIndex, action)}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default NadbarBlockFooterActions
