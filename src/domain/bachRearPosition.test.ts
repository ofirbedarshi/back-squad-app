import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { positionToRearFormFields } from './bachRearPosition.ts'
import type { Position } from './position.types'

const samplePosition: Position = {
  id: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaa1',
  updatedAt: '2026-05-10T10:00:00.000Z',
  stationName: 'עמדה אלפא',
  coordinates: { east: '345678', north: '3456789', palach: '36' },
  altitude: 420,
  aka: 40,
}

describe('positionToRearFormFields', () => {
  it('maps position fields to bach rear form keys', () => {
    const result = positionToRearFormFields(samplePosition)
    assert.equal(result.rearPositionId, samplePosition.id)
    assert.equal(result.positionName, 'עמדה אלפא')
    assert.deepEqual(result.positionCoords, samplePosition.coordinates)
    assert.equal(result.positionAltitude, '420')
    assert.equal(result.aka, '40')
  })

  it('uses empty string for missing aka', () => {
    const { aka, ...withoutAka } = samplePosition
    void aka
    const result = positionToRearFormFields(withoutAka)
    assert.equal(result.aka, '')
  })
})
