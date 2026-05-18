import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calculateTargetLiveMetrics } from './targetLiveMetrics.ts'

describe('calculateTargetLiveMetrics', () => {
  it('range is horizontal distance only, not slant range', () => {
    const result = calculateTargetLiveMetrics({
      sourceEast: '0',
      sourceNorth: '0',
      sourceHeight: 100,
      targetCoordinates: { east: '300', north: '400' },
      targetHeight: 200,
    })

    assert.ok(result)
    assert.equal(result.range, 500)
    assert.equal(result.altitudeDiff, 100)
  })
})
