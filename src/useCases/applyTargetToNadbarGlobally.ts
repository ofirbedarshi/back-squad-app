import {
  clearNadbarBlockUserVarsAtIndices,
  getNadbarGlobalTargetChangeResetBlockIndices,
} from '../domain/nadbarTargetToVars'
import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import {
  nadbarTemplateHasLoadTarget,
  type NadbarBlockFooterActionsByBlock,
} from '../utils/nadbarMessageFill'
import {
  applyTargetToNadbarBlockUseCase,
  clearTargetFromNadbarBlockUseCase,
  type ApplyTargetToNadbarBlockResult,
} from './applyTargetToNadbarBlock'

/** Single nadbar-wide target: apply/clear from first block through last. */
const GLOBAL_TARGET_APPLY_START_BLOCK_INDEX = 0

const NO_LOAD_TARGET_BLOCKS_MESSAGE = 'תבנית הנדבר אינה תומכת בטעינת מטרה'

export function applyTargetToNadbarGloballyUseCase(
  nadbar: Nadbar,
  target: Target,
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
): ApplyTargetToNadbarBlockResult {
  if (!nadbarTemplateHasLoadTarget(blockFooterActions)) {
    throw new Error(NO_LOAD_TARGET_BLOCKS_MESSAGE)
  }
  const resetIndices = getNadbarGlobalTargetChangeResetBlockIndices(nadbar, blockFooterActions)
  const cleared = clearNadbarBlockUserVarsAtIndices(nadbar, resetIndices)
  return applyTargetToNadbarBlockUseCase(
    cleared,
    GLOBAL_TARGET_APPLY_START_BLOCK_INDEX,
    target,
  )
}

export function clearTargetFromNadbarGloballyUseCase(
  nadbar: Nadbar,
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
): Nadbar {
  if (!nadbarTemplateHasLoadTarget(blockFooterActions)) {
    throw new Error(NO_LOAD_TARGET_BLOCKS_MESSAGE)
  }
  const resetIndices = getNadbarGlobalTargetChangeResetBlockIndices(nadbar, blockFooterActions)
  const clearedUserVars = clearNadbarBlockUserVarsAtIndices(nadbar, resetIndices)
  return clearTargetFromNadbarBlockUseCase(
    clearedUserVars,
    GLOBAL_TARGET_APPLY_START_BLOCK_INDEX,
  )
}
