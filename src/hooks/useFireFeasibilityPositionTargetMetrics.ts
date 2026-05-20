import { useMemo } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { PositionToTargetMetrics } from '../domain/positionToTargetMetrics.types'
import { calculatePositionToTargetMetricsUseCase } from '../useCases/calculatePositionToTargetMetrics'

export function useFireFeasibilityPositionTargetMetrics(
  position: Position,
  target: Target,
): PositionToTargetMetrics | null {
  return useMemo(
    () =>
      calculatePositionToTargetMetricsUseCase({
        targetId: target.id,
        positionId: position.id,
        positionCoordinates: position.coordinates,
        positionAltitude: position.altitude,
        targetCoordinates: target.coordinates,
        targetAltitude: target.altitude,
      }),
    [position, target],
  )
}
