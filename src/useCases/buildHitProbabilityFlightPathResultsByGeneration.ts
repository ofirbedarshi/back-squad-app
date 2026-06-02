import {
  createNotImplementedHitProbabilityGenerationResult,
} from '../domain/fireFeasibility'
import {
  buildHitProbabilityLogs,
  calculateHitProbabilityByFlightPath,
} from '../domain/hitProbability'
import type { FireFeasibilityFlightPathResultsByGeneration } from '../domain/fireFeasibility.types'
import type { BuildHitProbabilityFlightPathResultsInput } from './buildHitProbabilityFlightPathResultsByGeneration.types'

export function buildHitProbabilityFlightPathResultsByGeneration(
  input: BuildHitProbabilityFlightPathResultsInput,
): FireFeasibilityFlightPathResultsByGeneration {
  const genBLookup = calculateHitProbabilityByFlightPath({
    positionToTargetRangeMeters: input.positionToTargetRangeMeters,
    positionToTargetHeightDifferenceMeters: input.positionToTargetHeightDifferenceMeters,
  })

  return {
    a: createNotImplementedHitProbabilityGenerationResult(),
    b: {
      percentByFlightPath: genBLookup.percentByFlightPath,
      logs: buildHitProbabilityLogs(genBLookup.debug, genBLookup.percentByFlightPath),
    },
  }
}
