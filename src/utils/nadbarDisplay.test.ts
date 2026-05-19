import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { Indicator } from '../domain/indicator.types'
import type { Nadbar } from '../domain/nadbar.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { formatNadbarUpdatedAt, getNadbarCardDetails, getNadbarCardTitle } from './nadbarDisplay'

const baseNadbar: Nadbar = {
  id: 'nadbar-1',
  createdAt: '2026-05-01T10:00:00.000Z',
  updatedAt: '2026-05-02T12:30:00.000Z',
  type: 'PointerTeam',
  messages: [{ source: 'They', content: 'דווחו מצב' }],
}

const targets: Target[] = [
  {
    id: 'target-1',
    targetName: 'מטרה אלפא',
    coordinates: { easting: 100, northing: 200 },
  },
]

const positions: Position[] = [
  {
    id: 'position-1',
    savedAt: '2026-05-01T10:00:00.000Z',
    stationName: 'עמדה גמא',
    coordinates: { east: '100', north: '200', palach: '300' },
    altitude: 50,
  },
]

const indicators: Indicator[] = [
  {
    id: 'pointer-1',
    indicatorName: 'מציין בטא',
    coordinates: { easting: 300, northing: 400 },
    altitude: 100,
    means: 'שיח',
    markCode: 1,
    savedAt: '2026-05-01T10:00:00.000Z',
  },
]

describe('getNadbarCardTitle', () => {
  it('returns Hebrew label for nadbar type', () => {
    assert.equal(getNadbarCardTitle(baseNadbar), 'צוות ציון')
  })
})

describe('getNadbarCardDetails', () => {
  it('resolves linked target, indicator, and position names', () => {
    const details = getNadbarCardDetails(
      {
        ...baseNadbar,
        links: { targetId: 'target-1', pointerId: 'pointer-1', positionId: 'position-1' },
      },
      targets,
      indicators,
      positions,
    )
    assert.equal(details.targetName, 'מטרה אלפא')
    assert.equal(details.indicatorName, 'מציין בטא')
    assert.equal(details.positionName, 'עמדה גמא')
    assert.notEqual(details.updatedAtLabel, '—')
  })

  it('shows placeholders when links are missing', () => {
    const details = getNadbarCardDetails(baseNadbar, targets, indicators, positions)
    assert.equal(details.targetName, 'ללא מטרה')
    assert.equal(details.indicatorName, 'ללא מציין')
    assert.equal(details.positionName, 'ללא עמדה')
  })

  it('shows missing entity labels when ids are stale', () => {
    const details = getNadbarCardDetails(
      {
        ...baseNadbar,
        links: { targetId: 'missing-target', pointerId: 'missing-pointer' },
      },
      targets,
      indicators,
      positions,
    )
    assert.equal(details.targetName, 'מטרה לא נמצאה')
    assert.equal(details.indicatorName, 'מציין לא נמצא')
    assert.equal(details.positionName, 'ללא עמדה')
  })
})

describe('formatNadbarUpdatedAt', () => {
  it('returns dash for invalid iso', () => {
    assert.equal(formatNadbarUpdatedAt('not-a-date'), '—')
  })
})
