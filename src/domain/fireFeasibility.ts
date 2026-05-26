import {
  FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS,
  FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE,
} from './fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResultsByGeneration,
  FireFeasibilityFlightPathPercentByPath,
  FireFeasibilityFlightPathResultsByGeneration,
  FireFeasibilityRecord,
  FireFeasibilityRecordInput,
} from './fireFeasibility.types'

export function createFireFeasibilityRecord(input: FireFeasibilityRecordInput): FireFeasibilityRecord {
  return {
    ...input,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
}

export function createNotImplementedCategoryResultsByGeneration(): FireFeasibilityCategoryResultsByGeneration {
  return {
    a: { enabled: false, notes: FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE },
    b: { enabled: false, notes: FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE },
  }
}

function createMockFlightPathPercentByPath(percent: number): FireFeasibilityFlightPathPercentByPath {
  return Object.fromEntries(
    FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS.map((row) => [row.value, percent]),
  ) as FireFeasibilityFlightPathPercentByPath
}

export function createMockFlightPathResultsByGeneration(
  percent = 0,
): FireFeasibilityFlightPathResultsByGeneration {
  const percentByPath = createMockFlightPathPercentByPath(percent)
  return {
    a: percentByPath,
    b: percentByPath,
  }
}
