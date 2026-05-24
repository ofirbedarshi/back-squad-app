import { useCallback, type Dispatch, type SetStateAction } from 'react'
import type { Nadbar } from '../domain/nadbar.types'
import { getNadbarBlockMessageVars, setNadbarBlockMessageVars } from '../domain/nadbar'
import { addNextObstacleGroup } from '../domain/nadbarObstacles'
import { useDomainError } from './useDomainError'

export function useNadbarBlockAddObstacleHandler<T extends Nadbar | null | undefined>(
  draftNadbar: T,
  setDraftNadbar: Dispatch<SetStateAction<T>>,
) {
  const { triggerError } = useDomainError()

  const handleAddObstacle = useCallback(
    (blockIndex: number) => {
      if (!draftNadbar) return
      try {
        const blockVars = getNadbarBlockMessageVars(draftNadbar, blockIndex)
        const nextVars = addNextObstacleGroup(blockVars)
        setDraftNadbar(setNadbarBlockMessageVars(draftNadbar, blockIndex, nextVars) as T)
      } catch (error) {
        triggerError(error instanceof Error ? error.message : 'הוספת הסתר נכשלה')
      }
    },
    [draftNadbar, setDraftNadbar, triggerError],
  )

  return { handleAddObstacle }
}
