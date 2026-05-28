export interface ObstaclesFeasibilityEvaluationInput {
  positionToObstacleRangeMeters: number
  positionToObstacleHeightDifferenceMeters: number
  obstacleHeightMeters: number
}

export type ObstaclesFeasibilityLookupTrajectory = 'low' | 'lofted' | 'loftedPlus'

export interface ObstaclesFeasibilityLookupCell {
  low?: number
  lofted?: number
  loftedPlus?: number
}

export interface ObstaclesFeasibilityLookupData {
  rangesMeters: number[]
  positionToTargetHeightDifferencesMeters: number[]
  positionToObstacleRangesMeters: number[]
  lookup: Record<string, ObstaclesFeasibilityLookupCell>
}

export interface ObstaclesFeasibilityLookupContext {
  key: string
  rangeMeters: number
  positionToTargetHeightDifferenceMeters: number
  positionToObstacleRangeMeters: number
  trajectory: ObstaclesFeasibilityLookupTrajectory
  missileHeightAbovePositionMeters: number
}
