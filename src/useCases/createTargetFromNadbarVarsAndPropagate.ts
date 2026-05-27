import { getNadbarBlockMessageVars, updateNadbarBlockMessageVar } from '../domain/nadbar'
import { propagateTargetDerivedVarsFromBlock } from '../domain/nadbarTargetToVars'
import { formatLiveMetric } from '../domain/targetLiveMetrics'
import type { Nadbar } from '../domain/nadbar.types'
import { computeTargetAzimuthFromCurrentPositionUseCase } from './computeTargetAzimuthFromCurrentPosition'
import { createTargetFromNadbarVarsUseCase } from './createTargetFromNadbarVars'

export function createTargetFromNadbarVarsAndPropagateUseCase(
  nadbar: Nadbar,
  blockIndex: number,
): Nadbar {
  if (!nadbar.messageBlocks[blockIndex]) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  const vars = getNadbarBlockMessageVars(nadbar, blockIndex)
  const target = createTargetFromNadbarVarsUseCase(vars)
  const azimuth = computeTargetAzimuthFromCurrentPositionUseCase(target)
  let withAmura = nadbar
  if (azimuth != null) {
    withAmura = updateNadbarBlockMessageVar(
      nadbar,
      blockIndex,
      'amura',
      formatLiveMetric(azimuth),
    )
  }
  return propagateTargetDerivedVarsFromBlock(withAmura, blockIndex)
}
