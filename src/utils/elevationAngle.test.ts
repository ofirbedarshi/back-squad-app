import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { elevationAngleDegFromHorizontalDistanceAndHeightDifference } from './elevationAngle.ts'

describe('elevationAngleDegFromHorizontalDistanceAndHeightDifference', () => {
  it('returns angle in degrees from horizontal distance and height difference', () => {
    const angle = elevationAngleDegFromHorizontalDistanceAndHeightDifference(100, 17.63)

    assert.ok(Math.abs(angle - 10) < 0.01)
  })

  it('uses absolute height difference', () => {
    const positive = elevationAngleDegFromHorizontalDistanceAndHeightDifference(100, 17.5)
    const negative = elevationAngleDegFromHorizontalDistanceAndHeightDifference(100, -17.5)

    assert.equal(positive, negative)
  })

  it('throws when horizontal distance is not positive', () => {
    assert.throws(
      () => elevationAngleDegFromHorizontalDistanceAndHeightDifference(0, 10),
      /מרחק אופקי לא תקין/,
    )
  })

  it('throws when height difference is not finite', () => {
    assert.throws(
      () => elevationAngleDegFromHorizontalDistanceAndHeightDifference(100, Number.NaN),
      /הפרש גובה לא תקין/,
    )
  })
})
