export type ObstacleHeightReference = 'amsl' | 'abovePosition'

export interface ObstacleHeightMetrics {
  obstacleHeightMeters: number
  positionToObstacleHeightDifferenceMeters: number
}

export interface ResolveObstacleHeightMetricsInput {
  rawHeightMeters: number
  reference: ObstacleHeightReference
  positionAltitudeMeters: number
}
