import type { FireFeasibilityFlightPathPercentByPath } from './fireFeasibility.types.ts'

export type HitProbabilityDataMapKey = 'LOW' | 'FLAT' | 'LOFTED' | 'LOFTED_PLUS'

export interface HitProbabilityRoundingContext {
  rawValue: number
  selectedValue: number
  selectedIndex: number
  tieUsed: boolean
}

export interface HitProbabilityLookupInput {
  positionToTargetRangeMeters: number
  positionToTargetHeightDifferenceMeters: number
}

export interface HitProbabilityLookupDebugContext {
  range: HitProbabilityRoundingContext
  heightDifference: HitProbabilityRoundingContext
}

export interface HitProbabilityLookupResult {
  percentByFlightPath: FireFeasibilityFlightPathPercentByPath
  debug: HitProbabilityLookupDebugContext
}
