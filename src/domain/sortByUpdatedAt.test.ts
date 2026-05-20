import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { sortByUpdatedAtDesc } from './sortByUpdatedAt'
import type { WithUpdatedAt } from './updatedAt.types'

function item(id: string, updatedAt: string): WithUpdatedAt {
  return { id, updatedAt }
}

describe('sortByUpdatedAtDesc', () => {
  it('orders most recently updated first', () => {
    const older = item('a', '2026-05-01T10:00:00.000Z')
    const newer = item('b', '2026-05-19T21:29:00.000Z')
    const sorted = sortByUpdatedAtDesc([older, newer])
    assert.deepEqual(
      sorted.map((entry) => entry.id),
      ['b', 'a'],
    )
  })

  it('uses id as stable tie-break when updatedAt matches', () => {
    const sameTime = '2026-05-19T21:29:00.000Z'
    const sorted = sortByUpdatedAtDesc([item('z-id', sameTime), item('a-id', sameTime)])
    assert.deepEqual(
      sorted.map((entry) => entry.id),
      ['a-id', 'z-id'],
    )
  })
})
