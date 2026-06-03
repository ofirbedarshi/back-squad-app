import {
  calculateDeflectionAngle,
  deriveDeflectionAzimuthsFromCoordinates,
} from '../domain/deflectionAngle.ts'
import { isAzimuthDegreeInRange, parseAzimuthDegreeString } from '../domain/azimuthDegree.ts'
import type { DeflectionAngleDisplayResult } from '../domain/deflectionAngle.types.ts'

function formatAngleDeg(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

function formatFeetMultiplier(value: number | null): string | null {
  if (value === null) return null
  return value.toFixed(1)
}

function toDisplayResult(
  result: ReturnType<typeof calculateDeflectionAngle>,
): DeflectionAngleDisplayResult {
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

function parseCoordinate(raw: string): number | null {
  const trimmed = raw.trim()
  if (trimmed === '') return null
  const value = Number(trimmed.replace(',', '.'))
  if (!Number.isFinite(value)) return null
  return value
}

function isInvalidCoordinateRaw(raw: string): boolean {
  const trimmed = raw.trim()
  if (trimmed === '') return false
  return parseCoordinate(trimmed) === null
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

export function hasInvalidDeflectionAngleCoordinateInputs(
  indicatorEastRaw: string,
  indicatorNorthRaw: string,
  launcherEastRaw: string,
  launcherNorthRaw: string,
  wallCorner1EastRaw: string,
  wallCorner1NorthRaw: string,
  wallCorner2EastRaw: string,
  wallCorner2NorthRaw: string,
): boolean {
  const fields = [
    indicatorEastRaw,
    indicatorNorthRaw,
    launcherEastRaw,
    launcherNorthRaw,
    wallCorner1EastRaw,
    wallCorner1NorthRaw,
    wallCorner2EastRaw,
    wallCorner2NorthRaw,
  ]
  return fields.some(isInvalidCoordinateRaw)
}

export function hasDuplicateWallCorners(
  wallCorner1EastRaw: string,
  wallCorner1NorthRaw: string,
  wallCorner2EastRaw: string,
  wallCorner2NorthRaw: string,
): boolean {
  const e1 = parseCoordinate(wallCorner1EastRaw)
  const n1 = parseCoordinate(wallCorner1NorthRaw)
  const e2 = parseCoordinate(wallCorner2EastRaw)
  const n2 = parseCoordinate(wallCorner2NorthRaw)
  if (e1 === null || n1 === null || e2 === null || n2 === null) {
    return false
  }
  return e1 === e2 && n1 === n2
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

  return toDisplayResult(
    calculateDeflectionAngle({
      targetObservationAzimuthDeg,
      targetLauncherAzimuthDeg,
      wallAzimuthDeg,
    }),
  )
}

export function calculateDeflectionAngleFromCoordinateInputs(
  indicatorEastRaw: string,
  indicatorNorthRaw: string,
  launcherEastRaw: string,
  launcherNorthRaw: string,
  wallCorner1EastRaw: string,
  wallCorner1NorthRaw: string,
  wallCorner2EastRaw: string,
  wallCorner2NorthRaw: string,
): DeflectionAngleDisplayResult | null {
  const indicatorEast = parseCoordinate(indicatorEastRaw)
  const indicatorNorth = parseCoordinate(indicatorNorthRaw)
  const launcherEast = parseCoordinate(launcherEastRaw)
  const launcherNorth = parseCoordinate(launcherNorthRaw)
  const wallCorner1East = parseCoordinate(wallCorner1EastRaw)
  const wallCorner1North = parseCoordinate(wallCorner1NorthRaw)
  const wallCorner2East = parseCoordinate(wallCorner2EastRaw)
  const wallCorner2North = parseCoordinate(wallCorner2NorthRaw)

  if (
    indicatorEast === null ||
    indicatorNorth === null ||
    launcherEast === null ||
    launcherNorth === null ||
    wallCorner1East === null ||
    wallCorner1North === null ||
    wallCorner2East === null ||
    wallCorner2North === null
  ) {
    return null
  }

  try {
    const derived = deriveDeflectionAzimuthsFromCoordinates({
      indicatorEast,
      indicatorNorth,
      launcherEast,
      launcherNorth,
      wallCorner1East,
      wallCorner1North,
      wallCorner2East,
      wallCorner2North,
    })
    return toDisplayResult(calculateDeflectionAngle(derived))
  } catch {
    return null
  }
}
