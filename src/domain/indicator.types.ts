import type { PositionCoordinates } from './position.types'

export interface IndicatorInput {
  indicatorName: string
  coordinates: PositionCoordinates
  altitude: number
  means: string
  markCode: number
  targetDomain?: string
}

export interface Indicator extends IndicatorInput {
  id: string
  savedAt: string
}
