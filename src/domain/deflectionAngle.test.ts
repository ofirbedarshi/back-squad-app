import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  acuteAngleBetweenAzimuthAndWall,
  apexAngleBetweenAzimuths,
  calculateDeflectionAngle,
  excelMod,
  feetMultiplierFromAngleDeg,
} from './deflectionAngle.ts'

/** Sample row from data/deflection-angle/azimuth_calculator.xlsx */
const XLSX_SAMPLE = {
  targetObservationAzimuthDeg: 300,
  targetLauncherAzimuthDeg: 340,
  wallAzimuthDeg: 121,
  designationAngleToWallDeg: 1,
  apexAngleDeg: 40,
  missileArrivalAngleToWallDeg: 39,
  requiredDistanceOnWallFeet: 57.3,
  sideDriftDeflectionIncreaseFeet: 1.6,
}

describe('excelMod', () => {
  it('matches Excel MOD(269, 180)', () => {
    assert.equal(excelMod(269, 180), 89)
  })
})

describe('acuteAngleBetweenAzimuthAndWall', () => {
  it('xlsx sample: observation vs wall', () => {
    assert.equal(
      acuteAngleBetweenAzimuthAndWall(
        XLSX_SAMPLE.targetObservationAzimuthDeg,
        XLSX_SAMPLE.wallAzimuthDeg,
      ),
      XLSX_SAMPLE.designationAngleToWallDeg,
    )
  })

  it('xlsx sample: launcher vs wall', () => {
    assert.equal(
      acuteAngleBetweenAzimuthAndWall(
        XLSX_SAMPLE.targetLauncherAzimuthDeg,
        XLSX_SAMPLE.wallAzimuthDeg,
      ),
      XLSX_SAMPLE.missileArrivalAngleToWallDeg,
    )
  })
})

describe('apexAngleBetweenAzimuths', () => {
  it('xlsx sample', () => {
    assert.equal(
      apexAngleBetweenAzimuths(
        XLSX_SAMPLE.targetObservationAzimuthDeg,
        XLSX_SAMPLE.targetLauncherAzimuthDeg,
      ),
      XLSX_SAMPLE.apexAngleDeg,
    )
  })

  it('wraps when observation minus launcher exceeds 180', () => {
    assert.equal(apexAngleBetweenAzimuths(350, 10), 20)
  })
})

describe('feetMultiplierFromAngleDeg', () => {
  it('xlsx designation angle feet factor', () => {
    assert.equal(
      feetMultiplierFromAngleDeg(XLSX_SAMPLE.designationAngleToWallDeg),
      XLSX_SAMPLE.requiredDistanceOnWallFeet,
    )
  })

  it('xlsx missile arrival feet factor', () => {
    assert.equal(
      feetMultiplierFromAngleDeg(XLSX_SAMPLE.missileArrivalAngleToWallDeg),
      XLSX_SAMPLE.sideDriftDeflectionIncreaseFeet,
    )
  })
})

describe('calculateDeflectionAngle', () => {
  it('matches azimuth_calculator.xlsx row 2–8', () => {
    const result = calculateDeflectionAngle({
      targetObservationAzimuthDeg: XLSX_SAMPLE.targetObservationAzimuthDeg,
      targetLauncherAzimuthDeg: XLSX_SAMPLE.targetLauncherAzimuthDeg,
      wallAzimuthDeg: XLSX_SAMPLE.wallAzimuthDeg,
    })

    assert.equal(result.designationAngleToWallDeg, XLSX_SAMPLE.designationAngleToWallDeg)
    assert.equal(result.apexAngleDeg, XLSX_SAMPLE.apexAngleDeg)
    assert.equal(result.missileArrivalAngleToWallDeg, XLSX_SAMPLE.missileArrivalAngleToWallDeg)
    assert.equal(result.requiredDistanceOnWallFeet, XLSX_SAMPLE.requiredDistanceOnWallFeet)
    assert.equal(
      result.sideDriftDeflectionIncreaseFeet,
      XLSX_SAMPLE.sideDriftDeflectionIncreaseFeet,
    )
  })
})
