import { formatMetric } from '../utils/metricRounding.ts'
import type { ConcealmentFeasibilityEvaluationInput } from './concealmentFeasibility.types.ts'

function formatMeters(valueMeters: number): string {
  return `${formatMetric(valueMeters)} מ׳`
}

function formatDegrees(valueDegrees: number): string {
  return `${formatMetric(valueDegrees)}°`
}

export function buildConcealmentInputLogs(input: ConcealmentFeasibilityEvaluationInput): string[] {
  return [
    `מרחק הסתר מטרה: ${formatMeters(input.targetToConcealmentRangeMeters)}`,
    `הפרש גובה הסתר מטרה: ${formatMeters(input.targetToConcealmentHeightDifferenceMeters)}`,
  ]
}

export function buildConcealmentSuccessLogs(
  input: ConcealmentFeasibilityEvaluationInput,
  angleDeg: number,
  thresholdDeg: number,
  enabled: boolean,
): string[] {
  const logs = [
    ...buildConcealmentInputLogs(input),
    `זווית גובה מההסתר למטרה: ${formatDegrees(angleDeg)}`,
    `סף זמני: ${formatDegrees(thresholdDeg)}`,
  ]

  if (enabled) {
    logs.push(`זווית הגובה גדולה מהסף ולכן מאפשר (${formatDegrees(angleDeg)} > ${formatDegrees(thresholdDeg)})`)
  } else {
    logs.push(`זווית הגובה אינה גדולה מהסף ולכן לא מאפשר (${formatDegrees(angleDeg)} ≤ ${formatDegrees(thresholdDeg)})`)
  }

  return logs
}
