import { loadReferencePositionUseCase } from './loadReferencePosition'
import { calculateTargetLiveMetrics } from '../domain/targetLiveMetrics'
import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'
import type { PositionCoordinates } from '../domain/position.types'

interface CalculateTargetLiveMetricsInput {
  targetCoordinates: PositionCoordinates | undefined
  targetHeight?: number
}

export function calculateTargetLiveMetricsUseCase(
  input: CalculateTargetLiveMetricsInput
): TargetLiveMetrics | null {
  const referencePosition = loadReferencePositionUseCase()
  if (!referencePosition || !input.targetCoordinates) {
    return null
  }

  return calculateTargetLiveMetrics({
    sourceEast: referencePosition.coordinates.east,
    sourceNorth: referencePosition.coordinates.north,
    sourceHeight: referencePosition.altitude,
    targetCoordinates: input.targetCoordinates,
    targetHeight: input.targetHeight,
  })
}
