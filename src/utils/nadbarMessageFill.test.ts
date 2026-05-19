import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { Indicator } from '../domain/indicator.types'
import type { Target } from '../domain/target.types'
import { fillNadbarMessageContent } from './nadbarMessageFill'

const indicator: Indicator = {
  id: 'pointer-1',
  indicatorName: 'מציין בטא',
  coordinates: { east: '300000', north: '4000000', palach: '36' },
  altitude: 100,
  means: 'שיח',
  markCode: 42,
  savedAt: '2026-05-01T10:00:00.000Z',
}

const target: Target = {
  id: 'target-1',
  targetName: '7',
  coordinates: { east: '12', north: '34', palach: '36' },
}

describe('fillNadbarMessageContent', () => {
  it('replaces indicator.markCode when indicator is present', () => {
    const content = 'קבל, קו״צ {{indicator.markCode}}. כמו כן, גור ____'
    assert.equal(
      fillNadbarMessageContent(content, { indicator }),
      'קבל, קו״צ <u>42</u>. כמו כן, גור ____',
    )
  })

  it('keeps token when indicator is missing', () => {
    const content = 'קיבלתי, קו״צ {{indicator.markCode}}, גור ____'
    assert.equal(fillNadbarMessageContent(content, {}), content)
  })

  it('replaces target name and coordinates when target is present', () => {
    const content =
      'קבל למטרה {{target.targetName}} (מספר שלם) מרעום {{target.coordinates.east}} (ספרה ספרה) צפע {{target.coordinates.north}} (ספרה ספרה)'
    assert.equal(
      fillNadbarMessageContent(content, { target }),
      'קבל למטרה <u>7</u> (מספר שלם) מרעום <u>12</u> (ספרה ספרה) צפע <u>34</u> (ספרה ספרה)',
    )
  })

  it('keeps target tokens when target is missing', () => {
    const content = 'למטרה {{target.targetName}} מרעום {{target.coordinates.east}} צפע {{target.coordinates.north}}'
    assert.equal(fillNadbarMessageContent(content, {}), content)
  })

  it('leaves unknown tokens and plain blanks untouched', () => {
    const content = 'למטרה ____ ו-{{target.unknownField}}'
    assert.equal(fillNadbarMessageContent(content, { indicator, target }), content)
  })
})
