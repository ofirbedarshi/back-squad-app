export interface IndicatorInput {
  indicatorName: string
  coordinates: number
  altitude: number
  means: string
  markCode: number
  targetDomain?: string
  azimuth?: number
  range?: number
}

export interface Indicator extends IndicatorInput {
  id: string
  savedAt: string
}
