import { isAzimuthDegreeInRange } from './azimuthDegree.ts'
import type { DeflectionAngleInputs, DeflectionAngleResult } from './deflectionAngle.types'

/** Excel MOD — remainder with divisor sign (positive divisor → 0..d-1). */
export function excelMod(n: number, d: number): number {
  if (d === 0) {
    throw new Error('MOD: מחלק אפס')
  }
  return n - d * Math.floor(n / d)
}

function validateAzimuth(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} חייב להיות מספר תקין`)
  }
  if (!isAzimuthDegreeInRange(value)) {
    throw new Error(`${label} חייב להיות בין 0 ל-359.9`)
  }
}

/** ABS(MOD(azimuth - wall + 90, 180) - 90) — זווית ציון / הגעה לקיר. */
export function acuteAngleBetweenAzimuthAndWall(
  azimuthDeg: number,
  wallAzimuthDeg: number,
): number {
  const mod = excelMod(azimuthDeg - wallAzimuthDeg + 90, 180)
  return Math.abs(mod - 90)
}

/** IF(obs - launcher > 180, 360 - ABS(diff), ABS(diff)) — זווית קודקוד. */
export function apexAngleBetweenAzimuths(
  targetObservationAzimuthDeg: number,
  targetLauncherAzimuthDeg: number,
): number {
  const diff = targetObservationAzimuthDeg - targetLauncherAzimuthDeg
  if (diff > 180) {
    return 360 - Math.abs(diff)
  }
  return Math.abs(diff)
}

/** ROUND(1 / SIN(angle°), 1) — מכפיל פי לפי זווית (מרחק על קיר / הסט צידה). */
export function feetMultiplierFromAngleDeg(angleDeg: number): number | null {
  const radians = (angleDeg * Math.PI) / 180
  const sin = Math.sin(radians)
  if (!Number.isFinite(sin) || sin === 0) {
    return null
  }
  return Math.round((1 / sin) * 10) / 10
}

export function calculateDeflectionAngle(inputs: DeflectionAngleInputs): DeflectionAngleResult {
  validateAzimuth(inputs.targetObservationAzimuthDeg, 'אזימוט תצפית מטרה')
  validateAzimuth(inputs.targetLauncherAzimuthDeg, 'אזימוט משגר מטרה')
  validateAzimuth(inputs.wallAzimuthDeg, 'אזימוט קיר')

  const designationAngleToWallDeg = acuteAngleBetweenAzimuthAndWall(
    inputs.targetObservationAzimuthDeg,
    inputs.wallAzimuthDeg,
  )
  const apexAngleDeg = apexAngleBetweenAzimuths(
    inputs.targetObservationAzimuthDeg,
    inputs.targetLauncherAzimuthDeg,
  )
  const missileArrivalAngleToWallDeg = acuteAngleBetweenAzimuthAndWall(
    inputs.targetLauncherAzimuthDeg,
    inputs.wallAzimuthDeg,
  )

  return {
    designationAngleToWallDeg,
    apexAngleDeg,
    missileArrivalAngleToWallDeg,
    requiredDistanceOnWallFeet: feetMultiplierFromAngleDeg(designationAngleToWallDeg),
    sideDriftDeflectionIncreaseFeet: feetMultiplierFromAngleDeg(missileArrivalAngleToWallDeg),
  }
}
