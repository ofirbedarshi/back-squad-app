import type {
  MovingTargetInputs,
  MovingTargetLookupRow,
  MovingTargetRange,
  MovingTargetResult,
} from './movingTarget.types'

export const VALID_RANGES: MovingTargetRange[] = [4, 5, 6, 7, 8, 9, 9.75]

const LOOKUP_TABLE: Record<MovingTargetRange, MovingTargetLookupRow> = {
  4:  { minDetectionKm: 2.5, flightSpeedMs: 270 },
  5:  { minDetectionKm: 2.5, flightSpeedMs: 230 },
  6:  { minDetectionKm: 3.0, flightSpeedMs: 200 },
  7:  { minDetectionKm: 3.0, flightSpeedMs: 160 },
  8:  { minDetectionKm: 4.0, flightSpeedMs: 130 },
  9:  { minDetectionKm: 4.0, flightSpeedMs: 130 },
  9.75: { minDetectionKm: 4.0, flightSpeedMs: 100 },
}

export function lookupRange(rangeKm: MovingTargetRange): MovingTargetLookupRow {
  return LOOKUP_TABLE[rangeKm]
}

export function calculateMovingTarget(inputs: MovingTargetInputs): MovingTargetResult {
  const { rangeKm, targetSpeedKmh, flightTimeSec } = inputs

  if (!Number.isFinite(targetSpeedKmh) || targetSpeedKmh < 0) {
    throw new Error('מהירות המטרה חייבת להיות מספר חיובי')
  }
  if (!Number.isFinite(flightTimeSec) || flightTimeSec < 0) {
    throw new Error('זמן המעוף חייב להיות מספר חיובי')
  }

  const { minDetectionKm, flightSpeedMs } = LOOKUP_TABLE[rangeKm]
  const targetSpeedMs = targetSpeedKmh / 3.6

  // Time for missile to travel from minimum detection range to target
  const minDetectionTimeSec = (minDetectionKm * 1000) / flightSpeedMs

  // Distance target travels during total missile flight time (where to give fire command)
  const fireCommandDistanceM = targetSpeedMs * flightTimeSec

  // Distance target travels during minimum detection time (minimum clear distance)
  const minClearDistanceM = targetSpeedMs * minDetectionTimeSec

  return {
    minDetectionKm,
    flightSpeedMs,
    minDetectionTimeSec,
    fireCommandDistanceM,
    minClearDistanceM,
  }
}
