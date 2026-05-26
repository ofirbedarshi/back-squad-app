import { cloudsFeasibilityLookupData } from './cloudsFeasibilityLookup.generated.ts'
import type {
  CloudsFeasibilityEvaluationInput,
  CloudsFeasibilityEvaluationResult,
  CloudsFeasibilityNumericBand,
  CloudsFeasibilityTrajectory,
} from './cloudsFeasibility.types.ts'
import {
  CloudsFeasibilityOutOfTableError,
  isCloudsFeasibilityOutOfTableError,
} from './errors.ts'

export const CLOUDS_FEASIBILITY_TOLERANCE_METERS = 100

export const CLOUDS_FLAT_FLIGHT_PATH_NOTE = 'מסלול flat תמיד מאפשר בחישוב עננים'

export const CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE = 'lofted+ לא נתמך בדור א׳'

export const CLOUDS_OUT_OF_TABLE_NOTE = 'ערכים מחוץ לטבלת הערכים'

const { heightBands, rangeBands, lookup } = cloudsFeasibilityLookupData

function findBand(
  bands: CloudsFeasibilityNumericBand[],
  valueMeters: number,
  _axisLabel: string,
): CloudsFeasibilityNumericBand {
  const band = bands.find((b) => valueMeters >= b.min && valueMeters < b.max)
  if (!band) {
    throw new CloudsFeasibilityOutOfTableError()
  }
  return band
}

function assertFiniteMeters(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} לא תקין`)
  }
}

export function assertCloudsFlightPath(
  flightPath: string,
): asserts flightPath is CloudsFeasibilityTrajectory {
  if (flightPath === 'low' || flightPath === 'lofted') {
    return
  }
  throw new Error('מסלול מעוף לא תקין לחישוב עננים')
}

export function lookupCloudsTableValue(
  heightDifferenceMeters: number,
  rangeMeters: number,
  trajectory: CloudsFeasibilityTrajectory,
): number {
  if (!Number.isFinite(heightDifferenceMeters)) {
    throw new Error('הפרש גובה לא תקין')
  }
  if (!Number.isFinite(rangeMeters)) {
    throw new Error('טווח לא תקין')
  }

  const heightBand = findBand(heightBands, heightDifferenceMeters, 'הפרש גובה')
  const rangeBand = findBand(rangeBands, rangeMeters, 'טווח')

  const key = `${heightBand.id}|${rangeBand.id}`
  const cell = lookup[key]
  const value = cell?.[trajectory]
  if (value === undefined) {
    throw new CloudsFeasibilityOutOfTableError()
  }

  return value
}

// דור א׳ — lookup table from clouds-generation-a.xlsx
export function evaluateCloudsFeasibility(
  input: CloudsFeasibilityEvaluationInput,
): CloudsFeasibilityEvaluationResult {
  if (input.flightPath === 'flat') {
    return {
      enabled: true,
      notes: CLOUDS_FLAT_FLIGHT_PATH_NOTE,
    }
  }

  if (input.flightPath === '+lofted') {
    return {
      enabled: false,
      notes: CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE,
    }
  }

  assertCloudsFlightPath(input.flightPath)
  assertFiniteMeters(input.targetHeightMeters, 'גובה מטרה')
  assertFiniteMeters(input.cloudHeightMeters, 'גובה עננים')

  try {
    const lookupValue = lookupCloudsTableValue(
      input.positionToTargetHeightDifferenceMeters,
      input.positionToTargetRangeMeters,
      input.flightPath,
    )

    const computed =
      lookupValue + input.targetHeightMeters + CLOUDS_FEASIBILITY_TOLERANCE_METERS

    return {
      lookupValue,
      computed,
      enabled: computed < input.cloudHeightMeters,
      notes: '',
    }
  } catch (error) {
    if (isCloudsFeasibilityOutOfTableError(error)) {
      return {
        enabled: true,
        notes: CLOUDS_OUT_OF_TABLE_NOTE,
      }
    }
    throw error
  }
}

export function evaluateCloudsFeasibilityGenB(
  _input: CloudsFeasibilityEvaluationInput,
): CloudsFeasibilityEvaluationResult {
  return { enabled: true, notes: '' }
}
