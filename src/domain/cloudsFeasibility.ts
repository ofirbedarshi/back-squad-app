import { cloudsFeasibilityLookupData } from './cloudsFeasibilityLookup.generated.ts'
import { cloudsFeasibilityGenBLookupData } from './cloudsFeasibilityGenBLookup.generated.ts'
import type {
  CloudsFeasibilityEvaluationInput,
  CloudsFeasibilityEvaluationResult,
  CloudsFeasibilityLookupData,
  CloudsFeasibilityNumericBand,
  CloudsFeasibilityTableTrajectory,
} from './cloudsFeasibility.types.ts'
import {
  CloudsFeasibilityOutOfTableError,
  isCloudsFeasibilityOutOfTableError,
} from './errors.ts'

export const CLOUDS_FEASIBILITY_TOLERANCE_METERS = 100

export const CLOUDS_FLAT_FLIGHT_PATH_NOTE = 'מסלול flat תמיד מאפשר בחישוב עננים'

export const CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE = 'lofted+ לא נתמך בדור א׳'

export const CLOUDS_OUT_OF_TABLE_NOTE = 'ערכים מחוץ לטבלת הערכים'

function findBand(
  bands: CloudsFeasibilityNumericBand[],
  valueMeters: number,
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

function resolveCloudsTableTrajectory(
  flightPath: string,
  rejectLoftedPlus: boolean,
): CloudsFeasibilityTableTrajectory | null {
  if (flightPath === 'low' || flightPath === 'lofted') {
    return flightPath
  }
  if (flightPath === '+lofted') {
    return rejectLoftedPlus ? null : 'loftedPlus'
  }
  return null
}

function lookupCloudsTableValue(
  data: CloudsFeasibilityLookupData,
  heightDifferenceMeters: number,
  rangeMeters: number,
  trajectory: CloudsFeasibilityTableTrajectory,
): number {
  if (!Number.isFinite(heightDifferenceMeters)) {
    throw new Error('הפרש גובה לא תקין')
  }
  if (!Number.isFinite(rangeMeters)) {
    throw new Error('טווח לא תקין')
  }

  const heightBand = findBand(data.heightBands, heightDifferenceMeters)
  const rangeBand = findBand(data.rangeBands, rangeMeters)

  const key = `${heightBand.id}|${rangeBand.id}`
  const cell = data.lookup[key]
  const value = cell?.[trajectory]
  if (value === undefined) {
    throw new CloudsFeasibilityOutOfTableError()
  }

  return value
}

function evaluateCloudsFromLookup(
  input: CloudsFeasibilityEvaluationInput,
  data: CloudsFeasibilityLookupData,
  options: { rejectLoftedPlus: boolean },
): CloudsFeasibilityEvaluationResult {
  if (input.flightPath === 'flat') {
    return {
      enabled: true,
      notes: CLOUDS_FLAT_FLIGHT_PATH_NOTE,
    }
  }

  if (options.rejectLoftedPlus && input.flightPath === '+lofted') {
    return {
      enabled: false,
      notes: CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE,
    }
  }

  const trajectory = resolveCloudsTableTrajectory(input.flightPath, options.rejectLoftedPlus)
  if (trajectory === null) {
    throw new Error('מסלול מעוף לא תקין לחישוב עננים')
  }

  assertFiniteMeters(input.targetHeightMeters, 'גובה מטרה')
  assertFiniteMeters(input.cloudHeightMeters, 'גובה עננים')

  try {
    const lookupValue = lookupCloudsTableValue(
      data,
      input.positionToTargetHeightDifferenceMeters,
      input.positionToTargetRangeMeters,
      trajectory,
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

// דור א׳ — lookup table from clouds-generation-a.xlsx
export function evaluateCloudsFeasibility(
  input: CloudsFeasibilityEvaluationInput,
): CloudsFeasibilityEvaluationResult {
  return evaluateCloudsFromLookup(input, cloudsFeasibilityLookupData, {
    rejectLoftedPlus: true,
  })
}

// דור ב׳ — lookup table from clouds-generation-b.xlsx
export function evaluateCloudsFeasibilityGenB(
  input: CloudsFeasibilityEvaluationInput,
): CloudsFeasibilityEvaluationResult {
  return evaluateCloudsFromLookup(input, cloudsFeasibilityGenBLookupData, {
    rejectLoftedPlus: false,
  })
}
