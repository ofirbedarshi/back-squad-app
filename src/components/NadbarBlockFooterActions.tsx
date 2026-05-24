import NadbarCreateTargetFromVarsButton from './NadbarCreateTargetFromVarsButton'
import NadbarLoadTargetButton from './NadbarLoadTargetButton'
import { useNadbarChatContext } from './NadbarChatContext'

interface NadbarBlockFooterActionsProps {
  blockIndex: number
}

function NadbarBlockFooterActions({ blockIndex }: NadbarBlockFooterActionsProps) {
  const {
    blockFooterActions,
    onBlockFooterAction,
    blockLoadedTargetIds,
    onBlockLoadTarget,
    onBlockClearLoadedTarget,
  } = useNadbarChatContext()
  const actions = blockFooterActions?.[blockIndex]

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
          case 'loadTarget':
            if (!onBlockLoadTarget || !onBlockClearLoadedTarget) return null
            return (
              <NadbarLoadTargetButton
                key={action}
                targetId={blockLoadedTargetIds?.[blockIndex]}
                onSelect={(target) => onBlockLoadTarget(blockIndex, target)}
                onClear={() => onBlockClearLoadedTarget(blockIndex)}
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
