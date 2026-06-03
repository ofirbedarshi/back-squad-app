import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { CLOUDS_FLAT_FLIGHT_PATH_NOTE, CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE } from '../domain/cloudsFeasibility.ts'
import { buildCloudsFeasibilityFlightPathResultsByGeneration } from './buildCloudsFeasibilityFlightPathResultsByGeneration.ts'

describe('buildCloudsFeasibilityFlightPathResultsByGeneration', () => {
  it('evaluates all flight paths for both generations from shared domain logic', () => {
    const results = buildCloudsFeasibilityFlightPathResultsByGeneration({
      positionToTargetHeightDifferenceMeters: 750,
      positionToTargetRangeMeters: 7200,
      targetHeightMeters: 200,
      cloudHeightMeters: 700,
    })

    assert.equal(results.a.lofted.enabled, true)
    assert.equal(results.b.lofted.enabled, true)

    assert.equal(results.a.flat.enabled, true)
    assert.equal(results.a.flat.notes, CLOUDS_FLAT_FLIGHT_PATH_NOTE)

    assert.equal(results.a['+lofted'].enabled, false)
    assert.equal(results.a['+lofted'].notes, CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE)

    assert.equal(results.b['+lofted'].enabled, true)
  })

  it('marks lofted as not enabled when computed equals cloud height', () => {
    const results = buildCloudsFeasibilityFlightPathResultsByGeneration({
      positionToTargetHeightDifferenceMeters: 750,
      positionToTargetRangeMeters: 7200,
      targetHeightMeters: 200,
      cloudHeightMeters: 600,
    })

    assert.equal(results.a.lofted.enabled, false)
    assert.equal(results.b.lofted.enabled, false)
  })
})
