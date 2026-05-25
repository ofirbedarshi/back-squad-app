import { useCallback, useState, type Dispatch, type SetStateAction } from 'react'
import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import {
  applyTargetToNadbarBlockUseCase,
  clearTargetFromNadbarBlockUseCase,
} from '../useCases/applyTargetToNadbarBlock'
import { isNadbarBlockHasLoadTarget, type NadbarBlockFooterActionsByBlock } from '../utils/nadbarMessageFill'
import { useDomainError } from './useDomainError'

function setLoadTargetIdsFromBlock(
  ids: Record<number, string | undefined>,
  blockIndex: number,
  blockCount: number,
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
  targetId: string,
): Record<number, string | undefined> {
  const next = { ...ids }
  for (let i = blockIndex; i < blockCount; i++) {
    if (isNadbarBlockHasLoadTarget(blockFooterActions, i)) {
      next[i] = targetId
    }
  }
  return next
}

function clearLoadTargetIdsFromBlock(
  ids: Record<number, string | undefined>,
  blockIndex: number,
  blockCount: number,
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
): Record<number, string | undefined> {
  const next = { ...ids }
  for (let i = blockIndex; i < blockCount; i++) {
    if (isNadbarBlockHasLoadTarget(blockFooterActions, i)) {
      delete next[i]
    }
  }
  return next
}

export function useNadbarBlockLoadTargetHandler<T extends Nadbar | null | undefined>(
  draftNadbar: T,
  setDraftNadbar: Dispatch<SetStateAction<T>>,
  blockFooterActions?: NadbarBlockFooterActionsByBlock,
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
        setBlockLoadedTargetIds((ids) =>
          setLoadTargetIdsFromBlock(
            ids,
            blockIndex,
            nadbar.messageBlocks.length,
            blockFooterActions,
            target.id,
          ),
        )
        if (!azimuthComputed) {
          triggerError('לא ניתן לחשב אמורה — אין עמדה נוכחית')
        }
      } catch (error) {
        triggerError(error instanceof Error ? error.message : 'טעינת המטרה נכשלה')
      }
    },
    [draftNadbar, setDraftNadbar, blockFooterActions, triggerError],
  )

  const handleClearLoadedTarget = useCallback(
    (blockIndex: number) => {
      if (!draftNadbar) return
      try {
        setDraftNadbar(clearTargetFromNadbarBlockUseCase(draftNadbar, blockIndex) as T)
        setBlockLoadedTargetIds((ids) =>
          clearLoadTargetIdsFromBlock(
            ids,
            blockIndex,
            draftNadbar.messageBlocks.length,
            blockFooterActions,
          ),
        )
      } catch (error) {
        triggerError(error instanceof Error ? error.message : 'ניקוי המטרה נכשל')
      }
    },
    [draftNadbar, setDraftNadbar, blockFooterActions, triggerError],
  )

  return {
    blockLoadedTargetIds,
    handleLoadTarget,
    handleClearLoadedTarget,
  }
}
