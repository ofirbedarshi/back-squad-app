import { calculateIndicatorToTargetMetrics } from '../domain/indicatorToTargetMetrics'
import type { IndicatorToTargetMetricsInput } from '../domain/indicatorToTargetMetrics.types'
import type { IndicatorToTargetMetrics } from '../domain/indicatorToTargetMetrics.types'

export function calculateIndicatorToTargetMetricsUseCase(
  input: IndicatorToTargetMetricsInput
): IndicatorToTargetMetrics | null {
  return calculateIndicatorToTargetMetrics(input)
}
