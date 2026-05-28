import { FLIGHT_PATH_OPTIONS } from './fireFeasibility.constants.ts'
import { formatMetric } from '../utils/metricRounding.ts'
import type {
  ObstaclesFeasibilityEvaluationInput,
  ObstaclesFeasibilityLookupContext,
} from './obstaclesFeasibility.types.ts'

function formatMeters(valueMeters: number): string {
  return `${formatMetric(valueMeters)} מ׳`
}

function flightPathLabel(flightPath: string): string {
  const option = FLIGHT_PATH_OPTIONS.find((item) => item.value === flightPath)
  return option?.label ?? flightPath
}

export interface BuildObstaclesInputLogsInput {
  positionToTargetRangeMeters: number
  positionToTargetHeightDifferenceMeters: number
  flightPath: string
  obstacle: ObstaclesFeasibilityEvaluationInput
}

export function buildObstaclesInputLogs(input: BuildObstaclesInputLogsInput): string[] {
  return [
    `טווח עמדה-מטרה: ${formatMeters(input.positionToTargetRangeMeters)}`,
    `הפרש גבהים עמדה-מטרה: ${formatMeters(input.positionToTargetHeightDifferenceMeters)}`,
    `מסלול מעוף: ${flightPathLabel(input.flightPath)}`,
    `מרחק מכשול מהעמדה: ${formatMeters(input.obstacle.positionToObstacleRangeMeters)}`,
    `גובה מכשול מעל העמדה: ${formatMeters(input.obstacle.positionToObstacleHeightDifferenceMeters)}`,
  ]
}

export function buildObstaclesNoteLogs(input: BuildObstaclesInputLogsInput, note: string): string[] {
  return [...buildObstaclesInputLogs(input), note]
}

export function buildObstaclesLookupSuccessLogs(
  input: BuildObstaclesInputLogsInput,
  lookup: ObstaclesFeasibilityLookupContext,
  enabled: boolean,
): string[] {
  const logs = [
    ...buildObstaclesInputLogs(input),
    `תא טבלה (key: ${lookup.key}, מסלול ${lookup.trajectory}): ${formatMeters(lookup.missileHeightAbovePositionMeters)}`,
  ]

  if (enabled) {
    logs.push(
      `גובה מכשול אינו גדול מגובה הטיל ולכן מאפשר (${formatMeters(input.obstacle.positionToObstacleHeightDifferenceMeters)} ≤ ${formatMeters(lookup.missileHeightAbovePositionMeters)})`,
    )
  } else {
    logs.push(
      `גובה מכשול גדול מגובה הטיל ולכן לא מאפשר (${formatMeters(input.obstacle.positionToObstacleHeightDifferenceMeters)} > ${formatMeters(lookup.missileHeightAbovePositionMeters)})`,
    )
  }

  return logs
}
