import { useCallback, type Dispatch, type SetStateAction } from 'react'
import type { Nadbar, NadbarBlockFooterAction } from '../domain/nadbar.types'
import { createTargetFromNadbarVarsAndPropagateUseCase } from '../useCases/createTargetFromNadbarVarsAndPropagate'
import { useDomainError } from './useDomainError'
import { useNotification } from './useNotification'

export function useNadbarBlockFooterActionHandler<T extends Nadbar | null | undefined>(
  draftNadbar: T,
  setDraftNadbar: Dispatch<SetStateAction<T>>,
) {
  const { notifySuccess } = useNotification()
  const { triggerError } = useDomainError()

  return useCallback(
    (blockIndex: number, action: NadbarBlockFooterAction) => {
      switch (action) {
        case 'createTargetFromVars': {
          if (!draftNadbar) return
          try {
            const updated = createTargetFromNadbarVarsAndPropagateUseCase(draftNadbar, blockIndex)
            setDraftNadbar(updated as T)
            notifySuccess('המטרה נוספה בהצלחה')
          } catch (error) {
            triggerError(error instanceof Error ? error.message : 'יצירת המטרה נכשלה')
          }
          return
        }
      }
    },
    [draftNadbar, setDraftNadbar, notifySuccess, triggerError],
  )
}
