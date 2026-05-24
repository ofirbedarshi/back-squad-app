import { useCallback } from 'react'
import type { NadbarBlockFooterAction, NadbarMessageUserVars } from '../domain/nadbar.types'
import { createTargetFromPointerTeamUpdatedVarsUseCase } from '../useCases/createTargetFromPointerTeamUpdatedVars'
import { useDomainError } from './useDomainError'
import { useNotification } from './useNotification'

export function useNadbarBlockFooterActionHandler(getMessageVars: () => NadbarMessageUserVars | undefined) {
  const { notifySuccess } = useNotification()
  const { triggerError } = useDomainError()

  return useCallback(
    (action: NadbarBlockFooterAction) => {
      switch (action) {
        case 'createTargetFromVars': {
          const messageVars = getMessageVars()
          if (!messageVars) return
          try {
            createTargetFromPointerTeamUpdatedVarsUseCase(messageVars)
            notifySuccess('המטרה נוספה בהצלחה')
          } catch (error) {
            triggerError(error instanceof Error ? error.message : 'יצירת המטרה נכשלה')
          }
          return
        }
      }
    },
    [getMessageVars, notifySuccess, triggerError],
  )
}
