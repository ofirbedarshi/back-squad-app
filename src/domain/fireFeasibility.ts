import {
  FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE,
} from './fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResultsByGeneration,
  FireFeasibilityFlightPathGenerationResult,
  FireFeasibilityFlightPathPercentByPath,
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

export function createNotImplementedHitProbabilityPercentByPath(): FireFeasibilityFlightPathPercentByPath {
  return {
    flat: 0,
    low: 0,
    lofted: 0,
    '+lofted': 0,
  }
}

export function createNotImplementedHitProbabilityGenerationResult(): FireFeasibilityFlightPathGenerationResult {
  return {
    percentByFlightPath: createNotImplementedHitProbabilityPercentByPath(),
    logs: [],
  }
}
