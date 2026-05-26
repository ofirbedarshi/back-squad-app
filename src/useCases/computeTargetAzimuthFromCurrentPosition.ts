import { calculateTargetLiveMetrics } from '../domain/targetLiveMetrics'
import type { Target } from '../domain/target.types'
import { loadCurrentPositionUseCase } from './loadCurrentPosition'

export function computeTargetAzimuthFromCurrentPositionUseCase(target: Target): number | undefined {
  const currentPosition = loadCurrentPositionUseCase()
  if (!currentPosition) return undefined

  const metrics = calculateTargetLiveMetrics({
    sourceEast: currentPosition.coordinates.east,
    sourceNorth: currentPosition.coordinates.north,
    sourceHeight: currentPosition.altitude,
    targetCoordinates: target.coordinates,
    targetHeight: target.altitude,
  })

  return metrics?.azimuth
}
