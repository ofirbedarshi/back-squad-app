import type { FireFeasibilityFlightPathResultsByGeneration } from '../domain/fireFeasibility.types'
import { buildHitProbabilityFlightPathResultsByGeneration } from './buildHitProbabilityFlightPathResultsByGeneration'
import { calculateTargetLiveMetricsUseCase } from './calculateTargetLiveMetrics'
import type { CalculateTargetHitProbabilityPreviewInput } from './calculateTargetHitProbabilityPreview.types'

export function calculateTargetHitProbabilityPreviewUseCase(
  input: CalculateTargetHitProbabilityPreviewInput,
): FireFeasibilityFlightPathResultsByGeneration | null {
  const metrics = calculateTargetLiveMetricsUseCase({
    targetCoordinates: input.targetCoordinates,
    targetHeight: input.targetHeight,
  })

  if (!metrics) {
    return null
  }

  return buildHitProbabilityFlightPathResultsByGeneration({
    positionToTargetRangeMeters: metrics.range,
    positionToTargetHeightDifferenceMeters: metrics.altitudeDiff,
  })
}
