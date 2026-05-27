import { cloudsFeasibilityGenBLookupData } from './cloudsFeasibilityGenBLookup.generated.ts'
import {
  CLOUDS_OUT_OF_TABLE_NOTE,
  evaluateCloudsFeasibility,
  evaluateCloudsFeasibilityGenB,
} from './cloudsFeasibility.ts'
import type {
  CloudsFeasibilityEvaluationInput,
  CloudsFeasibilityNumericBand,
} from './cloudsFeasibility.types.ts'
import type {
  CloudsFeasibilityFixtureSolveInput,
  CloudsFeasibilityFixtureSolution,
  CloudsFeasibilityFixtureTargetPlacementInput,
  CloudsMockTargetNameInput,
} from './cloudsFeasibilityFixture.types.ts'
import { FIRE_FEASIBILITY_GENERATION_LABELS } from './fireFeasibility.constants.ts'
import type { FireFeasibilityFlightPath } from './fireFeasibility.types.ts'
import type { PositionCoordinates } from './position.types.ts'

const CLOUDS_FIXTURE_NO_SOLUTION_ERROR =
  'לא נמצאה מטרה מתאימה לשילוב שנבחר לפי גובה העננים והטבלה'

const CLOUDS_FIXTURE_FLAT_DISABLED_ERROR =
  'במסלול flat שני הדורות תמיד מאפשרים — לא ניתן לבחור "לא מאפשר"'

const CLOUDS_FIXTURE_LOFTED_PLUS_GEN_A_ENABLED_ERROR =
  'במסלול lofted+ דור א׳ תמיד לא מאפשר — לא ניתן לבחור מאפשר לדור א׳'

function bandMidpoint(band: CloudsFeasibilityNumericBand): number {
  return band.min + (band.max - band.min) / 2
}

function isInBand(band: CloudsFeasibilityNumericBand, value: number): boolean {
  return value >= band.min && value < band.max
}

function iterateHeightDiffCandidates(heightBand: CloudsFeasibilityNumericBand): number[] {
  const mid = bandMidpoint(heightBand)
  const candidates = [mid]
  const minInt = Math.ceil(heightBand.min)
  const maxInt = Math.floor(heightBand.max - 1)
  for (let value = minInt; value <= maxInt; value += 1) {
    if (!candidates.includes(value)) {
      candidates.push(value)
    }
  }
  return candidates
}

function buildEvaluationInput(
  input: CloudsFeasibilityFixtureSolveInput,
  solution: CloudsFeasibilityFixtureSolution,
): CloudsFeasibilityEvaluationInput {
  return {
    positionToTargetRangeMeters: solution.rangeMeters,
    positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
    flightPath: solution.flightPath,
    targetHeightMeters: solution.targetAltitudeMeters,
    cloudHeightMeters: input.cloudHeightMeters,
  }
}

function isOutOfTableNote(notes: string): boolean {
  return notes === CLOUDS_OUT_OF_TABLE_NOTE
}

function matchesDesiredEvaluators(
  input: CloudsFeasibilityFixtureSolveInput,
  solution: CloudsFeasibilityFixtureSolution,
): boolean {
  const evaluationInput = buildEvaluationInput(input, solution)
  const genA = evaluateCloudsFeasibility(evaluationInput)
  const genB = evaluateCloudsFeasibilityGenB(evaluationInput)

  if (
    isOutOfTableNote(genA.notes) &&
    (!input.desiredGenAEnabled || !input.desiredGenBEnabled)
  ) {
    return false
  }
  if (isOutOfTableNote(genB.notes) && (!input.desiredGenAEnabled || !input.desiredGenBEnabled)) {
    return false
  }

  return genA.enabled === input.desiredGenAEnabled && genB.enabled === input.desiredGenBEnabled
}

function searchTableFixture(
  input: CloudsFeasibilityFixtureSolveInput,
): CloudsFeasibilityFixtureSolution {
  for (const heightBand of cloudsFeasibilityGenBLookupData.heightBands) {
    for (const rangeBand of cloudsFeasibilityGenBLookupData.rangeBands) {
      const rangeMeters = bandMidpoint(rangeBand)

      for (const heightDiff of iterateHeightDiffCandidates(heightBand)) {
        if (!isInBand(heightBand, heightDiff)) {
          continue
        }

        const solution: CloudsFeasibilityFixtureSolution = {
          rangeMeters,
          heightDifferenceMeters: heightDiff,
          targetAltitudeMeters: input.positionAltitudeMeters + heightDiff,
          flightPath: input.flightPath,
        }

        if (matchesDesiredEvaluators(input, solution)) {
          return solution
        }
      }
    }
  }

  throw new Error(CLOUDS_FIXTURE_NO_SOLUTION_ERROR)
}

function buildFlatFixture(
  input: CloudsFeasibilityFixtureSolveInput,
): CloudsFeasibilityFixtureSolution {
  const heightBand = cloudsFeasibilityGenBLookupData.heightBands[0]
  const rangeBand = cloudsFeasibilityGenBLookupData.rangeBands[0]
  const heightDiff = bandMidpoint(heightBand)
  const solution: CloudsFeasibilityFixtureSolution = {
    rangeMeters: bandMidpoint(rangeBand),
    heightDifferenceMeters: heightDiff,
    targetAltitudeMeters: input.positionAltitudeMeters + heightDiff,
    flightPath: 'flat',
  }

  if (!matchesDesiredEvaluators(input, solution)) {
    throw new Error(CLOUDS_FIXTURE_NO_SOLUTION_ERROR)
  }

  return solution
}

export function solveCloudsFeasibilityFixture(
  input: CloudsFeasibilityFixtureSolveInput,
): CloudsFeasibilityFixtureSolution {
  if (!Number.isFinite(input.cloudHeightMeters)) {
    throw new Error('גובה עננים לא תקין')
  }
  if (!Number.isFinite(input.positionAltitudeMeters)) {
    throw new Error('גובה עמדה לא תקין')
  }

  if (input.flightPath === 'flat') {
    if (!input.desiredGenAEnabled || !input.desiredGenBEnabled) {
      throw new Error(CLOUDS_FIXTURE_FLAT_DISABLED_ERROR)
    }
    return buildFlatFixture(input)
  }

  if (input.flightPath === '+lofted' && input.desiredGenAEnabled) {
    throw new Error(CLOUDS_FIXTURE_LOFTED_PLUS_GEN_A_ENABLED_ERROR)
  }

  return searchTableFixture(input)
}

export function buildTargetCoordinatesForFixture(
  input: CloudsFeasibilityFixtureTargetPlacementInput,
): PositionCoordinates {
  const east = Number(input.positionCoordinates.east)
  const north = Number(input.positionCoordinates.north)
  if (Number.isNaN(east) || Number.isNaN(north)) {
    throw new Error('נ"צ עמדה לא תקין')
  }

  return {
    east: String(east),
    north: String(north + input.rangeMeters),
    palach: input.positionCoordinates.palach,
  }
}

function formatGenerationEnabledLabel(generation: 'a' | 'b', enabled: boolean): string {
  const label = FIRE_FEASIBILITY_GENERATION_LABELS[generation]
  return enabled ? `${label} מאפשר` : `${label} לא מאפשר`
}

export function formatCloudsMockTargetName(input: CloudsMockTargetNameInput): string {
  const genA = formatGenerationEnabledLabel('a', input.genAEnabled)
  const genB = formatGenerationEnabledLabel('b', input.genBEnabled)
  return `עננים: ${genA}, ${genB} (${input.flightPath})`
}

export function formatCloudsMockTargetDescription(flightPath: FireFeasibilityFlightPath): string {
  return `מטרת בדיקה — מסלול מעוף: ${flightPath}`
}
