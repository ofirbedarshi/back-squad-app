import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyNadbarLinks,
  assertNadbarLinksForSave,
  createNadbarFromTemplate,
  hasCompleteNadbarLinks,
  isValidNadbar,
  nadbarRequiresEntityLinks,
  NADBAR_SAVE_LINKS_REQUIRED_MESSAGE,
  parseNadbarTemplate,
} from './nadbar.ts'
import { getNadbarTemplate } from './nadbarTemplates.ts'
import { assertNadbarSaveableUseCase } from '../useCases/assertNadbarSaveable.ts'

describe('nadbarRequiresEntityLinks', () => {
  it('is false only for PointerTeamUpdated', () => {
    assert.equal(nadbarRequiresEntityLinks('PointerTeamUpdated'), false)
    assert.equal(nadbarRequiresEntityLinks('PointerTeam'), true)
    assert.equal(nadbarRequiresEntityLinks('Katmam'), true)
    assert.equal(nadbarRequiresEntityLinks('TzurPointer'), true)
  })
})

describe('assertNadbarSaveableUseCase', () => {
  it('allows PointerTeamUpdated without links', () => {
    const nadbar = createNadbarFromTemplate('PointerTeamUpdated', {
      messages: [{ source: 'Me', content: 'בדיקה' }],
    })
    assert.equal(nadbar.links, undefined)
    assert.doesNotThrow(() => assertNadbarSaveableUseCase(nadbar))
  })

  it('requires links for other types', () => {
    const nadbar = createNadbarFromTemplate('Katmam', {
      messages: [{ source: 'Me', content: 'בדיקה' }],
    })
    assert.throws(
      () => assertNadbarSaveableUseCase(nadbar),
      (error: unknown) =>
        error instanceof Error && error.message === NADBAR_SAVE_LINKS_REQUIRED_MESSAGE,
    )
  })
})

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
    for (const type of ['PointerTeam', 'PointerTeamUpdated', 'Katmam', 'TzurPointer'] as const) {
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

describe('assertNadbarLinksForSave', () => {
  it('throws when any link id is missing', () => {
    assert.throws(
      () => assertNadbarLinksForSave({ pointerId: 'pointer-1', targetId: 'target-1' }),
      (error: unknown) =>
        error instanceof Error && error.message === NADBAR_SAVE_LINKS_REQUIRED_MESSAGE,
    )
  })

  it('does not throw when all link ids are present', () => {
    assert.doesNotThrow(() =>
      assertNadbarLinksForSave({
        pointerId: 'pointer-1',
        targetId: 'target-1',
        positionId: 'position-1',
      }),
    )
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

  it('rejects record missing required fields', () => {
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

  it('rejects top-level link ids outside links', () => {
    const nadbar = createNadbarFromTemplate('Katmam', {
      messages: [{ source: 'Me', content: 'בדיקה' }],
    })
    assert.equal(
      isValidNadbar({ ...nadbar, pointerId: 'pointer-1', targetId: 'target-1' }),
      false,
    )
  })
})
