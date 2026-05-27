import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  CLOUDS_FEASIBILITY_TOLERANCE_METERS,
  CLOUDS_FLAT_FLIGHT_PATH_NOTE,
  CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE,
  CLOUDS_OUT_OF_TABLE_NOTE,
  evaluateCloudsFeasibility,
  evaluateCloudsFeasibilityGenB,
} from './cloudsFeasibility.ts'
import type { CloudsFeasibilityEvaluationInput } from './cloudsFeasibility.types.ts'

function evalInput(
  overrides: Partial<CloudsFeasibilityEvaluationInput>,
): CloudsFeasibilityEvaluationInput {
  return {
    positionToTargetHeightDifferenceMeters: 750,
    positionToTargetRangeMeters: 7200,
    flightPath: 'lofted',
    targetHeightMeters: 200,
    cloudHeightMeters: 700,
    ...overrides,
  }
}

describe('evaluateCloudsFeasibility', () => {
  it('enabled true when computed is strictly below cloud height', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({ targetHeightMeters: 200, cloudHeightMeters: 700 }),
    )
    assert.equal(result.lookupValue, 300)
    assert.equal(result.computed, 300 + 200 + CLOUDS_FEASIBILITY_TOLERANCE_METERS)
    assert.equal(result.enabled, true)
    assert.equal(result.notes, '')
    assert.ok(result.logs.length > 0)
    assert.ok(result.logs.some((l) => l.includes('הפרש גבהים')))
    assert.ok(result.logs.some((l) => l.includes('טווח בין עמדה למטרה')))
    assert.ok(result.logs.some((l) => l.includes('מסלול מעוף')))
    assert.ok(result.logs.some((l) => l.includes('טולרנס')))
    assert.ok(result.logs.some((l) => l.includes('מאפשר')))
  })

  it('enabled false when computed equals cloud height (strict less-than)', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({ targetHeightMeters: 200, cloudHeightMeters: 600 }),
    )
    assert.equal(result.computed, 600)
    assert.equal(result.enabled, false)
    assert.ok(result.logs.some((l) => l.includes('לא מאפשר')))
  })

  it('enabled false when computed is above cloud height', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({ targetHeightMeters: 500, cloudHeightMeters: 700 }),
    )
    assert.equal(result.computed, 900)
    assert.equal(result.enabled, false)
  })

  it('uses low trajectory column for negative height diff', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({
        positionToTargetHeightDifferenceMeters: -50,
        positionToTargetRangeMeters: 4500,
        flightPath: 'low',
        targetHeightMeters: 0,
        cloudHeightMeters: 400,
      }),
    )
    assert.equal(result.lookupValue, 250)
    assert.equal(result.computed, 250 + CLOUDS_FEASIBILITY_TOLERANCE_METERS)
    assert.equal(result.enabled, true)
  })

  it('enabled true when high lookup and low target still fit under cloud', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({
        positionToTargetHeightDifferenceMeters: -950,
        positionToTargetRangeMeters: 4200,
        targetHeightMeters: 50,
        cloudHeightMeters: 1500,
      }),
    )
    assert.equal(result.lookupValue, 1050)
    assert.equal(result.computed, 1050 + 50 + CLOUDS_FEASIBILITY_TOLERANCE_METERS)
    assert.equal(result.enabled, true)
  })

  it('flat flight path is always enabled with note', () => {
    const result = evaluateCloudsFeasibility(evalInput({ flightPath: 'flat' }))
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_FLAT_FLIGHT_PATH_NOTE)
    assert.equal(result.lookupValue, undefined)
    assert.equal(result.computed, undefined)
    assert.ok(result.logs.some((l) => l.includes(CLOUDS_FLAT_FLIGHT_PATH_NOTE)))
  })

  it('lofted+ flight path is disabled with generation-a note', () => {
    const result = evaluateCloudsFeasibility(evalInput({ flightPath: '+lofted' }))
    assert.equal(result.enabled, false)
    assert.equal(result.notes, CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE)
    assert.equal(result.lookupValue, undefined)
    assert.equal(result.computed, undefined)
    assert.ok(result.logs.some((l) => l.includes(CLOUDS_LOFTED_PLUS_FLIGHT_PATH_NOTE)))
  })

  it('enabled true with note when range is outside table', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({ positionToTargetRangeMeters: 3000 }),
    )
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_OUT_OF_TABLE_NOTE)
    assert.equal(result.lookupValue, undefined)
    assert.equal(result.computed, undefined)
    assert.ok(result.logs.some((l) => l.includes(CLOUDS_OUT_OF_TABLE_NOTE)))
  })

  it('enabled true with note when cell is empty in table', () => {
    const result = evaluateCloudsFeasibility(
      evalInput({
        positionToTargetHeightDifferenceMeters: 850,
        positionToTargetRangeMeters: 4500,
      }),
    )
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_OUT_OF_TABLE_NOTE)
    assert.equal(result.lookupValue, undefined)
    assert.equal(result.computed, undefined)
  })

  it('throws when target height is not finite', () => {
    assert.throws(
      () => evaluateCloudsFeasibility(evalInput({ targetHeightMeters: Number.NaN })),
      /גובה מטרה/,
    )
  })

  it('throws on invalid flight path', () => {
    assert.throws(
      () => evaluateCloudsFeasibility(evalInput({ flightPath: 'unknown' })),
      /מסלול מעוף לא תקין/,
    )
  })
})

describe('evaluateCloudsFeasibilityGenB', () => {
  it('enabled true when computed is strictly below cloud height', () => {
    const result = evaluateCloudsFeasibilityGenB(
      evalInput({
        positionToTargetHeightDifferenceMeters: 50,
        positionToTargetRangeMeters: 4500,
        targetHeightMeters: 200,
        cloudHeightMeters: 500,
      }),
    )
    assert.equal(result.lookupValue, 180)
    assert.equal(result.computed, 180 + 200 + CLOUDS_FEASIBILITY_TOLERANCE_METERS)
    assert.equal(result.enabled, true)
    assert.equal(result.notes, '')
  })

  it('lofted+ uses L+ column with lower lookup than lofted on same band', () => {
    const base = {
      positionToTargetHeightDifferenceMeters: 50,
      positionToTargetRangeMeters: 4500,
      targetHeightMeters: 200,
    }

    const lofted = evaluateCloudsFeasibilityGenB(
      evalInput({ ...base, flightPath: 'lofted', cloudHeightMeters: 500 }),
    )
    const loftedPlus = evaluateCloudsFeasibilityGenB(
      evalInput({ ...base, flightPath: '+lofted', cloudHeightMeters: 500 }),
    )

    assert.equal(lofted.lookupValue, 180)
    assert.equal(loftedPlus.lookupValue, 150)
    assert.equal(lofted.computed, 480)
    assert.equal(loftedPlus.computed, 450)
    assert.ok(loftedPlus.logs.some((l) => l.includes('עמודה L+')))
  })

  it('lofted+ can be enabled when lofted is disabled at same cloud height', () => {
    const base = {
      positionToTargetHeightDifferenceMeters: 50,
      positionToTargetRangeMeters: 4500,
      targetHeightMeters: 200,
      cloudHeightMeters: 460,
    }

    const lofted = evaluateCloudsFeasibilityGenB(evalInput({ ...base, flightPath: 'lofted' }))
    const loftedPlus = evaluateCloudsFeasibilityGenB(
      evalInput({ ...base, flightPath: '+lofted' }),
    )

    assert.equal(lofted.enabled, false)
    assert.equal(loftedPlus.enabled, true)
  })

  it('uses low trajectory column', () => {
    const result = evaluateCloudsFeasibilityGenB(
      evalInput({
        positionToTargetHeightDifferenceMeters: 50,
        positionToTargetRangeMeters: 4500,
        flightPath: 'low',
        targetHeightMeters: 0,
        cloudHeightMeters: 300,
      }),
    )
    assert.equal(result.lookupValue, 160)
    assert.equal(result.enabled, true)
  })

  it('flat flight path is always enabled with note', () => {
    const result = evaluateCloudsFeasibilityGenB(evalInput({ flightPath: 'flat' }))
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_FLAT_FLIGHT_PATH_NOTE)
    assert.equal(result.lookupValue, undefined)
  })

  it('enabled true with note when range is outside table', () => {
    const result = evaluateCloudsFeasibilityGenB(
      evalInput({ positionToTargetRangeMeters: 3000 }),
    )
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_OUT_OF_TABLE_NOTE)
    assert.equal(result.lookupValue, undefined)
  })

  it('enabled true with note when cell is empty in table', () => {
    const result = evaluateCloudsFeasibilityGenB(
      evalInput({
        positionToTargetHeightDifferenceMeters: 850,
        positionToTargetRangeMeters: 4500,
      }),
    )
    assert.equal(result.enabled, true)
    assert.equal(result.notes, CLOUDS_OUT_OF_TABLE_NOTE)
    assert.equal(result.lookupValue, undefined)
  })

  it('throws on invalid flight path', () => {
    assert.throws(
      () => evaluateCloudsFeasibilityGenB(evalInput({ flightPath: 'unknown' })),
      /מסלול מעוף לא תקין/,
    )
  })
})
