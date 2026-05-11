import { calculateHitPenetration } from '../domain/hitPenetration'
import type {
  HitPenetrationDelay,
  HitPenetrationDisplayResult,
  HitPenetrationImpactFace,
  HitPenetrationMunition,
  HitPenetrationRangeKm,
  HitPenetrationTargetMaterial,
  HitPenetrationTrajectory,
} from '../domain/hitPenetration.types'

function parsePositiveNumber(raw: string): number | null {
  const value = Number(raw.trim().replace(',', '.'))
  if (!Number.isFinite(value) || value < 0) return null
  return value
}

function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals)
}

function isAngleInRange(value: number, allowZero: boolean): boolean {
  return value <= 90 && (allowZero ? value >= 0 : value > 0)
}

export function calculateHitPenetrationFromInputs(
  trajectory: HitPenetrationTrajectory,
  delay: HitPenetrationDelay,
  rangeKm: HitPenetrationRangeKm,
  targetMaterial: HitPenetrationTargetMaterial,
  horizontalAttackAngleRaw: string,
  designationRangeRaw: string,
  munition: HitPenetrationMunition,
  verticalDesignationAngleRaw: string,
  horizontalDesignationAngleToWallRaw: string,
  impactFace: HitPenetrationImpactFace,
): HitPenetrationDisplayResult | null {
  const horizontalAttackAngleDeg = parsePositiveNumber(horizontalAttackAngleRaw)
  const designationRangeKm = parsePositiveNumber(designationRangeRaw)
  const verticalDesignationAngleDeg = parsePositiveNumber(verticalDesignationAngleRaw)
  const horizontalDesignationAngleToWallDeg = parsePositiveNumber(horizontalDesignationAngleToWallRaw)

  if (
    horizontalAttackAngleDeg === null ||
    designationRangeKm === null ||
    verticalDesignationAngleDeg === null ||
    horizontalDesignationAngleToWallDeg === null
  ) {
    return null
  }

  if (
    !isAngleInRange(horizontalAttackAngleDeg, true) ||
    !isAngleInRange(verticalDesignationAngleDeg, false) ||
    !isAngleInRange(horizontalDesignationAngleToWallDeg, false) ||
    (impactFace === 'front' && verticalDesignationAngleDeg >= 90)
  ) {
    return null
  }

  const result = calculateHitPenetration({
    trajectory,
    delay,
    rangeKm,
    targetMaterial,
    horizontalAttackAngleDeg,
    designationRangeKm,
    munition,
    verticalDesignationAngleDeg,
    horizontalDesignationAngleToWallDeg,
    impactFace,
  })

  return {
    trajectoryAngleDeg: formatNumber(result.trajectoryAngleDeg, 0),
    delayMs: formatNumber(result.delayMs, 0),
    speedMs: formatNumber(result.speedMs, 0),
    speedAfterPenetrationMs: formatNumber(result.speedAfterPenetrationMs, 0),
    munitionDivergence: formatNumber(result.munitionDivergence, 2),
    penetrationToBurstDiagonalM: formatNumber(result.penetrationToBurstDiagonalM),
    penetrationToBurstHorizontalM: formatNumber(result.penetrationToBurstHorizontalM),
    penetrationToBurstVerticalM: formatNumber(result.penetrationToBurstVerticalM),
    minCornerToFacadeHitM:
      result.minCornerToFacadeHitM === null ? null : formatNumber(result.minCornerToFacadeHitM),
    nominalSpotSizeM: formatNumber(result.nominalSpotSizeM),
    smearSizeM: formatNumber(result.smearSizeM),
  }
}
