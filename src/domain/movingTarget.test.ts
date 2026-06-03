import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { computeFlightTimeSecFromRange } from './movingTarget.ts'

describe('computeFlightTimeSecFromRange', () => {
  it('range 4 uses single row speed 270', () => {
    assert.ok(Math.abs(computeFlightTimeSecFromRange(4) - 14.8148) < 0.01)
  })

  it('range 6 averages speeds for 4, 5, 6', () => {
    assert.ok(Math.abs(computeFlightTimeSecFromRange(6) - 23.4375) < 0.01)
  })

  it('range 9.75 averages all lookup speeds', () => {
    const avg = (270 + 269 + 229 + 196 + 175 + 162 + 157) / 7
    const expected = (9.75 / avg) * 1000
    assert.ok(Math.abs(computeFlightTimeSecFromRange(9.75) - expected) < 0.01)
  })
})
