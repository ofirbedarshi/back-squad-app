import { getNadbarBlockMessageVars } from '../domain/nadbar'
import { propagateTargetDerivedVarsFromBlock } from '../domain/nadbarTargetToVars'
import type { Nadbar } from '../domain/nadbar.types'
import { createTargetFromNadbarVarsUseCase } from './createTargetFromNadbarVars'

export function createTargetFromNadbarVarsAndPropagateUseCase(
  nadbar: Nadbar,
  blockIndex: number,
): Nadbar {
  if (!nadbar.messageBlocks[blockIndex]) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  const vars = getNadbarBlockMessageVars(nadbar, blockIndex)
  createTargetFromNadbarVarsUseCase(vars)
  return propagateTargetDerivedVarsFromBlock(nadbar, blockIndex)
}
