import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { WithUpdatedAt } from './updatedAt.types'

type Sample = WithUpdatedAt & { name: string }

describe('createWithUpdatedAt', () => {
  it('assigns id and updatedAt from input', () => {
    const created = createWithUpdatedAt<Sample>({ name: 'א' })
    assert.match(created.id, /^[0-9a-f-]{36}$/i)
    assert.equal(created.name, 'א')
    assert.ok(created.updatedAt.length > 0)
  })
})

describe('applyWithUpdatedAt', () => {
  it('keeps id, merges input, and bumps updatedAt', () => {
    const existing: Sample = { id: 'id-1', updatedAt: '2026-05-01T10:00:00.000Z', name: 'א' }
    const updated = applyWithUpdatedAt(existing, { name: 'ב' })
    assert.equal(updated.id, 'id-1')
    assert.equal(updated.name, 'ב')
    assert.notEqual(updated.updatedAt, existing.updatedAt)
  })
})
