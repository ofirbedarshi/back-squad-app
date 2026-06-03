export type HitPenetrationTrajectory = 'loftedPlus' | 'lofted' | 'low'

export type HitPenetrationDelay = 'long' | 'short' | 'impact'

export type HitPenetrationRangeKm = 4 | 5 | 6 | 7 | 8 | 9 | 9.75

export type HitPenetrationTargetMaterial = 'blocks' | 'vehicle' | 'tin' | 'window'

export type HitPenetrationMunition = 'bush' | 'rattler' | 'spectro' | 'zur'

export type HitPenetrationImpactFace = 'front' | 'roof'

export interface HitPenetrationInputs {
  trajectory: HitPenetrationTrajectory
  delay: HitPenetrationDelay
  rangeKm: HitPenetrationRangeKm
  targetMaterial: HitPenetrationTargetMaterial
  horizontalAttackAngleDeg: number
  designationRangeKm: number
  munition: HitPenetrationMunition
  verticalDesignationAngleDeg: number
  horizontalDesignationAngleToWallDeg: number
  impactFace: HitPenetrationImpactFace
}

export interface HitPenetrationResult {
  trajectoryAngleDeg: number
  delayMs: number
  speedMs: number
  speedAfterPenetrationMs: number
  munitionDivergence: number
  penetrationToBurstDiagonalM: number
  penetrationToBurstHorizontalM: number
  penetrationToBurstVerticalM: number
  minCornerToFacadeHitM: number | null
  nominalSpotSizeM: number
  smearSizeM: number
}

export interface HitPenetrationDisplayResult {
  trajectoryAngleDeg: string
  delayMs: string
  speedMs: string
  speedAfterPenetrationMs: string
  munitionDivergence: string
  penetrationToBurstDiagonalM: string
  penetrationToBurstHorizontalM: string
  penetrationToBurstVerticalM: string
  minCornerToFacadeHitM: string | null
  nominalSpotSizeM: string
  smearSizeM: string
}
