import {
  calculateMovingTarget,
  computeFlightTimeSecFromRange,
  lookupRange,
} from '../domain/movingTarget'
import type { MovingTargetDisplayResult, MovingTargetRange } from '../domain/movingTarget.types'

function parsePositiveNumber(raw: string): number | null {
  const n = Number(raw.trim().replace(',', '.'))
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

function fmt(n: number, decimals = 0): string {
  return n.toFixed(decimals)
}

export function getLookupDisplayForRange(rangeKm: MovingTargetRange) {
  const { minDetectionKm, flightSpeedMs } = lookupRange(rangeKm)
  const minDetectionTimeSec = (minDetectionKm * 1000) / flightSpeedMs
  return {
    minDetectionKm: fmt(minDetectionKm, 1),
    flightSpeedMs: fmt(flightSpeedMs),
    minDetectionTimeSec: fmt(minDetectionTimeSec, 1),
  }
}

export function getComputedFlightTimeDisplayForRange(rangeKm: MovingTargetRange): string {
  return fmt(computeFlightTimeSecFromRange(rangeKm), 1)
}

export function resolveFlightTimeSec(
  rangeKm: MovingTargetRange,
  flightTimeRaw: string,
): number {
  const manual = parsePositiveNumber(flightTimeRaw)
  if (manual !== null) return manual
  return computeFlightTimeSecFromRange(rangeKm)
}

export function calculateMovingTargetFromInputs(
  rangeKm: MovingTargetRange,
  targetSpeedRaw: string,
  flightTimeRaw: string,
): MovingTargetDisplayResult | null {
  const targetSpeedKmh = parsePositiveNumber(targetSpeedRaw)
  if (targetSpeedKmh === null) return null

  const flightTimeSec = resolveFlightTimeSec(rangeKm, flightTimeRaw)

  const result = calculateMovingTarget({ rangeKm, targetSpeedKmh, flightTimeSec })

  return {
    fireCommandDistanceM: fmt(result.fireCommandDistanceM),
    minClearDistanceM: fmt(result.minClearDistanceM),
  }
}
