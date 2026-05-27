import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { formatMetric, roundMetric } from './metricRounding.ts'

describe('roundMetric', () => {
  it('rounds to two decimal places', () => {
    assert.equal(roundMetric(127.444), 127.44)
    assert.equal(roundMetric(127.446), 127.45)
    assert.equal(roundMetric(90), 90)
    assert.equal(roundMetric(90.046), 90.05)
  })

  it('throws for non-finite values', () => {
    assert.throws(() => roundMetric(Number.NaN), /לא תקין/)
    assert.throws(() => roundMetric(Number.POSITIVE_INFINITY), /לא תקין/)
  })
})

describe('formatMetric', () => {
  it('uses same rounding as roundMetric and drops trailing zeros', () => {
    assert.equal(formatMetric(127.444), '127.44')
    assert.equal(formatMetric(90), '90')
    assert.equal(formatMetric(90.1), '90.1')
    assert.equal(formatMetric(90.046), '90.05')
  })
})
