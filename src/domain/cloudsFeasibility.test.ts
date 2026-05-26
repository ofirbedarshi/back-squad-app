import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  assertCloudsFlightPath,
  evaluateCloudsFeasibility,
  lookupCloudsTableValue,
} from './cloudsFeasibility.ts'

describe('lookupCloudsTableValue', () => {
  it('returns table value for known height diff, range, and lofted', () => {
    assert.equal(lookupCloudsTableValue(750, 7200, 'lofted'), 300)
  })

  it('returns table value for negative height diff and low trajectory', () => {
    assert.equal(lookupCloudsTableValue(-50, 4500, 'low'), 250)
  })
})

describe('evaluateCloudsFeasibility', () => {
  it('enabled false when lookup value is at most 600', () => {
    const result = evaluateCloudsFeasibility({
      positionToTargetHeightDifferenceMeters: 750,
      positionToTargetRangeMeters: 7200,
      flightPath: 'lofted',
    })
    assert.equal(result.lookupValue, 300)
    assert.equal(result.enabled, false)
  })

  it('enabled true when lookup value is above 600', () => {
    const result = evaluateCloudsFeasibility({
      positionToTargetHeightDifferenceMeters: -950,
      positionToTargetRangeMeters: 4200,
      flightPath: 'lofted',
    })
    assert.equal(result.lookupValue, 1050)
    assert.equal(result.enabled, true)
  })

  it('enabled false when lookup value equals 600 (threshold is strict greater-than)', () => {
    const result = evaluateCloudsFeasibility({
      positionToTargetHeightDifferenceMeters: -550,
      positionToTargetRangeMeters: 5500,
      flightPath: 'low',
    })
    assert.equal(result.lookupValue, 600)
    assert.equal(result.enabled, false)
  })

  it('throws for flat flight path', () => {
    assert.throws(
      () =>
        evaluateCloudsFeasibility({
          positionToTargetHeightDifferenceMeters: 750,
          positionToTargetRangeMeters: 7200,
          flightPath: 'flat',
        }),
      /flat/,
    )
  })

  it('throws for lofted+ flight path', () => {
    assert.throws(
      () =>
        evaluateCloudsFeasibility({
          positionToTargetHeightDifferenceMeters: 750,
          positionToTargetRangeMeters: 7200,
          flightPath: '+lofted',
        }),
      /lofted \+/,
    )
  })

  it('throws when range is outside table', () => {
    assert.throws(
      () =>
        evaluateCloudsFeasibility({
          positionToTargetHeightDifferenceMeters: 750,
          positionToTargetRangeMeters: 3000,
          flightPath: 'lofted',
        }),
      /טווח מחוץ/,
    )
  })

  it('throws when cell is empty in table', () => {
    assert.throws(
      () =>
        evaluateCloudsFeasibility({
          positionToTargetHeightDifferenceMeters: 850,
          positionToTargetRangeMeters: 4500,
          flightPath: 'lofted',
        }),
      /אין נתון בטבלת עננים/,
    )
  })
})

describe('assertCloudsFlightPath', () => {
  it('accepts low and lofted', () => {
    assertCloudsFlightPath('low')
    assertCloudsFlightPath('lofted')
  })
})
