import { useCallback, useState, type Dispatch, type SetStateAction } from 'react'
import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import {
  applyTargetToNadbarBlockUseCase,
  clearTargetFromNadbarBlockUseCase,
} from '../useCases/applyTargetToNadbarBlock'
import { useDomainError } from './useDomainError'

export function useNadbarBlockLoadTargetHandler<T extends Nadbar | null | undefined>(
  draftNadbar: T,
  setDraftNadbar: Dispatch<SetStateAction<T>>,
) {
  const { triggerError } = useDomainError()
  const [blockLoadedTargetIds, setBlockLoadedTargetIds] = useState<Record<number, string | undefined>>({})

  const handleLoadTarget = useCallback(
    (blockIndex: number, target: Target) => {
      if (!draftNadbar) return
      try {
        const { nadbar, azimuthComputed } = applyTargetToNadbarBlockUseCase(
          draftNadbar,
          blockIndex,
          target,
        )
        setDraftNadbar(nadbar as T)
        setBlockLoadedTargetIds((ids) => ({ ...ids, [blockIndex]: target.id }))
        if (!azimuthComputed) {
          triggerError('לא ניתן לחשב אמורה — אין עמדה נוכחית')
        }
      } catch (error) {
        triggerError(error instanceof Error ? error.message : 'טעינת המטרה נכשלה')
      }
    },
    [draftNadbar, setDraftNadbar, triggerError],
  )

  const handleClearLoadedTarget = useCallback(
    (blockIndex: number) => {
      if (!draftNadbar) return
      try {
        setDraftNadbar(clearTargetFromNadbarBlockUseCase(draftNadbar, blockIndex) as T)
        setBlockLoadedTargetIds((ids) => {
          const next = { ...ids }
          delete next[blockIndex]
          return next
        })
      } catch (error) {
        triggerError(error instanceof Error ? error.message : 'ניקוי המטרה נכשל')
      }
    },
    [draftNadbar, setDraftNadbar, triggerError],
  )

  return {
    blockLoadedTargetIds,
    handleLoadTarget,
    handleClearLoadedTarget,
  }
}
