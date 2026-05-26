import {
  applyTargetToNadbarBlocksFrom,
  clearTargetDerivedBlockVarsFrom,
} from '../domain/nadbarTargetToVars'
import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { computeTargetAzimuthFromCurrentPositionUseCase } from './computeTargetAzimuthFromCurrentPosition'

export interface ApplyTargetToNadbarBlockResult {
  nadbar: Nadbar
  azimuthComputed: boolean
}

export function applyTargetToNadbarBlockUseCase(
  nadbar: Nadbar,
  blockIndex: number,
  target: Target,
): ApplyTargetToNadbarBlockResult {
  const block = nadbar.messageBlocks[blockIndex]
  if (!block) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  const azimuth = computeTargetAzimuthFromCurrentPositionUseCase(target)
  const updated = applyTargetToNadbarBlocksFrom(nadbar, blockIndex, target, azimuth)
  return { nadbar: updated, azimuthComputed: azimuth != null }
}

export function clearTargetFromNadbarBlockUseCase(nadbar: Nadbar, blockIndex: number): Nadbar {
  if (!nadbar.messageBlocks[blockIndex]) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  return clearTargetDerivedBlockVarsFrom(nadbar, blockIndex)
}
