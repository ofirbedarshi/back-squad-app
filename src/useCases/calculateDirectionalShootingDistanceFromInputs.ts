import { calculateDirectionalShootingDistance } from '../domain/directionalShootingDistance'
import type {
  DirectionalShootingDistanceDisplayResult,
  DirectionalShootingTargetRangeM,
  DirectionalShootingTrajectory,
} from '../domain/directionalShootingDistance.types'

function formatDecimal(value: number, maxDecimals: number): string {
  return value
    .toFixed(maxDecimals)
    .replace(/\.?0+$/, '')
}

function formatWholeNumber(value: number): string {
  return value.toFixed(0)
}

export function calculateDirectionalShootingDistanceFromInputs(
  trajectory: DirectionalShootingTrajectory,
  targetRangeM: DirectionalShootingTargetRangeM,
): DirectionalShootingDistanceDisplayResult {
  const result = calculateDirectionalShootingDistance({ trajectory, targetRangeM })

  return {
    stdAtMaxYM: formatDecimal(result.stdAtMaxYM, 1),
    meanMaxYM: formatDecimal(result.meanMaxYM, 4),
    xAtMaxYM: formatWholeNumber(result.xAtMaxYM),
    targetRangeM: formatWholeNumber(result.targetRangeM),
  }
}
