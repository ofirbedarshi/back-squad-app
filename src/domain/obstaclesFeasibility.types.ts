import type { FeasibilityLookupTrajectory } from './feasibilityLookup.types'

export interface ObstaclesFeasibilityEvaluationInput {
  positionToObstacleRangeMeters: number
  positionToObstacleHeightDifferenceMeters: number
  obstacleHeightMeters: number
}

export interface ObstaclesFeasibilityLookupContext {
  key: string
  rangeMeters: number
  positionToTargetHeightDifferenceMeters: number
  positionToObstacleRangeMeters: number
  trajectory: FeasibilityLookupTrajectory
  missileHeightAbovePositionMeters: number
}
