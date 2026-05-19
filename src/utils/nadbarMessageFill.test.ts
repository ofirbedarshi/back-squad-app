import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { Indicator } from '../domain/indicator.types'
import { fillNadbarMessageContent } from './nadbarMessageFill'

const indicator: Indicator = {
  id: 'pointer-1',
  indicatorName: 'מציין בטא',
  coordinates: { easting: 300, northing: 400 },
  altitude: 100,
  means: 'שיח',
  markCode: 42,
  savedAt: '2026-05-01T10:00:00.000Z',
}

describe('fillNadbarMessageContent', () => {
  it('replaces indicator.markCode when indicator is present', () => {
    const content = 'קבל, קו״צ {{indicator.markCode}}. כמו כן, גור ____'
    assert.equal(fillNadbarMessageContent(content, { indicator }), 'קבל, קו״צ 42. כמו כן, גור ____')
  })

  it('keeps token when indicator is missing', () => {
    const content = 'קיבלתי, קו״צ {{indicator.markCode}}, גור ____'
    assert.equal(fillNadbarMessageContent(content, {}), content)
  })

  it('leaves unknown tokens and plain blanks untouched', () => {
    const content = 'למטרה ____ ו-{{target.targetName}}'
    assert.equal(fillNadbarMessageContent(content, { indicator }), content)
  })
})
