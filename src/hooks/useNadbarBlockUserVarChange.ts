import { useCallback, type Dispatch, type SetStateAction } from 'react'
import type { Nadbar } from '../domain/nadbar.types'
import {
  getNadbarBlockMessageVars,
  setNadbarBlockMessageVars,
  updateNadbarBlockMessageVar,
} from '../domain/nadbar'
import { clearExtraObstacleGroups, HAS_NEARBY_OBSTACLES_VAR } from '../domain/nadbarObstacles'
import {
  isNadbarTargetVarLoadOnly,
  type NadbarBlockFooterActionsByBlock,
} from '../utils/nadbarMessageFill'

export function applyNadbarBlockUserVarChange(
  nadbar: Nadbar,
  blockIndex: number,
  varName: string,
  value: string,
  blockFooterActions?: NadbarBlockFooterActionsByBlock,
): Nadbar {
  if (isNadbarTargetVarLoadOnly(blockFooterActions, blockIndex, varName)) {
    return nadbar
  }

  let updated = updateNadbarBlockMessageVar(nadbar, blockIndex, varName, value)

  if (varName === HAS_NEARBY_OBSTACLES_VAR && value === 'שלילי') {
    const blockVars = getNadbarBlockMessageVars(updated, blockIndex)
    updated = setNadbarBlockMessageVars(updated, blockIndex, clearExtraObstacleGroups(blockVars))
  }

  return updated
}

export function useNadbarBlockUserVarChange<T extends Nadbar | null | undefined>(
  setDraftNadbar: Dispatch<SetStateAction<T>>,
  blockFooterActions?: NadbarBlockFooterActionsByBlock,
) {
  return useCallback(
    (blockIndex: number, varName: string, value: string) => {
      setDraftNadbar((current) =>
        current
          ? (applyNadbarBlockUserVarChange(
              current,
              blockIndex,
              varName,
              value,
              blockFooterActions,
            ) as T)
          : current,
      )
    },
    [setDraftNadbar, blockFooterActions],
  )
}
