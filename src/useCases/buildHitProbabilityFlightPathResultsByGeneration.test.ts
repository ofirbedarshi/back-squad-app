import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildHitProbabilityFlightPathResultsByGeneration } from './buildHitProbabilityFlightPathResultsByGeneration.ts'

describe('buildHitProbabilityFlightPathResultsByGeneration', () => {
  it('returns Gen A stub and Gen B lookup for table bucket', () => {
    const results = buildHitProbabilityFlightPathResultsByGeneration({
      positionToTargetRangeMeters: 9750,
      positionToTargetHeightDifferenceMeters: 800,
    })

    assert.equal(results.a.percentByFlightPath.flat, 0)
    assert.equal(results.a.percentByFlightPath.low, 0)
    assert.equal(results.a.percentByFlightPath.lofted, 0)
    assert.equal(results.a.percentByFlightPath['+lofted'], 0)
    assert.equal(results.a.logs.length, 0)

    assert.equal(results.b.percentByFlightPath.flat, 5)
    assert.equal(results.b.percentByFlightPath.low, 5)
    assert.equal(results.b.percentByFlightPath.lofted, 50)
    assert.equal(results.b.percentByFlightPath['+lofted'], 60)
    assert.ok(results.b.logs.some((line) => line.includes('חישוב סיכויי פגיעה')))
  })
})
