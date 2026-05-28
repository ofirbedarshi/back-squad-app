import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { evaluateObstaclesFeasibilityGenA } from './obstaclesFeasibility'
import {
  solveObstaclesFeasibilityFixture,
  buildObstacleMockTargetCoordinates,
} from './obstaclesFeasibilityFixture'

describe('solveObstaclesFeasibilityFixture', () => {
  it('creates candidate that matches desired enabled=true', () => {
    const solution = solveObstaclesFeasibilityFixture({
      positionAltitudeMeters: 100,
      desiredGenAEnabled: true,
      flightPath: 'low',
    })

    const result = evaluateObstaclesFeasibilityGenA({
      positionToTargetRangeMeters: solution.rangeMeters,
      positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
      flightPath: solution.flightPath,
      obstacle: {
        positionToObstacleRangeMeters: solution.obstacleRangeMeters,
        positionToObstacleHeightDifferenceMeters: solution.obstacleHeightDifferenceMeters,
        obstacleHeightMeters: solution.obstacleHeightMeters,
      },
    })

    assert.equal(result.enabled, true)
    assert.equal(result.notes, '')
  })

  it('creates candidate that matches desired enabled=false', () => {
    const solution = solveObstaclesFeasibilityFixture({
      positionAltitudeMeters: 100,
      desiredGenAEnabled: false,
      flightPath: 'lofted',
    })

    const result = evaluateObstaclesFeasibilityGenA({
      positionToTargetRangeMeters: solution.rangeMeters,
      positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
      flightPath: solution.flightPath,
      obstacle: {
        positionToObstacleRangeMeters: solution.obstacleRangeMeters,
        positionToObstacleHeightDifferenceMeters: solution.obstacleHeightDifferenceMeters,
        obstacleHeightMeters: solution.obstacleHeightMeters,
      },
    })

    assert.equal(result.enabled, false)
    assert.equal(result.notes, '')
  })

  it('throws for flat flight path', () => {
    assert.throws(
      () =>
        solveObstaclesFeasibilityFixture({
          positionAltitudeMeters: 100,
          desiredGenAEnabled: true,
          flightPath: 'flat',
        }),
      /מסלול flat/,
    )
  })
})

describe('buildObstacleMockTargetCoordinates', () => {
  it('places target north by given range', () => {
    const coordinates = buildObstacleMockTargetCoordinates({
      positionCoordinates: { east: '100', north: '200', palach: '12' },
      rangeMeters: 500,
    })

    assert.deepEqual(coordinates, { east: '100', north: '700', palach: '12' })
  })
})
