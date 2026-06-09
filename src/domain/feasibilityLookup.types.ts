export type FeasibilityLookupTrajectory = 'low' | 'lofted' | 'loftedPlus'

export interface FeasibilityLookupCell {
  low?: number
  lofted?: number
  loftedPlus?: number
}

export interface FeasibilityLookupData {
  rangesMeters: number[]
  positionToTargetHeightDifferencesMeters: number[]
  positionToObstacleRangesMeters: number[]
  lookup: Record<string, FeasibilityLookupCell>
}
