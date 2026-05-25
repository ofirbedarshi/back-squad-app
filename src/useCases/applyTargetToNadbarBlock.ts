import {
  applyTargetToNadbarBlocksFrom,
  clearTargetDerivedBlockVarsFrom,
} from '../domain/nadbarTargetToVars'
import { calculateTargetLiveMetrics } from '../domain/targetLiveMetrics'
import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { loadCurrentPositionUseCase } from './loadCurrentPosition'

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

  const currentPosition = loadCurrentPositionUseCase()
  let azimuth: number | undefined

  if (currentPosition) {
    const metrics = calculateTargetLiveMetrics({
      sourceEast: currentPosition.coordinates.east,
      sourceNorth: currentPosition.coordinates.north,
      sourceHeight: currentPosition.altitude,
      targetCoordinates: target.coordinates,
      targetHeight: target.altitude,
    })
    azimuth = metrics?.azimuth
  }

  const updated = applyTargetToNadbarBlocksFrom(nadbar, blockIndex, target, azimuth)
  return { nadbar: updated, azimuthComputed: azimuth != null }
}

export function clearTargetFromNadbarBlockUseCase(nadbar: Nadbar, blockIndex: number): Nadbar {
  if (!nadbar.messageBlocks[blockIndex]) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  return clearTargetDerivedBlockVarsFrom(nadbar, blockIndex)
}
