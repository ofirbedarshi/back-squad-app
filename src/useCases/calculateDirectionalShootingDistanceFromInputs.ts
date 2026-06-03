import { calculateDirectionalShootingDistance } from '../domain/directionalShootingDistance'
import type {
  DirectionalShootingDistanceDisplayResult,
  DirectionalShootingTargetRangeM,
  DirectionalShootingTrajectory,
} from '../domain/directionalShootingDistance.types'

function formatMetersAsWholeNumber(value: number): string {
  return value.toFixed(0)
}

export function calculateDirectionalShootingDistanceFromInputs(
  trajectory: DirectionalShootingTrajectory,
  targetRangeM: DirectionalShootingTargetRangeM,
): DirectionalShootingDistanceDisplayResult {
  const result = calculateDirectionalShootingDistance({ trajectory, targetRangeM })

  return {
    stdAtMaxYM: formatMetersAsWholeNumber(result.stdAtMaxYM),
    meanMaxYM: formatMetersAsWholeNumber(result.meanMaxYM),
    xAtMaxYM: formatMetersAsWholeNumber(result.xAtMaxYM),
    targetRangeM: formatMetersAsWholeNumber(result.targetRangeM),
  }
}
