import { FLIGHT_PATH_OPTIONS } from './fireFeasibility.constants.ts'
import type {
  CloudsFeasibilityEvaluationInput,
  CloudsFeasibilityTableTrajectory,
  CloudsTableLookupContext,
} from './cloudsFeasibility.types.ts'

function formatMeters(valueMeters: number): string {
  return `${valueMeters} מ׳`
}

function flightPathLabel(flightPath: string): string {
  const option = FLIGHT_PATH_OPTIONS.find((o) => o.value === flightPath)
  return option?.label ?? flightPath
}

function trajectoryColumnLabel(trajectory: CloudsFeasibilityTableTrajectory): string {
  if (trajectory === 'low') return 'lw'
  if (trajectory === 'lofted') return 'L'
  return 'L+'
}

export function buildCloudsInputLogs(input: CloudsFeasibilityEvaluationInput): string[] {
  return [
    `הפרש גבהים: ${formatMeters(input.positionToTargetHeightDifferenceMeters)}`,
    `טווח בין עמדה למטרה: ${formatMeters(input.positionToTargetRangeMeters)}`,
    `מסלול מעוף: ${flightPathLabel(input.flightPath)}`,
  ]
}

export function buildCloudsNoteLogs(
  input: CloudsFeasibilityEvaluationInput,
  note: string,
): string[] {
  return [...buildCloudsInputLogs(input), note]
}

export function buildCloudsTableSuccessLogs(
  input: CloudsFeasibilityEvaluationInput,
  lookup: CloudsTableLookupContext,
  trajectory: CloudsFeasibilityTableTrajectory,
  computed: number,
  enabled: boolean,
  toleranceMeters: number,
): string[] {
  const column = trajectoryColumnLabel(trajectory)
  const logs = [
    ...buildCloudsInputLogs(input),
    `תא טבלה (טווח ${lookup.rangeBand.label}, הפרש גובה ${lookup.heightBand.label}, עמודה ${column}): ${formatMeters(lookup.value)}`,
    `גובה עננים מקסימלי = ערך טבלה + גובה מטרה + טולרנס ${toleranceMeters} = ${lookup.value} + ${input.targetHeightMeters} + ${toleranceMeters} = ${formatMeters(computed)}`,
    `גובה עננים: ${formatMeters(input.cloudHeightMeters)}`,
  ]

  if (enabled) {
    logs.push(
      `גובה עננים גדול מגובה עננים מקסימלי ולכן מאפשר (${formatMeters(input.cloudHeightMeters)} > ${formatMeters(computed)})`,
    )
  } else {
    logs.push(
      `גובה עננים אינו גדול מגובה עננים מקסימלי ולכן לא מאפשר (${formatMeters(input.cloudHeightMeters)} ≤ ${formatMeters(computed)})`,
    )
  }

  return logs
}
