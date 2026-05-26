import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  CLOUDS_FEASIBILITY_TOLERANCE_METERS,
  CLOUDS_FLAT_FLIGHT_PATH_NOTE,
  CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE,
  CLOUDS_OUT_OF_TABLE_NOTE,
  assertCloudsFlightPath,
  evaluateCloudsFeasibility,
  lookupCloudsTableValue,
} from './cloudsFeasibility.ts'
import { CloudsFeasibilityOutOfTableError } from './errors.ts'
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

  it('throws CloudsFeasibilityOutOfTableError when cell is empty in table', () => {
    assert.throws(
      () => lookupCloudsTableValue(850, 4500, 'lofted'),
      CloudsFeasibilityOutOfTableError,
    )
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
    assert.equal(result.notes, '')
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

  it('flat flight path is always enabled with note', () => {
    const result = evaluateCloudsFeasibility(evalInput({ flightPath: 'flat' }))
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_FLAT_FLIGHT_PATH_NOTE)
    assert.equal(result.lookupValue, undefined)
    assert.equal(result.computed, undefined)
  })

  it('lofted+ flight path is disabled with generation-a note', () => {
    const result = evaluateCloudsFeasibility(evalInput({ flightPath: '+lofted' }))
    assert.equal(result.enabled, false)
    assert.equal(result.notes, CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE)
    assert.equal(result.lookupValue, undefined)
    assert.equal(result.computed, undefined)
  })

  it('throws when range is outside table', () => {
    assert.throws(
      () => evaluateCloudsFeasibility(evalInput({ positionToTargetRangeMeters: 3000 })),
      /טווח מחוץ/,
    )
  })

  it('enabled true with note when cell is empty in table', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({
        positionToTargetHeightDifferenceMeters: 850,
        positionToTargetRangeMeters: 4500,
      }),
    )
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_OUT_OF_TABLE_NOTE)
    assert.equal(result.lookupValue, undefined)
    assert.equal(result.computed, undefined)
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
