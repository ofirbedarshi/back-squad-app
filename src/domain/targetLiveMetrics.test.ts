import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calculateTargetLiveMetrics, formatLiveMetricOneDecimal } from './targetLiveMetrics.ts'

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

  it('azimuth is in degrees from north clockwise', () => {
    const dueEast = calculateTargetLiveMetrics({
      sourceEast: '0',
      sourceNorth: '0',
      sourceHeight: 0,
      targetCoordinates: { east: '100', north: '0' },
      targetHeight: 0,
    })

    assert.ok(dueEast)
    assert.equal(dueEast.azimuth, 90)
  })
})

describe('formatLiveMetricOneDecimal', () => {
  it('formats to one decimal place', () => {
    assert.equal(formatLiveMetricOneDecimal(127.44), '127.4')
    assert.equal(formatLiveMetricOneDecimal(90), '90.0')
    assert.equal(formatLiveMetricOneDecimal(90.04), '90.0')
  })

  it('throws for non-finite values', () => {
    assert.throws(() => formatLiveMetricOneDecimal(Number.NaN), /לא תקין/)
    assert.throws(() => formatLiveMetricOneDecimal(Number.POSITIVE_INFINITY), /לא תקין/)
  })
})
