import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  evaluateCloudsFeasibility,
  evaluateCloudsFeasibilityGenB,
} from './cloudsFeasibility.ts'
import type { CloudsFeasibilityEvaluationInput } from './cloudsFeasibility.types.ts'
import {
  formatCloudsMockTargetName,
  solveCloudsFeasibilityFixture,
} from './cloudsFeasibilityFixture.ts'
import type { CloudsFeasibilityFixtureSolveInput } from './cloudsFeasibilityFixture.types.ts'

const POSITION_ALTITUDE_METERS = 0

function solveInput(
  overrides: Partial<CloudsFeasibilityFixtureSolveInput>,
): CloudsFeasibilityFixtureSolveInput {
  return {
    cloudHeightMeters: 700,
    positionAltitudeMeters: POSITION_ALTITUDE_METERS,
    desiredGenAEnabled: true,
    desiredGenBEnabled: true,
    flightPath: 'lofted',
    ...overrides,
  }
}

function evaluationFromSolution(
  solution: ReturnType<typeof solveCloudsFeasibilityFixture>,
  cloudHeightMeters: number,
): CloudsFeasibilityEvaluationInput {
  return {
    positionToTargetRangeMeters: solution.rangeMeters,
    positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
    flightPath: solution.flightPath,
    targetHeightMeters: solution.targetAltitudeMeters,
    cloudHeightMeters,
  }
}

describe('solveCloudsFeasibilityFixture', () => {
  it('finds lofted fixture for both generations enabled', () => {
    const solution = solveCloudsFeasibilityFixture(solveInput({}))
    const evaluation = evaluationFromSolution(solution, 700)

    assert.equal(evaluateCloudsFeasibility(evaluation).enabled, true)
    assert.equal(evaluateCloudsFeasibilityGenB(evaluation).enabled, true)
  })

  it('finds lofted fixture for both generations disabled', () => {
    const solution = solveCloudsFeasibilityFixture(
      solveInput({ desiredGenAEnabled: false, desiredGenBEnabled: false }),
    )
    const evaluation = evaluationFromSolution(solution, 700)

    assert.equal(evaluateCloudsFeasibility(evaluation).enabled, false)
    assert.equal(evaluateCloudsFeasibilityGenB(evaluation).enabled, false)
  })

  it('finds lofted fixture when generation A enabled and B disabled', () => {
    const solution = solveCloudsFeasibilityFixture(
      solveInput({ desiredGenAEnabled: true, desiredGenBEnabled: false }),
    )
    const evaluation = evaluationFromSolution(solution, 700)

    assert.equal(evaluateCloudsFeasibility(evaluation).enabled, true)
    assert.equal(evaluateCloudsFeasibilityGenB(evaluation).enabled, false)
  })

  it('finds lofted fixture when generation A disabled and B enabled', () => {
    const solution = solveCloudsFeasibilityFixture(
      solveInput({ desiredGenAEnabled: false, desiredGenBEnabled: true }),
    )
    const evaluation = evaluationFromSolution(solution, 700)

    assert.equal(evaluateCloudsFeasibility(evaluation).enabled, false)
    assert.equal(evaluateCloudsFeasibilityGenB(evaluation).enabled, true)
  })

  it('finds flat fixture when both generations enabled', () => {
    const solution = solveCloudsFeasibilityFixture(
      solveInput({ flightPath: 'flat', desiredGenAEnabled: true, desiredGenBEnabled: true }),
    )
    const evaluation = evaluationFromSolution(solution, 700)

    assert.equal(evaluateCloudsFeasibility(evaluation).enabled, true)
    assert.equal(evaluateCloudsFeasibilityGenB(evaluation).enabled, true)
  })

  it('finds lofted+ fixture when generation A disabled and B enabled', () => {
    const solution = solveCloudsFeasibilityFixture(
      solveInput({
        flightPath: '+lofted',
        desiredGenAEnabled: false,
        desiredGenBEnabled: true,
      }),
    )
    const evaluation = evaluationFromSolution(solution, 700)

    assert.equal(evaluateCloudsFeasibility(evaluation).enabled, false)
    assert.equal(evaluateCloudsFeasibilityGenB(evaluation).enabled, true)
  })

  it('rejects flat when any generation should be disabled', () => {
    assert.throws(
      () =>
        solveCloudsFeasibilityFixture(
          solveInput({ flightPath: 'flat', desiredGenBEnabled: false }),
        ),
      /flat/,
    )
  })

  it('rejects lofted+ when generation A should be enabled', () => {
    assert.throws(
      () =>
        solveCloudsFeasibilityFixture(
          solveInput({ flightPath: '+lofted', desiredGenAEnabled: true }),
        ),
      /lofted\+/,
    )
  })

  it('rejects impossible combination with Hebrew message', () => {
    assert.throws(
      () =>
        solveCloudsFeasibilityFixture(
          solveInput({
            positionAltitudeMeters: 500,
            desiredGenAEnabled: true,
            desiredGenBEnabled: false,
          }),
        ),
      /לא נמצאה מטרה מתאימה/,
    )
  })
})

describe('formatCloudsMockTargetName', () => {
  it('formats Hebrew target name with flight path', () => {
    const name = formatCloudsMockTargetName({
      genAEnabled: true,
      genBEnabled: false,
      flightPath: 'lofted',
    })
    assert.match(name, /עננים/)
    assert.match(name, /דור א׳ מאפשר/)
    assert.match(name, /דור ב׳ לא מאפשר/)
    assert.match(name, /lofted/)
  })
})
