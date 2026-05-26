import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  CLOUDS_FEASIBILITY_TOLERANCE_METERS,
  assertCloudsFlightPath,
  evaluateCloudsFeasibility,
  lookupCloudsTableValue,
} from './cloudsFeasibility.ts'
import type { CloudsFeasibilityEvaluationInput } from './cloudsFeasibility.types.ts'

function evalInput(
  overrides: Partial<CloudsFeasibilityEvaluationInput>,
): CloudsFeasibilityEvaluationInput {
  return {
    positionToTargetHeightDifferenceMeters: 750,
    positionToTargetRangeMeters: 7200,
    flightPath: 'lofted',
    targetHeightMeters: 200,
    cloudHeightMeters: 700,
    ...overrides,
  }
}

describe('lookupCloudsTableValue', () => {
  it('returns table value for known height diff, range, and lofted', () => {
    assert.equal(lookupCloudsTableValue(750, 7200, 'lofted'), 300)
  })

  it('returns table value for negative height diff and low trajectory', () => {
    assert.equal(lookupCloudsTableValue(-50, 4500, 'low'), 250)
  })
})

describe('evaluateCloudsFeasibility', () => {
  it('enabled true when computed is strictly below cloud height', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({ targetHeightMeters: 200, cloudHeightMeters: 700 }),
    )
    assert.equal(result.lookupValue, 300)
    assert.equal(result.computed, 300 + 200 + CLOUDS_FEASIBILITY_TOLERANCE_METERS)
    assert.equal(result.enabled, true)
  })

  it('enabled false when computed equals cloud height (strict less-than)', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({ targetHeightMeters: 200, cloudHeightMeters: 600 }),
    )
    assert.equal(result.computed, 600)
    assert.equal(result.enabled, false)
  })

  it('enabled false when computed is above cloud height', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({ targetHeightMeters: 500, cloudHeightMeters: 700 }),
    )
    assert.equal(result.computed, 900)
    assert.equal(result.enabled, false)
  })

  it('enabled true when high lookup and low target still fit under cloud', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({
        positionToTargetHeightDifferenceMeters: -950,
        positionToTargetRangeMeters: 4200,
        targetHeightMeters: 50,
        cloudHeightMeters: 1500,
      }),
    )
    assert.equal(result.lookupValue, 1050)
    assert.equal(result.computed, 1050 + 50 + CLOUDS_FEASIBILITY_TOLERANCE_METERS)
    assert.equal(result.enabled, true)
  })

  it('throws for flat flight path', () => {
    assert.throws(() => evaluateCloudsFeasibility(evalInput({ flightPath: 'flat' })), /flat/)
  })

  it('throws for lofted+ flight path', () => {
    assert.throws(
      () => evaluateCloudsFeasibility(evalInput({ flightPath: '+lofted' })),
      /lofted \+/,
    )
  })

  it('throws when range is outside table', () => {
    assert.throws(
      () => evaluateCloudsFeasibility(evalInput({ positionToTargetRangeMeters: 3000 })),
      /טווח מחוץ/,
    )
  })

  it('throws when cell is empty in table', () => {
    assert.throws(
      () =>
        evaluateCloudsFeasibility(
          evalInput({
            positionToTargetHeightDifferenceMeters: 850,
            positionToTargetRangeMeters: 4500,
          }),
        ),
      /אין נתון בטבלת עננים/,
    )
  })

  it('throws when target height is not finite', () => {
    assert.throws(
      () => evaluateCloudsFeasibility(evalInput({ targetHeightMeters: Number.NaN })),
      /גובה מטרה/,
    )
  })
})

describe('assertCloudsFlightPath', () => {
  it('accepts low and lofted', () => {
    assertCloudsFlightPath('low')
    assertCloudsFlightPath('lofted')
  })
})
