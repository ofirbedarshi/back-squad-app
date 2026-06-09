export interface ConcealmentFeasibilityEvaluationInput {
  targetToConcealmentRangeMeters: number
  targetToConcealmentHeightDifferenceMeters: number
}

export interface EvaluateConcealmentFeasibilityInput {
  positionToTargetRangeMeters: number
  positionToTargetHeightDifferenceMeters: number
  flightPath: string
  concealment: ConcealmentFeasibilityEvaluationInput
}

export interface ConcealmentLookupResult {
  concealmentAngleDeg: number
  rangeFromTargetMeters: number
  roundedPositionToTargetRangeMeters: number
  wasRangeRounded: boolean
  distFromPositionMeters: number
  missileHeightAbovePositionMeters: number
  missileHeightAboveTargetMeters: number
  missileAngleDeg: number
}
