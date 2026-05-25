import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  collectVisibleWhenWatchKeys,
  isFormFieldVisibleWhen,
} from './dynamicFormVisibleWhen.ts'

describe('isFormFieldVisibleWhen', () => {
  it('matches single condition', () => {
    assert.equal(
      isFormFieldVisibleWhen(
        { field: 'impactLocationDetected', equals: 'לא' },
        { impactLocationDetected: 'לא' },
      ),
      true,
    )
    assert.equal(
      isFormFieldVisibleWhen(
        { field: 'impactLocationDetected', equals: 'לא' },
        { impactLocationDetected: 'כן' },
      ),
      false,
    )
  })

  it('matches or conditions', () => {
    const visibleWhen = {
      or: [
        { field: 'impactLocationDetected', equals: 'לא' },
        { field: 'impactLocationExploded', equals: 'לא' },
      ],
    } as const

    assert.equal(
      isFormFieldVisibleWhen(visibleWhen, {
        impactLocationDetected: 'לא',
        impactLocationExploded: 'כן',
      }),
      true,
    )
    assert.equal(
      isFormFieldVisibleWhen(visibleWhen, {
        impactLocationDetected: 'כן',
        impactLocationExploded: 'לא',
      }),
      true,
    )
    assert.equal(
      isFormFieldVisibleWhen(visibleWhen, {
        impactLocationDetected: 'כן',
        impactLocationExploded: 'כן',
      }),
      false,
    )
  })
})

describe('collectVisibleWhenWatchKeys', () => {
  it('dedupes keys from or', () => {
    assert.deepEqual(
      collectVisibleWhenWatchKeys({
        or: [
          { field: 'impactLocationDetected', equals: 'לא' },
          { field: 'impactLocationExploded', equals: 'לא' },
        ],
      }),
      ['impactLocationDetected', 'impactLocationExploded'],
    )
  })
})
