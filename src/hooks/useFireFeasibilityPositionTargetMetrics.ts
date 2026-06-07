import { useMemo } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { PositionToTargetMetrics } from '../domain/positionToTargetMetrics.types'
import { calculatePositionToTargetMetricsUseCase } from '../useCases/calculatePositionToTargetMetrics'

export function useFireFeasibilityPositionTargetMetrics(
  position: Position | undefined,
  target: Target | undefined,
): PositionToTargetMetrics | null {
  return useMemo(() => {
    if (!position || !target) {
      return null
    }
    return calculatePositionToTargetMetricsUseCase({
      targetId: target.id,
      positionId: position.id,
      positionCoordinates: position.coordinates,
      positionAltitude: position.altitude,
      targetCoordinates: target.coordinates,
      targetAltitude: target.altitude,
    })
  }, [position, target])
}
