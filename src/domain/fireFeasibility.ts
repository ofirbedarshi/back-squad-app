import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import {
  FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE,
} from './fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResultsByGeneration,
  FireFeasibilityFlightPathGenerationResult,
  FireFeasibilityFlightPathPercentByPath,
  FireFeasibilityFlowInit,
  FireFeasibilityFormData,
  FireFeasibilityRecord,
  FireFeasibilityRecordInput,
  FireFeasibilityResults,
} from './fireFeasibility.types'

export function createEmptyFireFeasibilityFormData(): FireFeasibilityFormData {
  return {
    positionToTargetRange: null,
    positionToTargetHeightDifference: null,
    targetAltitudeMeters: null,
    flightPath: 'flat',
    obstacle: null,
    concealment: null,
  }
}

export function createFireFeasibilityRecord(input: FireFeasibilityRecordInput): FireFeasibilityRecord {
  return createWithUpdatedAt(input)
}

export function applyFireFeasibilityRecordUpdate(
  existing: FireFeasibilityRecord,
  input: FireFeasibilityRecordInput,
): FireFeasibilityRecord {
  return applyWithUpdatedAt(existing, input)
}

function resolveRecordFormData(record: FireFeasibilityRecord): FireFeasibilityFormData {
  const savedFormData = 'formData' in record ? record.formData : undefined
  const baseFormData = savedFormData ?? createEmptyFireFeasibilityFormData()

  if (record.mode === 'distances-heights') {
    return {
      ...baseFormData,
      positionToTargetRange: record.rangeMeters,
      positionToTargetHeightDifference: record.heightDifferenceMeters,
    }
  }

  return baseFormData
}

export function getFireFeasibilityFlowInitFromRecord(record: FireFeasibilityRecord): FireFeasibilityFlowInit {
  const formData = resolveRecordFormData(record)

  if (record.mode === 'coords') {
    return {
      mode: record.mode,
      positionId: record.positionId,
      targetId: record.targetId,
      formData,
    }
  }

  return {
    mode: record.mode,
    positionId: record.positionId,
    formData,
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

export function hasAnyFireFeasibilityCategoryEnabled(
  results: Pick<FireFeasibilityResults, 'clouds' | 'obstacles' | 'concealment'>,
): boolean {
  const categories = [results.clouds, results.obstacles, results.concealment]
  return categories.some((byGen) => byGen.a.enabled || byGen.b.enabled)
}
