import { calculatePositionToTargetMetrics } from '../domain/positionToTargetMetrics'
import type { PositionToTargetMetricsInput } from '../domain/positionToTargetMetrics.types'
import type { PositionToTargetMetrics } from '../domain/positionToTargetMetrics.types'

export function calculatePositionToTargetMetricsUseCase(
  input: PositionToTargetMetricsInput,
): PositionToTargetMetrics | null {
  return calculatePositionToTargetMetrics(input)
}
