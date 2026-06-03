import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { resolveLastFilledNadbarBlockTargetId } from '../domain/nadbarBlockTarget'
import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import {
  applyTargetToNadbarGloballyUseCase,
  clearTargetFromNadbarGloballyUseCase,
} from '../useCases/applyTargetToNadbarGlobally'
import { loadTargetsUseCase } from '../useCases/loadTargets'
import type { NadbarBlockFooterActionsByBlock } from '../utils/nadbarMessageFill'
import { nadbarTemplateHasLoadTarget } from '../utils/nadbarMessageFill'
import { useDomainError } from './useDomainError'

export function useNadbarGlobalLoadTargetHandler<T extends Nadbar | null | undefined>(
  draftNadbar: T,
  setDraftNadbar: Dispatch<SetStateAction<T>>,
  blockFooterActions?: NadbarBlockFooterActionsByBlock,
) {
  const { triggerError } = useDomainError()
  const [loadedTargetId, setLoadedTargetId] = useState<string | undefined>()

  const hasLoadTarget = nadbarTemplateHasLoadTarget(blockFooterActions)

  useEffect(() => {
    if (!draftNadbar || !hasLoadTarget) {
      setLoadedTargetId(undefined)
      return
    }
    const resolved = resolveLastFilledNadbarBlockTargetId(draftNadbar, loadTargetsUseCase())
    setLoadedTargetId(resolved)
  }, [draftNadbar, hasLoadTarget])

  const handleLoadTarget = useCallback(
    (target: Target) => {
      if (!draftNadbar) return
      try {
        const { nadbar, azimuthComputed } = applyTargetToNadbarGloballyUseCase(
          draftNadbar,
          target,
          blockFooterActions,
        )
        setDraftNadbar(nadbar as T)
        setLoadedTargetId(target.id)
        if (!azimuthComputed) {
          triggerError('לא ניתן לחשב אמורה — אין עמדה נוכחית')
        }
      } catch (error) {
        triggerError(error instanceof Error ? error.message : 'טעינת המטרה נכשלה')
      }
    },
    [draftNadbar, setDraftNadbar, blockFooterActions, triggerError],
  )

  const handleClearLoadedTarget = useCallback(() => {
    if (!draftNadbar) return
    try {
      setDraftNadbar(
        clearTargetFromNadbarGloballyUseCase(draftNadbar, blockFooterActions) as T,
      )
      setLoadedTargetId(undefined)
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'ניקוי המטרה נכשל')
    }
  }, [draftNadbar, setDraftNadbar, blockFooterActions, triggerError])

  return {
    loadedTargetId,
    handleLoadTarget,
    handleClearLoadedTarget,
  }
}
