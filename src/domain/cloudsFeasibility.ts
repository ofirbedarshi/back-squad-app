import { cloudsFeasibilityLookupData } from './cloudsFeasibilityLookup.generated.ts'
import type {
  CloudsFeasibilityEvaluationInput,
  CloudsFeasibilityEvaluationResult,
  CloudsFeasibilityNumericBand,
  CloudsFeasibilityTrajectory,
} from './cloudsFeasibility.types.ts'

export const CLOUDS_FEASIBILITY_MIN_LOOKUP_VALUE = 600

const { heightBands, rangeBands, lookup } = cloudsFeasibilityLookupData

function findBand(
  bands: CloudsFeasibilityNumericBand[],
  valueMeters: number,
  axisLabel: string,
): CloudsFeasibilityNumericBand {
  const band = bands.find((b) => valueMeters >= b.min && valueMeters < b.max)
  if (!band) {
    throw new Error(`${axisLabel} מחוץ לטווח הטבלה`)
  }
  return band
}

export function assertCloudsFlightPath(
  flightPath: string,
): asserts flightPath is CloudsFeasibilityTrajectory {
  if (flightPath === 'low' || flightPath === 'lofted') {
    return
  }
  if (flightPath === 'flat') {
    throw new Error('מסלול מעוף "flat" אינו נתמך בחישוב עננים — בחר low או lofted')
  }
  if (flightPath === '+lofted') {
    throw new Error('מסלול מעוף "lofted +" אינו נתמך בחישוב עננים — בחר low או lofted')
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
    throw new Error('אין נתון בטבלת עננים לשילוב טווח, הפרש גובה ומסלול מעוף שנבחרו')
  }

  return value
}

export function evaluateCloudsFeasibility(
  input: CloudsFeasibilityEvaluationInput,
): CloudsFeasibilityEvaluationResult {
  assertCloudsFlightPath(input.flightPath)

  const lookupValue = lookupCloudsTableValue(
    input.positionToTargetHeightDifferenceMeters,
    input.positionToTargetRangeMeters,
    input.flightPath,
  )

  return {
    lookupValue,
    enabled: lookupValue > CLOUDS_FEASIBILITY_MIN_LOOKUP_VALUE,
  }
}
