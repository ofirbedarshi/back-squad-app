export type DeflectionAngleInputMode = 'azimuth' | 'coordinates'

export interface DeflectionAngleInputs {
  targetObservationAzimuthDeg: number
  targetLauncherAzimuthDeg: number
  wallAzimuthDeg: number
}

export interface DeflectionAngleCoordinatesInputs {
  indicatorEast: number
  indicatorNorth: number
  launcherEast: number
  launcherNorth: number
  wallCorner1East: number
  wallCorner1North: number
  wallCorner2East: number
  wallCorner2North: number
}

export interface DeflectionAngleDerivedAzimuths {
  targetObservationAzimuthDeg: number
  targetLauncherAzimuthDeg: number
  wallAzimuthDeg: number
}

export interface DeflectionAngleResult {
  designationAngleToWallDeg: number
  apexAngleDeg: number
  missileArrivalAngleToWallDeg: number
  requiredDistanceOnWallFeet: number | null
  sideDriftDeflectionIncreaseFeet: number | null
}

export interface DeflectionAngleDisplayResult {
  designationAngleToWallDeg: string
  apexAngleDeg: string
  missileArrivalAngleToWallDeg: string
  apexAngleWarning: boolean
  missileArrivalAngleWarning: boolean
  requiredDistanceOnWallFeet: string | null
  sideDriftDeflectionIncreaseFeet: string | null
}
