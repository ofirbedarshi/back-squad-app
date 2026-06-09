import {
  CONCEALMENT_ELEVATION_ANGLE_THRESHOLD_DEG,
  CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE,
} from './fireFeasibility.constants.ts'
import type { FireFeasibilityCategoryResult } from './fireFeasibility.types.ts'
import type { ConcealmentFeasibilityEvaluationInput } from './concealmentFeasibility.types.ts'
import { buildConcealmentSuccessLogs } from './concealmentFeasibilityLogs.ts'
import { elevationAngleDegFromHorizontalDistanceAndHeightDifference } from '../utils/elevationAngle.ts'

export function evaluateConcealmentFeasibilityWhenMissing(): FireFeasibilityCategoryResult {
  return {
    enabled: true,
    notes: CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE,
    logs: [],
  }
}

export function evaluateConcealmentFeasibility(
  input: ConcealmentFeasibilityEvaluationInput,
): FireFeasibilityCategoryResult {
  const angleDeg = elevationAngleDegFromHorizontalDistanceAndHeightDifference(
    input.targetToConcealmentRangeMeters,
    input.targetToConcealmentHeightDifferenceMeters,
  )
  const enabled = angleDeg > CONCEALMENT_ELEVATION_ANGLE_THRESHOLD_DEG

  return {
    enabled,
    notes: '',
    logs: buildConcealmentSuccessLogs(
      input,
      angleDeg,
      CONCEALMENT_ELEVATION_ANGLE_THRESHOLD_DEG,
      enabled,
    ),
  }
}
