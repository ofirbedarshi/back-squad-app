import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  acuteAngleBetweenAzimuthAndWall,
  apexAngleBetweenAzimuths,
  azimuthDegFromEastNorth,
  calculateDeflectionAngle,
  deriveDeflectionAzimuthsFromCoordinates,
  excelMod,
  feetMultiplierFromAngleDeg,
  isApexAngleWarning,
  isMissileArrivalAngleWarning,
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

describe('angle warning thresholds', () => {
  it('flags apex angle above 60', () => {
    assert.equal(isApexAngleWarning(60), false)
    assert.equal(isApexAngleWarning(60.1), true)
    assert.equal(isApexAngleWarning(40), false)
  })

  it('flags missile arrival angle below 30', () => {
    assert.equal(isMissileArrivalAngleWarning(30), false)
    assert.equal(isMissileArrivalAngleWarning(29.9), true)
    assert.equal(isMissileArrivalAngleWarning(39), false)
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

/** Sample from data/deflection-angle/azimuth_calculator2.xlsx */
const XLSX2_COORDS = {
  indicatorEast: 0,
  indicatorNorth: 0,
  launcherEast: 500,
  launcherNorth: 100,
  wallCorner1East: 100,
  wallCorner1North: 100,
  wallCorner2East: 200,
  wallCorner2North: 200,
}

describe('deriveDeflectionAzimuthsFromCoordinates', () => {
  it('matches azimuth_calculator2.xlsx row 8', () => {
    const derived = deriveDeflectionAzimuthsFromCoordinates(XLSX2_COORDS)
    assert.equal(derived.targetObservationAzimuthDeg, 45)
    assert.equal(derived.targetLauncherAzimuthDeg, 278)
    assert.equal(derived.wallAzimuthDeg, 45)
  })

  it('rejects identical wall corners', () => {
    assert.throws(
      () =>
        deriveDeflectionAzimuthsFromCoordinates({
          ...XLSX2_COORDS,
          wallCorner2East: XLSX2_COORDS.wallCorner1East,
          wallCorner2North: XLSX2_COORDS.wallCorner1North,
        }),
      /פינות הקיר/,
    )
  })
})

describe('azimuthDegFromEastNorth', () => {
  it('matches wall bearing corner 1 to 2 in xlsx2', () => {
    assert.equal(
      azimuthDegFromEastNorth(
        XLSX2_COORDS.wallCorner1East,
        XLSX2_COORDS.wallCorner1North,
        XLSX2_COORDS.wallCorner2East,
        XLSX2_COORDS.wallCorner2North,
      ),
      45,
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

  it('matches azimuth_calculator2.xlsx via coordinates', () => {
    const derived = deriveDeflectionAzimuthsFromCoordinates(XLSX2_COORDS)
    const result = calculateDeflectionAngle(derived)

    assert.equal(result.designationAngleToWallDeg, 0)
    assert.equal(result.apexAngleDeg, 233)
    assert.equal(result.missileArrivalAngleToWallDeg, 53)
    assert.equal(result.requiredDistanceOnWallFeet, null)
    assert.equal(result.sideDriftDeflectionIncreaseFeet, 1.3)
  })
})
