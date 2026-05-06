export interface IndicatorInput {
  indicatorName: string
  coordinates: number
  altitude: number
  means: string
  markCode: number
  targetDomain?: string
}

export interface Indicator extends IndicatorInput {
  id: string
  savedAt: string
}
