export interface DeflectionAngleInputs {
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
  requiredDistanceOnWallFeet: string | null
  sideDriftDeflectionIncreaseFeet: string | null
}
