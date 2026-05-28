import {
  FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS,
  FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE,
} from './fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResultsByGeneration,
  FireFeasibilityFlightPathPercentByPath,
  FireFeasibilityFlightPathResultsByGeneration,
  FireFeasibilityFormData,
  FireFeasibilityRecord,
  FireFeasibilityRecordInput,
} from './fireFeasibility.types'

export function createEmptyFireFeasibilityFormData(): FireFeasibilityFormData {
  return {
    positionToTargetRange: null,
    positionToTargetHeightDifference: null,
    targetAltitudeMeters: null,
    flightPath: 'flat',
    obstacle: null,
  }
}

export function createFireFeasibilityRecord(input: FireFeasibilityRecordInput): FireFeasibilityRecord {
  return {
    ...input,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
}

export function createNotImplementedCategoryResultsByGeneration(): FireFeasibilityCategoryResultsByGeneration {
  return {
    a: { enabled: false, notes: FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE, logs: [] },
    b: { enabled: false, notes: FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE, logs: [] },
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
