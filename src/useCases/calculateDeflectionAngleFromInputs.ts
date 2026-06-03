import { calculateDeflectionAngle } from '../domain/deflectionAngle'
import { isAzimuthDegreeInRange, parseAzimuthDegreeString } from '../domain/azimuthDegree'
import type { DeflectionAngleDisplayResult } from '../domain/deflectionAngle.types'

function formatAngleDeg(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

function formatFeetMultiplier(value: number | null): string | null {
  if (value === null) return null
  return value.toFixed(1)
}

function parseAzimuth(raw: string): number | null {
  const parsed = parseAzimuthDegreeString(raw)
  if (parsed === undefined || !isAzimuthDegreeInRange(parsed)) {
    return null
  }
  return parsed
}

function isInvalidAzimuthRaw(raw: string): boolean {
  const trimmed = raw.trim()
  if (trimmed === '') return false
  const parsed = parseAzimuthDegreeString(trimmed)
  return parsed === undefined || !isAzimuthDegreeInRange(parsed)
}

export function hasInvalidDeflectionAngleInputs(
  targetObservationAzimuthRaw: string,
  targetLauncherAzimuthRaw: string,
  wallAzimuthRaw: string,
): boolean {
  return (
    isInvalidAzimuthRaw(targetObservationAzimuthRaw) ||
    isInvalidAzimuthRaw(targetLauncherAzimuthRaw) ||
    isInvalidAzimuthRaw(wallAzimuthRaw)
  )
}

export function calculateDeflectionAngleFromInputs(
  targetObservationAzimuthRaw: string,
  targetLauncherAzimuthRaw: string,
  wallAzimuthRaw: string,
): DeflectionAngleDisplayResult | null {
  const targetObservationAzimuthDeg = parseAzimuth(targetObservationAzimuthRaw)
  const targetLauncherAzimuthDeg = parseAzimuth(targetLauncherAzimuthRaw)
  const wallAzimuthDeg = parseAzimuth(wallAzimuthRaw)

  if (
    targetObservationAzimuthDeg === null ||
    targetLauncherAzimuthDeg === null ||
    wallAzimuthDeg === null
  ) {
    return null
  }

  const result = calculateDeflectionAngle({
    targetObservationAzimuthDeg,
    targetLauncherAzimuthDeg,
    wallAzimuthDeg,
  })

  return {
    designationAngleToWallDeg: formatAngleDeg(result.designationAngleToWallDeg),
    apexAngleDeg: formatAngleDeg(result.apexAngleDeg),
    missileArrivalAngleToWallDeg: formatAngleDeg(result.missileArrivalAngleToWallDeg),
    requiredDistanceOnWallFeet: formatFeetMultiplier(result.requiredDistanceOnWallFeet),
    sideDriftDeflectionIncreaseFeet: formatFeetMultiplier(
      result.sideDriftDeflectionIncreaseFeet,
    ),
  }
}
