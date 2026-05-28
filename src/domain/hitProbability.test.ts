import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildHitProbabilityLogs, calculateHitProbabilityByFlightPath } from './hitProbability.ts'

describe('calculateHitProbabilityByFlightPath', () => {
  it('returns expected values for exact table bucket', () => {
    const result = calculateHitProbabilityByFlightPath({
      positionToTargetRangeMeters: 9750,
      positionToTargetHeightDifferenceMeters: 800,
    })

    assert.deepEqual(result.percentByFlightPath, {
      lofted: 50,
      '+lofted': 60,
      low: 5,
      flat: 5,
    })
    assert.equal(result.debug.range.selectedIndex, 8)
    assert.equal(result.debug.heightDifference.selectedIndex, 2)
  })

  it('snaps non-exact inputs to nearest buckets', () => {
    const result = calculateHitProbabilityByFlightPath({
      positionToTargetRangeMeters: 7420,
      positionToTargetHeightDifferenceMeters: 265,
    })

    assert.equal(result.debug.range.selectedValue, 7000)
    assert.equal(result.debug.heightDifference.selectedValue, 300)
    assert.equal(result.debug.range.tieUsed, false)
    assert.equal(result.debug.heightDifference.tieUsed, false)
  })

  it('uses upper bucket on exact tie', () => {
    const result = calculateHitProbabilityByFlightPath({
      positionToTargetRangeMeters: 2500,
      positionToTargetHeightDifferenceMeters: 50,
    })

    assert.equal(result.debug.range.selectedValue, 3000)
    assert.equal(result.debug.heightDifference.selectedValue, 100)
    assert.equal(result.debug.range.tieUsed, true)
    assert.equal(result.debug.heightDifference.tieUsed, true)
  })

  it('throws on invalid numeric input', () => {
    assert.throws(() =>
      calculateHitProbabilityByFlightPath({
        positionToTargetRangeMeters: Number.NaN,
        positionToTargetHeightDifferenceMeters: 0,
      }),
    )
  })
})

describe('buildHitProbabilityLogs', () => {
  it('includes rounding details and tie indication', () => {
    const result = calculateHitProbabilityByFlightPath({
      positionToTargetRangeMeters: 2500,
      positionToTargetHeightDifferenceMeters: 50,
    })
    const logs = buildHitProbabilityLogs(result.debug, result.percentByFlightPath)

    assert.equal(logs.some((line) => line.includes('חישוב סיכויי פגיעה')), true)
    assert.equal(logs.some((line) => line.includes('טווח גולמי: 2500')), true)
    assert.equal(logs.some((line) => line.includes('באקט נבחר: 3000')), true)
    assert.equal(logs.some((line) => line.includes('tie: כן')), true)
    assert.equal(logs.some((line) => line.includes('אחוזים לפי מסלול')), true)
  })
})
