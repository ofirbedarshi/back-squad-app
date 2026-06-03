import NadbarAddObstacleButton from './NadbarAddObstacleButton'
import NadbarCreateTargetFromVarsButton from './NadbarCreateTargetFromVarsButton'
import { useNadbarChatContext } from './NadbarChatContext'

interface NadbarBlockFooterActionsProps {
  blockIndex: number
}

function NadbarBlockFooterActions({ blockIndex }: NadbarBlockFooterActionsProps) {
  const { blockFooterActions, onBlockFooterAction, onBlockAddObstacle } = useNadbarChatContext()
  const actions = blockFooterActions?.[blockIndex]?.filter((action) => action !== 'loadTarget')

  if (!actions?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 pt-1">
      {actions.map((action) => {
        switch (action) {
          case 'createTargetFromVars':
            if (!onBlockFooterAction) return null
            return (
              <NadbarCreateTargetFromVarsButton
                key={action}
                onClick={() => onBlockFooterAction(blockIndex, action)}
              />
            )
          case 'addObstacle':
            if (!onBlockAddObstacle) return null
            return (
              <NadbarAddObstacleButton
                key={action}
                onClick={() => onBlockAddObstacle(blockIndex)}
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
