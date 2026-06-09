import {
  OBSTACLES_FLAT_FLIGHT_PATH_NOTE,
  OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE,
  OBSTACLES_OUT_OF_TABLE_NOTE,
} from './fireFeasibility.constants'
import type { FireFeasibilityCategoryResult } from './fireFeasibility.types'
import type {
  ObstaclesFeasibilityEvaluationInput,
  ObstaclesFeasibilityLookupContext,
} from './obstaclesFeasibility.types'
import type { FeasibilityLookupData, FeasibilityLookupTrajectory } from './feasibilityLookup.types'
import {
  buildObstaclesLookupSuccessLogs,
  buildObstaclesNoteLogs,
} from './obstaclesFeasibilityLogs'
import { feasibilityLookupData } from './feasibilityLookup.generated'
import { resolveLookupTrajectory, buildFeasibilityLookupKey } from './feasibilityLookup'
import {
  isObstaclesFeasibilityOutOfTableError,
  ObstaclesFeasibilityOutOfTableError,
} from './errors'

export interface EvaluateObstaclesFeasibilityGenBInput {
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

function lookupObstacleCell(
  data: FeasibilityLookupData,
  positionToTargetRangeMeters: number,
  positionToTargetHeightDifferenceMeters: number,
  positionToObstacleRangeMeters: number,
  trajectory: FeasibilityLookupTrajectory,
): ObstaclesFeasibilityLookupContext {
  const key = buildFeasibilityLookupKey(
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

export function evaluateObstaclesFeasibilityGenB(
  input: EvaluateObstaclesFeasibilityGenBInput,
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

  const trajectory = resolveLookupTrajectory(input.flightPath)
  if (!trajectory) {
    throw new Error('מסלול מעוף לא תקין לחישוב מכשולים')
  }

  try {
    const lookup = lookupObstacleCell(
      feasibilityLookupData,
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
