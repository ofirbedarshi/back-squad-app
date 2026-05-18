import type { PositionCoordinates } from './position.types'
import type { TargetLiveMetrics } from './targetLiveMetrics.types'

export interface PositionToTargetMetricsInput {
  targetId?: string
  positionId?: string
  positionCoordinates?: PositionCoordinates
  positionAltitude?: string | number
  targetCoordinates?: PositionCoordinates
  targetAltitude?: string | number
}

export type PositionToTargetMetrics = TargetLiveMetrics
