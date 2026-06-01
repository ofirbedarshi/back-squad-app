import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import { getNadbarCardDetails, getNadbarCardTitle } from './nadbarDisplay'

const baseNadbar: Nadbar = {
  id: 'nadbar-1',
  createdAt: '2026-05-01T10:00:00.000Z',
  updatedAt: '2026-05-02T12:30:00.000Z',
  type: 'PointerTeam',
  messageBlocks: [{ messages: [{ source: 'They', content: 'דווחו מצב' }] }],
}

const targets: Target[] = [
  {
    id: 'target-1',
    updatedAt: '2026-05-01T10:00:00.000Z',
    targetName: 'מטרה אלפא',
    coordinates: { east: '123456', north: '3123456', palach: '36' },
    altitude: 50,
  },
]

describe('getNadbarCardTitle', () => {
  it('returns Hebrew label for nadbar type', () => {
    assert.equal(getNadbarCardTitle(baseNadbar), 'צוות ציון')
  })
})

describe('getNadbarCardDetails', () => {
  it('resolves target from the last filled block', () => {
    const details = getNadbarCardDetails(
      {
        ...baseNadbar,
        messageBlocks: [
          { messages: [{ source: 'They', content: '{{metara}}' }] },
          { messages: [{ source: 'They', content: '{{metara}}' }] },
        ],
        blockMessageVars: [
          { metara: 'מטרה אלפא', meraom: '123456', tsepa: '3123456' },
          { metara: 'מטרה אחרת' },
        ],
      },
      targets,
    )
    assert.equal(details.targetName, 'מטרה אחרת')
    assert.notEqual(details.updatedAtLabel, '—')
  })

  it('shows placeholder when no block has a target', () => {
    const details = getNadbarCardDetails(baseNadbar, targets)
    assert.equal(details.targetName, 'ללא מטרה')
  })

  it('ignores toolbar links when blocks have no target', () => {
    const details = getNadbarCardDetails(
      {
        ...baseNadbar,
        links: { targetId: 'target-1', pointerId: 'pointer-1' },
      },
      targets,
    )
    assert.equal(details.targetName, 'ללא מטרה')
  })
})

describe('formatUpdatedAt', () => {
  it('returns dash for invalid iso', () => {
    assert.equal(formatUpdatedAt('not-a-date'), '—')
  })
})
