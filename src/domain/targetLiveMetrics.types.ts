import type { PositionCoordinates } from './position.types'

export interface TargetLiveMetricsInput {
  sourceEast: string
  sourceNorth: string
  sourceHeight: number
  targetCoordinates: PositionCoordinates
  targetHeight?: number
}

export interface TargetLiveMetrics {
  azimuth: number
  range: number
  altitudeDiff: number
}
