import { useMemo } from 'react'
import { useReferencePosition } from './useReferencePosition'
import { calculateTargetLiveMetrics } from '../domain/targetLiveMetrics'
import type { PositionCoordinates } from '../domain/position.types'
import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'

export function useTargetLiveMetrics(
  coordinates: PositionCoordinates | undefined,
  altitude: number | undefined
): TargetLiveMetrics | null {
  const referencePosition = useReferencePosition()

  return useMemo(() => {
    if (!referencePosition || !coordinates) return null

    return calculateTargetLiveMetrics({
      sourceEast: referencePosition.coordinates.east,
      sourceNorth: referencePosition.coordinates.north,
      sourceHeight: referencePosition.altitude,
      targetCoordinates: coordinates,
      targetHeight: altitude,
    })
  }, [referencePosition, coordinates, altitude])
}
