import { useMemo } from 'react'
import type { PositionCoordinates } from '../domain/position.types'
import type { FireFeasibilityFlightPathResultsByGeneration } from '../domain/fireFeasibility.types'
import { calculateTargetHitProbabilityPreviewUseCase } from '../useCases/calculateTargetHitProbabilityPreview'

export function useTargetHitProbabilityPreview(
  coordinates: PositionCoordinates | undefined,
  altitude: number | undefined,
): FireFeasibilityFlightPathResultsByGeneration | null {
  return useMemo(
    () =>
      calculateTargetHitProbabilityPreviewUseCase({
        targetCoordinates: coordinates,
        targetHeight: altitude,
      }),
    [coordinates, altitude],
  )
}
