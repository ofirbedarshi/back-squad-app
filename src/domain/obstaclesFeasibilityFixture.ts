import { evaluateObstaclesFeasibilityGenA } from './obstaclesFeasibility'
import type { ObstaclesFeasibilityEvaluationInput } from './obstaclesFeasibility.types'
import { obstaclesFeasibilityLookupData } from './obstaclesFeasibilityLookup.generated'
import type {
  ObstaclesFeasibilityFixtureSolveInput,
  ObstaclesFeasibilityFixtureSolution,
  ObstaclesFeasibilityFixtureTargetPlacementInput,
  ObstaclesMockTargetNameInput,
} from './obstaclesFeasibilityFixture.types'
import { FIRE_FEASIBILITY_GENERATION_LABELS } from './fireFeasibility.constants'
import type { PositionCoordinates } from './position.types'

const OBSTACLES_FIXTURE_NO_SOLUTION_ERROR =
  'לא נמצאה מטרה מתאימה לשילוב שנבחר לפי טבלת המכשולים'

const OBSTACLES_FIXTURE_FLAT_PATH_ERROR = 'במסלול flat טבלת המכשולים לא נתמכת לדור א׳'

function evaluateCandidate(
  input: ObstaclesFeasibilityFixtureSolveInput,
  solution: ObstaclesFeasibilityFixtureSolution,
): boolean {
  const obstacle: ObstaclesFeasibilityEvaluationInput = {
    positionToObstacleRangeMeters: solution.obstacleRangeMeters,
    positionToObstacleHeightDifferenceMeters: solution.obstacleHeightDifferenceMeters,
    obstacleHeightMeters: solution.obstacleHeightMeters,
  }

  const result = evaluateObstaclesFeasibilityGenA({
    positionToTargetRangeMeters: solution.rangeMeters,
    positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
    flightPath: solution.flightPath,
    obstacle,
  })

  return result.enabled === input.desiredGenAEnabled && result.notes === ''
}

function buildSolution(
  input: ObstaclesFeasibilityFixtureSolveInput,
  rangeMeters: number,
  heightDifferenceMeters: number,
  obstacleRangeMeters: number,
): ObstaclesFeasibilityFixtureSolution[] {
  const cell =
    obstaclesFeasibilityLookupData.lookup[
      `${rangeMeters}|${heightDifferenceMeters}|${obstacleRangeMeters}`
    ]
  if (!cell) return []

  const trajectoryKey =
    input.flightPath === 'low' ? 'low' : input.flightPath === 'lofted' ? 'lofted' : 'loftedPlus'
  const missileHeightAbovePosition = cell[trajectoryKey]
  if (missileHeightAbovePosition === undefined) return []

  const base = {
    rangeMeters,
    heightDifferenceMeters,
    targetAltitudeMeters: input.positionAltitudeMeters + heightDifferenceMeters,
    obstacleRangeMeters,
    flightPath: input.flightPath,
  } as const

  return [
    {
      ...base,
      obstacleHeightDifferenceMeters: missileHeightAbovePosition - 1,
      obstacleHeightMeters: input.positionAltitudeMeters + missileHeightAbovePosition - 1,
    },
    {
      ...base,
      obstacleHeightDifferenceMeters: missileHeightAbovePosition + 1,
      obstacleHeightMeters: input.positionAltitudeMeters + missileHeightAbovePosition + 1,
    },
  ]
}

export function solveObstaclesFeasibilityFixture(
  input: ObstaclesFeasibilityFixtureSolveInput,
): ObstaclesFeasibilityFixtureSolution {
  if (!Number.isFinite(input.positionAltitudeMeters)) {
    throw new Error('גובה עמדה לא תקין')
  }
  if (input.flightPath === 'flat') {
    throw new Error(OBSTACLES_FIXTURE_FLAT_PATH_ERROR)
  }

  for (const rangeMeters of obstaclesFeasibilityLookupData.rangesMeters) {
    for (const heightDifferenceMeters of obstaclesFeasibilityLookupData.positionToTargetHeightDifferencesMeters) {
      for (const obstacleRangeMeters of obstaclesFeasibilityLookupData.positionToObstacleRangesMeters) {
        const candidates = buildSolution(
          input,
          rangeMeters,
          heightDifferenceMeters,
          obstacleRangeMeters,
        )
        for (const candidate of candidates) {
          if (evaluateCandidate(input, candidate)) {
            return candidate
          }
        }
      }
    }
  }

  throw new Error(OBSTACLES_FIXTURE_NO_SOLUTION_ERROR)
}

export function buildObstacleMockTargetCoordinates(
  input: ObstaclesFeasibilityFixtureTargetPlacementInput,
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

function formatGenerationEnabledLabel(enabled: boolean): string {
  const label = FIRE_FEASIBILITY_GENERATION_LABELS.a
  return enabled ? `${label} מאפשר` : `${label} לא מאפשר`
}

export function formatObstaclesMockTargetName(input: ObstaclesMockTargetNameInput): string {
  return `מכשולים: ${formatGenerationEnabledLabel(input.genAEnabled)} (${input.flightPath})`
}

export function formatObstaclesMockTargetDescription(flightPath: string): string {
  return `מטרת בדיקה למכשולים — מסלול מעוף: ${flightPath}`
}
