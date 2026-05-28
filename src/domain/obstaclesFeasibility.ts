import {
  OBSTACLES_FLAT_FLIGHT_PATH_NOTE,
  OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE,
  OBSTACLES_OUT_OF_TABLE_NOTE,
} from './fireFeasibility.constants'
import type { FireFeasibilityCategoryResult } from './fireFeasibility.types'
import type {
  ObstaclesFeasibilityEvaluationInput,
  ObstaclesFeasibilityLookupContext,
  ObstaclesFeasibilityLookupData,
  ObstaclesFeasibilityLookupTrajectory,
} from './obstaclesFeasibility.types'
import {
  buildObstaclesLookupSuccessLogs,
  buildObstaclesNoteLogs,
} from './obstaclesFeasibilityLogs'
import { obstaclesFeasibilityLookupData } from './obstaclesFeasibilityLookup.generated'
import {
  isObstaclesFeasibilityOutOfTableError,
  ObstaclesFeasibilityOutOfTableError,
} from './errors'

export interface EvaluateObstaclesFeasibilityGenAInput {
  positionToTargetRangeMeters: number
  positionToTargetHeightDifferenceMeters: number
  flightPath: string
  obstacle: ObstaclesFeasibilityEvaluationInput
}

function assertFiniteMeters(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} לא תקין`)
  }
}

function resolveObstacleTrajectory(flightPath: string): ObstaclesFeasibilityLookupTrajectory | null {
  if (flightPath === 'low') return 'low'
  if (flightPath === 'lofted') return 'lofted'
  if (flightPath === '+lofted') return 'loftedPlus'
  return null
}

function buildLookupKey(
  positionToTargetRangeMeters: number,
  positionToTargetHeightDifferenceMeters: number,
  positionToObstacleRangeMeters: number,
): string {
  return `${positionToTargetRangeMeters}|${positionToTargetHeightDifferenceMeters}|${positionToObstacleRangeMeters}`
}

function lookupObstacleCell(
  data: ObstaclesFeasibilityLookupData,
  positionToTargetRangeMeters: number,
  positionToTargetHeightDifferenceMeters: number,
  positionToObstacleRangeMeters: number,
  trajectory: ObstaclesFeasibilityLookupTrajectory,
): ObstaclesFeasibilityLookupContext {
  const key = buildLookupKey(
    positionToTargetRangeMeters,
    positionToTargetHeightDifferenceMeters,
    positionToObstacleRangeMeters,
  )
  const cell = data.lookup[key]
  const value = cell?.[trajectory]
  if (value === undefined) {
    throw new ObstaclesFeasibilityOutOfTableError()
  }

  return {
    key,
    rangeMeters: positionToTargetRangeMeters,
    positionToTargetHeightDifferenceMeters,
    positionToObstacleRangeMeters,
    trajectory,
    missileHeightAbovePositionMeters: value,
  }
}

export function evaluateObstaclesFeasibilityWhenMissing(): FireFeasibilityCategoryResult {
  return {
    enabled: true,
    notes: OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE,
    logs: [],
  }
}

export function evaluateObstaclesFeasibilityGenA(
  input: EvaluateObstaclesFeasibilityGenAInput,
): FireFeasibilityCategoryResult {
  if (input.flightPath === 'flat') {
    return {
      enabled: false,
      notes: OBSTACLES_FLAT_FLIGHT_PATH_NOTE,
      logs: buildObstaclesNoteLogs(input, OBSTACLES_FLAT_FLIGHT_PATH_NOTE),
    }
  }

  assertFiniteMeters(input.positionToTargetRangeMeters, 'טווח עמדה-מטרה')
  assertFiniteMeters(input.positionToTargetHeightDifferenceMeters, 'הפרש גבהים עמדה-מטרה')
  assertFiniteMeters(input.obstacle.positionToObstacleRangeMeters, 'טווח מכשול-עמדה')
  assertFiniteMeters(input.obstacle.positionToObstacleHeightDifferenceMeters, 'גובה מכשול מעל העמדה')

  const trajectory = resolveObstacleTrajectory(input.flightPath)
  if (!trajectory) {
    throw new Error('מסלול מעוף לא תקין לחישוב מכשולים')
  }

  try {
    const lookup = lookupObstacleCell(
      obstaclesFeasibilityLookupData,
      input.positionToTargetRangeMeters,
      input.positionToTargetHeightDifferenceMeters,
      input.obstacle.positionToObstacleRangeMeters,
      trajectory,
    )
    const enabled =
      input.obstacle.positionToObstacleHeightDifferenceMeters <
      lookup.missileHeightAbovePositionMeters

    return {
      enabled,
      notes: '',
      logs: buildObstaclesLookupSuccessLogs(input, lookup, enabled),
    }
  } catch (error) {
    if (isObstaclesFeasibilityOutOfTableError(error)) {
      return {
        enabled: true,
        notes: OBSTACLES_OUT_OF_TABLE_NOTE,
        logs: buildObstaclesNoteLogs(input, OBSTACLES_OUT_OF_TABLE_NOTE),
      }
    }
    throw error
  }
}
