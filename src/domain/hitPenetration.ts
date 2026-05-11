import type {
  HitPenetrationDelay,
  HitPenetrationInputs,
  HitPenetrationMunition,
  HitPenetrationRangeKm,
  HitPenetrationResult,
  HitPenetrationTargetMaterial,
  HitPenetrationTrajectory,
} from './hitPenetration.types'

const TRAJECTORY_ANGLES_DEG: Record<HitPenetrationTrajectory, number> = {
  lofted: 30,
  low: 20,
}

const DELAY_MS: Record<HitPenetrationDelay, number> = {
  long: 11,
  short: 5,
  impact: 0,
}

const RANGE_SPEED_MS: Record<HitPenetrationRangeKm, number> = {
  4: 230,
  5: 230,
  6: 230,
  7: 230,
  8: 130,
  9: 130,
  9.75: 130,
}

const MUNITION_DIVERGENCE: Record<HitPenetrationMunition, number> = {
  bush: 0.13,
  rattler: 0.18,
  spectro: 0.08,
  zur: 1.2,
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

function validateFiniteNumber(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} חייב להיות מספר תקין`)
  }
}

function validateAngle(value: number, label: string, allowZero: boolean): void {
  validateFiniteNumber(value, label)

  if (value > 90 || (allowZero ? value < 0 : value <= 0)) {
    throw new Error(`${label} חייבת להיות בין ${allowZero ? '0' : 'מעל 0'} ל-90 מעלות`)
  }
}

function calculateSpeedAfterPenetration(
  speedMs: number,
  targetMaterial: HitPenetrationTargetMaterial,
): number {
  return targetMaterial === 'blocks' ? speedMs / 2 : speedMs
}

export function calculateHitPenetration(inputs: HitPenetrationInputs): HitPenetrationResult {
  validateAngle(inputs.horizontalAttackAngleDeg, 'זווית התקיפה האופקית', true)
  validateAngle(inputs.verticalDesignationAngleDeg, 'זווית הציון האנכית', false)
  validateAngle(inputs.horizontalDesignationAngleToWallDeg, 'זווית הציון האופקית', false)
  validateFiniteNumber(inputs.designationRangeKm, 'טווח הציון')

  if (inputs.designationRangeKm < 0) {
    throw new Error('טווח הציון חייב להיות מספר חיובי')
  }

  const trajectoryAngleDeg = TRAJECTORY_ANGLES_DEG[inputs.trajectory]
  const delayMs = DELAY_MS[inputs.delay]
  const speedMs = RANGE_SPEED_MS[inputs.rangeKm]
  const speedAfterPenetrationMs = calculateSpeedAfterPenetration(speedMs, inputs.targetMaterial)
  const munitionDivergence = MUNITION_DIVERGENCE[inputs.munition]

  const penetrationToBurstDiagonalM = (speedAfterPenetrationMs / 1000) * delayMs
  const trajectoryAngleRad = degreesToRadians(trajectoryAngleDeg)
  const penetrationToBurstHorizontalM = penetrationToBurstDiagonalM * Math.cos(trajectoryAngleRad)
  const penetrationToBurstVerticalM = penetrationToBurstDiagonalM * Math.sin(trajectoryAngleRad)

  const horizontalDesignationAngleRad = degreesToRadians(inputs.horizontalDesignationAngleToWallDeg)
  const minCornerToFacadeHitM =
    inputs.impactFace === 'front'
      ? penetrationToBurstHorizontalM * Math.cos(horizontalDesignationAngleRad) + 0.5
      : null

  const nominalSpotSizeM = (inputs.designationRangeKm * munitionDivergence + 0.1) * 1.5
  const limitingSmearAngleDeg =
    inputs.impactFace === 'roof'
      ? inputs.verticalDesignationAngleDeg
      : Math.min(90 - inputs.verticalDesignationAngleDeg, inputs.horizontalDesignationAngleToWallDeg)
  const smearSizeM = nominalSpotSizeM / Math.sin(degreesToRadians(limitingSmearAngleDeg))

  if (!Number.isFinite(smearSizeM)) {
    throw new Error('זווית המריחה אינה מאפשרת חישוב תקין')
  }

  return {
    trajectoryAngleDeg,
    delayMs,
    speedMs,
    speedAfterPenetrationMs,
    munitionDivergence,
    penetrationToBurstDiagonalM,
    penetrationToBurstHorizontalM,
    penetrationToBurstVerticalM,
    minCornerToFacadeHitM,
    nominalSpotSizeM,
    smearSizeM,
  }
}
