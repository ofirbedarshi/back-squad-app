import { useMemo } from 'react'
import type { PositionCoordinates } from '../domain/position.types'
import type { TargetCloudsFeasibilityPreview } from '../useCases/calculateTargetCloudsFeasibilityPreview.types'
import { calculateTargetCloudsFeasibilityPreviewUseCase } from '../useCases/calculateTargetCloudsFeasibilityPreview'

export function useTargetCloudsFeasibilityPreview(
  coordinates: PositionCoordinates | undefined,
  altitude: number | undefined,
): TargetCloudsFeasibilityPreview | null {
  return useMemo(
    () =>
      calculateTargetCloudsFeasibilityPreviewUseCase({
        targetCoordinates: coordinates,
        targetHeight: altitude,
      }),
    [coordinates, altitude],
  )
}
