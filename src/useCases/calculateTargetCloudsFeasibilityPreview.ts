import { computeMaxFlyHeightFromCloudCeiling } from '../domain/cloudsFeasibility'
import { buildCloudsFeasibilityFlightPathResultsByGeneration } from './buildCloudsFeasibilityFlightPathResultsByGeneration'
import { calculateTargetLiveMetricsUseCase } from './calculateTargetLiveMetrics'
import { loadCloudHeight } from './loadCloudHeight'
import type {
  CalculateTargetCloudsFeasibilityPreviewInput,
  TargetCloudsFeasibilityPreview,
} from './calculateTargetCloudsFeasibilityPreview.types'

export function calculateTargetCloudsFeasibilityPreviewUseCase(
  input: CalculateTargetCloudsFeasibilityPreviewInput,
): TargetCloudsFeasibilityPreview | null {
  const { heightMeters: cloudHeightMeters } = loadCloudHeight()
  if (cloudHeightMeters === null) {
    return null
  }

  const metrics = calculateTargetLiveMetricsUseCase({
    targetCoordinates: input.targetCoordinates,
    targetHeight: input.targetHeight,
  })

  if (!metrics) {
    return null
  }

  return {
    cloudCeilingMaxFlyHeightMeters: computeMaxFlyHeightFromCloudCeiling(cloudHeightMeters),
    byGeneration: buildCloudsFeasibilityFlightPathResultsByGeneration({
      positionToTargetRangeMeters: metrics.range,
      positionToTargetHeightDifferenceMeters: metrics.altitudeDiff,
      targetHeightMeters: input.targetHeight ?? 0,
      cloudHeightMeters,
    }),
  }
}
