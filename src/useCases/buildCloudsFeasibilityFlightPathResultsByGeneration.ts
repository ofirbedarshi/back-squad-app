import {
  evaluateCloudsFeasibility,
  evaluateCloudsFeasibilityGenB,
} from '../domain/cloudsFeasibility'
import type {
  CloudsFeasibilityEvaluationInput,
  CloudsFeasibilityEvaluationResult,
} from '../domain/cloudsFeasibility.types'
import { FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS } from '../domain/fireFeasibility.constants'
import type {
  BuildCloudsFeasibilityFlightPathResultsInput,
  CloudsFeasibilityFlightPathCellResult,
  CloudsFeasibilityFlightPathCellsByPath,
  CloudsFeasibilityFlightPathResultsByGeneration,
} from './buildCloudsFeasibilityFlightPathResultsByGeneration.types'

function toCell(result: CloudsFeasibilityEvaluationResult): CloudsFeasibilityFlightPathCellResult {
  return {
    enabled: result.enabled,
    notes: result.notes,
  }
}

function buildCellsByFlightPath(
  input: BuildCloudsFeasibilityFlightPathResultsInput,
  evaluate: (cloudsInput: CloudsFeasibilityEvaluationInput) => CloudsFeasibilityEvaluationResult,
): CloudsFeasibilityFlightPathCellsByPath {
  const cells = {} as CloudsFeasibilityFlightPathCellsByPath

  for (const row of FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS) {
    const flightPath = row.value
    cells[flightPath] = toCell(
      evaluate({
        positionToTargetRangeMeters: input.positionToTargetRangeMeters,
        positionToTargetHeightDifferenceMeters: input.positionToTargetHeightDifferenceMeters,
        flightPath,
        targetHeightMeters: input.targetHeightMeters,
        cloudHeightMeters: input.cloudHeightMeters,
      }),
    )
  }

  return cells
}

export function buildCloudsFeasibilityFlightPathResultsByGeneration(
  input: BuildCloudsFeasibilityFlightPathResultsInput,
): CloudsFeasibilityFlightPathResultsByGeneration {
  return {
    a: buildCellsByFlightPath(input, (cloudsInput) => evaluateCloudsFeasibility(cloudsInput)),
    b: buildCellsByFlightPath(input, (cloudsInput) => evaluateCloudsFeasibilityGenB(cloudsInput)),
  }
}
