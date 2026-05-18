import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calculatePositionToTargetMetrics } from './positionToTargetMetrics.ts'

describe('calculatePositionToTargetMetrics', () => {
  it('returns null when position or target is not loaded', () => {
    assert.equal(
      calculatePositionToTargetMetrics({
        targetId: 't1',
        positionCoordinates: { east: '100', north: '200', palach: '30' },
        positionAltitude: '50',
        targetCoordinates: { east: '400', north: '500', palach: '30' },
        targetAltitude: '60',
      }),
      null,
    )
  })

  it('delegates azimuth and range to target live metrics', () => {
    const result = calculatePositionToTargetMetrics({
      targetId: 't1',
      positionId: 'p1',
      positionCoordinates: { east: '0', north: '0', palach: '30' },
      positionAltitude: '100',
      targetCoordinates: { east: '300', north: '400', palach: '30' },
      targetAltitude: '200',
    })

    assert.ok(result)
    assert.equal(result.range, 500)
    assert.equal(result.altitudeDiff, 100)
  })
})
