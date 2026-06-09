import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  evaluateConcealmentFeasibility,
  evaluateConcealmentFeasibilityWhenMissing,
} from './concealmentFeasibility.ts'
import {
  CONCEALMENT_ELEVATION_ANGLE_THRESHOLD_DEG,
  CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE,
} from './fireFeasibility.constants.ts'

describe('evaluateConcealmentFeasibilityWhenMissing', () => {
  it('returns enabled true with explanatory note', () => {
    const result = evaluateConcealmentFeasibilityWhenMissing()

    assert.equal(result.enabled, true)
    assert.equal(result.notes, CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE)
    assert.deepEqual(result.logs, [])
  })
})

describe('evaluateConcealmentFeasibility', () => {
  it('returns enabled when elevation angle is above threshold', () => {
    const result = evaluateConcealmentFeasibility({
      targetToConcealmentRangeMeters: 100,
      targetToConcealmentHeightDifferenceMeters: 20,
    })

    assert.equal(result.enabled, true)
    assert.equal(result.notes, '')
    assert.ok(result.logs.some((line) => line.includes('מאפשר')))
  })

  it('returns disabled when elevation angle is at or below threshold', () => {
    const result = evaluateConcealmentFeasibility({
      targetToConcealmentRangeMeters: 100,
      targetToConcealmentHeightDifferenceMeters: 17.5,
    })

    assert.equal(result.enabled, false)
    assert.equal(result.notes, '')
    assert.ok(result.logs.some((line) => line.includes('לא מאפשר')))
  })

  it('includes computed angle and threshold in logs', () => {
    const result = evaluateConcealmentFeasibility({
      targetToConcealmentRangeMeters: 100,
      targetToConcealmentHeightDifferenceMeters: 20,
    })

    assert.ok(
      result.logs.some((line) =>
        line.includes(`סף זמני: ${CONCEALMENT_ELEVATION_ANGLE_THRESHOLD_DEG}°`),
      ),
    )
    assert.ok(result.logs.some((line) => line.includes('זווית גובה מההסתר למטרה')))
  })

  it('throws when range is invalid', () => {
    assert.throws(
      () =>
        evaluateConcealmentFeasibility({
          targetToConcealmentRangeMeters: 0,
          targetToConcealmentHeightDifferenceMeters: 20,
        }),
      /מרחק אופקי לא תקין/,
    )
  })
})
