import NadbarCreateTargetFromVarsButton from './NadbarCreateTargetFromVarsButton'
import type { NadbarBlockFooterAction } from '../domain/nadbar.types'

interface NadbarBlockFooterActionsProps {
  actions: readonly NadbarBlockFooterAction[]
  onAction: (action: NadbarBlockFooterAction) => void
}

function NadbarBlockFooterActions({ actions, onAction }: NadbarBlockFooterActionsProps) {
  return (
    <div className="flex flex-col gap-2 pt-1">
      {actions.map((action) => {
        switch (action) {
          case 'createTargetFromVars':
            return (
              <NadbarCreateTargetFromVarsButton
                key={action}
                onClick={() => onAction(action)}
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
