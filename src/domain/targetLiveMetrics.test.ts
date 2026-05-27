import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calculateTargetLiveMetrics, formatLiveMetric, roundLiveMetric } from './targetLiveMetrics.ts'

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

  it('rounds metrics to two decimal places', () => {
    const result = calculateTargetLiveMetrics({
      sourceEast: '0',
      sourceNorth: '0',
      sourceHeight: 0,
      targetCoordinates: { east: '1', north: '3' },
      targetHeight: 0,
    })

    assert.ok(result)
    assert.equal(result.range, 3.16)
    assert.equal(result.azimuth, 18.43)
  })
})

describe('roundLiveMetric', () => {
  it('rounds to two decimal places', () => {
    assert.equal(roundLiveMetric(127.444), 127.44)
    assert.equal(roundLiveMetric(127.446), 127.45)
    assert.equal(roundLiveMetric(90), 90)
    assert.equal(roundLiveMetric(90.046), 90.05)
  })

  it('throws for non-finite values', () => {
    assert.throws(() => roundLiveMetric(Number.NaN), /לא תקין/)
    assert.throws(() => roundLiveMetric(Number.POSITIVE_INFINITY), /לא תקין/)
  })
})

describe('formatLiveMetric', () => {
  it('uses same rounding as roundLiveMetric and drops trailing zeros', () => {
    assert.equal(formatLiveMetric(127.444), '127.44')
    assert.equal(formatLiveMetric(90), '90')
    assert.equal(formatLiveMetric(90.1), '90.1')
    assert.equal(formatLiveMetric(90.046), '90.05')
  })
})
