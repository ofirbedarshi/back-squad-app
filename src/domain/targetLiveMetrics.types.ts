export interface TargetLiveMetricsInput {
  sourceEast: string
  sourceNorth: string
  sourceHeight: number
  targetCoordinates: string
  targetHeight?: number
}

export interface TargetLiveMetrics {
  azimuth: number
  range: number
  altitudeDiff: number
}
