import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calculatePositionToObstacleMetrics } from './positionToObstacleMetrics.ts'

describe('calculatePositionToObstacleMetrics', () => {
  it('returns horizontal range and height difference from position to obstacle', () => {
    const result = calculatePositionToObstacleMetrics({
      positionCoordinates: { east: '0', north: '0', palach: '' },
      positionAltitude: 100,
      obstacleCoordinates: { east: '300', north: '400', palach: '' },
      obstacleAltitude: 250,
    })

    assert.ok(result)
    assert.equal(result.range, 500)
    assert.equal(result.altitudeDiff, 150)
  })

  it('returns null when coordinates are incomplete', () => {
    const result = calculatePositionToObstacleMetrics({
      positionCoordinates: { east: '0', north: '', palach: '' },
      positionAltitude: 100,
      obstacleCoordinates: { east: '300', north: '400', palach: '' },
      obstacleAltitude: 250,
    })

    assert.equal(result, null)
  })

  it('returns null when heights are missing', () => {
    const result = calculatePositionToObstacleMetrics({
      positionCoordinates: { east: '0', north: '0', palach: '' },
      positionAltitude: '',
      obstacleCoordinates: { east: '300', north: '400', palach: '' },
      obstacleAltitude: 250,
    })

    assert.equal(result, null)
  })
})
