import { loadCurrentPosition } from '../storage/positionStorage'
import { calculateTargetLiveMetrics } from '../domain/targetLiveMetrics'
import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'

interface CalculateTargetLiveMetricsInput {
  targetCoordinates: string
  targetHeight?: number
}

export function calculateTargetLiveMetricsUseCase(
  input: CalculateTargetLiveMetricsInput
): TargetLiveMetrics | null {
  const currentPosition = loadCurrentPosition()
  if (!currentPosition) {
    return null
  }

  return calculateTargetLiveMetrics({
    sourceEast: currentPosition.coordinates.east,
    sourceNorth: currentPosition.coordinates.north,
    sourceHeight: currentPosition.altitude,
    targetCoordinates: input.targetCoordinates,
    targetHeight: input.targetHeight,
  })
}
