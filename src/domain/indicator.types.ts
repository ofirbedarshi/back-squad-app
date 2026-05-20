import type { PositionCoordinates } from './position.types'

export type IndicatorMeans = 'שיח' | 'ראטלר' | 'ספקטרו' | 'צור' | 'זיק' | 'דוהר שמיים'

export interface IndicatorInput {
  indicatorName: string
  coordinates: PositionCoordinates
  altitude: number
  means: IndicatorMeans
  markCode: number
  targetDomain?: string
}

export interface Indicator extends IndicatorInput {
  id: string
  updatedAt: string
}
