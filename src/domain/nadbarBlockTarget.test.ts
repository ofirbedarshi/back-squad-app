import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { Nadbar } from './nadbar.types'
import type { Target } from './target.types'
import {
  findTargetIdFromNadbarBlockVars,
  resolveLastFilledNadbarBlockTargetId,
  resolveLastFilledNadbarBlockTargetName,
} from './nadbarBlockTarget.ts'

const targets: Target[] = [
  {
    id: 'target-a',
    updatedAt: '2026-05-01T10:00:00.000Z',
    targetName: 'מטרה א',
    coordinates: { east: '123456', north: '3123456', palach: '36' },
    altitude: 100,
  },
  {
    id: 'target-b',
    updatedAt: '2026-05-01T10:00:00.000Z',
    targetName: 'מטרה ב',
    coordinates: { east: '654321', north: '3765432', palach: '36' },
    altitude: 200,
  },
]

const baseNadbar: Nadbar = {
  id: 'nadbar-1',
  createdAt: '2026-05-01T10:00:00.000Z',
  updatedAt: '2026-05-02T12:30:00.000Z',
  type: 'PointerTeam',
  messageBlocks: [{}, {}, {}].map(() => ({ messages: [{ source: 'They', content: '{{metara}}' }] })),
}

describe('findTargetIdFromNadbarBlockVars', () => {
  it('matches by name and coordinates when multiple share a name', () => {
    const duplicateNameTargets: Target[] = [
      ...targets,
      {
        id: 'target-a-dup',
        updatedAt: '2026-05-01T10:00:00.000Z',
        targetName: 'מטרה א',
        coordinates: { east: '999999', north: '3999999', palach: '36' },
      },
    ]
    assert.equal(
      findTargetIdFromNadbarBlockVars(
        { metara: 'מטרה א', meraom: '123456', tsepa: '3123456' },
        duplicateNameTargets,
      ),
      'target-a',
    )
  })

  it('matches by name only when unique', () => {
    assert.equal(
      findTargetIdFromNadbarBlockVars({ metara: 'מטרה ב' }, targets),
      'target-b',
    )
  })
})

describe('resolveLastFilledNadbarBlockTargetId', () => {
  it('uses the last block that has a filled target', () => {
    const nadbar: Nadbar = {
      ...baseNadbar,
      blockMessageVars: [
        { metara: 'מטרה א', meraom: '123456', tsepa: '3123456' },
        {},
        { metara: 'מטרה ב', meraom: '654321', tsepa: '3765432' },
      ],
    }
    assert.equal(resolveLastFilledNadbarBlockTargetId(nadbar, targets), 'target-b')
  })

  it('skips trailing empty blocks', () => {
    const nadbar: Nadbar = {
      ...baseNadbar,
      blockMessageVars: [
        { metara: 'מטרה א', meraom: '123456', tsepa: '3123456' },
        { metara: 'מטרה ב', meraom: '654321', tsepa: '3765432' },
        {},
      ],
    }
    assert.equal(resolveLastFilledNadbarBlockTargetId(nadbar, targets), 'target-b')
  })
})

describe('resolveLastFilledNadbarBlockTargetName', () => {
  it('returns block metara when no saved target matches', () => {
    const nadbar: Nadbar = {
      ...baseNadbar,
      blockMessageVars: [{}, { metara: 'מטרה ידנית' }],
    }
    assert.equal(resolveLastFilledNadbarBlockTargetName(nadbar, targets), 'מטרה ידנית')
  })
})
