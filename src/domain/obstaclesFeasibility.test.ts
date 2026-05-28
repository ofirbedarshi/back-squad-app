import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  evaluateObstaclesFeasibilityGenA,
  evaluateObstaclesFeasibilityWhenMissing,
} from './obstaclesFeasibility.ts'
import {
  OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE,
  OBSTACLES_FLAT_FLIGHT_PATH_NOTE,
  OBSTACLES_OUT_OF_TABLE_NOTE,
} from './fireFeasibility.constants.ts'

describe('evaluateObstaclesFeasibilityWhenMissing', () => {
  it('returns enabled true with explanatory note', () => {
    const result = evaluateObstaclesFeasibilityWhenMissing()

    assert.equal(result.enabled, true)
    assert.equal(result.notes, OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE)
    assert.deepEqual(result.logs, [])
  })
})

describe('evaluateObstaclesFeasibilityGenA', () => {
  it('returns blocked note for flat trajectory', () => {
    const result = evaluateObstaclesFeasibilityGenA({
      positionToTargetRangeMeters: 2000,
      positionToTargetHeightDifferenceMeters: 0,
      flightPath: 'flat',
      obstacle: {
        positionToObstacleRangeMeters: 500,
        positionToObstacleHeightDifferenceMeters: 90,
        obstacleHeightMeters: 190,
      },
    })

    assert.equal(result.enabled, false)
    assert.equal(result.notes, OBSTACLES_FLAT_FLIGHT_PATH_NOTE)
    assert.equal(result.logs.at(-1), OBSTACLES_FLAT_FLIGHT_PATH_NOTE)
  })

  it('returns enabled when obstacle is lower than missile at same point', () => {
    const result = evaluateObstaclesFeasibilityGenA({
      positionToTargetRangeMeters: 2000,
      positionToTargetHeightDifferenceMeters: 0,
      flightPath: 'low',
      obstacle: {
        positionToObstacleRangeMeters: 500,
        positionToObstacleHeightDifferenceMeters: 59,
        obstacleHeightMeters: 159,
      },
    })

    assert.equal(result.enabled, true)
    assert.equal(result.notes, '')
    assert.equal(result.logs.some((line) => line.includes('key: 2000|0|500')), true)
  })

  it('returns blocked when obstacle is higher than missile at same point', () => {
    const result = evaluateObstaclesFeasibilityGenA({
      positionToTargetRangeMeters: 2000,
      positionToTargetHeightDifferenceMeters: 0,
      flightPath: 'low',
      obstacle: {
        positionToObstacleRangeMeters: 500,
        positionToObstacleHeightDifferenceMeters: 61,
        obstacleHeightMeters: 161,
      },
    })

    assert.equal(result.enabled, false)
    assert.equal(result.notes, '')
    assert.equal(result.logs.some((line) => line.includes('ולכן לא מאפשר')), true)
  })

  it('returns allow with note when lookup key missing', () => {
    const result = evaluateObstaclesFeasibilityGenA({
      positionToTargetRangeMeters: 1234,
      positionToTargetHeightDifferenceMeters: 0,
      flightPath: 'low',
      obstacle: {
        positionToObstacleRangeMeters: 500,
        positionToObstacleHeightDifferenceMeters: 10,
        obstacleHeightMeters: 110,
      },
    })

    assert.equal(result.enabled, true)
    assert.equal(result.notes, OBSTACLES_OUT_OF_TABLE_NOTE)
    assert.equal(result.logs.at(-1), OBSTACLES_OUT_OF_TABLE_NOTE)
  })

  it('throws on invalid numeric input', () => {
    assert.throws(() =>
      evaluateObstaclesFeasibilityGenA({
        positionToTargetRangeMeters: Number.NaN,
        positionToTargetHeightDifferenceMeters: 0,
        flightPath: 'low',
        obstacle: {
          positionToObstacleRangeMeters: 500,
          positionToObstacleHeightDifferenceMeters: 10,
          obstacleHeightMeters: 110,
        },
      }),
    )
  })
})
