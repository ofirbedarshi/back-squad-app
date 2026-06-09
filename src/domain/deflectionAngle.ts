import { isAzimuthDegreeInRange } from './azimuthDegree.ts'
import type {
  DeflectionAngleCoordinatesInputs,
  DeflectionAngleDerivedAzimuths,
  DeflectionAngleInputs,
  DeflectionAngleResult,
} from './deflectionAngle.types.ts'

export const APEX_ANGLE_WARNING_ABOVE_DEG = 60
export const MISSILE_ARRIVAL_ANGLE_WARNING_BELOW_DEG = 30

export function isApexAngleWarning(apexAngleDeg: number): boolean {
  return apexAngleDeg > APEX_ANGLE_WARNING_ABOVE_DEG
}

export function isMissileArrivalAngleWarning(missileArrivalAngleToWallDeg: number): boolean {
  return missileArrivalAngleToWallDeg < MISSILE_ARRIVAL_ANGLE_WARNING_BELOW_DEG
}

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

/** Excel ATAN2(ΔE, ΔN) → degrees, MOD 360, rounded — matches azimuth_calculator2 row 8. */
export function azimuthDegFromEastNorth(
  fromEast: number,
  fromNorth: number,
  toEast: number,
  toNorth: number,
): number {
  const dE = toEast - fromEast
  const dN = toNorth - fromNorth
  const degrees = (Math.atan2(dE, dN) * 180) / Math.PI
  return Math.round(excelMod(degrees, 360))
}

export function deriveDeflectionAzimuthsFromCoordinates(
  inputs: DeflectionAngleCoordinatesInputs,
): DeflectionAngleDerivedAzimuths {
  validateCoordinate(inputs.indicatorEast, 'מזרח מציין')
  validateCoordinate(inputs.indicatorNorth, 'צפון מציין')
  validateCoordinate(inputs.launcherEast, 'מזרח משגר')
  validateCoordinate(inputs.launcherNorth, 'צפון משגר')
  validateCoordinate(inputs.wallCorner1East, 'מזרח פינת קיר 1')
  validateCoordinate(inputs.wallCorner1North, 'צפון פינת קיר 1')
  validateCoordinate(inputs.wallCorner2East, 'מזרח פינת קיר 2')
  validateCoordinate(inputs.wallCorner2North, 'צפון פינת קיר 2')

  if (
    inputs.wallCorner1East === inputs.wallCorner2East &&
    inputs.wallCorner1North === inputs.wallCorner2North
  ) {
    throw new Error('פינות הקיר חייבות להיות שונות')
  }

  const wallMidEast = (inputs.wallCorner1East + inputs.wallCorner2East) / 2
  const wallMidNorth = (inputs.wallCorner1North + inputs.wallCorner2North) / 2

  return {
    targetObservationAzimuthDeg: azimuthDegFromEastNorth(
      inputs.indicatorEast,
      inputs.indicatorNorth,
      wallMidEast,
      wallMidNorth,
    ),
    targetLauncherAzimuthDeg: azimuthDegFromEastNorth(
      inputs.launcherEast,
      inputs.launcherNorth,
      wallMidEast,
      wallMidNorth,
    ),
    wallAzimuthDeg: azimuthDegFromEastNorth(
      inputs.wallCorner1East,
      inputs.wallCorner1North,
      inputs.wallCorner2East,
      inputs.wallCorner2North,
    ),
  }
}

function validateCoordinate(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} חייב להיות מספר תקין`)
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
