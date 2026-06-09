import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  evaluateConcealmentFeasibility,
  evaluateConcealmentFeasibilityWhenMissing,
} from './concealmentFeasibility'
import {
  CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE,
  CONCEALMENT_FLAT_FLIGHT_PATH_NOTE,
  CONCEALMENT_RANGE_TOO_SHORT_NOTE,
  CONCEALMENT_OUT_OF_TABLE_NOTE,
} from './fireFeasibility.constants'
import { feasibilityLookupData } from './feasibilityLookup.generated'

function makeInput(
  overrides: Partial<{
    positionToTargetRangeMeters: number
    positionToTargetHeightDifferenceMeters: number
    flightPath: string
    targetToConcealmentRangeMeters: number
    targetToConcealmentHeightDifferenceMeters: number
  }> = {},
) {
  return {
    positionToTargetRangeMeters: overrides.positionToTargetRangeMeters ?? 9000,
    positionToTargetHeightDifferenceMeters: overrides.positionToTargetHeightDifferenceMeters ?? 0,
    flightPath: overrides.flightPath ?? 'low',
    concealment: {
      targetToConcealmentRangeMeters: overrides.targetToConcealmentRangeMeters ?? 500,
      targetToConcealmentHeightDifferenceMeters:
        overrides.targetToConcealmentHeightDifferenceMeters ?? 100,
    },
  }
}

describe('evaluateConcealmentFeasibilityWhenMissing', () => {
  it('returns enabled true with explanatory note', () => {
    const result = evaluateConcealmentFeasibilityWhenMissing()

    assert.equal(result.enabled, true)
    assert.equal(result.notes, CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE)
    assert.deepEqual(result.logs, [])
  })
})

describe('evaluateConcealmentFeasibility — flat flight path', () => {
  it('returns disabled with flat note', () => {
    const result = evaluateConcealmentFeasibility(makeInput({ flightPath: 'flat' }))

    assert.equal(result.enabled, false)
    assert.equal(result.notes, CONCEALMENT_FLAT_FLIGHT_PATH_NOTE)
  })
})

describe('evaluateConcealmentFeasibility — range too short', () => {
  it('returns disabled when positionToTargetRange < 3000m', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({ positionToTargetRangeMeters: 2500 }),
    )

    assert.equal(result.enabled, false)
    assert.equal(result.notes, CONCEALMENT_RANGE_TOO_SHORT_NOTE)
  })

  it('returns disabled when positionToTargetRange exactly 0', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({ positionToTargetRangeMeters: 1000 }),
    )

    assert.equal(result.enabled, false)
    assert.equal(result.notes, CONCEALMENT_RANGE_TOO_SHORT_NOTE)
  })
})

describe('evaluateConcealmentFeasibility — band selection', () => {
  it('selects 2500m rangeFromTarget for 3–6 km range', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({ positionToTargetRangeMeters: 4000 }),
    )

    assert.ok(result.logs.some((line) => line.includes('2500')))
  })

  it('selects 3000m rangeFromTarget for 6–8 km range', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({ positionToTargetRangeMeters: 7000 }),
    )

    assert.ok(result.logs.some((line) => line.includes('3000')))
  })

  it('selects 4000m rangeFromTarget for 8+ km range', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({ positionToTargetRangeMeters: 9000 }),
    )

    assert.ok(result.logs.some((line) => line.includes('4000')))
  })
})

describe('evaluateConcealmentFeasibility — range rounding', () => {
  it('logs rounding when positionToTargetRange is not an exact table value', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({ positionToTargetRangeMeters: 9300 }),
    )

    assert.ok(result.logs.some((line) => line.includes('עוגל')))
    assert.ok(result.logs.some((line) => line.includes('9300')))
    assert.ok(result.logs.some((line) => line.includes('9000')))
  })

  it('does not log rounding when positionToTargetRange is exact table value', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({ positionToTargetRangeMeters: 9000 }),
    )

    assert.ok(!result.logs.some((line) => line.includes('עוגל')))
  })
})

describe('evaluateConcealmentFeasibility — missile vs concealment angle comparison', () => {
  it('returns out-of-table note when key not found', () => {
    const result = evaluateConcealmentFeasibility(
      makeInput({
        positionToTargetRangeMeters: 9000,
        positionToTargetHeightDifferenceMeters: 999,
      }),
    )

    assert.equal(result.enabled, true)
    assert.equal(result.notes, CONCEALMENT_OUT_OF_TABLE_NOTE)
  })

  it('logs concealment angle and missile angle', () => {
    const range = feasibilityLookupData.rangesMeters.find((r) => r >= 9000) ?? 9000
    const heightDiff = feasibilityLookupData.positionToTargetHeightDifferencesMeters[0]

    const result = evaluateConcealmentFeasibility(
      makeInput({
        positionToTargetRangeMeters: range,
        positionToTargetHeightDifferenceMeters: heightDiff,
      }),
    )

    if (result.notes !== CONCEALMENT_OUT_OF_TABLE_NOTE) {
      assert.ok(result.logs.some((line) => line.includes('זווית גובה הסתר')))
      assert.ok(result.logs.some((line) => line.includes('זווית גובה הטיל')))
    }
  })
})
