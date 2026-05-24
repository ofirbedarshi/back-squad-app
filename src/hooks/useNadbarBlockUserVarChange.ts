import { useCallback, type Dispatch, type SetStateAction } from 'react'
import type { Nadbar } from '../domain/nadbar.types'
import {
  getNadbarBlockMessageVars,
  setNadbarBlockMessageVars,
  updateNadbarBlockMessageVar,
} from '../domain/nadbar'
import { clearExtraObstacleGroups, HAS_NEARBY_OBSTACLES_VAR } from '../domain/nadbarObstacles'

export function applyNadbarBlockUserVarChange(
  nadbar: Nadbar,
  blockIndex: number,
  varName: string,
  value: string,
): Nadbar {
  let updated = updateNadbarBlockMessageVar(nadbar, blockIndex, varName, value)

  if (varName === HAS_NEARBY_OBSTACLES_VAR && value === 'שלילי') {
    const blockVars = getNadbarBlockMessageVars(updated, blockIndex)
    updated = setNadbarBlockMessageVars(updated, blockIndex, clearExtraObstacleGroups(blockVars))
  }

  return updated
}

export function useNadbarBlockUserVarChange<T extends Nadbar | null | undefined>(
  setDraftNadbar: Dispatch<SetStateAction<T>>,
) {
  return useCallback(
    (blockIndex: number, varName: string, value: string) => {
      setDraftNadbar((current) =>
        current ? (applyNadbarBlockUserVarChange(current, blockIndex, varName, value) as T) : current,
      )
    },
    [setDraftNadbar],
  )
}
