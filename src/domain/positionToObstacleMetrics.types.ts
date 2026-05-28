import type { PositionCoordinates } from './position.types'
import type { TargetLiveMetrics } from './targetLiveMetrics.types'

export interface PositionToObstacleMetricsInput {
  positionCoordinates?: PositionCoordinates
  positionAltitude?: string | number
  obstacleCoordinates?: PositionCoordinates
  obstacleAltitude?: string | number
}

export type PositionToObstacleMetrics = TargetLiveMetrics
