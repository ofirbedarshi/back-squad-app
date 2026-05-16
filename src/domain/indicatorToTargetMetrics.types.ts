import type { PositionCoordinates } from './position.types'
import type { TargetLiveMetrics } from './targetLiveMetrics.types'

export interface IndicatorToTargetMetricsInput {
  targetId?: string
  indicatorId?: string
  indicatorCoordinates?: PositionCoordinates
  indicatorAltitude?: string | number
  targetCoordinates?: PositionCoordinates
  targetAltitude?: string | number
}

export type IndicatorToTargetMetrics = TargetLiveMetrics
