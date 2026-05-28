import {
  FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE,
  OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE,
} from './fireFeasibility.constants'
import type { FireFeasibilityCategoryResult } from './fireFeasibility.types'
import type { ObstaclesFeasibilityEvaluationInput } from './obstaclesFeasibility.types'

export function evaluateObstaclesFeasibilityWhenMissing(): FireFeasibilityCategoryResult {
  return {
    enabled: true,
    notes: OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE,
    logs: [],
  }
}

export function evaluateObstaclesFeasibilityGenA(
  _input: ObstaclesFeasibilityEvaluationInput,
): FireFeasibilityCategoryResult {
  return {
    enabled: false,
    notes: FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE,
    logs: [],
  }
}
