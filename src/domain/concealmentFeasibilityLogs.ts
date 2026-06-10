import { formatMetric } from '../utils/metricRounding'
import { FLIGHT_PATH_OPTIONS } from './fireFeasibility.constants'
import type {
  EvaluateConcealmentFeasibilityInput,
  ConcealmentLookupResult,
} from './concealmentFeasibility.types'

function formatMeters(v: number): string {
  return `${formatMetric(v)} מ׳`
}

function formatKm(v: number): string {
  return `${formatMetric(v / 1000)} ק"מ`
}

function formatDeg(v: number): string {
  return `${formatMetric(v)}°`
}

function flightPathLabel(flightPath: string): string {
  const option = FLIGHT_PATH_OPTIONS.find((item) => item.value === flightPath)
  return option?.label ?? flightPath
}

export function buildConcealmentInputLogs(input: EvaluateConcealmentFeasibilityInput): string[] {
  return [
    `טווח עמדה-מטרה: ${formatMeters(input.positionToTargetRangeMeters)} (${formatKm(input.positionToTargetRangeMeters)})`,
    `הפרש גבהים עמדה-מטרה: ${formatMeters(input.positionToTargetHeightDifferenceMeters)}`,
    `מסלול מעוף: ${flightPathLabel(input.flightPath)}`,
    `מרחק הסתר ממטרה: ${formatMeters(input.concealment.targetToConcealmentRangeMeters)}`,
    `הפרש גובה הסתר ממטרה: ${formatMeters(input.concealment.targetToConcealmentHeightDifferenceMeters)}`,
  ]
}

export function buildConcealmentNoteLogs(
  input: EvaluateConcealmentFeasibilityInput,
  note: string,
): string[] {
  return [...buildConcealmentInputLogs(input), note]
}

export function buildConcealmentLookupLogs(
  input: EvaluateConcealmentFeasibilityInput,
  result: ConcealmentLookupResult,
  enabled: boolean,
): string[] {
  const logs = [...buildConcealmentInputLogs(input)]

  logs.push(`זווית גובה הסתר ממטרה: ${formatDeg(result.concealmentAngleDeg)}`)
  logs.push(`מרחק נקודת בדיקה ממטרה: ${formatMeters(result.rangeFromTargetMeters)}`)

  if (result.wasRangeRounded) {
    logs.push(
      `טווח עמדה-מטרה עוגל מטה לטבלה: ${formatMeters(input.positionToTargetRangeMeters)} → ${formatMeters(result.roundedPositionToTargetRangeMeters)}`,
    )
  }

  logs.push(`מרחק נקודת בדיקה מהעמדה: ${formatMeters(result.distFromPositionMeters)}`)
  logs.push(`גובה טיל מעל העמדה (טבלה): ${formatMeters(result.missileHeightAbovePositionMeters)}`)
  logs.push(`גובה טיל מעל המטרה (מחושב): ${formatMeters(result.missileHeightAboveTargetMeters)}`)
  logs.push(`זווית גובה הטיל ממטרה: ${formatDeg(result.missileAngleDeg)}`)

  if (enabled) {
    logs.push(
      `זווית הטיל גדולה מזווית ההסתר — מאפשר (${formatDeg(result.missileAngleDeg)} > ${formatDeg(result.concealmentAngleDeg)})`,
    )
  } else {
    logs.push(
      `זווית הטיל אינה גדולה מזווית ההסתר — לא מאפשר (${formatDeg(result.missileAngleDeg)} ≤ ${formatDeg(result.concealmentAngleDeg)})`,
    )
  }

  return logs
}
