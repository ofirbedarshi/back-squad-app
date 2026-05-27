import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  normalizeCloudHeightMeters,
  normalizeCloudHeightSettings,
} from './cloudHeight.ts'

describe('normalizeCloudHeightMeters', () => {
  it('returns null for null input', () => {
    assert.equal(normalizeCloudHeightMeters(null), null)
  })

  it('rounds to two decimals like live metrics', () => {
    assert.equal(normalizeCloudHeightMeters(1500.456), 1500.46)
    assert.equal(normalizeCloudHeightMeters(1500.004), 1500)
    assert.equal(normalizeCloudHeightMeters(700), 700)
  })

  it('throws for non-finite values', () => {
    assert.throws(() => normalizeCloudHeightMeters(Number.NaN), /לא תקין/)
  })
})

describe('normalizeCloudHeightSettings', () => {
  it('normalizes heightMeters only', () => {
    assert.deepEqual(
      normalizeCloudHeightSettings({
        heightMeters: 1234.567,
        displayUnit: 'feet',
      }),
      { heightMeters: 1234.57, displayUnit: 'feet' },
    )
  })
})
