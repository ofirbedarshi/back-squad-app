import {
  FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE,
} from './fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResultsByGeneration,
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
