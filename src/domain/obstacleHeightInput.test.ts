import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { resolveObstacleHeightMetrics } from './obstacleHeightInput.ts'

describe('resolveObstacleHeightMetrics', () => {
  it('amsl: derives height above position from sea level', () => {
    const result = resolveObstacleHeightMetrics({
      rawHeightMeters: 150,
      reference: 'amsl',
      positionAltitudeMeters: 100,
    })

    assert.deepEqual(result, {
      obstacleHeightMeters: 150,
      positionToObstacleHeightDifferenceMeters: 50,
    })
  })

  it('abovePosition: uses raw height as difference and derives amsl', () => {
    const result = resolveObstacleHeightMetrics({
      rawHeightMeters: 50,
      reference: 'abovePosition',
      positionAltitudeMeters: 100,
    })

    assert.deepEqual(result, {
      obstacleHeightMeters: 150,
      positionToObstacleHeightDifferenceMeters: 50,
    })
  })

  it('amsl and abovePosition with equivalent relative height match', () => {
    const positionAltitudeMeters = 100
    const fromAmsl = resolveObstacleHeightMetrics({
      rawHeightMeters: 150,
      reference: 'amsl',
      positionAltitudeMeters,
    })
    const fromAbovePosition = resolveObstacleHeightMetrics({
      rawHeightMeters: 50,
      reference: 'abovePosition',
      positionAltitudeMeters,
    })

    assert.deepEqual(fromAmsl, fromAbovePosition)
  })

  it('throws when raw height is not finite', () => {
    assert.throws(
      () =>
        resolveObstacleHeightMetrics({
          rawHeightMeters: Number.NaN,
          reference: 'amsl',
          positionAltitudeMeters: 100,
        }),
      /גובה מכשול לא תקין/,
    )
  })

  it('throws when position altitude is not finite', () => {
    assert.throws(
      () =>
        resolveObstacleHeightMetrics({
          rawHeightMeters: 150,
          reference: 'amsl',
          positionAltitudeMeters: Number.POSITIVE_INFINITY,
        }),
      /גובה עמדה לא תקין/,
    )
  })
})
