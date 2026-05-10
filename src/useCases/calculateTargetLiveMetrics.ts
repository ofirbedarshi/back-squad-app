import { loadReferencePositionUseCase } from './loadReferencePosition'
import { calculateTargetLiveMetrics } from '../domain/targetLiveMetrics'
import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'

interface CalculateTargetLiveMetricsInput {
  targetCoordinates: string
  targetHeight?: number
}

export function calculateTargetLiveMetricsUseCase(
  input: CalculateTargetLiveMetricsInput
): TargetLiveMetrics | null {
  const referencePosition = loadReferencePositionUseCase()
  if (!referencePosition) {
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
