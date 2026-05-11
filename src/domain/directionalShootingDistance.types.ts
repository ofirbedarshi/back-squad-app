export type DirectionalShootingTrajectory = 'flat' | 'lofted' | 'loftedPlus'

export type DirectionalShootingTargetRangeM =
  | 3000
  | 3500
  | 4000
  | 4500
  | 5000
  | 5500
  | 6000
  | 6500
  | 7000
  | 7500
  | 8000

export interface DirectionalShootingDistanceInputs {
  trajectory: DirectionalShootingTrajectory
  targetRangeM: DirectionalShootingTargetRangeM
}

export interface DirectionalShootingDistanceResult {
  stdAtMaxYM: number
  meanMaxYM: number
  xAtMaxYM: number
  targetRangeM: DirectionalShootingTargetRangeM
}

export interface DirectionalShootingDistanceDisplayResult {
  stdAtMaxYM: string
  meanMaxYM: string
  xAtMaxYM: string
  targetRangeM: string
}
