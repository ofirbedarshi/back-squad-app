import type {
  DirectionalShootingDistanceInputs,
  DirectionalShootingDistanceResult,
  DirectionalShootingTargetRangeM,
  DirectionalShootingTrajectory,
} from './directionalShootingDistance.types'

export const DIRECTIONAL_SHOOTING_TARGET_RANGES_M: DirectionalShootingTargetRangeM[] = [
  3000,
  3500,
  4000,
  4500,
  5000,
  5500,
  6000,
  6500,
  7000,
  7500,
  8000,
]

const DIRECTIONAL_SHOOTING_TABLE: Record<
  DirectionalShootingTrajectory,
  Record<DirectionalShootingTargetRangeM, Omit<DirectionalShootingDistanceResult, 'targetRangeM'>>
> = {
  flat: {
    3000: { stdAtMaxYM: 21.0, meanMaxYM: 57.6413, xAtMaxYM: 2100 },
    3500: { stdAtMaxYM: 25.8, meanMaxYM: 68.8082, xAtMaxYM: 2300 },
    4000: { stdAtMaxYM: 28.1, meanMaxYM: 80.7747, xAtMaxYM: 2600 },
    4500: { stdAtMaxYM: 30.8, meanMaxYM: 97.26635, xAtMaxYM: 2900 },
    5000: { stdAtMaxYM: 32.0, meanMaxYM: 125.159, xAtMaxYM: 3100 },
    5500: { stdAtMaxYM: 37.3, meanMaxYM: 150.402, xAtMaxYM: 3600 },
    6000: { stdAtMaxYM: 42.3, meanMaxYM: 143.644, xAtMaxYM: 4100 },
    6500: { stdAtMaxYM: 47.9, meanMaxYM: 135.08, xAtMaxYM: 4400 },
    7000: { stdAtMaxYM: 51.9, meanMaxYM: 131.618, xAtMaxYM: 5200 },
    7500: { stdAtMaxYM: 57.6, meanMaxYM: 138.468, xAtMaxYM: 5700 },
    8000: { stdAtMaxYM: 67.5, meanMaxYM: 131.075, xAtMaxYM: 6200 },
  },
  lofted: {
    3000: { stdAtMaxYM: 19.4, meanMaxYM: 130.658, xAtMaxYM: 1900 },
    3500: { stdAtMaxYM: 23.7, meanMaxYM: 173.382, xAtMaxYM: 2100 },
    4000: { stdAtMaxYM: 23.9, meanMaxYM: 192.088, xAtMaxYM: 2500 },
    4500: { stdAtMaxYM: 28.2, meanMaxYM: 206.104, xAtMaxYM: 2600 },
    5000: { stdAtMaxYM: 36.9, meanMaxYM: 234.767, xAtMaxYM: 2700 },
    5500: { stdAtMaxYM: 44.2, meanMaxYM: 298.368, xAtMaxYM: 3200 },
    6000: { stdAtMaxYM: 46.5, meanMaxYM: 337.5265, xAtMaxYM: 3600 },
    6500: { stdAtMaxYM: 64.4, meanMaxYM: 385.6065, xAtMaxYM: 4000 },
    7000: { stdAtMaxYM: 76.6, meanMaxYM: 419.839, xAtMaxYM: 4300 },
    7500: { stdAtMaxYM: 94.7, meanMaxYM: 461.554, xAtMaxYM: 4600 },
    8000: { stdAtMaxYM: 113.6, meanMaxYM: 496.0665, xAtMaxYM: 5300 },
  },
  loftedPlus: {
    3000: { stdAtMaxYM: 20.9, meanMaxYM: 125.417, xAtMaxYM: 1900 },
    3500: { stdAtMaxYM: 25.0, meanMaxYM: 159.761, xAtMaxYM: 2100 },
    4000: { stdAtMaxYM: 24.0, meanMaxYM: 184.47, xAtMaxYM: 2500 },
    4500: { stdAtMaxYM: 35.7, meanMaxYM: 203.69, xAtMaxYM: 2600 },
    5000: { stdAtMaxYM: 43.7, meanMaxYM: 224.135, xAtMaxYM: 3000 },
    5500: { stdAtMaxYM: 42.0, meanMaxYM: 279.458, xAtMaxYM: 3100 },
    6000: { stdAtMaxYM: 56.2, meanMaxYM: 377.8485, xAtMaxYM: 3400 },
    6500: { stdAtMaxYM: 66.3, meanMaxYM: 421.672, xAtMaxYM: 3800 },
    7000: { stdAtMaxYM: 69.5, meanMaxYM: 445.6225, xAtMaxYM: 4200 },
    7500: { stdAtMaxYM: 81.8, meanMaxYM: 447.015, xAtMaxYM: 4300 },
    8000: { stdAtMaxYM: 96.2, meanMaxYM: 455.25, xAtMaxYM: 4100 },
  },
}

function isValidTargetRange(value: number): value is DirectionalShootingTargetRangeM {
  return DIRECTIONAL_SHOOTING_TARGET_RANGES_M.includes(value as DirectionalShootingTargetRangeM)
}

export function calculateDirectionalShootingDistance(
  inputs: DirectionalShootingDistanceInputs,
): DirectionalShootingDistanceResult {
  const { trajectory, targetRangeM } = inputs

  if (!DIRECTIONAL_SHOOTING_TABLE[trajectory]) {
    throw new Error('סוג המסלול אינו תקין')
  }

  if (!isValidTargetRange(targetRangeM)) {
    throw new Error('טווח המטרה חייב להיות אחד מהטווחים בטבלה')
  }

  return {
    ...DIRECTIONAL_SHOOTING_TABLE[trajectory][targetRangeM],
    targetRangeM,
  }
}
