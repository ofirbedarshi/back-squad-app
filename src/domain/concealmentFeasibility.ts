import {
  CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE,
  CONCEALMENT_FLAT_FLIGHT_PATH_NOTE,
  CONCEALMENT_RANGE_TOO_SHORT_NOTE,
  CONCEALMENT_OUT_OF_TABLE_NOTE,
  CONCEALMENT_RANGE_BANDS,
} from './fireFeasibility.constants'
import type { FireFeasibilityCategoryResult } from './fireFeasibility.types'
import type {
  EvaluateConcealmentFeasibilityInput,
  ConcealmentLookupResult,
} from './concealmentFeasibility.types'
import {
  buildConcealmentNoteLogs,
  buildConcealmentLookupLogs,
} from './concealmentFeasibilityLogs'
import { buildConcealmentDiagramModel } from './concealmentDiagram'
import { elevationAngleDegFromHorizontalDistanceAndHeightDifference } from '../utils/elevationAngle'
import {
  resolveLookupTrajectory,
  roundRangeDownToGrid,
  lookupMissileHeightAbovePosition,
} from './feasibilityLookup'
import { feasibilityLookupData } from './feasibilityLookup.generated'

function resolveRangeFromTargetMeters(positionToTargetRangeMeters: number): number | null {
  for (const band of CONCEALMENT_RANGE_BANDS) {
    if (positionToTargetRangeMeters >= band.minMeters && positionToTargetRangeMeters < band.maxMeters) {
      return band.rangeFromTargetMeters
    }
  }
  return null
}

export function evaluateConcealmentFeasibilityWhenMissing(): FireFeasibilityCategoryResult {
  return {
    enabled: true,
    notes: CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE,
    logs: [],
  }
}

export function evaluateConcealmentFeasibility(
  input: EvaluateConcealmentFeasibilityInput,
): FireFeasibilityCategoryResult {
  const { positionToTargetRangeMeters, positionToTargetHeightDifferenceMeters, flightPath, concealment } = input

  if (flightPath === 'flat') {
    return {
      enabled: false,
      notes: CONCEALMENT_FLAT_FLIGHT_PATH_NOTE,
      logs: buildConcealmentNoteLogs(input, CONCEALMENT_FLAT_FLIGHT_PATH_NOTE),
    }
  }

  const trajectory = resolveLookupTrajectory(flightPath)
  if (!trajectory) {
    throw new Error('מסלול מעוף לא תקין לחישוב הסתרים')
  }

  const concealmentAngleDeg = elevationAngleDegFromHorizontalDistanceAndHeightDifference(
    concealment.targetToConcealmentRangeMeters,
    concealment.targetToConcealmentHeightDifferenceMeters,
  )

  const rangeFromTargetMeters = resolveRangeFromTargetMeters(positionToTargetRangeMeters)
  if (rangeFromTargetMeters === null) {
    return {
      enabled: false,
      notes: CONCEALMENT_RANGE_TOO_SHORT_NOTE,
      logs: buildConcealmentNoteLogs(input, CONCEALMENT_RANGE_TOO_SHORT_NOTE),
    }
  }

  const { value: roundedPositionToTargetRangeMeters, wasRounded: wasRangeRounded } =
    roundRangeDownToGrid(positionToTargetRangeMeters, feasibilityLookupData.rangesMeters)

  const distFromPositionMeters = roundedPositionToTargetRangeMeters - rangeFromTargetMeters

  const missileHeightAbovePositionMeters = lookupMissileHeightAbovePosition(
    feasibilityLookupData,
    roundedPositionToTargetRangeMeters,
    positionToTargetHeightDifferenceMeters,
    distFromPositionMeters,
    trajectory,
  )

  if (missileHeightAbovePositionMeters === null) {
    return {
      enabled: true,
      notes: CONCEALMENT_OUT_OF_TABLE_NOTE,
      logs: buildConcealmentNoteLogs(input, CONCEALMENT_OUT_OF_TABLE_NOTE),
    }
  }

  const missileHeightAboveTargetMeters =
    missileHeightAbovePositionMeters - positionToTargetHeightDifferenceMeters

  const missileAngleDeg = elevationAngleDegFromHorizontalDistanceAndHeightDifference(
    rangeFromTargetMeters,
    missileHeightAboveTargetMeters,
  )

  const enabled = missileAngleDeg > concealmentAngleDeg

  const lookupResult: ConcealmentLookupResult = {
    concealmentAngleDeg,
    rangeFromTargetMeters,
    roundedPositionToTargetRangeMeters,
    wasRangeRounded,
    distFromPositionMeters,
    missileHeightAbovePositionMeters,
    missileHeightAboveTargetMeters,
    missileAngleDeg,
  }

  return {
    enabled,
    notes: '',
    logs: buildConcealmentLookupLogs(input, lookupResult, enabled),
    diagram: buildConcealmentDiagramModel(input, lookupResult, enabled),
  }
}
