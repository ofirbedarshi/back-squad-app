import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyNadbarLinks,
  createNadbarFromTemplate,
  hasCompleteNadbarLinks,
  isValidNadbar,
  normalizeNadbar,
  parseNadbarTemplate,
} from './nadbar.ts'
import { getNadbarTemplate } from './nadbarTemplates.ts'

describe('parseNadbarTemplate', () => {
  it('accepts valid template', () => {
    const template = parseNadbarTemplate({
      messages: [
        { source: 'They', content: 'שלום' },
        { source: 'Me', content: 'היי' },
      ],
    })
    assert.equal(template.messages.length, 2)
    assert.equal(template.messages[0]?.source, 'They')
  })

  it('rejects empty messages', () => {
    assert.throws(() => parseNadbarTemplate({ messages: [] }), /הודעות/)
  })

  it('rejects invalid source', () => {
    assert.throws(
      () =>
        parseNadbarTemplate({
          messages: [{ source: 'Other', content: 'x' }],
        }),
      /לא תקינות/,
    )
  })
})

describe('createNadbarFromTemplate', () => {
  it('creates nadbar with id, timestamps, and copied messages', () => {
    const template = { messages: [{ source: 'Me' as const, content: 'בדיקה' }] }
    const nadbar = createNadbarFromTemplate('Katmam', template)
    assert.ok(nadbar.id)
    assert.equal(nadbar.type, 'Katmam')
    assert.equal(nadbar.messages[0]?.content, 'בדיקה')
    assert.notEqual(nadbar.messages[0], template.messages[0])
    assert.ok(isValidNadbar(nadbar))
  })
})

describe('getNadbarTemplate', () => {
  it('returns template for each type', () => {
    for (const type of ['PointerTeam', 'Katmam', 'TzurPointer'] as const) {
      const template = getNadbarTemplate(type)
      assert.ok(template.messages.length > 0)
    }
  })
})

describe('applyNadbarLinks', () => {
  it('sets pointer, target, and position ids and updates updatedAt', () => {
    const nadbar = {
      ...createNadbarFromTemplate('Katmam', {
        messages: [{ source: 'Me', content: 'בדיקה' }],
      }),
      updatedAt: '2020-01-01T00:00:00.000Z',
    }
    const updated = applyNadbarLinks(nadbar, {
      pointerId: 'pointer-1',
      targetId: 'target-1',
      positionId: 'position-1',
    })
    assert.equal(updated.links?.pointerId, 'pointer-1')
    assert.equal(updated.links?.targetId, 'target-1')
    assert.equal(updated.links?.positionId, 'position-1')
    assert.notEqual(updated.updatedAt, nadbar.updatedAt)
  })

  it('clears links when passed null', () => {
    const nadbar = createNadbarFromTemplate('Katmam', {
      messages: [{ source: 'Me', content: 'בדיקה' }],
    })
    const withLinks = applyNadbarLinks(nadbar, {
      pointerId: 'pointer-1',
      targetId: 'target-1',
      positionId: 'position-1',
    })
    const cleared = applyNadbarLinks(withLinks, {
      pointerId: null,
      targetId: null,
      positionId: null,
    })
    assert.equal(cleared.links, undefined)
  })
})

describe('hasCompleteNadbarLinks', () => {
  it('requires pointer, target, and position ids', () => {
    assert.equal(hasCompleteNadbarLinks(undefined), false)
    assert.equal(hasCompleteNadbarLinks({ pointerId: 'pointer-1' }), false)
    assert.equal(hasCompleteNadbarLinks({ targetId: 'target-1' }), false)
    assert.equal(
      hasCompleteNadbarLinks({ pointerId: 'pointer-1', targetId: 'target-1' }),
      false,
    )
    assert.equal(
      hasCompleteNadbarLinks({
        pointerId: 'pointer-1',
        targetId: 'target-1',
        positionId: 'position-1',
      }),
      true,
    )
  })
})

describe('normalizeNadbar', () => {
  it('moves legacy top-level ids into links', () => {
    const nadbar = createNadbarFromTemplate('Katmam', {
      messages: [{ source: 'Me', content: 'בדיקה' }],
    })
    const legacy = { ...nadbar, pointerId: 'pointer-1', targetId: 'target-1' }
    const normalized = normalizeNadbar(legacy)
    assert.equal(normalized.links?.pointerId, 'pointer-1')
    assert.equal(normalized.links?.targetId, 'target-1')
    assert.equal((normalized as { pointerId?: string }).pointerId, undefined)
  })
})

describe('isValidNadbar', () => {
  it('accepts optional pointer and target ids', () => {
    const nadbar = createNadbarFromTemplate('Katmam', {
      messages: [{ source: 'Me', content: 'בדיקה' }],
    })
    const withLinks = applyNadbarLinks(nadbar, {
      pointerId: 'pointer-1',
      targetId: 'target-1',
      positionId: 'position-1',
    })
    assert.ok(isValidNadbar(withLinks))
  })

  it('rejects legacy savedAt shape', () => {
    assert.equal(
      isValidNadbar({
        id: '1',
        savedAt: '2020-01-01',
        type: 'Katmam',
        data: {},
      }),
      false,
    )
  })
})
