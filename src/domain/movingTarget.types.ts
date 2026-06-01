export type MovingTargetRange = 4 | 5 | 6 | 7 | 8 | 9 | 9.75

export interface MovingTargetLookupRow {
  minDetectionKm: number
  flightSpeedMs: number
}

export interface MovingTargetInputs {
  rangeKm: MovingTargetRange
  targetSpeedKmh: number
  flightTimeSec: number
}

export interface MovingTargetResult {
  minDetectionKm: number
  flightSpeedMs: number
  minDetectionTimeSec: number
  fireCommandDistanceM: number
  minClearDistanceM: number
}

export interface MovingTargetDisplayResult {
  fireCommandDistanceM: string
  minClearDistanceM: string
}
